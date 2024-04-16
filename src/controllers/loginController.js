exports.index = (req,res) => {
    if(req.session.user) return res.render('index')
    return res.render('login')
}
