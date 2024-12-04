const Express = require('express')
const app = Express()
//const PORT = process.env.PORT || 3000 || 8080

app.get('/' , function(req, res){
    return res.send('ola!')
})

app.listen(3000 || 8080, "0.0.0.0", function(){
    console.log('rodando')
})