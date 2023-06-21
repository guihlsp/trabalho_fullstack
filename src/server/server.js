const express = require('express');
const db = require('./db');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

db.connect(function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Banco de dados conectado!");
    }
});
//LISTAR
app.get("/api/bebidas/listar", (req, res) => {
    Promise.all([
        new Promise((resolve, reject) => {
            db.query("SELECT * FROM bebidas", (err, result) => {
                if (err) {
                    console.log(err);
                    reject("Erro ao listar bebidas");
                } else {
                    resolve(result);
                }
            });
        }),
        new Promise((resolve, reject) => {
            db.query("SELECT * FROM categorias", (err, result) => {
                if (err) {
                    console.log(err);
                    reject("Erro ao listar categorias");
                } else {
                    resolve(result);
                }
            });
        }),
        new Promise((resolve, reject) => {
            db.query("SELECT * FROM fabricantes", (err, result) => {
                if (err) {
                    console.log(err);
                    reject("Erro ao listar fabricantes");
                } else {
                    resolve(result);
                }
            });
        })
    ])
        .then(([bebidas, categorias, fabricantes]) => {
            res.json({ bebidas, categorias, fabricantes });
        })
        .catch(error => {
            console.log(error);
            res.status(500).send("Erro ao obter os dados");
        });
});

//ADICIONAR
app.get('/api/bebidas/adicionar', (req, res) => {
    Promise.all([
        new Promise((resolve, reject) => {
            db.query("SELECT * FROM categorias", (err, result) => {
                if (err) {
                    console.log(err);
                    reject("Erro ao listar categorias");
                } else {
                    resolve(result);
                }
            });
        }),
        new Promise((resolve, reject) => {
            db.query("SELECT * FROM fabricantes", (err, result) => {
                if (err) {
                    console.log(err);
                    reject("Erro ao listar fabricantes");
                } else {
                    resolve(result);
                }
            });
        })
    ])
    .then(([categorias, fabricantes]) => {
        res.json({ categorias, fabricantes });
    })
    .catch(error => {
        console.log(error);
        res.status(500).send("Erro ao obter os dados");
    });
});
app.post('/api/bebidas/adicionar', (req, res) => {
    const { nome, descricao, categoria_id, fabricante_id, teor_alcoolico } = req.body;
    const query = "INSERT INTO bebidas (nome, descricao, categoria_id, fabricante_id, teor_alcoolico) VALUES (?, ?, ?, ?, ?)";
    db.query(query, [nome, descricao, categoria_id, fabricante_id, teor_alcoolico], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Erro ao adicionar bebida");
        } else {
            res.send("Bebida adicionada com sucesso");
        }
    });
});

//EDITAR
app.put('/api/bebidas/editar/:id', (req, res) => {
    const { id } = req.params;
    const { nome, descricao, categoria_id, fabricante_id, teor_alcoolico } = req.body;
    const query = "UPDATE bebidas SET nome = ?, descricao = ?, categoria_id = ?, fabricante_id = ?, teor_alcoolico = ? WHERE id = ?";
    db.query(query, [nome, descricao, categoria_id, fabricante_id, teor_alcoolico, id], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Erro ao atualizar bebida");
        } else {
            res.send("Bebida atualizada com sucesso");
        }
    });
});

//VISUALIZAR
app.get('/api/bebidas/:id', (req, res) => {
    const { id } = req.params;
    const query = "SELECT * FROM bebidas WHERE id = ?";
    db.query(query, [id], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Erro ao visualizar bebida");
        } else {
            if (result.length === 0) {
                res.status(404).send("Bebida não encontrada");
            } else {
                res.send(result[0]);
            }
        }
    });
});

//DELETAR
app.delete('/api/bebidas/:id', (req, res) => {
    const { id } = req.params;
    const query = "DELETE FROM bebidas WHERE id = ?";
    db.query(query, [id], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Erro ao excluir bebida");
        } else {
            res.send("Bebida excluída com sucesso");
        }
    });
});

app.listen(PORT, () => {
    console.log(`Servidor Express iniciado na porta ${PORT}`);
});
