const Express = require('express')
const app = Express()
const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.send('Servidor está funcionando!');
});

app.listen( PORT , function(){
    console.log('app rodando')
})