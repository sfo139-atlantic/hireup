const model = require('../models/messages.js');
module.exports = {
  getOne:async (req, res) => {
    console.log(req.query)
    const profiles = await model.getOne(req.query.uids);
    res.send(profiles);
  },
  getAll: async (req, res) => {
    const profiles = await model.getAll(req.query.uid);
    res.send(profiles);
  }
}