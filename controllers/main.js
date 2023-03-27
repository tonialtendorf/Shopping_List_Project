const router = require("express").Router();
const { Product } = require("../models");

router.get("/", async (req, res) => {
  res.render("layouts/main");
  //try catch next.
});

router.get("/", async (req, res) => {
  try {
    const dbProductData = await Product.findAll({
      include: [
        {
          model: Product,
          attributes: ["name", "category", "price"],
        },
      ],
    });

    const products = dbProductData.map((product) =>
      product.get({ plain: true })
    );

    res.render("homepage", {
      products,
      loggedIn: req.session.logged,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/product/:id", async (req, res) => {
  try {
    const dbProductData = await Product.findByPk(req.params.id, {
      include: [
        {
          model: Product,
          attributes: ["id", "name", "category", "price"],
        },
      ],
    });

    const product = dbProductData.get({ plain: true });

    res.render("product", { product });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

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
