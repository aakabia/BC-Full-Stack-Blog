const { User } = require('../models');

// Above we require the user model.

const UserData = [ 
    {
        user_name:"aakabia",
        email:"azizkabia26@yahoo.com",
        password:"Sunshine95!",
       
    },

    {
        user_name:"Rhique",
        email:"Enrique732@gmail.com",
        password:"loveCode%",
       
    },


    {
        user_name:"Sasha338",
        email:"shedaBOSS@ymail.com",
        password:"BO$$girl@",
       
    },

    {
        user_name:"MiahSays",
        email:"mariahcultre29@gmail.com",
        password:"mimi2001",
       
    },


    {
        user_name:"theCoderKid",
        email:"codeNode#",
        password:"Sunshine95!",
       
    },


]
// Above is the data we will use to seed our user table.




const seedUserData = () => User.bulkCreate(UserData);
// Above is our function to bulkcreate our user data.

module.exports = seedUserData;

// Above, we export our seedUserData function 