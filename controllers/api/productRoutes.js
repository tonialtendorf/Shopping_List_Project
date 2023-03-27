const router = require('express').Router();
const { Product } = require('../../models');
const withAuth = require('../../utils/auth')

router.get("/shoppingList", withAuth, async (req, res) => {
  try {
    const productData = await Product.findAll({});
    res.json(productData);
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