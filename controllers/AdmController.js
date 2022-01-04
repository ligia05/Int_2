
const usuarios = require('../database/Usuarios.json');
module.exports = {
    showLogin: (req,res) => {
 res.render("adm/userlogin",{error:null});
    },
    login: (req,res) => {

        
        const {email, senha} = req.body;
        

        // Carregar o array de usuários (database/Usuarios.json)
    

        // Buscar o usuário no array pelo email digitado
        const usuario = usuarios.find (
         usuario => (usuario.email == email && usuario.senha == senha )
        );
        // Caso usuário não exista, retornar erro (fim)
        if(usuario){
            req.session.usuario = JSON.stringify(usuario);
            return res.redirect("/");
        } else {
            return res.render("/adm/userlogin", {error:"Login/Senha inválidos"});
        }
    }

}
