const router = require('express').Router();



router.get('/', async (req, res) => {

  // Above, is a get route used to render a page.
    try {
      
  
      res.render('homepage', { 
      });
      // Above, render is used to transfer the data to handle bars.
    } catch (err) {
      res.status(500).json(err);
    }
});

























module.exports = router;