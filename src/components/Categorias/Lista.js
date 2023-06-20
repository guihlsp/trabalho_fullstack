import React, { useEffect, useState } from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
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
    <div>
      <Row>
        <Col>
          <Link to="/bebidas/adicionar" className="btn btn-primary mb-4">
            Cadastrar Nova Bebida
          </Link>
        </Col>
      </Row>
      <Row>
        {bebidas.map(bebida => (
          <Col key={bebida.id} xs={12} sm={6} md={4} lg={3}>
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>{bebida.nome}</Card.Title>
                <Card.Text>{bebida.descricao}</Card.Text>
                <Card.Text>Categoria: {bebida.categoria}</Card.Text>
                <Button variant="info">Editar</Button>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(bebida.id)}
                >
                  Excluir
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default ListaBebidas;
