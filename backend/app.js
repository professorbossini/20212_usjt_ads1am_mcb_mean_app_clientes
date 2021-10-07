const express = require('express');
const app = express();

// app.use((req, res, next) => {
//   console.log ("a primeira requisição chegou");
//   next();
// });

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

app.use('/api/clientes', (req, res, next) => {
  res.status(200).json({
    mensagem: "DEU CERTOOO",
    clientes: clientes});
});

module.exports = app;
