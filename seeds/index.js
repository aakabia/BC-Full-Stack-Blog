const sequelize = require('../config/connection');
const seedUserData = require('./user');
const seedBlogData = require('./blog');
const seedCommentData = require('./comment');




// Above, we import sequelize and our create functions from all our files.


const seedDatabase = async () => {
  // Above, we crate a async function that will seed our db 
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');
  // Above , we first call sequlize.sync to establish connecting to our db.
  // Force is equal to true here so we start with a new seeded db everytime we call this during development.
  await seedUserData();
  console.log('\n----- Users SEEDED -----\n');
  // Above, we use our imported create function to actually seed the db.


  await seedBlogData();
  console.log('\n----- Blogs SEEDED -----\n');
  // Above, we use our imported create function to actually seed the db.

  await seedCommentData();
  console.log('\n----- Comments SEEDED -----\n');
  // Above, we use our imported create function to actually seed the db.

  process.exit(0);
  // Above,  we exit and close our db. 
};

seedDatabase();
