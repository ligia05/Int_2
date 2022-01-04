const express = require('express');
const HomeUserController = require('../controllers/HomeUserController');

const router = express.Router();


router.get('/', HomeUserController.index);





module.exports = router;