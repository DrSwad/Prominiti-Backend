const {
  models: { FavoriteUser },
} = require("../models");

module.exports = {
  run: async () => {
    let favoriteUsers = await FavoriteUser.findAll();
    if (favoriteUsers.length === 0) {
      favoriteUsers = [
        {
          UserId: "75e851c1-acc6-46ea-969a-f28829a1de44",
          favoriteId: "a3d368f7-95a0-4f5e-954a-1102a39beddc",
        },
      ];

      await FavoriteUser.bulkCreate(favoriteUsers);
    }
  },
};
