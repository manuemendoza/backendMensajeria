const controller = require('./controller');
/**
 * esta mierda hay que verla y refactorizalra estoy haciendo lo mismo en user
 * 
 */
const createMessage = async(req, res) => {
        let data = req.body;
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
const getMessages = async(req, res) => {ç
    const data = await controller.getMessages(req.query.message);
    res.json(data)
};

const getMessage = async(req, res) => {
    const data = await controller.getMessage(req.param.id);
    res.json(data);
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