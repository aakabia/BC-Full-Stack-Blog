const router = require("express").Router();
const { User, Blog, Comment } = require("../models");
const withAuth = require('../utils/auth');

router.get("/", async (req, res) => {
  // Above, is a get route used to render a page.
  try {
    let blogData = await Blog.findAll({
      include: [{ model: User, attributes: { exclude: ["password"] } }],
    });
    // Above we get all blog data and get the associated user who created the blog.
    if (!blogData) {
      res.status(400).json({ message: "No data found!" });
      return;
    }
    // Above, checks if any blog data exists.
    const newBlogData = blogData.map((blog) => blog.get({ plain: true }));
    // Above, we map all the blog data and return a plain version in order to use for handlebars.
    const loggedIn = req.session.loggedIn
    res.status(200).render("homepage", {
      newBlogData,
      loggedIn,
    });

    // Above, render is used to transfer the data to handle bars.
  } catch (err) {
    res.status(500).json(err);
  }
});

// Above is a route to display our home page. 



router.get("/signup", async (req, res) => {
  try {
    res.status(200).render("createaccount");
  } catch (err) {
    res.status(500).json(err);
  }
});

// Above, is a route to render our signup page.


router.get("/login", async (req, res) => {
  try {
    res.status(200).render("login");
  } catch (err) {
    res.status(500).json(err);
  }
});




// Above is a route to render our log in page.
module.exports = router;
