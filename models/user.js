const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const argon2 = require('argon2');

// Above, are our requried impots for this model
// We use argon 2 instead of bycrypt 


class User extends Model {

  checkPassword(loginPw) {
    return argon2.verify(this.password, loginPw);
  }
  // Above is a function we will use in our routes to verify the user password given matches the password stored in the db.
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    
    user_name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },

   // Above, we ask for a username that is unique.

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
        // Above, Password has a min length of 8
      },
    },
  },
  {
    hooks: {
      beforeCreate: async (user) => {
        console.log('Hashing password before creating user');
        user.password = await argon2.hash(user.password);
        return user;
      },
      beforeUpdate: async (user) => {
        if (user.changed("password")) {
          user.password = await argon2.hash(user.password);
          return user;
        }
      },
    },
    // Above, are hooks used to hash the pw before creating or updating.
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "user",

    // Above, is our instance of sequalize to form the connection and creation of the table.
  }
);

module.exports = User;

// Above, we export the user model
