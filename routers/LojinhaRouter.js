// Importar o express
const express = require('express');

// Importar o LojinhaController
const LojinhaController = require('../controllers/LojinhaController')

// Criar roteador
const router = express.Router();

// Definir rotas às quais ele responde
router.get('/lojinha', LojinhaController.listar);
router.get('/lojinha/produtos', LojinhaController.listar);
router.get('/produto/:id', LojinhaController.getLojinha);
router.get('/busca',LojinhaController.busca);

// Exportar o roteador
module.exports = router;