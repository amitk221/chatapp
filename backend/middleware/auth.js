const jwt = require("jsonwebtoken");
const Users = require('../Models/user/userModels')
const config = process.env;

const verifyToken = async (req, res, next) => {
  const token =  req.body.token || req.query.token || req.headers["x-access-token"];
    console.log(token , '---')
  if (!token) {
    return res.status(403).jsonp({
      message: "A token is required for authentication",
      data:[]
  })
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    const user = await Users.findOne({
      _id: decoded.user_id 
    })
   // console.log(user)
    req.user = user;
    req.token = token;
  } catch (err) {
    return res.status(401).jsonp({
      message: "Invalid Token",
      data:[]
  })
  }
  return next();
};

module.exports = verifyToken;