const { User } = require("../models");
const argon2 = require("argon2");
// Above we require the user model.

const UserData = [
  {
    user_name: "aakabia",
    email: "azizkabia26@yahoo.com",
    password: "Sunshine95!",
  },

  {
    user_name: "Rhique",
    email: "Enrique732@gmail.com",
    password: "loveCode%",
  },

  {
    user_name: "Sasha338",
    email: "shedaBOSS@ymail.com",
    password: "BO$$girl@",
  },

  {
    user_name: "MiahSays",
    email: "mariahcultre29@gmail.com",
    password: "mimi2001",
  },

  {
    user_name: "theCoderKid",
    email: "codeNode#",
    password: "Sunshine95!",
  },
];
// Above is the data we will use to seed our user table.

const hashUserPasswords = async (UserData) => {
  try {
    const hashedUserData = await Promise.all(
      UserData.map(async (user) => {
        const hashedPassword = await argon2.hash(user.password);
        return { ...user, password: hashedPassword };
      })
    );

    return hashedUserData; // Optionally return the hashed data if needed
  } catch (error) {
    console.error("Error hashing passwords:", error);
    throw error; // Propagate the error for further handling
  }
};

// Above, we hash all the pw before creating new users. Argon2 does not has individually when using bulk create.
// So we use a function to hash each item password and retunr it back to us using map. 

const seedUserData = async () => {
  try {
    const usersWithHashedPasswords = await hashUserPasswords(UserData);
    await User.bulkCreate(usersWithHashedPasswords);
  } catch (error) {
    console.error("Error seeding users:", error);
    throw error; // Propagate the error for further handling
  }
};
// Above is our function to bulkcreate our user data with our new hashed pw.

module.exports = seedUserData;

// Above, we export our seedUserData function
