// o mongoose vai mnodelar os dados, tratar, para garantir que será salvo da forma em que desejamos
const mongoose = require('mongoose');

const HomeSchema = new mongoose.Schema({ // Schema do mongoose
    titulo: { type: String, required: true },
    descricao: String

})

const HomeModel = mongoose.model('Home', HomeSchema)

module.exports = HomeModel
