const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    title: {
        type: String,
        require : true
    },
    created:{
        type:Date,
        default:Date.now()
    }
})

module.exports = mongoose.model('Post',PostSchema);