const { Router } = require("express");
const router = Router();

const {
  models: { FavoriteUser },
} = require("../../models");
const {
  authenticatedMiddleware,
} = require("../../helpers/authenticatedMiddleware");

router.post("/add", authenticatedMiddleware, async function (req, res, next) {
  try {
    const userID = req.user.id;
    const { user: favoriteUser } = req.body;

    await FavoriteUser.create({
      UserId: userID,
      favoriteId: favoriteUser,
    });

    return res.json({
      message: "User added to favorites successfully!",
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
