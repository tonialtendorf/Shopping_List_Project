//Require express module, create router object
const router = require("express").Router();
//Product model imported from ../../models directory
const { Product } = require("../../models");
const withAuth = require("../../utils/auth");

//POST routes
router.post("/", withAuth, async (req, res) => {
  try {
    const newProduct = await Product.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    console.log(req.session.user_id);
    res.status(200).json(newProduct);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/shoppingList", withAuth, async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    console.log(newProduct);
    res.status(201).json(newProduct);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Failed to create product" });
  }
});

//PUT routes
router.put("/shoppingList/:id", withAuth, async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    product.name = req.body.name;
    product.price = req.body.price;
    product.description = req.body.description;
    product.save();

    res.status(200).redirect("/shoppingList");
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE routes
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const productData = await Product.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    if (!productData) {
      res.status(404).json({ message: "No product found with this id!" });
      return;
    }
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Export router object
module.exports = router;

//GET route for '/' all product data. findAll retrieves data, sends as JSON response. If error, return 500 status
//this needs to move to homeRoutes
// router.get("/shoppingList", withAuth, async (req, res) => {

//   try {
//     const productData = await Product.findAll({});
//     res.json(productData);

//   } catch (err) {res.status(500).json(err)}
// });

//POST route for '/' new product data sent in req.body. Creates new product record and sends as JSON response. If error, return 400 status
// router.post('/', withAuth, async (req, res) => {
//   try {
//     const productData = await productData.create(req.body);
//     res.status(200).json(productData);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });
