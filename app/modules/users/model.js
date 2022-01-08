const mongoose = require('mongoose');

const UsersSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    surname: {
        type: String,
        require: true
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
        required: true,
        trim: true,
    },
    role: {
        type: String,
        required: true,
        default: 'user'
    },
    contacts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    }]

}, {
    timestamps: true
});

module.exports = mongoose.model('User', UsersSchema);