const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
   name: {
    type: String,
    required: [true, "Name is required"],
    minlength: [2, "Name must be at least 2 characters"],
    maxlength: [50, "Name cannot exceed 50 characters"],
    trim: true
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
    lowercase: true,
    match: [
      /^\w+([\.+-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address"
    ]
  },
  phone: {
    type: Number,
    required: [true, "Phone number is required"],
    validate: {
      validator: function (v) {
        return /^(\d{10})$/.test(v.toString());
      },
      message: "Phone number must be a valid 10-digit number"
    }
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters"]
  },
  photo: {
    data: Buffer,
    contentType: String
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
