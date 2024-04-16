const Chamados = require('../models/chamadosModel')

exports.index = (req,res) => {
  //  if(!req.session.chamadoAberto) return res.render('login')
    return res.render('abrir-chamado')
}

exports.chamadoEnviado = (req,res) => {
    return res.render('chamado-enviado')
}

exports.chamados = async function (req,res)  {
   try {
       const chamados = new Chamados(req.body)
       await chamados.abrirChamado()
       if(chamados.errors.length > 0) {
           req.flash("errors", chamados.errors)
           req.session.save(function() {
               return res.redirect('/abertura-chamados/index')
           })
           return
       }
       req.flash("sucess", 'Chamado aberto com sucesso!!')
       req.session.save(function() {
           return res.redirect('/abertura-chamado/chamado-enviado')
       })
    
   } catch (err) {
        res.redirect('404')
        console.log(err)   
   }
    
}

exports.editIndex = async function(req, res) {
    if(!req.params.id) return res.render('404')
    const chamados = new Chamados
    const chamadoAberto = await chamados.chamadoBuscaId(req.params.id)
    if(!chamadoAberto) return res.render('404')
    res.render('editar-chamado', { chamadoAberto })
}

exports.edit = async function (req, res) {
    try {
        if(!req.params.id) return res.render('404')
        const chamado = new Chamados(req.body)
        const chamadoEditado = await chamado.chamadoEditar(req.params.id)
        if(chamado.errors.length > 0) {
            req.flash("errors", chamado.errors)
            req.session.save(function() {
                return res.redirect('/abertura-chamados/index')
            })
            return
        }
        req.flash("sucess", 'O Chamado foi editado com sucesso!!')
        req.session.save(function() {
            return res.redirect('/consulta-chamados/index')
        })
        
    } catch (err) {
        console.log(err)
        res.render('404')
    }
    
}