// Jessie
const User = require('./User');
const Product = require('./Product');

//Need to set up an association
User.hasMany(Product, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
  });
  
  Product.belongsTo(User, {
    foreignKey: 'user_id'
  });

module.exports = { User, Product };
