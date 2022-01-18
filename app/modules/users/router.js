const router = require('express').Router();
const req = require('express/lib/request');
const controller = require('./controller');
const auth = require('../../services/auth');

router.get('/:id',auth.checkUser, controller.getUser);
router.get('/',auth.checkUser, controller.getFoundUsers);
router.post('/', controller.createUser);
router.post('/login', controller.loginUser);
router.post('/:id/contacts',auth.checkUser, controller.createContact);
router.put('/:id',auth.checkUser, controller.updateUser);
router.delete('/:id/contacts/:contactId',auth.checkUser, controller.deleteContact);
router.delete('/:id',auth.checkUser, controller.deleteUser);



module.exports = router; 