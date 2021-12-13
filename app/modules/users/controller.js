const User = require('./model');
const brcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const createUser = async(req, res) =>{
    if (!req.body.password) {
        res.status(400).json({messege:'password is required'});
    } else {
        let data = req.body;
        const user = new User(data);
        const salt = brcrypt.genSaltSync(9);
        const hash = brcrypt.hashSync(data.password, salt);
        user.password = hash ;
        try {
            await user.save()
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({messege: error.messege});
        }
    }
};

module.exports = {
    createUser
};