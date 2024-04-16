const HomeModel = require('../models/HomeModel')

exports.index = (req,res) => {
   if(!req.session.user) return res.render('login')
    return res.render('controle-toners')
}

exports.entradaToner = (req,res) => {
    if(!req.session.user) return res.render('login')
    return res.render('entrada-de-toner')
}