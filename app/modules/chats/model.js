const mongoose = require('mongoose');

const ChatsSchema = mongoose.Schema({
    title: {
        type:String,
        require:true
    },
    adminId:{
        type:Number,
        require:true
    },
    userIds:[{
        type:Number,
        require:true
    }]
});

module.exports = mongoose.model('Chat', ChatsSchema);