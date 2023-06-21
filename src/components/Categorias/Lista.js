import React, { useEffect, useState } from 'react';
import { Card, Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import api from '../../service/api';

function ListaCategorias() {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    api.get('categorias/listar')
      .then(response => {
        setCategorias(response.data)
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleDelete = id => {
    // Lógica para enviar o ID da categoria para o backend e excluir a categoria
    api.delete('categorias/' + id)
      .then(response => {
        setCategorias(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <Card className="mx-auto mt-4" style={{ maxWidth: '800px' }}>
      <Card.Header className="text-center">
        <h4>Lista de Categorias</h4>
      </Card.Header>
      <Card.Body>
        <div className="text-right mb-3">
          <Link to="/categorias/adicionar" className="btn btn-warning" size="lg">
            <div className="d-flex align-items-center">
            <span className="material-icons fs-4">
              add
            </span>
            Cadastrar categoria
            </div>
          </Link>
        </div>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Nome</th>
              <th style={{ width: "130px", minWidth: "130px", textAlign: "center" }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {categorias.map(categoria => (
              <tr key={categoria.id}>
                <td>{categoria.nome}</td>
                <td className='d-flex justify-content-around'>
                  <Link
                    className="btn btn-primary"
                    to={'/categorias/visualizar/'+categoria.id}
                    variant="primary"
                    style={{ width: "30px", height: "30px" }}
                    onClick={() => handleDelete(categoria.id)}
                  >
                    <div className='d-flex justify-content-center'>
                      <span className='material-icons fs-5 text-dark'>
                        search
                      </span>
                    </div>
                  </Link>
                  <Link
                    className='btn btn-warning'
                    to={'/categorias/editar/'+categoria.id}
                    style={{ width: "30px", height: "30px" }}
                    variant="warning">
                    <div className='d-flex justify-content-center'>
                      <span className='material-icons fs-5'>
                        edit
                      </span>
                    </div>
                  </Link>
                  <Button
                    variant="danger"
                    style={{ width: "30px", height: "30px" }}
                    onClick={() => handleDelete(categoria.id)}
                  >
                    <div className='d-flex justify-content-center'>
                      <span className='material-icons fs-5 text-dark'>
                        clear
                      </span>
                    </div>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
}
export default ListaCategorias;