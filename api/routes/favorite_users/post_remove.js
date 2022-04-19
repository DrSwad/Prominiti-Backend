const { Router } = require("express");
const router = Router();

const {
  models: { FavoriteUser },
} = require("../../models");
const {
  authenticatedMiddleware,
} = require("../../helpers/authenticatedMiddleware");

router.post(
  "/remove",
  authenticatedMiddleware,
  async function (req, res, next) {
    try {
      const userID = req.user.id;
      const { user: favoriteUser } = req.body;

      await FavoriteUser.destroy({
        where: {
          UserId: userID,
          favoriteId: favoriteUser,
        },
      });

      return res.json({
        message: "User removed from favorites successfully!",
      });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
