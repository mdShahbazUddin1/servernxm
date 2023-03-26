const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    let verify = jwt.verify(token, "superman");
    if (verify) {
       req.body.userID = verify.userID;
      next()
    }else{
       res.status(400).send({ "msg": "Login Failed" });
    }
  }else{
    res.status(400).send({"msg":"Login Failed"})
  }
};

module.exports = {
  auth
};
