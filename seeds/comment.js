const { Comment } = require('../models');




const commentData = [ 
    {
        
        comment:"As a blogger, JavaScript empowers me to create dynamic and engaging content on my website.",
        blog_id:1,
        user_id:2,
       
    },

    {
        comment:"As a blogger, Java allows me to develop robust backend systems and scalable applications",
        blog_id:2,
        user_id:4,
       
    },




    {
        comment:"Python enables me to leverage its simplicity and extensive libraries for data analysis",
        blog_id:3,
        user_id:4,
       
    },



  

]


const seedCommentData = () => Comment.bulkCreate(commentData);
// Above is our function to bulkcreate our blog data.

module.exports = seedCommentData;