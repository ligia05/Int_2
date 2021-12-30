// Importar o express
const express = require('express');
const router = express.Router();
// Importar o LojinhaController
const LojinhaController = require('../controllers/LojinhaController');
const LojinhaDonoController = require('../controllers/LojinhaDonoController');
// Criar roteador
const LojistaLogado = require('../middlewares/LojistaLogado')

// Definir rotas às quais ele responde
router.get('/loja', LojinhaController.listar);
router.post('/lojinha/create', LojistaLogado, upload.single('img'), ValidadorDeFormPizza, LojinhaDonoController.store);
router.post('/lojinha/create', LojinhaDonoController.create);
router.get('/loja/:id', LojinhaController.getLojinha);
router.get('/loja',LojinhaController.busca);

// Exportar o roteador
module.exports = router;