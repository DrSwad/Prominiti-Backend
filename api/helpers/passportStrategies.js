const fs = require("fs/promises"); // To copy default profile picture
const path = require("path"); // To locate profile pictures
const LocalStrategy = require("passport-local").Strategy; // Email/password signup/login
const JWTstrategy = require("passport-jwt").Strategy; // Verify JWT tokens in requests
const ExtractJWT = require("passport-jwt").ExtractJwt; // Extract the JWT token from request header
const { Op } = require("sequelize");
const {
  models: { User, Verification, Location },
} = require("../models");
const { root } = require("../../config");
const { secret: jwtSecret } = require("../../config/jwt");
const sendMail = require("./sendMail");

// Expose the function to our app using export
module.exports = function (passport) {
  // Local signup
  passport.use(
    "local-signup",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true, // allows us to pass back the entire request to the callback
      },
      async function (req, email, password, done) {
        try {
          // Make sure password confirmation matched
          const confirmPassword = req.body.confirmPassword;
          if (password !== confirmPassword)
            return done(
              new Error(
                "Passwords don't match! Kindly type the password carefully in the input fields to make" +
                  " sure they match."
              )
            );

          // Create user model
          const { name, username } = req.body;
          const user = await User.create({
            name,
            username,
            email,
            password,
          });

          // Create location entry
          await Location.create({
            UserId: user.id,
            longitude: null,
            latitude: null,
          });

          // Copy default profile picture
          await fs.copyFile(
            path.normalize(path.join(root, "assets", "avatar", "$default.png")),
            path.normalize(
              path.join(root, "assets", "avatar", `${user.id}.png`)
            )
          );

          // Create the account verification entry
          const verification = Verification.build({
            UserId: user.id,
          });
          await verification.generateToken();
          await verification.save();

          // Send email
          await sendMail(user.email, "SIGNUP", { user, verification });

          // Account creation successful, return plain user object excluding password
          const safeUser = user.get({ plain: true });
          delete safeUser.password;
          return done(null, safeUser);
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  // Local login
  passport.use(
    "local-login",
    new LocalStrategy(
      {
        usernameField: "emailOrUsername",
        passwordField: "password",
        passReqToCallback: true, // Allows us to pass back the entire request to the callback
      },
      async function (_req, emailOrUsername, password, done) {
        // Callback with emailOrUsername and password from our form
        try {
          // Get the model
          const user = await User.findOne({
            where: {
              [Op.or]: {
                email: emailOrUsername,
                username: emailOrUsername,
              },
            },
          });

          // If the user is not found or the passwords don't match
          if (!user || !(await user.isValidPassword(password))) {
            return done(
              new Error(
                "No user found matching the provided credentials. Kindly make sure everything is typed in correctly."
              )
            );
          }

          // If the account hasn't been verified yet
          if (!user.verified) {
            return done(
              new Error(
                "This account has not been verified yet. Kindly visit the verification link sent to the account's associated email to verify the account"
              )
            );
          }

          // All is well, return plain user object excluding password
          const safeUser = user.get({ plain: true });
          delete safeUser.password;
          return done(null, safeUser);
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  // JWT verification
  passport.use(
    new JWTstrategy(
      {
        secretOrKey: jwtSecret,
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      },
      function (token, done) {
        try {
          return done(null, token.user);
        } catch (err) {
          done(err);
        }
      }
    )
  );
};
