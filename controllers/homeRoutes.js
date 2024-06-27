const router = require("express").Router();
const { User, Blog, Comment } = require("../models");

router.get("/", async (req, res) => {
  // Above, is a get route used to render a page.
  try {
    let userData = await User.findAll({
      attributes: { exclude: ['password'] }, 
      include: [
        {
          model: Blog, include:[{model:Comment}]
        },
      ],
    });

    res.status(200).json(userData);

    /*render('homepage', { 
      });*/
    // Above, render is used to transfer the data to handle bars.
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  // Above, is a get route used to render a page.
  try {
    let userData = await User.create(req.body);

    res.status(200).json(userData);

    /*render('homepage', { 
      });*/
    // Above, render is used to transfer the data to handle bars.
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
