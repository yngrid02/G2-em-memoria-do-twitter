const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database("./database/banco.db");

db.serialize(() => {

db.run(`
CREATE TABLE IF NOT EXISTS usuarios(

id INTEGER PRIMARY KEY AUTOINCREMENT,

nome TEXT,

email TEXT UNIQUE,

senha TEXT

)
`);

});

app.post("/cadastro",(req,res)=>{

const {nome,email,senha}=req.body;

if(!nome || !email || !senha){

return res.status(400).json({

erro:"Todos os campos são obrigatórios"

});

}

db.run(

"INSERT INTO usuarios(nome,email,senha) VALUES(?,?,?)",

[nome,email,senha],

function(err){

if(err){

return res.status(500).json({

erro:"Erro ao cadastrar"

});

}

res.json({

mensagem:"Cadastro realizado"

});

}

);

});

app.post("/login",(req,res)=>{

const {email,senha}=req.body;

db.get(

"SELECT * FROM usuarios WHERE email=? AND senha=?",

[email,senha],

(err,row)=>{

if(err){

return res.status(500).json({

erro:"Erro"

});

}

if(!row){

return res.status(401).json({

erro:"Usuário não encontrado"

});

}

res.json({

mensagem:"Login realizado"

});

}

);

});

app.listen(3000,()=>{

console.log("Servidor rodando");

});
