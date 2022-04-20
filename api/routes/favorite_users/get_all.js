const { Router } = require("express");
const router = Router();

const {
  models: { FavoriteUser, User },
} = require("../../models");
const {
  authenticatedMiddleware,
} = require("../../helpers/authenticatedMiddleware");

router.get("/", authenticatedMiddleware, async function (req, res, next) {
  try {
    const userID = req.user.id;
    const favoriteUsers = await Promise.all(
      (
        await FavoriteUser.findAll({
          attributes: ["favoriteId"],
          where: {
            UserId: userID,
          },
        })
      ).map(({ favoriteId }) =>
        User.findByPk(favoriteId).then((user) => user.username)
      )
    );
    return res.json({
      data: { favoriteUsers },
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
