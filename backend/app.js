require('dotenv').config()
const express = require('express');
const cors = require ('cors')
const Cliente = require ('./models/cliente')
const mongoose = require ('mongoose')
const app = express();
app.use(express.json())
app.use(cors())

mongoose.connect(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.ssm0w.mongodb.net/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`)
.then(() =>  console.log ("CONEXAO OK"))
.catch (e => console.log ("CONEXAO NOK: " + e))

const clientes = [
  {
    id: '1',
    nome: 'Ana',
    fone: '12345678',
    email: 'ana@email.com'
  },
  {
    id: '2',
    nome: 'Gil',
    fone: '87654321',
    email: 'gil@email.com'
  }
]


//GET localhost:3000/api/clientes
app.get('/api/clientes', (req, res) => {
  res.status(200).json({
    mensagem: "DEU CERTOOO",
    clientes: clientes});
});

//POST localhost:3000/api/clientes
app.post('/api/clientes', (req, res) => {
  const cliente = new Cliente({
    nome: req.body.nome,
    fone: req.body.fone,
    email: req.body.email
  })
  cliente.save()
  console.log(cliente)
  res.status(201).json({mensagem: "Cliente inserido"})
})
module.exports = app;
