const db = require('./mongo.js');
module.exports = {
  getOne: async (users) => {
    console.log(users)
    try {
      const messages = await db.messages.find({users: {$all: users}}).toArray();
      console.log(`results: ${messages}`)
      return messages;
    } catch (e) {
      throw e;
    }
  },
  getAll: async (user) => {
    try {
      const messages = await db.messages.find({users: user}).toArray();
      return messages;
    } catch (e) {
      throw e;
    }
  }
}