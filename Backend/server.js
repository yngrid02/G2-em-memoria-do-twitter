const express = require('express');
const cors = require('cors');
const routes = require('./routes/rota.js');

require('./database');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ mensagem: 'Servidor funcionando!' });
});

app.use(routes);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Rodando na porta ${PORT}`);
});