const db = require('./mongo.js');
module.exports = {
  getOne: async (users) => {
    console.log(users)
    try {
      const messages = await db.messages.find({users: {$all: Object.values(users)}}).toArray();
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
  },
  create: async (users) => {
    console.log(Object.values(users))
    try {
      const messages = await db.messages.find({users: {$all: Object.values(users)}}).toArray();
      if(messages.length === 0){
        const create = await db.messages.insertOne({users: users, messages: []});
        return create;
      } else {
        return 'Already exists';
      }

    } catch (e) {
      throw e;
    }
  }
}