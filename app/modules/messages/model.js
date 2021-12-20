const mongoose = require('mongoose');

const MessagesSchema = mongoose.Schema({
    message: {
        type: String,
        require: true
    }, 
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true
    },
    chatId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true
    }
},
{
    timestamps:true
});
module.exports = mongoose.model('Messages', MessagesSchema);