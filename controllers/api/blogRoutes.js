const router = require("express").Router();
const { User, Blog, Comment } = require("../../models");
const withAuth = require("../../utils/auth");
const equal = require("../../utils/equal");


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
    const userId = req.session.userId
    const loggedIn = req.session.loggedIn;
    // Above we passed in the value to our logged in varaible in sessions.

    res.status(200).render("viewone", {
      newblogData,
      loggedIn,
      userId,
      
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/update/:id", withAuth, async (req, res) => {
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

    res.render("update", {
      newblogData,
      loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/", withAuth, async (req, res) => {
  try {
    const loggedIn = req.session.loggedIn;
    res.status(200).render("post", { loggedIn });
  } catch (err) {
    res.status(500).json(err);
  }
  // Above is our route to get to the post page for a blog
  // note, we still pass our logged in for sessions to handlebars.
});

router.post("/create", withAuth, async (req, res) => {
  try {
    if (!req.body) {
      res.status(400).json({ message: "No data to create blog!" });
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

router.put("/update", withAuth, async (req, res) => {
  try {
    if (!req.body) {
      res.status(400).json({ message: "No data to update blog!" });
      return;
    }

    const { topic, description } = req.body;

    const blogId = req.body.blogId;
    // Above, we check if the entries exist in the req body

    if (!blogId) {
      return res.status(400).json({ message: "Blog ID is required" });
    }
    // ABove we check if the blog id is in the body

    const blog = await Blog.findByPk(blogId);

    //Above, we find a blog by its id
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    await blog.update({
      topic,
      description,
    });
    // Above we update any entry avalable.
    res.status(200).json({ message: "Blog updated successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


router.delete("/delete", withAuth, async (req, res) => {
  try {
  
    if (!req.body.blogIDInt) {
      res.status(400).json({ message: "No data found" });
      return;
    }
  
    const blogId = req.body.blogIDInt
    const user_id = req.session.userId;
    

   // Above, we get our values from the body
   // We parse int the blog id as well.
  



    
      const deleteBlog = await Blog.destroy({
        where: {
          id: blogId,
          user_id: user_id,
        },
      });


    if (deleteBlog === 0) {
      // No rows were deleted (likely due to permission issue)
      return res.status(403).json({ message: "Unauthorized to delete this blog." });
    }




      // Above, we delete  blog with all above entries.
    res.status(200).json({ message: "Deleted successfully!"})

    

    // Above, we redirect back to user dash!
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});



module.exports = router;
