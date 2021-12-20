const router = require('express').Router();
const controller = require('./controller')

router.get('/:id', controller.getMessage);
router.get('/', controller.getMessages);
router.post('/', controller.createMessage);
router.put('/:id', controller.updateMessage);
router.delete('/:id', controller.deleteMessage);


module.exports = router