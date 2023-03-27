const router = require("express").Router();
const apiRoutes = require("./api");
const main = require("./main");
const productRoutes = require("./api/productRoutes");
const userRoutes = require("./api/userRoutes");

router.use("/api", apiRoutes);
//talk about line 9 and 10 - should be set up in api folder
// router.use('/shopping', productRoutes);
// router.use('/user', userRoutes)
router.use("/", main);

module.exports = router;
