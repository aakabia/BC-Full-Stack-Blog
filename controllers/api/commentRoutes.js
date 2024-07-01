const router = require("express").Router();
const { User, Blog, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

router.get("/:id", withAuth, async (req, res) => {
  // Above is a get route used to render the log in page.
  try {
    const commentId = req.params.id;
    const commentData = await Comment.findByPk(commentId, {
      include: [
        { model: Blog },
        {
          model: User,
          attributes: { exclude: ["password"] },
        },
      ],
    });
    // Above, we fetch the blog data.
    if (!commentData) {
      res.status(400).json({ message: "No data found!" });
      return;
    }
    // Above we check that the data exists.
    const newCommentData = commentData.get({ plain: true });
    // Above, we set the user data plain to true

    console.log(newCommentData);

    const loggedIn = req.session.loggedIn;
    // Above we passed in the value to our logged in varaible in sessions.

    res.status(200).render("comment", {
      newCommentData,
      loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});




module.exports = router;
