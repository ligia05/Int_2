const req = require('express/lib/request');

module.exports = {
    showLogin: (req,res) => {
        return res.render("login");
    },
    login: (req,res) => {

        // Capturar o email e a senha inseridos pelo usuário
        const {email, senha} = req.body;
        

        // Carregar o array de usuários (database/Usuarios.json)
        const usuarios = require('../database/Usuarios.json');

        // Buscar o usuário no array pelo email digitado
        const usuario = usuarios.find( u => u.email == email && u.senha == senha );

        // Caso usuário não exista, retornar erro (fim)
        if(usuario === undefined){
            return res.send("Senha ou email inválidos");
        }

        // Se chegou até aqui, escreve a session do usuario.
        req.session.usuario = usuario;
        
        // Redirecionar o usuário para uma página interna
        return res.redirect("/adm/pizzas/create");

    },
    logout: (req,res) => {
        req.session.usuario = undefined;
        res.redirect('/adm/login');
    }

}