const router = require('express').Router();
const controller = require('./controller');

router.get('/:id', controller.getContact);
router.get('/', controller.getContacts);
router.post('/', controller.createContacts);
router.put('/:id', controller.updateContact);

module.exports = router;