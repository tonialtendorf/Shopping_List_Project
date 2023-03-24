const router = require("express").Router();
const apiRoutes = require("./api");
const main = require("./main")

router.use("/api", apiRoutes);
router.use("/home", main)

module.exports = router;
