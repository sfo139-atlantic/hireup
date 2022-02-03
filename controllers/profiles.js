const model = require('../models/profiles.js');
module.exports = {
  get:async (req, res) => {
    const profiles = await model.get();
    res.send(profiles);
  },

  post: async (req, res) => {
    const {id, email} = req.body;

    model.post({id, email}).then(result => {
      if(result) res.status(201).send()
    })
  },

  put: async (req, res) => {
    const {id, email, info} = req.body;

    model.put({id, email, info}).then(result => {
      if(result) res.status(204).send()
    })
  }
}