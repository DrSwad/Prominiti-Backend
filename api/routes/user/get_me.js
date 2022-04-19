const { Router } = require("express");
const router = Router();

const {
  models: { User },
} = require("../../models");
const {
  authenticatedMiddleware,
} = require("../../helpers/authenticatedMiddleware");

router.get("/", authenticatedMiddleware, async function (req, res, next) {
  try {
    const userID = req.user.id;
    const user = await User.findByPk(userID, { raw: true });
    if (!user) throw new Error("Cannot find user");
    delete user.password;
    return res.json({ ...user });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
