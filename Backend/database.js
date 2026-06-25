const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./banco.sqlite', (err) => {
    if (err) {
        console.error("Erro ao abrir o banco de dados:", err);
    } else {
        console.log("Banco de dados SQLite conectado com sucesso.");
        
        db.run(`CREATE TABLE IF NOT EXISTS usuarios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            senha TEXT NOT NULL
        )`);

        db.run(`CREATE TABLE IF NOT EXISTS post (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            id_usuario INTEGER,
            comentario TEXT UNIQUE NOT NULL,
            FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
        )`);

        db.run(`CREATE TABLE IF NOT EXISTS favoritos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            id_usuario INTEGER,
            id_post INTEGER,
            FOREIGN KEY (id_post) REFERENCES post(id),
            FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
        )`);

    }
});

module.exports = db;