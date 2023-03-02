//É preciso instalar o handlesbar também: npm install express-handlebars.

//Importando o express:
var express = require('express');

//Iportando handlesbar:
const exphbs = require('express-handlebars')
const mysql = require('mysql')


//Variável para definir o express:
var app = express();
var port = 3000

//Configuração handlesbar:
app.engine('handlebars', exphbs.engine())
app.set('view engine','handlebars')



//Rota:
//Rota raíz:
app.get('/', function(req,res){
    res.render('home', { layout: false})
})

//Express URL:
app.use(
    express.urlencoded({
        extended: true
        
  }) 
  )
  //Rota para inserir dados:
  app.post('/prod/insertprod', (req, res) => {
    const nome = req.body.nome
    const quantidade = req.body.quantidade
  
    const sql = `INSERT INTO produto (nome, quantidade) VALUES ('${nome}', '${quantidade}')`
  
    conn.query(sql, function(err){
        if (err){
            console.log(err)
        }
  
        res.redirect('/')
    })
  })

  
  //Rota de consulta geral:
  app.get('/prod', (req, res) => {
    const sql = 'SELECT * FROM produto'
    
    conn.query(sql, function(err, data){
      if(err){
        console.log(err)
        return
      }
      
      const listar = data
      
      console.log(listar)
      
      res.render('prod', { layout: false, listar })
      
    })
  })
  
  //Consultar um registo pelo id (produto.handlebars):
  app.get('/prod/:id', (req, res) => {
    const id = req.params.id
    
    const sql = `SELECT * FROM produto WHERE id = ${id}`
  
    conn.query(sql, function(err, data){
        if(err){
            console.log(err)
            return
        }
  
        const listarProd = data[0]
        res.render('produto', {  layout: false, listarProd } )
  
    })
  })

//Rota do buscar:
app.get('/busca', (req, res) => {
  res.render('busca', { layout: false })
})

//Rota busc para exibir o resultado do buscar:
app.post('/busc/', (req, res) => {
  const id = req.body.id
  const sql = `SELECT * FROM produto WHERE id = ${id}`

  conn.query(sql, function(err, data){
     if(err){
     console.log(err)
      return
    }
     const listarProd = data[0]
     res.render('produto', {  layout: false, listarProd } )
     })
    })

//Pegando dado para editar registro:
app.get('/prod/edit/:id', (req, res) => {
    
  const id = req.params.id

  const sql = `SELECT * FROM produto where id = ${id}`

  conn.query(sql, function(err, data){
      if(err){
          console.log(err)
          return
      }

      const prod = data[0]
      res.render('edit', { layout: false, prod } )

  })
})

//Rota de edição do registro com post:
app.post('/prod/updateprod', (req, res) => {

  const id = req.body.id
  const nome = req.body.nome
  const quantidade = req.body.quantidade
  
  const sql = `UPDATE produto SET nome = '${nome}', quantidade = '${quantidade}' WHERE id = '${id}'` 

  conn.query(sql, function(err) {
      if(err){
          console.log(err)
          return
      }

      res.redirect('/prod')
  }) 

})


//Rota para deletar um registro:
app.get('/prod/remove/:id', (req, res) => {
  const id = req.params.id

  const sql = `DELETE FROM produto WHERE id = '${id}'`

  conn.query(sql, function(err){
      if(err){
          console.log(err)
          return
      }

      res.redirect('/prod')
  })
})


//Conexão com o banco de dados:
const conn = mysql.createConnection({
    host: 'localhost',    
    port: '3306',
    user:'root',
    password: '',
    database: 'crud'
  
  })

  conn.connect(function(err) {
    if(err){
        console.log(err)
    }
  
    console.log('Conectado com sucesso!')
    
  })

//Configurar o servidor:
app.listen(port, () => {
    console.log(`App rodando na porta ${port}`)
})