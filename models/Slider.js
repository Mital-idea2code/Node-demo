const mongoose = require('mongoose');

const SliderSchema = mongoose.Schema({
    image:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Slider',SliderSchema);