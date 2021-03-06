const User = require('./model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const createUser = async(req, res) => {
    if (!req.body.password) {
        res.status(400).json({message:'password is required'});
    } else {
        let data = req.body;
        const user = new User(data);
        const salt = bcrypt.genSaltSync(9);
        const hash = bcrypt.hashSync(data.password, salt);
        user.password = hash ;
        user.contacts = [];
        try {
            await user.save();
            const userData ={
                id: user._id,
                name: user.name, 
                surname: user.surname,
                username: user.username,
                email: user.email,
                contacts: user.contacts
            };
            res.status(200).json(userData);
        } catch (error) {
            console.error(error);
            if (error._message == 'User validation failed' || error.code == 11000) {
                res.status(400).json({message: error.message, code: error.code})
            } else {
                res.status(500).json({message: error.message});
            }
        }
    }
};

const createContact = async(req, res) => {
    const userId = req.params.id; 
    const contact =req.body.userId;
    try {
        const user =  await User.findById(userId);
        const newContact = await User.findById(contact);
        if (newContact && user) {
            let dataContact = newContact._id;
            let userExists = user.contacts.includes(dataContact);
            if (!userExists) {
                user.contacts.push(dataContact);
                await user.save();
                res.status(200).json({message:"contact added"});
            } else {
                res.status(400).json({message:'contact exists'});
            }
        } else {
            res.status(400).json({message:'user not found'});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({message: error.message});
    }
};


const getFoundUsers = async(req, res) => {
    try {
        const users = await User.find({email: req.query.email}).select({
            'name': 1,
            'surname': 1,
            'username': 1,
            'email': 1
        });
        res.status(200).json(users); 
    } catch (error) { 
        console.error(error);
        res.status(500).json({message:error.message});
    }
};

//Este codigo se ha dejado preparado por si en un futuro se implementa el role de admin
const getUsers = async(req, res) => {
    try {
        if (req.query.name) {
            const users = await User.find({ name: { $regex: new RegExp(req.query.name, 'i') } });
            res.status(200).json({user:users});
        } else {
            res.status(200).json( await User.find());
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({message:error.message});
    }
};

const getUser = async(req, res) => {
    try {
        const user = await User.findById(req.params.id).populate('contacts',{
            name: 1,
            surname: 1,
            username: 1,
            email: 1
        });
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({message: 'user not found'});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({message: error.message});
    }
};

const loginUser = async(req, res) => {
    if (!req.body.email || !req.body.password) {
        res.status(400).json({message: 'invalid user or password'});
    } else {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            res.status(400).json({message: 'invalid user or password'});
        } else {
            try {
                const validated = bcrypt.compareSync(req.body.password, user.password);
                const userData ={
                    id: user._id,
                    name: user.name, 
                    surname: user.surname,
                    username: user.username,
                    email: user.email,
                    contacts: user.contacts
                };
                if (validated) {
                    const token = jwt.sign({
                        id: user._id,
                        role: user.role
                    }, process.env.PRIVATE_KEY, {
                        expiresIn: '24h'
                    });
                    res.status(200).json({token, userData});
                } else {
                    res.status(400).json({message: "invalid user or password"});
                }
            } catch (error) {
                console.error(error);
                res.status(500).json({message: error.message});
            }
        }
    }
};

const updateUser = async(req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            let data = req.body;
            if (req.body.password) {
                const salt = bcrypt.genSaltSync(15);
                const hash = bcrypt.hashSync(req.body.password, salt);
                data.password = hash;
            };
            const userData = await User.findByIdAndUpdate(req.params.id, data, { new: true });
            const updateData ={
                id: userData._id,
                name: userData.name, 
                surname: userData.surname,
                username: userData.username,
                email: userData.email,
                contacts: userData.contacts
            };
            res.status(200).json(updateData);
        } else {
            res.status(404).json({message: 'user not found'});
        }
    } catch (error) {
        console.error(error);
        if (error._message == 'User validation failed' || error.code == 11000) {
            res.status(400).json({menssage: error.message});
        } else {
            res.status(500).json({message: error.message});
        }
    }
};

const deleteUser = async(req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            const userDelete = await User.findByIdAndDelete(req.params.id);
            res.status(200).json({message: 'user deleted'});
        } else {
            res.status(404).json({message: 'user not found'});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({message: error.message});
    }
};

const deleteContact = async(req, res) => {
    const userId = req.params.id; 
    const contact =req.params.contactId;
    try {
        const user =  await User.findById(userId);
        const newContact = await User.findById(contact);
        if (newContact && user) {
            console.log('usuario ', user.contacts);
            console.log('el nuevo usuario ', newContact._id);
            let dataContact = newContact._id;
            let userIndex = user.contacts.indexOf(dataContact);
            if (userIndex >= 0) {
                user.contacts.splice(userIndex, 1);
                await user.save();
                res.status(200).json({message:"contact delete"});
            } else {
                res.status(400).json({message:'contact not exists'});
            }
        } else {
            res.status(400).json({message:'user not found'});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({message: error.message});
    }
};

module.exports = {
    createUser,
    createContact,
    loginUser,
    getFoundUsers,
    getUser,
    loginUser,
    updateUser,
    deleteUser,
    deleteContact
};