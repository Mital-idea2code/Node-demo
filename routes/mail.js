var nodemailer = require('nodemailer');
const express = require('express');
const router = express.Router();
var fs = require('fs');
var handlebars = require('handlebars');
const verifyToken = require("../helper/verifyToken");

router.get('/sendmail',verifyToken, (req, res) => {

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'mitalkachhadiya951@gmail.com',
            pass: 'czxv bqed lzrj spsb'
        }
    });
  
    
    fs.readFile('./emailTemplate.html', {encoding: 'utf-8'}, function (err, html) {
        if (err) {
          console.log(err);
        } else {

            var template = handlebars.compile(html);
            var replacements = {
                username: req.user.name
            };
            var htmlToSend = template(replacements);
            

            var mailOptions = {
                from: 'mitalkachhadiya019@gmail.com',
                to: 'mk.idea2code@gmail.com',
                subject: "Node.js Test Mail",
                attachments: [{
                    // filename: "Receipt.txt",
                    path: './TestFile.txt'
                }],
                html: htmlToSend
            };
            
            transporter.sendMail(mailOptions, function(err,info) {
                if(err){
                    //  console.log(err);
                     res.status(401).json({ Error : err});
                }else{
                    // console.log('Email Sent : ' + info.response);
                    res.status(200).json({ message : "Mail sent successfully"});
                }
            });


        }
    });
    
})


module.exports = router;