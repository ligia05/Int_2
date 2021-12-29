// importar o express
const express = require('express');
const session = require("express-session");

// Importando o roteador
const HomeRouter = require('./routers/HomeRouter');
const AdmRouter = require('./routers/AdmRouter');
const LojinhaRouter = require('./routers/LojinhaRouter');
// Importando os middlewares
const LogMiddleware = require('./middlewares/LogMiddleware');

// criar o servidor
const app = express();

// Configurando o template engine EJS
app.set("view engine","ejs");
app.set("views", "./views");

// Configurando o processamento de formulários
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//app.use(session({secret:"SEGREDO"}));

// Configurar a pasta public
app.use(express.static(__dirname + '/public'));

// Middleware de LOG:
 app.use(LogMiddleware);

// criar a rota respondendo a requisição
app.use('/', HomeRouter);
app.use('/adm', AdmRouter);
app.use('/lojinha', LojinhaRouter);
// levantar o servidor
app.listen(3000, ()=>{console.log("servir rodando...")})
