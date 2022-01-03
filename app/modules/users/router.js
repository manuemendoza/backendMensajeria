const router = require('express').Router();
const services = require('./services')

router.get('/:id', services.getUser);
router.get('/', services.getUsers);
router.post('/', services.createUser);
router.post('/login', services.loginUser);
router.put('/:id', services.updateUser);
router.delete('/:id', services.deleteUser);


module.exports = router