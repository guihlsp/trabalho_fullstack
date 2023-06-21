import React, { useEffect, useState } from 'react';
import { Card, Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import api from '../../service/api';

function ListaBebidas() {
  const [bebidas, setBebidas] = useState([]);

  useEffect(() => {
    api.get('bebidas/listar')
      .then(response => {
        setBebidas(response.data);
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
          <Link to="/bebidas/adicionar" className="btn btn-primary">
            Cadastrar Nova Bebida
          </Link>
        </div>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Categoria</th>
              <th>Fabricante</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {bebidas.map(bebida => (
              <tr key={bebida.id}>
                <td>{bebida.nome}</td>
                <td>{bebida.descricao}</td>
                <td>{bebida.categoria}</td>
                <td>{bebida.fabricante}</td>
                <td>
                  <Button variant="info">Editar</Button>{' '}
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(bebida.id)}
                  >
                    Excluir
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
