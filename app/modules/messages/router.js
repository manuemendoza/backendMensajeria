const router = require('express').Router();
const controller = require('./controller')
const auth = require('../../services/auth');

router.get('/:id',auth.checkUser, controller.getMessage);
router.get('/',auth.checkUser, controller.getMessages);
router.post('/',auth.checkUser, controller.createMessage);
router.put('/:id',auth.checkUser, controller.updateMessage);
router.delete('/:id',auth.checkUser, controller.deleteMessage);


module.exports = router;