const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    //Token vai chegar nesse formato
    //Bearer tokenvaichegaraqui
    try{
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, process.env.JWT_PASSWORD)
        next()
    }
    catch(err){
        res.status(401).json({
            mensagem: "Autenticação falhou"
        })
    }
}