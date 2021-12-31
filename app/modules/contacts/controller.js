const Contact = require('./model');
const mongoose = require('mongoose');

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
const updateContact = async(req, res) => {
    let data = req.body;
    let dataArray = data['userIds']
    try {
        const contact = await Contact.findById(req.params.id);
        let newData =[];
        for (let i = 0; i < contact.userIds.length; i++) {
            const dbData = mongoose.Types.ObjectId(contact.userIds[i]).toString();
            for (let d = 0; d < dataArray.length; d++) {
                const clientData = dataArray[d];
                if (dbData !== clientData) {
                    newData.push(mongoose.Types.ObjectId(`${clientData}`));
                }         
            }
        }
        let dataId = contact.userIds.concat(newData);        
        if (contact) {
            const updateContact = await Contact.findByIdAndUpdate(req.params.id,{userIds: dataId}, { new: true });
            res.status(200).json(updateContact);
        } else {
            res.status(404).json({ message: 'Contact list not found' });
        }
        // console.log(data);
        // console.log(dataArray);
        // console.log(contact.userIds);
        // console.log(newData);
        // console.log(dataId);
    } catch (error) {
        console.error(error);
        if (error.name == "ValidationError") {
            res.status(400).json({ menssage: error.message });
        } else {
            res.status(500).json({ message: error.message });
        }
    }

};

module.exports = {
    createContacts,
    getContacts,
    getContact,
    updateContact
};