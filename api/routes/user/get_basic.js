const { Router } = require("express");
const router = Router({ mergeParams: true });

const {
  models: { User },
} = require("../../models");

router.get("/basic", async function (req, res, next) {
  try {
    const username = req.params.user;
    const user = await User.findOne({ where: { username }, raw: true });
    if (!user) throw new Error("Cannot find user");
    delete user.password;
    return res.json({ ...user });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
