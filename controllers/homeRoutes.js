const router = require("express").Router();
const withAuth = require('../utils/auth')
const { Product, User } = require("../models");

//get all products and join with user data
router.get("/", async (req, res) => {
  try {
    const productData = await Product.findAll({
      include: [
      {
        model: User,
        attributes: ['name']
      }
      ],
    });

    const products = productData.map((product) => product.get({ plain: true }));

    res.render('homepage', {
      products,
      logged_in: req.session.logged_in
    });
  } catch (error) {
    res.status(404).json(error);
  }
});



router.get("/product/:id", async (req, res) => {
  try {
    const productData = await Product.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });

    const product = productData.get({ plain: true });

    res.render("product", {
      ...product,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.get("/", async (req, res) => {
//   try {
//     const userData = await User.findAll({
//       include: [
//       {
//         model: User,
//         attributes: ['name']
//       }
//       ],
//     });
//     const users = userData.map((user) => user.get({ plain: true }));
//     console.log(users);
//     res.render("homepage");
//   } catch (error) {
//     res.status(404).json(error);
//   }
// });
router.get("/shoppingList", withAuth, async (req, res) => {  
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Product }],
    });

    const user = userData.get({ plain: true });
    res.render('shopping', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.get("/", async (req, res) => {
//   try {
//     const dbProductData = await Product.findAll({
//       include: [
//         {
//           model: Product,
//           attributes: ["name", "category", "price"],
//         },
//       ],
//   });



// router.get("/", async (req, res) => {
//   try {
//     const dbProductData = await Product.findAll({
//       include: [
//         {
//           model: Product,
//           attributes: ["name", "category", "price"],
//         },
//       ],
//     });

//     const products = dbProductData.map((product) =>
//       product.get({ plain: true })
//     );

//     res.render("homepage", {
//       products,
//       loggedIn: req.session.logged,
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });


// Login route
router.get("/login", (req, res) => {
  // If the user is already logged in, redirect to the homepage
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  // Otherwise, render the 'login' template
  res.render("login");
});

module.exports = router;
