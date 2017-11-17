const express = require('express');
const router = express.Router();
const user = require('../controllers/userCtrl');

router.get('/users', user.getUser)
router.post('/users', user.create)
// router.get('/users/:name', user.getUserbyName)
router.get('/users/:id', user.getUserbyId)
router.put('/users/:id', user.update)
router.delete('/users/:id', user.deleteUser)

module.exports = router;
