const Chamados = require('../models/chamadosModel')

exports.index = async function(req,res)  {
    const chamados = new Chamados
    const chamadoAberto = await chamados.buscaChamados()
    res.render('consulta-chamados', { chamadoAberto })
}

exports.finalizados = async function(req,res)  {
    const chamados = new Chamados
    const chamadoAberto = await chamados.buscaChamadosFinalizados()
    res.render('chamados-finalizados', { chamadoAberto })
}

exports.delete = async function (req,res) {
    if(!req.params.id) return res.render('404')
    const chamados = new Chamados
    const chamadoAberto = await chamados.deleteChamado(req.params.id)
    if(!chamadoAberto) return res.render('404')
    req.flash("sucess", "O chamado foi excluído com sucesso!!");
    req.session.save(function() {
        return res.redirect('/consulta-chamados/index')
    })
    
}
