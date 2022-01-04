
const express = require('express');
const router = express.Router();

const AdmController = require("../controllers/AdmController");



router.get('/adm/userlogin', AdmController.showLogin);
router.post('/adm/userlogin', AdmController.login);

// Exportar o roteador 
module.exports = router;