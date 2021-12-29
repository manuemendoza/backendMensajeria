const Contact = require('./model');

const createContacts = async(req, res) => {
    const data = req.body;
    const contact = new Contact(data);
    try {
        await contact.save();
        res.status(200).json(contact).populate('User');
    } catch (error) {
        if (error.message == 'ValidationError') {
            res.status(400).json({ message: error.message })
        } else {
            res.status(500).json({ message: error.message });
        }
    }
};

//  con este get voy a buscar los contactos en el array 
const getContacts = async(req, res) => {
    const data = req.query.userId;
    try {
        if (data) {
            const contact = await Contact.find({ userId: data }).populate('userIds');
            res.status(200).json(contact);
        } else {
            const contacts = await Contact.find().populate('userIds');
            res.status(200).json(contacts);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getContact = async(req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (contact) {
            res.status(200).json(contact);
        } else {
            res.status(404).json({ message: 'contact list not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createContacts,
    getContacts
};