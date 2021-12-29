// Importar o express
const express = require('express');
const ValidadorDeFormPizza = require('../middlewares/ValidadorDeFormPizza');
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
const LojinhaController = require('../controllers/LojinhaController');
const UsuarioLogado = require('../middlewares/UsuarioLogado');
const SemLogin = require('../middlewares/SemLogin');

// Criar roteador
const router = express.Router();

// Definir rotas às quais ele responde
router.get('/lojinha/create', UsuarioLogado, LojinhaController.create);
router.post('/lojinha/create', UsuarioLogado, upload.single('img'), ValidadorDeFormPizza, LojinhaController.store);
router.get('/login', SemLogin, AdmController.showLogin);
router.get('/logout', AdmController.logout);
router.post('/login', AdmController.login);

// Exportar o roteador 
module.exports = router;