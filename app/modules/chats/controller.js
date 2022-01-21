const Chat = require('./model');
const mongoose = require('mongoose');

const createChats = async(req, res) => {
    const chatData = req.body;
    chatData.adminId = req.auth.user.id;
    try {
        //@TODO VER COMO NO REPETIR EL CHAT
        const chat = new Chat(chatData);
        await chat.save();
        res.status(200).json(chat)
    } catch (error) {
        if (error.message == 'ValidationError') {
            res.status(400).json({ message: error.message })
        } else {
            res.status(500).json({ message: error.message });
        }
    }
};

const getChat = async(req, res) => {
    try {
        const chat = await Chat.findById(req.params.id).populate('userIds');
        if (chat) {
            res.status(200).json(chat);
        } else {
            res.status(404).json({ message: 'chat not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

const getUserChats = async (req, res) => {
    //@TODO idea par abilidtar lo que seria los admin
    // if (req.auth.user.role === 'admin') {
    //     query = req.auth.user.id;
    // }

    let query = {
        $or: [
            { adminId: req.auth.user.id },
            { userIds: req.auth.user.id }
        ]
    };

    // @TODO: aggregate users to allow filtering by contact name
    if (req.query.search) {
        query.title = { $regex: new RegExp(req.query.search, 'i') };
    }

    try {
        // const chats = await Chat.find({"$and":[{"userIds":req.auth.user._id}]})
        const chats = await Chat.find(query).populate('userIds');
        res.status(200).json({ chats });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

const updateChat = async(req, res) => {
    try {
        const chat = await Chat.findById(req.params.id);
        if (chat) {
            let data = req.body;
            const chatUpdate = await Chat.findByIdAndUpdate(req.params.id, data, { new: true });
            res.status(200).json(chatUpdate);
        } else {
            res.status(404).json({ message: 'chat not found' });
        }
    } catch (error) {
        console.error(error);
        if (error.name == "ValidationError") {
            res.status(400).json({ menssage: error.message });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
};

const deleteChat = async(req, res) => {
    try {
        const chat = await Chat.findById(req.params.id);
        if (chat) {
            const chatDelete = await Chat.findByIdAndDelete(req.params.id);
            res.status(200).json({ message: 'chat deleted' });
        } else {
            res.status(404).json({ message: 'chat not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createChats,
    getChat,
    getUserChats,
    updateChat,
    deleteChat
};