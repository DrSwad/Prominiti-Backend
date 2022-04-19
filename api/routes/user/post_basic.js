const { Router } = require("express");
const router = Router();

const {
  models: { User, Verification },
} = require("../../models");
const {
  authenticatedMiddleware,
} = require("../../helpers/authenticatedMiddleware");
const sendMail = require("../../helpers/sendMail");

router.post("/basic", authenticatedMiddleware, async function (req, res, next) {
  try {
    const userID = req.user.id;

    const user = await User.findByPk(userID);
    const oldEmail = user.email;

    await user.update(req.body, {
      where: { id: userID },
      returning: true,
      fields: ["name", "username", "email"],
    });
    const newEmail = user.email;

    const resMessages = ["Profile updated successfully!"];
    if (oldEmail !== newEmail) {
      await user.update({ verified: false });
      // Create the account verification entry
      const verification = Verification.build({
        UserId: user.id,
      });
      await verification.generateToken();
      await verification.save();

      await sendMail(user.email, "SIGNUP", { user, verification });

      resMessages.push(
        `You need to verify your new email address. A verification link has been sent to ${user.email}, please follow the link to verify the email address.`
      );
    }

    return res.json({ message: resMessages });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
