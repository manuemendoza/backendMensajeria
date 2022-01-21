const Message = require('./model');
const brcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const createMessage = async(req, res) => {
        let data = req.body;
        data.userId = req.auth.user.id;
        const message = new Message(data);
        try {
            await message.save();
            res.status(200).json(message);
        } catch (error) {
            if (error.message == 'ValidationError') {
                res.status(400).json({message: error.message})
            } else {
                res.status(500).json({message: error.message});
            }
        }
};

//Este codigo se ha dejado preparado por si en un futuro se implementa el role de admin
const getFoundMessage = async(req, res) => {
    try {
        if (req.query.message) {
            const message = await Message.find({ message: { $regex: new RegExp(req.query.message, 'i') } });
            res.status(200).json({message: message});
        } else {
            res.status(200).json( await Message.find());
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({message: error.message});
    }
};

const getMessages = async (req, res) => {
    let query = {};
    if (req.query.chatId) {
        query.chatId = req.query.chatId;
    }
    if (req.query.search) {
        query.text = { $regex: new RegExp(req.query.search, 'i') };
    }
    try {
        let messages;
        if (req.query.chatId) {
            messages = await Message.find(query).populate('userId');
        } else {
            messages = await Message.find(query).populate('userId').populate('chatId');
        }
        res.status(200).json(messages);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: error.message});
    }
}

const getMessage = async(req, res) => {
    try {
        const message = await Message.findById(req.params.id);
        if (Message) {
            res.status(200).json(message);
        } else {
            res.status(404).json({message: 'message not found'});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({message: error.message});
    }
};

const updateMessage = async(req, res) => {
    try {
        const message = await Message.findById(req.params.id);
        if (message) {
            let data = req.body
            const updateMessage = await Message.findByIdAndUpdate(req.params.id, data, { new: true });
            res.status(200).json(updateMessage);
        } else {
            res.status(404).json({message: 'messager not found'});
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

const deleteMessage = async(req, res) => {
    try {
        const message = await Message.findById(req.params.id);
        if (message) {
            const deleteMessage = await Message.findByIdAndDelete(req.params.id);
            res.status(200).json({message: 'message deleted'});
        } else {
            res.status(404).json({message: 'message not found'});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({message: error.message});
    }
};

module.exports = {
    createMessage,
    getMessages,
    getMessage,
    updateMessage,
    deleteMessage
};