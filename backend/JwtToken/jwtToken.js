const sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken();
  res.status(statusCode)
    .send({
      success: true,
      user,
      token,
      userId : user._id
    });
};

module.exports = sendToken;
