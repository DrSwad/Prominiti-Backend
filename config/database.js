import * as Promise from "bluebird";
import * as mysqlLib from "mysql";
// import * as redisLib from "redis";

const config = {
  connection: {
    host: "localhost",
    user: "root",
    password: "",
  },
  database: "prominiti",
  course_wishlist: "course_wishlist",
  events: "event",
  fcm_token: "fcm_token",
  forgotpwd: "forgotpwd",
  level: "level",
  notifications: "notification",
  sub_category: "sub-category",
  subject: "subject",
  unverified: "unverified",
  users: "user",
  user_courses: "user_course",
  user_followers: "user_follower",
};

const mysql = Promise.promisifyAll(
  mysqlLib.createConnection(config.connection)
);
mysql.query(`USE ${config.database}`);
console.log("Connected to MySQL successfully!");

const redis = Promise.promisifyAll(redisLib).createClient();
redis.on("connect", async () => {
  console.log("Connected to Redis successfully!");
});

export { config, mysql, redis };
