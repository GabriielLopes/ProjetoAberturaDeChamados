// Configuração de dependencias

require('dotenv').config(); // esta linha importa o dotenv pacote e o configura para carregar variáveis ​​de ambiente de um .env arquivo (normalmente usado para chaves secretas, como cadeias de conexão)
const express = require('express'); // importa a estrutura Express e a atribui à expressconstante. É a base para a construção de aplicações web em Node.js.
const app = express() // cria uma instância do aplicativo Express e a armazena na app constante. Este é o coração do seu servidor web.
const routes = require('./routes'); // : importa o módulo de rotas, provavelmente contendo lógica para lidar com diferentes URLs de solicitação ( /about, /users, etc.).

// Módulos Adicionais 

const path = require('path'); // Fornece utilitários para trabalhar com caminhos de arquivos.
const middlewareGlobal = require('./src/middlewares/middleware.js'); // importa funções de middleware (código reutilizável para lidar com solicitações ou respostas).

// Conexão MongoDB

const mongoose = require('mongoose');
mongoose.connect(process.env.CONNECTIONSTRING) // conecta-se ao banco de dados MongoDB usando a string de conexão armazenada na .envvariável de ambiente.
    .then(() => { // Esta função de retorno de chamada é executada se a conexão for bem-sucedida. Imprime uma mensagem e emite um evento personalizado chamado 'pronto' (provavelmente sinalizando a prontidão do servidor).
        app.emit('pronto') 
        console.log('conectado no mongoDB!')
    })
    .catch(e => console.log(e)) // captura quaisquer erros durante a conexão e os registra no console.


// Gerenciamento de sessão

const session = require('express-session'); // permite o gerenciamento de sessões usando cookies.
const MongoStore = require('connect-mongo'); //  cria um armazenamento de sessão que usa o MongoDB para persistir os dados da sessão.
const flash = require('connect-flash'); // permite armazenar e recuperar mensagens temporárias (como notificações de sucesso ou erro) entre solicitações.

// melhorias de segurança

const helmet = require('helmet') // fornece uma coleção de funções de middleware relacionadas à segurança para proteção contra vulnerabilidades comuns da Web.
const csrf = require('csurf') // protege contra ataques de falsificação de solicitação entre sites (CSRF), gerando tokens anti-CSRF.


// analisadores e arquivos estáticos 

app.use(express.urlencoded({ extended: true })) // analisa corpos de solicitações recebidas em formato codificado por URL (por exemplo, envios de formulários). A extendedopção permite objetos complexos.
app.use(express.static(path.resolve(__dirname, 'public'))) // : torna o public diretório acessível para servir arquivos estáticos como imagens, CSS e JavaScript (sem exigir rotas específicas).
app.use(helmet()) // Está ativiando o mecanismo de segurança helmet


// configurançao do mecanismo de visualização 

app.set('views', path.resolve(__dirname, 'src', 'views'))  // Define o diretório que contém os modelos de visualização ( ejsarquivos neste caso) como src/views.
app.set('view engine', 'ejs') // configura o Express para usar o mecanismo de modelagem EJS (Embedded JavaScript) para renderizar páginas HTML dinâmicas.

// configuração de sessão e Middleware

const sessionOptions = session({ //  define as opções para o middleware de sessão
    secret: 'Cokiee', // uma chave secreta usada para assinar e criptografar dados de sessão (armazenados em cookies).
    store: MongoStore.create( { mongoUrl: process.env.CONNECTIONSTRING }), // a instância do MongoStore para persistir sessões no MongoDB.
    resave: false,  //  Opções de otimização para gerenciamento de sessões.
    saveUninitialized: false, //  Opções de otimização para gerenciamento de sessões.
    cookie: {//  propriedades do cookie de sessão, incluindo sua vida útil e httpOnlysinalizador para impedir o acesso JavaScript do lado do cliente.
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 dias (100 milesimos * 60 segundos * 60min * 24 horas * 7(dias))
        httpOnly: true 
    }
})

// aplicação de configuração de sessão

app.use(sessionOptions)

// permitindo o uso do flash middleware de mensagens temporárias

app.use(flash());

// ativa o middleware de proteção csrf

app.use(csrf());

// configuração de middlware global

app.use(middlewareGlobal.middlewareGlobal) //  Aplica uma função de middleware global (provavelmente do middleware.js arquivo importado) a todas as rotas.
app.use(middlewareGlobal.checkCsrfError) // usado para verificar e tratar erros CSRF.
app.use(middlewareGlobal.csrfMiddleware) //  gerar e gerenciar tokens CSRF.

app.use(routes) // integra o módulo de rotas importadas, que provavelmente define como o servidor responde a diferentes URLs de solicitação.


// inicialização e registros do servidor

app.on('pronto', () => {
    app.listen(3333, () => {
        console.log('Servidor iniciado!');
        console.log('Acesse pelo link:  http://localhost:3333');
    });

})


