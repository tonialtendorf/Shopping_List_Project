const router = require("express").Router();
const apiRoutes = require("./api");
const homeRoutes = require("./homeRoutes");
// const productRoutes = require("./api/productRoutes");
// const userRoutes = require("./api/userRoutes");

router.use("/api", apiRoutes);

router.use("/", homeRoutes);

module.exports = router;
