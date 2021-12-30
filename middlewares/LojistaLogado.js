module.exports = (req, res, next) => {
    
    if(req.session.lojista == undefined){
        return res.redirect("/login");
    }

    next();

}