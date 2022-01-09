const mongoose = require('mongoose');

const ChatsSchema = mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true
    },
    userIds: [{
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref:"User"
    }]
}, {
    timestamps: true
});


module.exports = mongoose.model('Chat', ChatsSchema);