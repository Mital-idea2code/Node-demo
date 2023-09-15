const express = require('express');
const multer = require('multer');
const router = express.Router();
const verifyToken = require("../helper/verifyToken");
const Slider = require('../models/Slider');


const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, "./images/sliders");
    },
    filename: function (req,file,cb){
        const ext = file.originalname.split(".")[file.originalname.split(".").length - 1];
        cb(null,Date.now() + "." + ext);
    }
})
const upload = multer({storage : storage});

//ADD SLIDER
router.post('/add',verifyToken,upload.single('image'),async(req,res) => {
   const slider = new Slider({
    image: req.file.filename
   });

   try{

    const saveSlider = await slider.save();
    res.status(200).json(saveSlider);

   }catch(err){
    res.status(401).json({ message: err.message });
   }
})

//MULTIPLE UPLOAD
router.post('/multipleAdd',verifyToken,upload.any('image'),async(req,res) => {
    try{
    const sliders = [];
    req.files.map(async (image) => {
        sliders.push({ image: image.filename});
      });

      const result = await Slider.insertMany(sliders);
      res.status(200).json({message : 'Inserted Successfully', sliders : sliders });
    }catch(err){
     res.status(401).json({ message: err.message });
    }
 })


module.exports = router;

