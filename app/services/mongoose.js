require('dotenv').config();

const mongoose  = require('mongoose');

module.exports = async() => {
    await mongoose.connect(process.env.DB_HOST,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })

};