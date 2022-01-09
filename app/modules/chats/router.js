const router = require('express').Router();
const controller = require('./controller')

router.get('/:id', controller.getChat);
router.get('/', controller.getChats);
router.post('/', controller.createChats);
router.put('/:id', controller.updateChat);
router.delete('/:id', controller.deleteChat);


module.exports = router;