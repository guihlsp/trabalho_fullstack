import React, { useEffect, useState } from 'react';
import { Card, Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import api from '../../service/api';

function ListaBebidas() {
  const [bebidas, setBebidas] = useState([]);

  useEffect(() => {
    api.get('bebidas/listar')
      .then(response => {
        setBebidas(response.data)
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleDelete = id => {
    // Lógica para enviar o ID da bebida para o backend e excluir a bebida
    api.delete('bebidas/' + id)
      .then(response => {
        setBebidas(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <Card className="mx-auto mt-4" style={{ maxWidth: '800px' }}>
      <Card.Header className="text-center">
        <h4>Lista de Bebidas</h4>
      </Card.Header>
      <Card.Body>
        <div className="text-right mb-3">
          <Link to="/bebidas/adicionar" className="btn btn-warning" size="lg">
            <div className="d-flex align-items-center">
            <span className="material-icons fs-4">
              add
            </span>
            Cadastrar bebida
            </div>
          </Link>
        </div>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Categoria</th>
              <th>Fabricante</th>
              <th style={{ width: "130px", minWidth: "130px", textAlign: "center" }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {bebidas.map(bebida => (
              <tr key={bebida.id}>
                <td>{bebida.nome}</td>
                <td>{bebida.descricao}</td>
                <td>{bebida.categoria_nome}</td>
                <td>{bebida.fabricante_nome}</td>
                <td className='d-flex justify-content-around'>
                  <Link
                    className="btn btn-primary"
                    to={'/bebidas/visualizar/'+bebida.id}
                    variant="primary"
                    style={{ width: "30px", height: "30px" }}
                    onClick={() => handleDelete(bebida.id)}
                  >
                    <div className='d-flex justify-content-center'>
                      <span className='material-icons fs-5 text-dark'>
                        search
                      </span>
                    </div>
                  </Link>
                  <Link
                    className='btn btn-warning'
                    to={'/bebidas/editar/'+bebida.id}
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
                    onClick={() => handleDelete(bebida.id)}
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

export default ListaBebidas;