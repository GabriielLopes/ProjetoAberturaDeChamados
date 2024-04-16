module.exports.middlewareGlobal = (req,res,next) => {
    res.locals.errors = req.flash('errors') // insere a variavel em todas as rotas
    res.locals.sucess = req.flash('sucess')
    res.locals.sessionUser = req.session.user
    next()
}

module.exports.checkCsrfError = (err,req,res,next) => {
    if(err && err.code === 'EBADCSRFTOKEN') {
        return res.render('404')
    }
}

module.exports.csrfMiddleware = (req,res,next) => {
    res.locals.csrfToken = req.csrfToken()
    next()
}

module.exports.loginRequired = (req,res,next) => {
    if(!req.session.user) {
        req.flash('errors', 'Você precisa fazer o login!');
        req.session.save(() => res.redirect('/login/index'))
        return
    }
    next()
}
