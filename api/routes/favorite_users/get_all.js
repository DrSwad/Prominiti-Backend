const { Router } = require("express");
const router = Router();

const {
  models: { FavoriteUser },
} = require("../../models");
const {
  authenticatedMiddleware,
} = require("../../helpers/authenticatedMiddleware");

router.get("/", authenticatedMiddleware, async function (req, res, next) {
  try {
    const userID = req.user.id;
    const favoriteUsers = (
      await FavoriteUser.findAll({
        attributes: ["favoriteId"],
        where: {
          UserId: userID,
        },
      })
    ).map((row) => row.favoriteId);
    return res.json({
      data: { favoriteUsers },
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
