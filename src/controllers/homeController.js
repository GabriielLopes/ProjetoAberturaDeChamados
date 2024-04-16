const HomeModel = require('../models/HomeModel')

exports.index = (req,res) => {
   if(!req.session.user) return res.render('login')
    return res.render('index')
}