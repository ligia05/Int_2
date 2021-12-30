const lojinhas = require('../database/Pizzas.json');
const fs = require('fs');
const { validationResult } = require('express-validator');
const controller = {
create: (req, res) => {
    res.render('crud/create')
},

store: (req,res) => {

    const erros = validationResult(req);
    
    if(!erros.isEmpty()){
        // return res.send(erros.mapped());
        res.render('crud/create', {erros: erros.mapped()})
    }

    const nome = req.body.nome;
    const ingredientes = req.body.ingredientes.split(',').map(a => a.trim());
    const preco = Number(req.body.preco);
    const produto = {nome, ingredientes, preco, img:'/img/' + req.file.filename}
    
    // Adicionar o id à pizza recém criada
 produto.id = lojinhas[lojinhas.length - 1].id + 1;

    // Adicionar a pizza ao array de lojinha
    lojinhas.push(produto);

    // Salvar o json do array de lojinha no arquivo Pizzas.json
    fs.writeFileSync(
        __dirname + '/../database/Pizzas.json',
        JSON.stringify(lojinhas, null, 4),
        {flag:'w'}
    );
    
    // Direcionar o usuário para a página que exibe a lista de lojinha
    res.redirect('crud/create');

}



}

module.exports = controller;