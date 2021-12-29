const Chat = require('./model');

const createChats = async(req, res) => {
    const chatData = req.body;
    const chat = new Chat(chatData);
    try {
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

//Este codigo se ha dejado preparado por si en un futuro se implementa el role de admin
const getChats = async(req, res) => {
    try {
        if (req.query.title) {
            const title = await Chat.find({ title: { $regex: new RegExp(req.query.title, 'i') } });
            res.status(200).json({ title: title });
        } else {
            const titles = await Chat.find();
            res.status(200).json(titles);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

const getChat = async(req, res) => {
    try {
        const chat = await Chat.findById(req.params.id);
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
    getChats,
    updateChat,
    deleteChat
};