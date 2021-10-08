const express = require('express');
const cors = require ('cors')
const app = express();
app.use(express.json())
app.use(cors())

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
  const cliente = req.body
  console.log(cliente)
  res.status(201).json({mensagem: 'Cliente inserido'})
})
module.exports = app;
