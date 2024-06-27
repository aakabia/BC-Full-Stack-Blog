const User = require("./user");
const Blog = require("./blog");
const Comment = require("./comment");

Blog.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

// Blog belongs to User relation

User.hasMany(Blog, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});
// user  have many blog posts relation


User.hasMany(Comment, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

// user has many comments

Comment.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

// ecah comment belongs to one user.


Blog.hasMany(Comment, {
  foreignKey: "blog_id",
  onDelete: "CASCADE",
});

// blog has many comments 

Comment.belongsTo(Blog, {
  foreignKey: "blog_id",
  onDelete: "CASCADE",
});


// each comment belongs to a blog.









module.exports = { User, Blog, Comment };
