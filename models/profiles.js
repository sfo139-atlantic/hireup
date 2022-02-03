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
  post: async ({id, email}) => {
    console.log({id, email})
    try {
      const result = await db.profiles.findOneAndUpdate({email}, {$set:{email, id}}, {upsert: true});
      return true
    } catch(e) {
      throw e;
    }
  },
  put: async ({id, email, info}) => { //info should be obj of data that user want to update
    const {firstName, LastName, freelancer, rate, work_history, skills, education, location, portfolio, proposals, profile_pic, timezones} = info
    try {
      const result = await db.profiles.updateOne({email, id},{$set:{
        firstName, lastName, freelancer, rate, work_history, skills, education, location, portfolio, proposals, profile_pic, timezones
      }})
      return true;
    } catch(e) {
      throw e;
    }
  }
}
