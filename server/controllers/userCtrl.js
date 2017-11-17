const User = require('../models/user');

class UserAPI {
  static getUser(req, res){
    User.find().then((dataUser) => { res.status(200).json(dataUser)})
    .catch((err) => { res.status(404).send(err)})
  }

  static create(req, res){
    var newUser = new User(req.body)
    newUser.save().then((dataUser) => { res.status(200).json({ message: 'User Succesfully Added!', dataUser })})
    .catch((err) => { res.status(404).send(err)})
  }

  static getUserbyId(req, res){
    User.findById(req.params.id).then((dataUser) => { res.status(200).json(dataUser)})
    .catch((err) => { res.status(404).send(err)})
  }

  static getUserbyName(req, res){
    var search_key = req.params.name;
    User.find({username:search_key}).then((dataUser) => { res.status(200).json(dataUser)})
    .catch((err) => { res.status(404).send(err)})
  }

  static update(req, res) {
    User.findById(req.params.id).then((data) => {
      return Object.assign(data, req.body)
    }).then((data) => { return data.save()}).then((updatedUser) => {
      res.json({message: 'Succesfully Updated User', updatedUser})
    }).catch((err) => {
      res.send(err);
    })
  }

  static deleteUser(req, res){
    User.remove({_id : req.params.id})
      .then((result) => {
      res.json({ message: "User successfully deleted!", result });
    })
    .catch((err) => {
      res.send(err)
    })
  }

}

module.exports = UserAPI;
