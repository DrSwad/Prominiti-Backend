const { Router } = require("express");
const router = Router();

router.use("/tasks", require("./get_tasks"));
router.use("/task", require("./get_task"));
router.use("/task", require("./post_new"));
router.use("/task", require("./post_update"));
router.use("/task", require("./post_delete"));

module.exports = router;
