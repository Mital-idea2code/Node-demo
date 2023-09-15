const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Admin = require('../models/Admin');
const saltRound = 10;
const jwt = require('jsonwebtoken');
require('dotenv').config();
var cookieParser = require('cookie-parser')

let refreshtokens = [];
//ADD NEW USER
router.post('/register', async(req,res) => {
    try{
        const hash = bcrypt.hashSync(req.body.password, saltRound);

        const admin = new Admin({
            name: req.body.name,
            email: req.body.email,
            password: hash,
        })

        const savedAdmin = await admin.save();
        res.status(200).json(savedAdmin);

    }catch(err){
        res.status(401).json({message: err.message})
    }

})

//Login User
router.post('/login',async(req, res) =>{
    const email = req.body.email;
    const password = req.body.password;

    const admin = await Admin.findOne({email: email}).lean(true);
    if(!admin)
        return res.status(401).json({ msg : "Invalid Username or Password."})

    const match = await bcrypt.compare(password,admin.password);
    if(!match)
        return res.status(401).json({ msg : "Invalid Username or Password"})


    const accessToken = jwt.sign({  admin: admin }, process.env.ACCESS_TOKEN_SECRET,{
        expiresIn: '1m'
    });

    const refreshToken = jwt.sign({  admin: admin }, process.env.REFRESH_TOKEN_SECRET);

    refreshtokens.push(refreshToken);
    res
    .cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'strict' });

    
    res.json({
        accessToken: accessToken,
        refreshToken: refreshToken,
        admin: admin,
        msg : "Login Successfully"
    })


})

router.post('/refresh', (req, res) => {
    const refreshToken = req.cookies['refreshToken'];

    //THIS IS FOR MOBILE APIs

    //const refreshToken = req.body.token;
    // if(refreshToken == null) return res.status(401).send('Access Denied. No refresh token provided.');
    // if(!refreshtokens.includes(refreshToken)) return res.status(403)
    // jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET,(err, admin) => {
    //     if(err) return res.status(403)
    //     const accessToken = jwt.sign({ admin: admin }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1m' });
    //     res.json({
    //         accessToken: accessToken
    //     })
    // })
    
    if (!refreshToken) {
      return res.status(401).send('Access Denied. No refresh token provided.');
    }
  
    try {
      const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
      const accessToken = jwt.sign({ admin: decoded.admin }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30m' });
  
    //   res
    //     .header('Authorization', accessToken)
    //     .send(decoded.admin);

    res.json({
        accessToken: accessToken
    })


    } catch (error) {
      return res.status(400).send('Invalid refresh token.');
    }
  });

module.exports = router;