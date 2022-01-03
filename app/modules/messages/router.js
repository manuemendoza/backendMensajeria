const router = require('express').Router();
const services = require('./services')

router.get('/:id', services.getMessage);
router.get('/', services.getMessages);
router.post('/', services.createMessage);
router.put('/:id', services.updateMessage);
router.delete('/:id', services.deleteMessage);


module.exports = router