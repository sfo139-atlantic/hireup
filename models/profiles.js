const db = require('./mongo.js');
module.exports = {
  get: async () => {
    try {
      const profiles = await db.profiles.find().toArray();
      return profiles;
    } catch (e) {
      throw e;
    }
  },
  getOne: async (uid) => {
    try {
      const profiles = await db.profiles.find({_id: uid}).toArray();
      return profiles;
    } catch (e) {
      throw e;
    }
  }
}