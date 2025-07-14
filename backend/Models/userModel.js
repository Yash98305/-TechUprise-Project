const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone : {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  photo :{
    data: Buffer,
    contentType: String,
  }
});
userSchema.pre("save", async function (next){
    if (!this.isModified("password")) {
      next();
    }
    this.password = await bcrypt.hash(this.password, 10);
  });
  
  userSchema.methods.getJWTToken = function(){
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET,{});
  };
  
  userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password);
  };

  module.exports = mongoose.model("User", userSchema);
