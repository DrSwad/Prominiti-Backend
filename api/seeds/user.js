const fs = require("fs/promises"); // To copy default profile picture
const path = require("path"); // To locate profile pictures
const { root } = require("../../config");

const {
  models: { User, Location },
} = require("../models");

module.exports = {
  run: async () => {
    let users = await User.findAll();
    if (users.length === 0) {
      users = [
        {
          id: "75e851c1-acc6-46ea-969a-f28829a1de44",
          name: "Nayeemul Islam Swad",
          username: "DrSwad",
          email: "drswad2013@gmail.com",
          password: "asdfer",
          verified: true,
        },
        {
          id: "a3d368f7-95a0-4f5e-954a-1102a39beddc",
          name: "Farhan Mahmud",
          username: "farhan",
          email: "mahmud.farhan1903@gmail.com",
          password: "qweras",
          verified: true,
        },
      ];

      await User.bulkCreate(users);

      await Promise.all(
        users.map(async (user) => {
          // Create location entry
          await Location.create({
            UserId: user.id,
            // longitude: null,
            // latitude: null,
            longitude: 151.2094,
            latitude: 33.865,
          });

          // Copy default profile picture
          const defaultPicturePath = path.normalize(
            path.join(root, "assets", "avatar", "$default.png")
          );
          const userPicturePath = path.normalize(
            path.join(root, "assets", "avatar", `${user.id}.png`)
          );

          return fs
            .stat(userPicturePath)
            .catch(
              async () => await fs.copyFile(defaultPicturePath, userPicturePath)
            );
        })
      );
    }
  },
};
