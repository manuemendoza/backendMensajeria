const User = require('./model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const controller = require('./controller');

const createUser = async(req, res) => {
    if (!req.body.password) {
        res.status(400).json({messege:'password is required'});
    } else {
        let data = req.body;
        const user = new User(data);
        const salt = bcrypt.genSaltSync(9);
        const hash = bcrypt.hashSync(data.password, salt);
        user.password = hash ;
        try {
            await user.save();
            res.status(200).json(user);
        } catch (error) {
            if (error.message == 'ValidationError') {
                res.status(400).json({message: error.message})
            } else {
                res.status(500).json({message: error.message});
            }
        }
    }
};

const getUsers = async(req, res) => {
    const data = await controller.getUsers(req.query.name)
    res.status(200).json(data);
};

const getUser = async(req, res) => {
    const data = await controller.getUsers(req.params.id);
    try {
    if (data) {
        res.status(200).json(data);
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
                    email: user.email
                };
                if (validated) {
                    const token = jwt.sign({
                        _id: user._id,
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
    const userId = req.params.id ;
    const data = req.body;
    try {
        const user = await controller.updateUser(userId, data);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({message: 'user not found'});
        }
    } catch (error) {
        console.error(error);
        if (error.name == "ValidationError") {
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

module.exports = {
    createUser,
    loginUser,
    getUsers,
    getUser,
    loginUser,
    updateUser,
    deleteUser
};