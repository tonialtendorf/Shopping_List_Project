const router = require("express").Router();
const { product } = require("../models");

// GET all galleries for homepage - requesting for homepage
router.get("/", async (req, res) => {
  try {
    const dbProductData = await product.findAll({
      include: [
        {
          model: Painting,
          attributes: ["filename", "description"],
        },
      ],
    });

    const galleries = dbGalleryData.map((gallery) =>
      gallery.get({ plain: true })
    );
    // TODO: Send over the 'loggedIn' session variable to the 'homepage' template
    res.render("homepage", {
      galleries,
      loggedIn: req.session.logged,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one gallery
router.get("/gallery/:id", async (req, res) => {
  try {
    const dbGalleryData = await Gallery.findByPk(req.params.id, {
      include: [
        {
          model: Painting,
          attributes: [
            "id",
            "title",
            "artist",
            "exhibition_date",
            "filename",
            "description",
          ],
        },
      ],
    });

    const gallery = dbGalleryData.get({ plain: true });
    // TODO: Send over the 'loggedIn' session variable to the 'gallery' template
    res.render("gallery", { gallery });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one painting
router.get("/painting/:id", async (req, res) => {
  try {
    const dbPaintingData = await Painting.findByPk(req.params.id);

    const painting = dbPaintingData.get({ plain: true });
    // TODO: Send over the 'loggedIn' session variable to the 'homepage' template
    res.render("painting", { painting });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
