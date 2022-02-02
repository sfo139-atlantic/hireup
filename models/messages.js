const db = require('./mongo.js');
module.exports = {
  getOne: async (users) => {
    console.log(users)
    try {
      const profiles = await db.messages.find({users: {$all: users}}).toArray();
      console.log(`results: ${profiles}`)
      return profiles;
    } catch (e) {
      throw e;
    }
  },
  getAll: async (user) => {
    try {
      const profiles = await db.messages.find({users: user}).toArray();
      return profiles;
    } catch (e) {
      throw e;
    }
  }
}