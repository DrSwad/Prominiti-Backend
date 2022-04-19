const { Router } = require("express");
const router = Router();

router.use("/favorite_users", require("./get_all"));
router.use("/favorite_users", require("./post_add"));
router.use("/favorite_users", require("./post_remove"));

module.exports = router;
