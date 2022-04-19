const { env } = require("../../config");
const orderedFiles = ["user", "task", "favorite_users"];

async function generateSeeds() {
  if (env !== "production") {
    for (file of orderedFiles) {
      await require(`./${file}`).run();
    }
    // eslint-disable-next-line no-console
    console.log("Seeds generated for sequelize models");
  }
}

module.exports = generateSeeds;
