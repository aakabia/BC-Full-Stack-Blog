const router = require("express").Router();
const { User, Blog, Comment } = require("../../models");
const withAuth = require("../../utils/auth");



router.get("/dash", withAuth, async (req, res) => {
  // Above is a get route used to render the log in page.
  try {
    const userId = req.session.userId;
    let userData = await User.findByPk(userId,{
      attributes: { exclude: ["password"] } ,
      include: [{ model: Blog, include:[{model:User}]} ]
    });
   

    // Above we get the user data .
    if (!userData) {
      res.status(400).json({ message: "No data found!" });
      return;
    }

     // Above, checks if any blog data exists.
    const newuserData = userData.get({ plain: true });
    // Above, we set the user data plain to true 
    
    const loggedIn = req.session.loggedIn

    res.status(200).render("dashboard", {
      newuserData,
      loggedIn,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});









router.get("/comment", async (req, res) => {
  // Above is a get route used to render the log in page.
  try {
    res.render("comment", {});
  } catch (err) {
    res.status(500).json(err);
  }
});









router.get("/update", async (req, res) => {
  // Above is a get route used to render the log in page.
  try {
    res.render("update", {});
  } catch (err) {
    res.status(500).json(err);
  }
});







router.post("/login", async (req, res) => {
  // Above is a get route used to render the log in page.
  try {
    
    const dbUserData = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    // Above we find a user with the same email

    

    if (!dbUserData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password. Please try again!" });
      return;
    }
    // Above, we check if that user exists.

    const validPassword = await dbUserData.checkPassword(req.body.password);
   


    if (!validPassword) {
      console.log("Invalid password");
      res
        .status(400)
        .json({ message: "Incorrect email or password. Please try again!" });
      return;
    }
    // Above, we check if the password matches the user profile in the db.
    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.userId = dbUserData.id;

      res
        .status(200)
        .json({ user: dbUserData, message: "You are now logged in!" });
    });

    // Above, we save log the user in and save to sessions.

    // Above, we check if the password matches the user email
  } catch (err) {
    res.status(500).json(err);
  }
});


























module.exports = router;

// Above, are all my routes to render me to the coresponding handlebars templet.
