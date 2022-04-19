const { Router } = require("express");
const router = Router();

const {
  models: { User },
} = require("../../models");
const { Op } = require("sequelize");

router.get("/search_users", async function (req, res, next) {
  try {
    const search_term = req.query.q;
    const users = await User.findAll({
      attributes: ["id", "username", "name"],
      limit: 10,
      where: {
        [Op.or]: [
          {
            username: {
              [Op.like]: "%" + search_term + "%",
            },
          },
          {
            name: {
              [Op.like]: "%" + search_term + "%",
            },
          },
        ],
      },
    });
    return res.json({
      data: { users },
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
