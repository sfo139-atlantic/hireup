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
  post: async ({_id, email}) => {
    try {
      const result = await db.profiles.findOneAndUpdate({_id: id, email}, {$set:{_id: id, email,}}, {upsert: true});
      return true
    } catch(e) {
      throw e;
    }
  },
  put: async ({id, info}) => {
    const {firstName, lastName, freelancer, rate, work_history, skills, education, location, portfolio, proposals, profile_pic, timezones} = info;
    try {
      const result = await db.profiles.updateOne({_id: id},{$set:{
        firstName, lastName, freelancer, rate:Number(Number(rate).toFixed(2)), work_history, skills, education, location, portfolio, proposals, profile_pic, timezones
      }})
      return true;
    } catch(e) {
      throw e;
    }
  },
  delete: async (id) => {
    try{
      const result = await db.profiles.deleteOne({_id: id});
      return true;
    } catch (e) {
      throw e;
    }
  }
}
