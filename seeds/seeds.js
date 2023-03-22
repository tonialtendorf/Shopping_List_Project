//Jessie
const sequelize = require('../config/connection');
const { User, Product } = require('../models');

//maria will create userData.json
// const userData = require('./userData.json');
const productData = require('./products.json');


const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const product of productData) {
    await Product.create({
      ...product,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
