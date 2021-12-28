const home = require('../database/Usuarios.json');
const fs = require('fs');
const { validationResult } = require('express-validator');


const controller = {
   home: (req, res)=> {
        return res.render('home',{home, busca:""});
        // res.send(home)
    },
    
    listar: (req, res)=> {
        return res.render('home',{home, busca:""});
        // res.send(home)
    },

    getUsuario: (req, res) => {

        // Capturar o id requisitado (req.params)
        const idUsuario = req.params.id;
        let idPrev = null;
        let idNext = null;

        // Capturar do array a pizza com o id requisitado (home.find)
        const user = home.find(
            (p, i) => {
                idPrev = home[i-1]==undefined?undefined:home[i-1].id;
                idNext = home[i+1]==undefined?undefined:home[i+1].id;
                return p.id == idUsuario
            });

        // Retornar a pizza encontrada para o cliente (res.send())
        res.render('home',{user, idNext, idPrev});

    },

    busca: (req,res) => {

        // Capturar a string digitada pelo visitante
        const usuariotring = req.query.q.trim();

        // Filtrar do arrays de home somente as home
        // que que tiverem a string buscada no nome
        const UsuarioFiltras = home.filter(
            p => p.nome.toUpperCase().includes(string.toUpperCase())
        );

        // Renderizar a view index passando para ela
        // as home filtradas
        res.render('home', {home:UsuarioFiltras, busca:usuariotring});
    },

    create: (req, res) => {
        res.render('/')
    },

    store: (req,res) => {

        const erros = validationResult(req);
        
        if(!erros.isEmpty()){
            // return res.send(erros.mapped());
            res.render('crud-home/create', {erros: erros.mapped()})
        }

        const nome = req.body.nome;
        
        const user = {nome, id, email, img:'/img/' + req.file.filename}
        
        // Adicionar o id à pizza recém criada
     user.id = home[home.length - 1].id + 1;

        // Adicionar a pizza ao array de home
        home.push(user);

        // Salvar o json do array de home no arquivo Pizzas.json
        fs.writeFileSync(
            __dirname + '/../database/Usuarios.json',
            JSON.stringify(home, null, 4),
            {flag:'w'}
        );
        
        // Direcionar o ário para a página que exibe a lista de home
        res.redirect('/home');

    }



}