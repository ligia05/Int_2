// Importar o express
const express = require('express');
const ValidadorDeFormPizza = require('../middlewares/ValidadorDeFormPizza');

const HomeController = require("../controllers/HomeController");

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


// Importar o HomeUserController
const HomeUserController = require("../controllers/HomeUserController");
const UsuarioLogado = require('../middlewares/UsuarioLogado');
const SemLogin = require('../middlewares/SemLogin');

// Criar roteador
const router = express.Router();

// Definir rotas às quais ele responde
router.get('/home/clientecreate', UsuarioLogado, HomeUserController.create);
router.post('/home/clientecreate', UsuarioLogado, upload.single('img'), ValidadorDeFormPizza, HomeUserController.store);
//router.get('/login', SemLogin, HomeController.showLogin);
//router.get('/logout', HomeController.logout);
//router.post('/login', HomeController.login);

// Exportar o roteador 
module.exports = router;