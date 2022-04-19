const { host } = require("./site");

module.exports = {
  transporterConfig: {
    development: {
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "268d479fa6d8c4",
        pass: "d780e2109f74aa",
      },
    },
  },
  templates: {
    SIGNUP({ user, verification }) {
      const verificationURL = `${host}/verify/${user.id}/${verification.token}`;
      return {
        subject: "Verify your email for Prominiti",
        html:
          `<p>Hello ${user.name},</p>` +
          "<p>Follow this link to verify your email address." +
          "<br/>" +
          `<a href="${verificationURL}">${verificationURL}</a>` +
          "</p>" +
          "<p>If you didn’t ask to verify this address, you can ignore this email.</p>" +
          "<p>Thanks," +
          "<br/>" +
          "Prominiti team</p>",
      };
    },
    VERIFICATION({ user }) {
      const loginURL = `${host}/login`;
      return {
        subject: "Verification successful for Prominiti",
        html:
          `<p>Hello ${user.name},</p>` +
          "<p>Your email has been successfully verified. Follow this link to login using this email:" +
          "<br/>" +
          `<a href="${loginURL}">${loginURL}</a>` +
          "</p>" +
          "<p>If you didn’t ask to verify this address, you can ignore this email.</p>" +
          "<p>Thanks," +
          "<br/>" +
          "Prominiti team</p>",
      };
    },
    FORGOT_PASSWORD({ user, resetPassword }) {
      const resetURL = `${host}/reset-password/${user.id}/${resetPassword.token}`;
      return {
        subject: "Reset your password for Prominiti",
        html:
          `<p>Hello ${user.name},</p>` +
          "<p>Follow this link to reset your Prominiti account password associated with this email address." +
          "<br/>" +
          `<a href="${resetURL}">${resetURL}</a>` +
          "</p>" +
          "<p>If you didn’t ask to reset your password, you can ignore this email.</p>" +
          "<p>Thanks," +
          "<br/>" +
          "Prominiti team</p>",
      };
    },
    RESET_PASSWORD({ user }) {
      const loginURL = `${host}/login`;
      return {
        subject: "Password reset successful for Prominiti",
        html:
          `<p>Hello ${user.name},</p>` +
          "<p>Your password has been reset successfully. Follow this link to login using the new credentials:" +
          "<br/>" +
          `<a href="${loginURL}">${loginURL}</a>` +
          "</p>" +
          "<p>If you didn’t ask to reset your password, you can ignore this email.</p>" +
          "<p>Thanks," +
          "<br/>" +
          "Prominiti team</p>",
      };
    },
  },
};
