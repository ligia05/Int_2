// Importar o express
const express = require('express');

const AdmController = require("../controllers/AdmController");

const multer = require('multer');
const storage = multer.diskStorage(
    {
        destination: (req, file, cb) => {cb(null, __dirname + '/../public/img')},
        filename: (req, file, cb) => {
            console.log(file);
            cb(null,Date.now() + '-' + file.originalname);
        }
    }
);
const upload = multer({storage})


// Importar o PizzasController


const SemLogin = require('../middlewares/SemLogin');
const LojistaLogado = require('../middlewares/LojistaLogado')
// Criar roteador
const router = express.Router();

// Definir rotas às quais ele responde
router.get('/adm/lojistacreate', LojistaLogado, AdmController.loginlojista);

router.get('/adm/clientecreate', SemLogin, AdmController.showLogin);
router.get('/logout', AdmController.logout);
router.post('/login', AdmController.login);

// Exportar o roteador 
module.exports = router;