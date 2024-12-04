const Express = require('express')
const app = Express()
const PORT = process.env.PORT

app.get('/' , function(req, res){
    return res.send('ola!')
})

app.listen(PORT || 3000, function(){
    console.log('rodando')
})