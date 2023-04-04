let jwt = require("jsonwebtoken");
const user = require('../models/User');
exports.verifyToken = async (req, res, next) => {
  let token = req.headers["x-access-token"] || req.headers["authorization"]; // Express headers are auto converted to lowercase
  if (token) {
    if (token.startsWith("Bearer ")) {
      // Remove Bearer from string
      token = token.slice(7, token.length);
    }
    if (token) {
      // console.log('token', token)
      let JWT_SECRET = "bfnvjfcsdkbsdkjcv";
      jwt.verify(
        token,
        process.env.JWT_SECRET || JWT_SECRET,
        async (err, decoded) => {
          if (err) {
            return res.json({
              status: 401,
              message: "You need to be logged in to access this route",
            });
          } else {
            let email = decoded.id;
            const userData = await user.findOne({
              email: email
            });
            if (token != userData.accessToken) {
              return res.json({
                status: 401,
                message: "You need to be logged in to access this route",
              });
            }
            next();
          }
        }
      );
    } else {
      return res.json({
        status: 401,
        message: "Auth token is not supplied",
      });
    }
  } else {
    return res.json({
      status: 401,
      message: "Auth token is not supplied",
    });
  }
};



