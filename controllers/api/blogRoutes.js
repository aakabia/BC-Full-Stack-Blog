const router = require("express").Router();
const { User, Blog, Comment } = require("../../models");
const withAuth = require("../../utils/auth");




router.get("/viewone", async (req, res) => {
    // Above is a get route used to render the log in page.
    try {
      res.render("viewone", {});
    } catch (err) {
      res.status(500).json(err);
    }
  });
  














module.exports = router;