const mongoose = require('mongoose');

const MessagesSchema = mongoose.Schema({
    text: {
        type: String,
        require: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "User"
    },
    chatId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "Chat"
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Messages', MessagesSchema);