const lojinha = require('../database/Pizzas.json');
const fs = require('fs');
const { validationResult } = require('express-validator');


const controller = {


    listar: (req, res)=> {
        return res.render('lojinha',{lojinha, busca:""});
        // res.send(lojinha)
    },

    getLojinha: (req, res) => {

        // Capturar o id requisitado (req.params)
        const idLojinha = req.params.id;
        let idPrev = null;
        let idNext = null;

        // Capturar do array a pizza com o id requisitado (lojinha.find)
        const produto = lojinha.find(
            (p, i) => {
                idPrev = lojinha[i-1]==undefined?undefined:lojinha[i-1].id;
                idNext = lojinha[i+1]==undefined?undefined:lojinha[i+1].id;
                return p.id == idLojinha
            });

        // Retornar a pizza encontrada para o cliente (res.send())
        res.render('lojinha',{produto, idNext, idPrev});

    },

    busca: (req,res) => {

        // Capturar a string digitada pelo visitante
        const lojastring = req.query.q.trim();

        // Filtrar do arrays de lojinha somente as lojinha
        // que que tiverem a string buscada no nome
        const lojinhaFiltras = lojinha.filter(
            p => p.nome.toUpperCase().includes(string.toUpperCase())
        );

        // Renderizar a view index passando para ela
        // as lojinha filtradas
        res.render('lojinha', {lojinha:lojinhaFiltras, busca:lojastring});
    },

    create: (req, res) => {
        res.render('crud-lojinha/create')
    },

    store: (req,res) => {

        const erros = validationResult(req);
        
        if(!erros.isEmpty()){
            // return res.send(erros.mapped());
            res.render('crud-lojinha/create', {erros: erros.mapped()})
        }

        const nome = req.body.nome;
        const ingredientes = req.body.ingredientes.split(',').map(a => a.trim());
        const preco = Number(req.body.preco);
        const produto = {nome, ingredientes, preco, img:'/img/' + req.file.filename}
        
        // Adicionar o id à pizza recém criada
     produto.id = lojinha[lojinha.length - 1].id + 1;

        // Adicionar a pizza ao array de lojinha
        lojinha.push(produto);

        // Salvar o json do array de lojinha no arquivo Pizzas.json
        fs.writeFileSync(
            __dirname + '/../database/Pizzas.json',
            JSON.stringify(lojinha, null, 4),
            {flag:'w'}
        );
        
        // Direcionar o usuário para a página que exibe a lista de lojinha
        res.redirect('/lojinha');

    }



}

module.exports = controller;