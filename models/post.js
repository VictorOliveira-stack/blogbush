const db = require ('./db')

const Post = db.sequelize.define('blogbush4s1s',{
    titulo: {
        type: db.Sequelize.STRING

    },
    conteudo: {
    type: db.Sequelize.TEXT
},
    url: {
        type: db.Sequelize.TEXT
    }
})

/*Post.create({
    titulo: 'Exemplo de Título',
    conteudo: 'Aqui está o conteúdo do post.'
})
    .then(post => {
        console.log('Post criado:', post);
    })
    .catch(error => {
        console.error('Erro ao criar post:', error);
    });*/

//Post.sync({force: true})

module.exports = Post

