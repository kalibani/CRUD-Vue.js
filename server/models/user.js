const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
  username:{
    type: String
  },
  password:{
    type: String
  },
  fullname:{
    type: String
  },
  city:{
    type: String
  },
  status:{
    type: String
  }
})

module.exports = mongoose.model('Article', userSchema);
