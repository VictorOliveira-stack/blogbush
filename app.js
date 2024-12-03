const Express = require('express')
const app = Express()

app.get('/', (req,res) => {
    return res.render("feed.handlebars")
})

app.listen( process.env.PORT || 3000, function(){
    console.log('3000')
})