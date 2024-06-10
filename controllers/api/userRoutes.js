const router = require('express').Router();


router.get('/login', async (req, res) => {
  // Above is a get route used to render the log in page. 
    try {
    
  
      res.render('login', { 
      });
    } catch (err) {
      res.status(500).json(err);
    }
});



router.get('/dash', async (req, res) => {
  // Above is a get route used to render the log in page. 
    try {
    
  
      res.render('dashboard', { 
      });
    } catch (err) {
      res.status(500).json(err);
    }
});

router.get('/comment', async (req, res) => {
  // Above is a get route used to render the log in page. 
    try {
    
  
      res.render('comment', { 
      });
    } catch (err) {
      res.status(500).json(err);
    }
});


router.get('/update', async (req, res) => {
  // Above is a get route used to render the log in page. 
    try {
    
  
      res.render('update', { 
      });
    } catch (err) {
      res.status(500).json(err);
    }
});




router.get('/viewone', async (req, res) => {
  // Above is a get route used to render the log in page. 
    try {
    
  
      res.render('viewone', { 
      });
    } catch (err) {
      res.status(500).json(err);
    }
});


















module.exports = router;

// Above, are all my routes to render me to the coresponding handlebars templet.