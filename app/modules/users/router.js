const router = require('express').Router();
const controller = require('./controller')

router.get('/:id', controller.getUser);
router.get('/', controller.getFoundUsers);
router.post('/', controller.createUser);
router.post('/login', controller.loginUser);
router.post('/:id/contacts', controller.createContact);
router.put('/:id', controller.updateUser);
router.delete('/:id/contacts/:contactId', controller.deleteContact);
router.delete('/:id', controller.deleteUser);



module.exports = router; 