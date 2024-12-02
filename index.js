require('dotenv').config()

const Express = require("express")
const app = Express()

const handlebars = require ('express-handlebars')

const bodyParser = require("body-parser")

const Post = require ('./models/post')

const sequelize= require('./models/db'); // Importa o Sequelize configurado
const { QueryTypes } = require('sequelize');

const Sequelize = require("sequelize")
//const sequelize = Sequelize
/*//sequelize?
const seqdb = require('./models/db')*/


//
const path = require('path')


const passport = require('passport')

const session = require('express-session')

function authenticateMiddleware(req, res, next){
    if(req.isAutenticated()) return next()
    res.redirect('/login')
}

require('./auth')(passport)

//session
const senhaUm = process.env.B_senha1

app.use(session({
    secret: senhaUm, /*process.env.B_usuario,*/
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 10 * 60 *1000}
}))
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

//tentando renderizar no feed
app.get('/feed', function(req, res){
    Post.findAll({order: [['id', 'DESC']]}).then(function(posts){
     const postDat = posts.map( posta => ({
        createdAt: posta.createdAt,
        titulo: posta.titulo,
        conteudo: posta.conteudo,
        url: posta.url,
        createdAt: posta.createdAt
     }))   
   
        res.render("feed.handlebars", {posts: postDat})
     })
})

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
        res.redirect('/feed'/*'/home'*/)
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
        res.redirect('/feed' /*'/home'*/)
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

const db = require("./models/db")

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
app.use(Express.static('views'))
app.use(Express.static('css'))






app.listen(2021, function(){
    console.log("porta rodando")
})