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
const PizzasController = require('../controllers/PizzasController');
const UsuarioLogado = require('../middlewares/UsuarioLogado');
const SemLogin = require('../middlewares/SemLogin');

// Criar roteador
const router = express.Router();

// Definir rotas às quais ele responde
router.get('/pizzas/create', UsuarioLogado, PizzasController.create);
router.post('/pizzas/create', UsuarioLogado, upload.single('img'), ValidadorDeFormPizza, PizzasController.store);
router.get('/login', SemLogin, AdmController.showLogin);
router.get('/logout', AdmController.logout);
router.post('/login', AdmController.login);

// Exportar o roteador 
module.exports = router;