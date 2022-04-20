const fs = require("fs");
const { Sequelize } = require("sequelize");
const { db, env } = require("../../config");
const sequelize = new Sequelize(db, {
  logging: false,
});

fs.readdirSync(__dirname)
  .filter((file) => file.indexOf(".") !== 0 && file !== "index.js")
  .forEach((file) => require(`./${file}`)(sequelize));

// Model Associations
const { ResetPassword, User, Verification, Task, Location } = sequelize.models;

function initHasOneRelationship(OwnerTable, OwnedTable, foreignKey) {
  OwnerTable.hasOne(OwnedTable);
  OwnedTable.belongsTo(OwnerTable, {
    foreignKey: {
      name: foreignKey,
      allowNull: false,
    },
  });
}

function initHasManyRelationship(
  OwnerTable,
  OwnedTable,
  foreignKey,
  ownerAs,
  ownedAs,
  primaryKey = false,
  allowNull = false
) {
  OwnerTable.hasMany(OwnedTable, { ...(ownedAs ? { as: ownedAs } : {}) });
  OwnedTable.belongsTo(OwnerTable, {
    foreignKey: {
      name: foreignKey,
      allowNull,
      primaryKey,
    },
    ...(ownerAs ? { as: ownerAs } : {}),
  });
}

function initBelongsToManyRelationship(OwnerTable, OwnedTable, through, as) {
  if (OwnerTable !== OwnedTable) {
    OwnerTable.belongsToMany(OwnedTable, { through });
  }
  OwnedTable.belongsToMany(OwnerTable, { through, ...(as ? { as } : {}) });
}

// TODO: Check if a reset password request already exists before inserting
// User <- ResetPassword
initHasOneRelationship(User, ResetPassword, "UserId");

// User <- Verification
initHasOneRelationship(User, Verification, "UserId");

// User <= Task
initHasManyRelationship(User, Task, "UserId");

// User == User
initBelongsToManyRelationship(User, User, "FavoriteUser", "favorites");

// User <= Location
initHasOneRelationship(User, Location, "UserId");

if (env !== "production") {
  (async () => {
    await sequelize.query(
      "CREATE EXTENSION IF NOT EXISTS citext WITH SCHEMA public;"
    );
    await sequelize.sync({ force: true });
    // eslint-disable-next-line no-console
    console.log("Database synced by sequelize models");

    // Generate seed data for models
    await require("../seeds")();

    // To schedule reminders for time-based tasks
    const TaskScheduler = require("../helpers/TaskScheduler");
    // Schedule reminders for future time-based tasks
    TaskScheduler.init();
  })();
}

module.exports = sequelize;
