const { DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = (sequelize) => {
  const User = sequelize.define("User", {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [3, 254],
          msg: "Full name must be at least 3 and at most 254 characters long.",
        },
      },
    },
    username: {
      type: DataTypes.CITEXT,
      allowNull: false,
      unique: {
        msg: "This username is already taken.",
      },
      validate: {
        len: {
          args: [3, 40],
          msg: "Username must be at least 3 and at most 40 characters long.",
        },
        is: {
          args: /^[A-Za-z][A-Za-z0-9_]+$/i, // must start with letter and only have letters, numbers, underscores
          msg: "Username must start with a letter and contain no spaces. The only allowed characters are the alphanumeric ones(A-Z, a-z, 0-9) and the underscore(_).",
        },
      },
    },
    email: {
      type: DataTypes.CITEXT,
      allowNull: false,
      unique: {
        msg: "Oops. Looks like you already have an account with this email address. Please try to login.",
      },
      validate: {
        isEmail: {
          args: true,
          msg: "The email you entered is invalid or is already in our system.",
        },
        max: {
          args: 254,
          msg: "The email you entered is invalid or longer than 254 characters.",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(val) {
        const hashedPassword = bcrypt.hashSync(val, 10);
        return this.setDataValue("password", hashedPassword);
      },
    },
    verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  });

  User.prototype.isValidPassword = async function (password) {
    return await new Promise((resolve, reject) => {
      bcrypt.compare(password, this.password, function (error, isMatch) {
        if (error) {
          reject(error);
        }
        resolve(isMatch);
      });
    });
  };
};
