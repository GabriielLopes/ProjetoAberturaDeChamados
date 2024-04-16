// o mongoose vai mnodelar os dados, tratar, para garantir que será salvo da forma em que desejamos
const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');


const registerSchema = new mongoose.Schema({ // Schema do mongoose
    nome: { type: String, required: true },
    sobrenome: { type: String, required: true },
    setor: { type: String, required: true },
    funcao: { type: String, required: true },
    email: { type: String, required: true },
    senha: { type: String, required: true }
})

const registerModel = mongoose.model('registers', registerSchema)

class Register {
    constructor(body) {
        this.body = body
        this.errors = []
        this.user = null
    }

    async registrar() {
        this.valida()
        if (this.errors.length > 0) return

        await this.userExists();

        if (this.errors.length > 0) return

        try {
            
            const salt = bcryptjs.genSaltSync();
            this.body.senha = bcryptjs.hashSync(this.body.senha,salt)
            this.user = await registerModel.create(this.body)
        } catch (e) {
            res.render('404')
            console.log(e)
        }

    }

    async login() {
        if(this.errors.length > 0 ) return;
        this.user = await registerModel.findOne({email: this.body.email})

        if(!this.user) {
            this.errors.push('O usuário não existe!')
            return
        } 
        
       if(!bcryptjs.compareSync(this.body.senha, this.user.senha)) {
        this.errors.push('A senha informada é inválida!')
        this.user = null
        return;
       }

    }


    valida() {
        this.validaNome()
        this.validaSobrenome()
        // validação de campos de cadastro
        // e-mail precisa ser válido
        if (!validator.isEmail(this.body.email)) this.errors.push('E-mail inválido')
        // senha precisa ter entre 8 e 50 caracteres
        this.validaSenha()
        this.validaRepeteSenha();

        this.validaSetor();

    }


    validaNome() {

        let regex = /\W|_/;

        if (this.body.nome === '') {
             this.errors.push('O campo "Nome", não pode estar vazio!')
         }else if (regex.test(this.body.nome) === true) { 
            this.errors.push('Você não pode inserir simbolos no seu nome!')
        }
    }


    validaSobrenome() {
        if (this.body.sobrenome === '') { 
        this.errors.push('O campo "Sobrenome", não pode estar vazio!')
    }};

    validaSetor() {
        if (this.body.setor == 'Selecione o seu Departamento') {

            this.errors.push('Você deve selecionar o seu setor!')
            return false
        }
    }
    
    
    validaSenha() {
        
        let regex = /\W|_/;
        const hasUpper = (str) => /[A-Z]/.test(str)
        
        if (this.body.senha === '') {
            this.errors.push('A senha não pode estar vazia!');
            
        } else if (this.body.senha.length < 8 || this.body.senha.length >= 50) {
            this.errors.push('A senha deve estar entre 8 e 50 caracteres');
            
        } else if (regex.test(this.body.senha) === false) {
            this.errors.push('A senha é muito fraca! É recomendado inserir algum símbolo(@,!,$,%,*...)');
            
        } else if (hasUpper(this.body.senha) == false) {
            this.errors.push('A sua senha é muito fraca! Precisa adicionar ao menos 1 letra maiúscula! ( A,B,C,D,E,F,G)')
            
        }
        
    }
    
    validaRepeteSenha() {
        if(this.body.senha === '') {
            return
        } else if (this.body.repeteSenha !== this.body.senha) {
        this.errors.push('As senhas não são iguais!') 
    }}

    async userExists() {
   
           const usuario = await registerModel.findOne({ email: this.body.email})
           if(usuario) this.errors.push('O e-mail  informado já está cadastrado.')
        
    
       
    }


    
}


module.exports = registerModel
module.exports = Register

