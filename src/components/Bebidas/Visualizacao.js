import React, { useEffect, useState } from 'react';
import { Card, Table } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import api from '../../service/api';

const VisualizacaoBebida = () => {
  const { id } = useParams();
  const [bebida, setBebida] = useState(null);

  useEffect(() => {
    api.get(`bebidas/visualizar/${id}`)
      .then(response => {
        setBebida(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [id]);

//   if (!bebida) {
//     window.location.href = '/bebidas';
//   }

  return (
    <Card className="mx-auto mt-4" style={{ maxWidth: '800px' }}>
      <Card.Header className=''>
        <Link to="/bebidas" style={{ position: 'absolute', marginTop: '5px', color: 'black' }}>
          <span className="material-icons">arrow_back</span>
        </Link>
        <div className="text-center">
          <h4>Detalhes</h4>
        </div>
      </Card.Header>
      <Card.Body>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Categoria</th>
            </tr>
          </thead>
          <tbody>
            <tr key={bebida?.id}>
              <td>{bebida?.nome}</td>
              <td>{bebida?.descricao}</td>
              <td>{bebida?.categoria_nome}</td>
            </tr>
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default VisualizacaoBebida;
