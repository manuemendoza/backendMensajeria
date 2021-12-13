const mongoose = require('mongoose');

const UsersSchema = mongoose.Schema({
    name: {
        type:String,
        require:true
    },
    surname:{
        type:String,
        require:true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: true,
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: 'user'
    },
});

module.exports = mongoose.model('User', UsersSchema);