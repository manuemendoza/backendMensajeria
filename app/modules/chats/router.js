const router = require('express').Router();
const controller = require('./controller');
const auth = require('../../services/auth')

router.get('/:id', auth.checkUser, controller.getChat);
router.get('/', auth.checkUser, controller.getUserChats);
router.post('/',auth.checkUser, controller.createChats);
router.put('/:id',auth.checkUser, controller.updateChat);
router.delete('/:id',auth.checkUser, controller.deleteChat);


module.exports = router;