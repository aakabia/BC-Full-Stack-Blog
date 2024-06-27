const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");


class Blog extends Model {}

Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
   
    topic: {
      type: DataTypes.STRING,
      allowNull: false,
      //this will hold job title and if remote or in person.
    },
  
   
    description: {
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
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "blog",
  }
);

module.exports = Blog;