const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");


class Comment extends Model {}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
   
   
    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
      //this describes the  expectations for position.
      // text data types are used for longer string values.
    },
    
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "user",
        key: "id",
      },
    },

    blog_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "blog",
          key: "id",
        },
    },
  



  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "comment",
  }
);

module.exports = Comment;