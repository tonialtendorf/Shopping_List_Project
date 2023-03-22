const router = require("express").Router();
const productRoutes = require("./productRoutes");
const userRoutes = require("./userRoutes");
router.use("/product", productRoutes);
router.use("/user", userRoutes);
module.exports = router;
