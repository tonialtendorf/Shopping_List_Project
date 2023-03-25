const router = require("express").Router();
const apiRoutes = require("./api");
const main = require("./main")
const productRoutes = require('./api/productRoutes')
const userRoutes = require('./api/userRoutes')

router.use("/api", apiRoutes);
router.use('/shopping', productRoutes);
router.use('/user', userRoutes)
router.use("/home", main)

module.exports = router;
