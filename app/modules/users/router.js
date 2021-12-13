const router = require('express').Router();
const controller = require('./controller')

router.get('/:id', controller.getUser);
router.get('/', controller.getUsers);
router.post('/', controller.createUser);
router.post('/login', controller.loginUser);
router.put('/:id', controller.updateUser);
router.delete('/:id', controller.deleteUser);


module.exports = router