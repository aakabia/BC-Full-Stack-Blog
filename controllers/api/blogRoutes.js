const router = require("express").Router();
const { User, Blog, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

router.get("/:id", withAuth, async (req, res) => {
  // Above is a get route used to render the log in page.
  try {
    const blogId = req.params.id;
    const blogData = await Blog.findByPk(blogId, {
      include: [
        { model: User, attributes: { exclude: ["password"] } },
        {
          model: Comment,
          include: [{ model: User, attributes: { exclude: ["password"] } }],
        },
      ],
    });
    // Above, we fetch the blog data.
    if (!blogData) {
      res.status(400).json({ message: "No data found!" });
      return;
    }
    // Above we check that the data exists.
    const newblogData = blogData.get({ plain: true });
    // Above, we set the user data plain to true

    const loggedIn = req.session.loggedIn;
    // Above we passed in the value to our logged in varaible in sessions.

    res.status(200).render("viewone", {
      newblogData,
      loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/", withAuth, async (req, res) => {
  try {
    res.status(200).render("post", {});
  } catch (err) {
    res.status(500).json(err);
  }
  // Above is our route to get to the post page for a blog
});

router.post("/create", withAuth, async (req, res) => {
  try {
    if (!req.body) {
      res
        .status(400)
        .json({ message: "No data to create blog!" });
      return;
    }

    // Above we check if the req. body exists.

    const user_id = req.session.userId;
    const topic = req.body.topic;
    const description = req.body.description;
    // Above, we get our expected values from the req body 
    const newBlog = await Blog.create({ topic, description, user_id });
    //Above, we create a new blog with the items from the body 

    res.status(200).json({ blog: newBlog, message: "New Blog Created!" });
    // Above is our response to the user once the blog is created.
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
