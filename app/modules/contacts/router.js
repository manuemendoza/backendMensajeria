const router = require('express').Router();
const controller = require('./controller');

router.post('/', controller.createContacts);
router.get('/', controller.getContacts);

module.exports = router;