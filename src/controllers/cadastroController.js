const Register = require('../models/registerModel');


exports.index = (req, res) => {
    res.render('cadastro')
}

exports.register = async function (req,res) {
    const cadastro = new Register(req.body)
    await cadastro.registrar()
    if (cadastro.errors.length > 0) {
        req.flash("errors", cadastro.errors)
        req.session.save(function() {
            return res.redirect('/cadastro/index')
        })
        return
    }
    req.flash("sucess", 'CADASTRO EFETUADO! ')
    req.session.save(function() {
        return res.redirect('/cadastro/index')
    })
 
}

exports.login = async function (req,res) {
    try {
        const login = new Register(req.body)
        await login.login()

        if (login.errors.length > 0) {
            req.flash("errors", login.errors)
            req.session.save(function() {
                return res.redirect('/login/index')
            })
            return
        }

        req.flash("sucess", 'login EFETUADO! ')
        req.session.user = login.user;
        req.session.save(function() {
            return res.redirect('/login/index')
        })
        
    } catch (e) {
        console.log(e)
        
    }
    
}

exports.logout = function (req, res) {
    req.session.destroy();
    res.redirect('/login/index')
}

