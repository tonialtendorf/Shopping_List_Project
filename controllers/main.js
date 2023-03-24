const router = require("express").Router();
const { product } = require("../models");

// GET all galleries for homepage - requesting for homepage
router.get("/", async (req, res) => {
  try {
    const dbProductData = await product.findAll({
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
    // TODO: Send over the 'loggedIn' session variable to the 'gallery' template
    res.render("product", { product });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
