// rotas em js
const express = require('express');

const route = express.Router();
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController')
const cadastroController = require('./src/controllers/cadastroController')
const consultaChamadosController = require('./src/controllers/consultaChamadosController')
const abrirChamadoController = require('./src/controllers/abrirChamadoController')
const { loginRequired, TiRequired } = require('./src/middlewares/middleware')

// ROTAS DA HOMEPAGE
route.get('/',homeController.index);

//ROTAS DE LOGIN
route.get('/login/index',loginController.index)
route.post('/login/login',cadastroController.login)
route.get('/login/logout',cadastroController.logout)

// ROTAS DE CADASTRO
route.get('/cadastro/index',cadastroController.index)
route.post('/cadastro/registrar',cadastroController.register)

//          ROTAS DE CHAMADOS 

// ROTAS DE CONSULTA CHAMADOS
route.get('/consulta-chamados/index',TiRequired,loginRequired,consultaChamadosController.index)
route.get('/consulta-chamados/finalizados',TiRequired,loginRequired,consultaChamadosController.finalizados)
route.post('/consulta-chamados/edit/:id',TiRequired,loginRequired,abrirChamadoController.edit)
route.get('/consulta-chamados/edit/:id',TiRequired,loginRequired,abrirChamadoController.editIndex)
route.get('/consulta-chamados/delete/:id',TiRequired,loginRequired,consultaChamadosController.delete)

// ROTAS DE ABERTURA DE CHAMADOS
route.get('/abertura-chamados/index',loginRequired,abrirChamadoController.index)
route.get('/abertura-chamado/chamado-enviado',loginRequired,abrirChamadoController.chamadoEnviado)
route.post('/abertura-chamado/abrir-chamado',loginRequired,abrirChamadoController.chamados)

module.exports = route;
