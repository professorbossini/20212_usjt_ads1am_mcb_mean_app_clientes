require('dotenv').config()
const express = require('express');
const cors = require ('cors')
const Cliente = require ('./models/cliente')
const mongoose = require ('mongoose')
const clienteRoutes = require ('./rotas/cliente');
const app = express();
app.use(express.json())
app.use(cors())

mongoose.connect(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.${process.env.MONGODB_ADDRESS}.mongodb.net/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`)
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

app.use('/api/clientes', clienteRoutes);
module.exports = app;
