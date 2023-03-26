const mongoose = require("mongoose")


// Creating UserSchema

const userSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password:{
type:String,
require:true,
  },
  age: {
    type: String,
    require: true,
  },
},{
    versionKey:false,
});

// creating UserModel

const UserModel = mongoose.model("user",userSchema)

module.exports = {
    UserModel
}