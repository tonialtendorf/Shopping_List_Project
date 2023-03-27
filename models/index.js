// Jessie
const User = require('./User');
const Product = require('./Product');

//Need to set up an association
router.use('/product', productRoutes);

module.exports = { User, Product };