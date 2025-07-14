const catchAsyncError = require("../Middlewares/catchAsyncError");
const ErrorHandler = require("../Utils/errorHandler");
const User = require("../Models/userModel.js");
const sendToken = require("../JwtToken/jwtToken.js");
const fs = require("fs");

exports.register = catchAsyncError(async (req, res, next) => {
  const { name, email, password,phone } = req.body;
  if (!name || !email || !password || !phone) {
    return next(new ErrorHandler("Please Enter Required Field", 400));
  }
  const userExists = await User.findOne({ email: email }).select("+password");
  if (userExists) {
    return next(new ErrorHandler("Email is already exist", 400));
  }

  const registration = new User({ name, email, password,phone });
  const user = await registration.save();
  sendToken(user, 200, res);
});

exports.login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("Please Enter Required Field", 400));
  }
  const user = await User.findOne({ email: email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Email is not exist, please register", 400));
  }
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 400));
  }
  sendToken(user, 200, res);
});

exports.profile = catchAsyncError(async (req, res, next) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
})

exports.photo = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user.photo.data) return next(new ErrorHandler("User photo not found", 404));
  if (user.photo.data) {
    res.set("Content-type", user.photo.contentType);
    return res.status(200).send(user.photo.data);
  }
})

exports.updateProfile = catchAsyncError(async (req, res, next) => {
  const { photo } = req.files;
  if(photo && photo.size > 1000000)
    return next(new ErrorHandler("Photo should be less then 1mb",500));
  const user = await User.findByIdAndUpdate(
    req.user._id,
    { ...req.fields},
    { new: true,
      runValidators: true,
      useFindAndModify: false, }
  );
  if (photo) {
    user.photo.data = fs.readFileSync(photo.path);
    user.photo.contentType = photo.type;
  }
  await user.save();
  res.status(200).json({
    success: true,
    user
  });
});