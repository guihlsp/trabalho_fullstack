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

// LISTAR
app.get("/api/bebidas/listar", (req, res) => {
    db.query("SELECT * FROM bebidas", (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Erro ao listar bebidas");
        } else {
            res.send(result);
        }
    });
});

// ADICIONAR
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
        })
    ])
        .then(([categorias]) => {
            res.json({ categorias });
        })
        .catch(error => {
            console.log(error);
            res.status(500).send("Erro ao obter os dados");
        });
});

app.post('/api/bebidas/adicionar', (req, res) => {
    const { bebida } = req.body;
    const { nome, descricao, categoria_id, teor_alcoolico, categoria_nome } = bebida;

    const query = "INSERT INTO bebidas (nome, descricao, categoria_id, teor_alcoolico, categoria_nome) VALUES (?, ?, ?, ?, ?)";
    db.query(query, [nome, descricao, categoria_id, teor_alcoolico, categoria_nome], (err, result) => {
        if (err) {
            console.log(err);
            res.json({ status: "error", message: "Não foi possível cadastrar a bebida!" });
        } else {
            res.json({ status: "success", message: "Bebida adicionada com sucesso!" });
        }
    });
});

//EDITAR
app.get('/api/bebidas/editar/:id', (req, res) => {
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
            const { id } = req.params;
            console.log(id)
            const query = "SELECT * FROM bebidas WHERE id = ?";
            db.query(query, [id], (err, result) => {
                if (err) {
                    console.log(err);
                    reject("Erro ao buscar bebida");
                } else {
                    resolve(result[0]);
                }
            });
        })
    ])
        .then(([categorias, bebida]) => {
            res.json({ categorias, bebida });
        })
        .catch(error => {
            console.log(error);
            res.status(500).send("Erro ao obter os dados");
        });
});

app.put('/api/bebidas/editar/:id', (req, res) => {
    const { id } = req.params;
    const { nome, descricao, categoria_id, categoria_nome, teor_alcoolico } = req.body;
    const query = "UPDATE bebidas SET nome = ?, descricao = ?, categoria_id = ?, categoria_nome = ?, teor_alcoolico = ? WHERE id = ?";
    db.query(query, [nome, descricao, categoria_id, categoria_nome, teor_alcoolico, id], (err, result) => {
        if (err) {
            console.log(err);
            res.json({ status: "error", message: "Não foi possível editar a bebida!" });
        } else {
            res.json({ status: "success", message: "Bebida adicionada com sucesso!" });
        }
    });
});

// VISUALIZAR
app.get('/api/bebidas/visualizar/:id', (req, res) => {
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

// DELETAR
app.delete('/api/bebidas/:id', (req, res) => {
    const { id } = req.params;
    const queryDelete = "DELETE FROM bebidas WHERE id = ?";
    const querySelectAll = "SELECT * FROM bebidas";

    db.query(queryDelete, [id], (err, result) => {
        if (err) {
            console.log(err);
            res.json({ status: "error", message: "Não foi possível excluir a bebida!" });
        } else {
            db.query(querySelectAll, (err, result) => {
                if (err) {
                    console.log(err);
                    res.json({ status: "error", message: "Não foi possível excluir a bebida!" });
                } else {
                    res.json({ status: "success", message: "Bebida excluída com sucesso!", data: result});
                }
            });
        }
    });
});

// LISTAR CATEGORIAS
app.get("/api/categorias/listar", (req, res) => {
    db.query("SELECT * FROM categorias", (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Erro ao listar categorias");
        } else {
            res.send(result);
        }
    });
});

// ADICIONAR CATEGORIA
app.post('/api/categorias/adicionar', (req, res) => {
    const { nome } = req.body;

    const query = "INSERT INTO categorias (nome) VALUES (?)";
    db.query(query, [nome], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Erro ao adicionar categoria");
        } else {
            res.json({ status: "success", message: "Categoria adicionada com sucesso" });
        }
    });
});

// EDITAR CATEGORIA
app.put('/api/categorias/editar/:id', (req, res) => {
    const { id } = req.params;
    const { nome } = req.body;
    console.log('Editar categoria:', id);
    console.log('Novo nome:', nome);
    
    const query = "UPDATE categorias SET nome = ? WHERE id = ?";
    db.query(query, [nome, id], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Erro ao editar categoria");
        } else {
            res.json({ status: "success", message: "Categoria editada com sucesso" });
        }
    });
});

// VISUALIZAR CATEGORIA
app.get('/api/categorias/visualizar/:id', (req, res) => {
    const { id } = req.params;
    const query = "SELECT * FROM categorias WHERE id = ?";
    db.query(query, [id], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Erro ao visualizar categoria");
        } else {
            if (result.length === 0) {
                res.status(404).send("Categoria não encontrada");
            } else {
                res.send(result[0]);
            }
        }
    });
});

// DELETAR CATEGORIA
app.delete('/api/categorias/:id', (req, res) => {
    const { id } = req.params;
    const queryDelete = "DELETE FROM categorias WHERE id = ?";
    const querySelectAll = "SELECT * FROM categorias";

    db.query(queryDelete, [id], (err, result) => {
        if (err) {
            console.log(err);
            res.json({ status: "error", message: "Não foi possível excluir a categorias!" });
        } else {
            db.query(querySelectAll, (err, result) => {
                if (err) {
                    console.log(err);
                    res.json({ status: "error", message: "Não foi possível excluir a categorias!" });
                } else {
                    res.json({ status: "success", message: "Categoria excluída com sucesso!", data: result});
                }
            });
        }
    });
});

app.post('/api/categorias/adicionar', (req, res) => {
    const { nome } = req.body;

    const query = "INSERT INTO categorias (nome) VALUES (?)";
    db.query(query, [nome], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Erro ao adicionar categoria");
        } else {
            res.json({ status: "success", message: "Categoria adicionada com sucesso" });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Servidor Express iniciado na porta ${PORT}`);
});
