const express = require('express');
const app = express();

// Habilitando o CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});


// Rotas

app.get('/nomes', (req, res) => {
    console.log('Requisição recebida para /nomes');
    res.json(['Ana', 'Maria', 'João', 'Pedro']);
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});