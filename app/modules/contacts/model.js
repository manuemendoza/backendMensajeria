const mongoose = require('mongoose');

const ContatsSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    userIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Contact', ContatsSchema);