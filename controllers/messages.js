const model = require('../models/messages.js');
module.exports = {
  getOne:async (req, res) => {
    console.log(req.query)
    const messages = await model.getOne(req.query.uids);
    res.send(messages);
  },
  getAll: async (req, res) => {
    const messages = await model.getAll(req.query.uid);
    res.send(messages);
  },
  create: async (req, res) => {
    const create = await model.create(req.body.users);
    res.status(201).send('');
  }
}