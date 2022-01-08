const router = require('express').Router();
const controller = require('./controller');

router.get('/:id', controller.getContact);
router.get('/', controller.getContacts);
router.post('/', controller.createContacts);
router.put('/:id', controller.updateContact);
// router.put('/delete/:id', controller.deleteContact);




/*
GET /users
GET /users/pepe
POST /users
UPDATE /users/pepe
?? GET /users/pepe/contacts
POST /users/pepe/contacts
DELETE /users/pepe/contacts/jaimito
DELETE / users/pepe

*/

module.exports = router;