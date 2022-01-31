const model = require('../models/profiles.js');
module.exports = {
  get:async (req, res) => {
    const profiles = await model.get();
    res.send(profiles);
  },
  getOne: async (req, res) => {
    const profiles = await model.getOne(req.query.uid);
    res.send(profiles[0]);
  }
}