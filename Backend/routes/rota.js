const express = require('express');
const router = express.Router();
const db = require('../database'); 

router.post('/cadastro', (req, res) => {
    const { nome, email, senha, confirmacaoSenha  } = req.body;

    if (!nome || !email || !senha || !confirmacaoSenha) {
        return res.status(400).json({
            erro: "Todos os campos são obrigatórios."
        });
    }

    if (senha !== confirmacaoSenha) {
         return res.status(400).json({
            erro: "As senhas não coincidem."
        });
    }

    if (senha.length < 6) {
        return res.status(400).json({
            erro: "A senha deve ter no mínimo 6 caracteres."
        });
    }

    const regexSeguranca = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).+$/;

    if (!regexSeguranca.test(senha)) {
        return res.status(400).json({
            erro: "Senha fraca."
        });
    }

    const sql = "INSERT INTO usuarios(nome,email,senha) VALUES(?,?,?)";

    db.run(sql, [nome, email, senha], function(err) {

        if (err) {
            return res.status(400).json({
                erro: "Email já cadastrado."
            });
        }

        res.status(201).json({
            mensagem: "Usuário cadastrado com sucesso!",
            id: this.lastID
        });

    });

});


router.post('/login', (req, res) => {

    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({
            erro: "Preencha todos os campos."
        });
    }

    db.get(
        "SELECT * FROM usuarios WHERE email=? AND senha=?",
        [email, senha],
        (err, usuario) => {

            if (err) {
                return res.status(500).json({
                    erro: "Erro no servidor."
                });
            }

            if (!usuario) {
                return res.status(401).json({
                    erro: "Email ou senha inválidos."
                });
            }

            res.json({
                mensagem: "Login realizado com sucesso!",
                usuario
            });

        }
    );

});

router.post('/logout', (req, res) => {

    res.json({
        mensagem: "Logout realizado com sucesso."
    });

});

router.post('/post', (req, res) => {

    const { id_usuario, comentario } = req.body;

    if (!id_usuario || !comentario) {
        return res.status(400).json({
            erro: "Preencha todos os campos."
        });
    }

    db.run(
        "INSERT INTO post(id_usuario,comentario) VALUES(?,?)",
        [id_usuario, comentario],
        function(err) {

            if (err) {
                return res.status(400).json({
                    erro: "Erro ao criar post."
                });
            }

            res.status(201).json({
                mensagem: "Post criado!",
                id: this.lastID
            });

        }
    );

});

router.post('/favoritos', (req, res) => {

    const { id_usuario, id_post } = req.body;

    db.run(
    "INSERT INTO favoritos(id_usuario,id_post) VALUES(?,?)",
    [id_usuario, id_post],
    function(err) {

        if (err) {
            return res.status(400).json({
                erro: "Erro ao favoritar.",
                detalhes: err.message
            });
        }

        res.status(201).json({
            mensagem: "Favorito salvo!"
        });

    }
);

});

router.get('/favoritos/:id_usuario', (req, res) => {

    const { id_usuario } = req.params;

    db.all(
        "SELECT * FROM favoritos WHERE id_usuario=?",
        [id_usuario],
        (err, rows) => {

            if (err) {
                return res.status(500).json({
                    erro: "Erro ao buscar favoritos."
                });
            }

            res.json(rows);

        }
    );

});

module.exports = router;