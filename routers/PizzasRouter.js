// Importar o express
const express = require('express');

// Importar o PizzasController
const PizzasController = require('../controllers/PizzasController')

// Criar roteador
const router = express.Router();

// Definir rotas às quais ele responde
router.get('/lojinha', PizzasController.listar);
router.get('/lojinha/produtos', PizzasController.listar);
router.get('/produto/:id', PizzasController.getLojinha);
router.get('/busca',PizzasController.busca);

// Exportar o roteador
module.exports = router;