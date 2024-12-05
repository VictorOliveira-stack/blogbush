require('dotenv').config()

const Express = require("express")
const app = Express()
//const port = process.env.PORT || 8080 /*3000*/;

const handlebars = require ('express-handlebars')

const bodyParser = require("body-parser")

const Post = require ('./models/post')

const db = require("./models/db")
const { connect } = require('http2')

//const sequelize= require('./models/db'); // Importa o Sequelize configurado
const { QueryTypes } = require('sequelize');
const {sequelize} = db;

const Sequelize = require("sequelize")
//const sequelize = Sequelize
/*//sequelize?
const seqdb = require('./models/db')*/


//
const path = require('path')


const passport = require('passport')



//tentando renderizar no feed
                /*feed*/
                app.get('/', function(req, res){
                    Post.findAll({order: [['id', 'DESC']]}).then(function(posts){
                     const postDat = db.posts.map( posta => ({
                        createdAt: posta.createdAt, /*remover esse db. quando a internet voltar se nao der certo*/
                        titulo: posta.titulo,
                        conteudo: posta.conteudo,
                        url: posta.url,
                        createdAt: posta.createdAt
                     }))   
                   
                        return res.render("feed.handlebars", {posts: postDat})
                        
                     })
                })


function authenticateMiddleware(req, res, next){
    if(req.isAutenticated()) return next()
    res.redirect('/login')
}

require('./auth')(passport)

//session

const session = require('express-session')




/*const redis = require('redis');
const connectRedis = require('connect-redis')
const client = redis.createClient();

const RedisStore = connectRedis(session)*/
const senhaUm = process.env.B_senha1

const SequelizeStore = require('connect-session-sequelize')(session.Store);

//app.use(session({
    // //store: new RedisStore({client}),
   //secret:  '$2y$10$iVPQaFphSF4XnQFez6Jize5lHEbE7PRITZfbqapGhK5UwEX8Gtghq' /*senhaUm*/, /*process.env.B_usuario,*/
   //resave: false,
  // saveUninitialized: false,
  // store: new SequelizeStore({
   // db: db.sequelize, // Banco de dados onde a sessão será armazenada
  //}),
 //   cookie: {maxAge: 10 * 60 *1000}
//}))
/*sequelize.sync().then(() => {
    console.log("Sessões serão armazenadas no banco de dados.");
  });*/
  sequelize.authenticate()
    .then(() => console.log("Conexão com banco de dados bem-sucedida."))
    .catch(err => {
        console.error("Erro ao conectar no banco:", err);
        process.exit(1); // Encerra o servidor se o banco estiver inacessível
    });

    //const SequelizeStore = require('connect-session-sequelize')(session.Store);

app.use(session({
  store: new SequelizeStore({
    db: db.sequelize,
    checkExpirationInterval: 15 * 60 * 1000, // A cada 15 minutos
    expiration: 24 * 60 * 60 * 1000 // Expira em 24 horas
  }),
  secret: 'seu-segredo',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 10 * 60 * 1000 } // Ajuste o tempo do cookie se necessário
}));

app.use(passport.initialize())
app.use(passport.session())


//configurações

//template engine
app.engine('handlebars', handlebars({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

//body parser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


//rotas



//view home
//estou tentando a pag home ter altenticaçao
app.post('/home', function(req, res){
    Post.findAll({order: [['id', 'DESC']]}).then(function(posts){
     const postData = posts.map( post => ({
        createdAt: post.createdAt,
        titulo: post.titulo,
        conteudo: post.conteudo,
        url: post.url
     }))   
   
        res.render("home.handlebars", {posts: postData})
     })
})



//mudando pra apos cliclar no botao postar (/form) mudar para a pag login, apos o login mudar para /form

//formulario de login
app.get('/login', function(req, res){
    res.render('login.handlebars')
})

//passport autenticaÇão local
/*passport.use(new LocalStrategy(
    function(username, password, done) {
      User.findOne({ username: username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        if (!user.verifyPassword(password)) { return done(null, false); }
        return done(null, user);
      });
    }
  ));*/

  


  //
  app.post('/login', 
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    //res.redirect('/form');
    res.render('formulario.handlebars')
  })

//formulario de postagem
app.get('/form',authenticateMiddleware, function(req, res){
    res.render('formulario.handlebars')
})

app.post('/add',/*authenticateMiddleware,*/ function(req,res){
    Post.create({
        titulo: req.body.titulo,
        conteudo: req.body.conteudo,
        url : req.body.url
    }).then(function(){
        res.redirect('/'/*'/feed'*//*'/home'*/)
    }).catch(function(erro){
        res.send('houve um erro' + erro)
    })
})



//rotas do delete
 app.get('/delet', function(req,res){
    res.render('delete.handlebars')
 })

//vou substituir o botao delete pra renderizar um html e apos verificacao por senha apagar o post
        //no antigo html estava assim  a rota /deletar/ com duas//

app.get('/deletar/:createdAt',  function(req, res){
    Post.destroy({where: {'createdAt': req.params.createdAt}}).then(function(){
        //res.send('postagem deletada')
        res.redirect( '/' /*'/feed'*/ /*'/home'*/)
    }).catch(function(erro){
        res.send('essa postagem não existe!' + erro)
    })
})

//pesquisar
/*app.post('/pesquisar', (req, res) => {
    const { titulo } = req.body; //ver depois se esse "titulo" funciona
    const query = `SELECT * FROM usuarios WHERE nome LIKE ?`;

    seqdb.query(query, [`%${titulo}%`], (err, results) => {
        if (err) {
            console.error('Erro ao buscar dados:', err);
            return res.sendStatus(500);
        }
        res.render('pesquisar.handlebars', { results });
    });
});*/

/*app.post('/pesquisar', (req, res) => {
    const { titulo } = req.body; // Extrai o "titulo" do formulário

    // Consulta com Sequelize
    const query = `SELECT * FROM usuarios WHERE nome LIKE ?`;

    seqdb.sequelize.query(query, {
        replacements: [`%${titulo}%`], // Substitui o "?" no SQL com `%titulo%`
        type: seqdb.sequelize.QueryTypes.SELECT // Tipo de consulta SELECT
    })
    .then(results => {
        res.render('pesquisar', { results }); // Renderiza os resultados
    })
    .catch(err => {
        console.error('Erro ao buscar dados:', err);
        res.sendStatus(500);
    });
});*/



app.post('/pesquisar', (req, res) => {
    const { titulo } = req.body;
    console.log(titulo)

    const query = `SELECT * FROM blogbush4s WHERE titulo LIKE ?`;

    db.sequelize.query(query, {
        replacements: [`%${titulo}%`], // Substitui o "?" com `%titulo%`
        type: QueryTypes.SELECT // Usa QueryTypes.SELECT diretamente
    })
    .then(results => {
        res.render('pesquisa.handlebars', { results });
    })
    .catch(err => {
        console.error('Erro ao buscar dados:', err);
        res.sendStatus(500);
    });
});


//css
//app.use(Express.static('views'))
//app.use(Express.static('css'))

app.use(Express.static(path.join(__dirname, 'public')))




app.get('/favicon.ico', (req, res) => res.status(204).send());

app.listen( process.env.PORT || "0.0.0.0", function(){
    console.log("porta rodando")
})