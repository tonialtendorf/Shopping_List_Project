//Require express module, create router object
const router = require('express').Router();
//Porduct model imported from ../../models directory
const { Product } = require('../../models');
const withAuth = require('../../utils/auth')

//GET route for '/' all product data. findAll retrieves data, sends as JSON response. If error, return 500 status
router.get('/', async (req, res) => {
router.get("/shoppingList", withAuth, async (req, res) => {

  try {
    const productData = await Product.findAll({});
    res.json(productData);

  } catch (err) {res.status(500).json(err)}
})

//POST route for '/' new product data sent in req.body. Creates new product record and sends as JSON response. If error, return 400 status
router.post('/', async (req, res) => {
    res.render("shopping");
  } catch (error) {
    res.status(404).json(error);
  }
});
router.post('/', withAuth, async (req, res) => {
  try {
    const productData = await productData.create(req.body);
    res.status(200).json(productData);
  } catch (err) {
    res.status(400).json(err);
  }
});

//Export router object
module.exports = router;
// router.delete('/:id', async (req, res) => {
//   try {
//     const productData = await Product.destroy({
//       where: {
//         id: req.params.id,
//       },
//     });
//     if (!productData) {
//       res.status(404).json({ message: 'No product found with this id!' });
//       return;
//     }
//     res.status(200).json(productData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });