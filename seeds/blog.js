const { Blog } = require('../models');


const blogData = [ 
    {
        topic:"JavaScript",
        description:"JavaScript is a high-level, versatile programming language commonly used for creating interactive and dynamic web pages. It enables developers to implement complex features such as animations, form validations, and asynchronous content updates within a web browser.",
        user_id:3,
       
    },

    {
        topic:"Java",
        description:"Java is a robust, platform-independent programming language widely used for building enterprise-scale applications, mobile applications, and large systems integration.",
        user_id:5,
       
    },

    {
        topic:"Python",
        description:"Python is a versatile, high-level programming language known for its readability and extensive libraries, making it ideal for web development, data analysis, artificial intelligence, and scientific computing. ",
        user_id:1,
       
    },

  

]


const seedBlogData = () => Blog.bulkCreate(blogData);
// Above is our function to bulkcreate our blog data.

module.exports = seedBlogData;