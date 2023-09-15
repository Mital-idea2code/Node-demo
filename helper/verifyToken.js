const jwt = require("jsonwebtoken")
require('dotenv').config();

module.exports = function (req, res, next){

  const bearerHeader = req.headers["authorization"];
  // const refreshToken = req.cookies['refreshToken'];

  if(bearerHeader){
    const bearer = bearerHeader.split(" ");
    const token = bearer[1];
    if(!token) return res.status(401).json({ error : "AuthToken Missing"});
    try{

      const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      req.user = verified.admin;
      next();

    }catch(err){

      // if (!refreshToken) {
      //   return res.status(401).send('Access Denied. No refresh token provided.');
      // }

      // try {
      //   const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
      //   const accessToken = jwt.sign({ admin: decoded.admin }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30s' });
  
      //   res
      //     .cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'strict' })
      //     .header('Authorization', accessToken)
      //     .send(decoded.admin);
      // } catch (error) {
      //   return res.status(400).send('Invalid Token.');
      // }

      
      res.status(400).json({ error: "Invalid Token" });
    }

  }else{
    // Forbidden
    res.sendStatus(403).json({ error: "AuthToken missing" });
  }
}
