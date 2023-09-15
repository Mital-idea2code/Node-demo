const mongoose = require('mongoose');

const AdminSchema = mongoose.Schema({
    name: {
        type: String,
        required:  [true, "Name is required."],
        
    },
    email: {
        type: String,
        unique:  [true, "Email already exist"],
        required:  [true, "Email is required."]
    },
    password: { 
        type: String,
        required:  [true, "Password is required."]
    },
    created:{
        type:Date,
        default:Date.now()
    }
})

module.exports = mongoose.model('Admin', AdminSchema);