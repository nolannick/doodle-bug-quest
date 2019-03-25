const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try{
    const decoded = jwt.verify(req.token, process.env.JWT_KEY);
    req.userData = decoded;
    req.body.acct_Id = req.userData.acct_id;
    console.log(req.userData);
  } catch (error) {
    return res.status(401).json({
      message: ' Check Auth failed'
    });
  }
  
  next();
} 