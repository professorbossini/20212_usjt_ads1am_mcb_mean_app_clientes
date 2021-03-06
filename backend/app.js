require('dotenv').config()
const path = require('path')
const express = require('express');
const cors = require ('cors')
const Cliente = require ('./models/cliente')
const mongoose = require ('mongoose')
const clienteRoutes = require ('./rotas/cliente');
const usuariosRoutes = require ('./rotas/usuario');
const app = express();
app.use(express.json())
app.use(cors())

mongoose.connect(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.${process.env.MONGODB_ADDRESS}.mongodb.net/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority`)
.then(() =>  console.log ("CONEXAO OK"))
.catch (e => console.log ("CONEXAO NOK: " + e))

app.use('/imagens', express.static(path.join('backend/imagens')))

app.use('/api/clientes', clienteRoutes);
app.use('/api/usuarios', usuariosRoutes);

module.exports = app;
