const router = require('express').Router();
const homeRoutes = require('./homeRoutes');
const apiRoutes = require('./api');

// Above, I import the router and both the home routes file and api routes folder.

router.use('/', homeRoutes);
router.use('/api', apiRoutes);

// Above are the routes i am using for the hompage and all files in the api folder.



module.exports = router;

// ABove I export this main router to server.js 