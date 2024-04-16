// o mongoose vai mnodelar os dados, tratar, para garantir que será salvo da forma em que desejamos
const mongoose = require('mongoose');



const chamadosSchema = new mongoose.Schema({
    nome: { type: String, required: true},
    sobrenome: { type: String, required: true},
    setor: { type: String, required: true },
    funcao: { type: String, required: true },
    data: { type: Date, default: Date.now },
    numChamado: { type: String, required: true },
    statusChamado: { type: String, required: true },
    motivoChamado: { type: String, required: true },
    prioridadeChamado: { type: String, required: true },
    descricaoChamado: { type: String, required: true }
})

const chamadosModel = mongoose.model('chamados', chamadosSchema)

class Chamados {
    constructor(body) {
        this.body = body
        this.errors = []
        this.chamado = null
    }


    
    chamadoEditar = async function(id) {
        if(typeof id !== 'string') return
        this.valida()
        if (this.errors.length > 0) return
        this.chamado = await chamadosModel.findByIdAndUpdate(id,this.body, { new: true })
    }

    
    async abrirChamado() {
        this.valida()
        if (this.errors.length > 0) return
        this.chamado = await chamadosModel.create(this.body)
    }
    
    valida() {
        this.validaMotivoChamado()
        if (this.errors.length > 0) return
        this.validaPrioridadeChamado()
        if (this.errors.length > 0) return
        this.validaDescricaoChamado()
        if (this.errors.length > 0) return
    
        
    }
    
    validaMotivoChamado() {
        if (this.body.motivoChamado === 'Selecione o motivo do chamado') {
            this.errors.push("Informe o motivo do chamado")
            return
        }
    }
    
    validaPrioridadeChamado() {
        if (this.body.prioridadeChamado === "") {
            this.errors.push("Informe a prioridade do chamado!")
            return
        }
    }
    
    validaDescricaoChamado() {
        if(this.body.descricaoChamado === ""){
            this.errors.push("Informe detalhadamente a descrição do seu chamado")
            return
        }
    }
    chamadoBuscaId = async function(id)  {
        if(typeof id !== 'string') return
        const user = await chamadosModel.findById(id)
        return user
    }
    
    buscaChamados = async function () {
        
        const chamados = await chamadosModel.find({ statusChamado: "PENDENTE" })
        .sort({ data: +1 })
        return chamados
    }

    buscaChamadosFinalizados = async function () {
        
        const chamados = await chamadosModel.find({ statusChamado: "FINALIZADO" })
        .sort({ data: -1 })
        return chamados
    }

    deleteChamado = async function(id)  {
        if(typeof id !== 'string') return
        const deleteChamado = await chamadosModel.deleteOne({_id: id})
        return deleteChamado
    }
    
    
    
}    

// METODOS ESTÁTICOS

module.exports = chamadosModel
module.exports = Chamados