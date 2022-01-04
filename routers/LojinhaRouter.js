// Importar o express
const express = require('express');
const ValidadorDeFormPizza = require('../middlewares/ValidadorDeFormPizza');

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

// Importar o LojinhaController
const LojinhaController = require('../controllers/LojinhaController');
const LojinhaDonoController = require('../controllers/LojinhaDonoController');


// Definir rotas às quais ele responde
router.get('/loja', LojinhaController.listar);
router.post('/lojinha/create', LojistaLogado, upload.single('img'), ValidadorDeFormPizza, LojinhaDonoController.store);
router.post('/lojinha/create', LojinhaDonoController.create);
router.get('/loja/:id', LojinhaController.getLojinha);
router.get('/loja',LojinhaController.busca);

// Exportar o roteador
module.exports = router;