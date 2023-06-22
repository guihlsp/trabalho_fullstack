import React, { useEffect, useState } from 'react';
import { Card, Button, Table } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import api from '../../service/api';

function ListaBebidas() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const busca = params.get('busca');

  const [bebidas, setBebidas] = useState([]);
  const [alertMessageSuccess, setAlertMessageSucces] = useState('');
  const [alertMessageError, setAlertMessageError] = useState('');

  useEffect(() => {
    api.get('bebidas/listar' + (busca ? `?busca=${busca}`: ''))
      .then(response => {
        setBebidas(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, !busca ? [] : [busca]);

  const handleDelete = id => {
    api.delete('bebidas/' + id)
      .then(response => {
        const { status, message } = response.data;
        if (status === 'error') {
          setAlertMessageError(message);
          setTimeout(() => {
            setAlertMessageError('');
          }, 1500);
        } else {
          setBebidas(prevBebidas => prevBebidas.filter(bebida => bebida.id !== id));
          setAlertMessageSucces(message);
          setTimeout(() => {
            setAlertMessageSucces('');
          }, 1500);
        }
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
        {alertMessageSuccess && (
          <div className="alert alert-success">{alertMessageSuccess}</div>
        )}
        {alertMessageError && (
          <div className="alert alert-danger">{alertMessageError}</div>
        )}
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
              <th style={{ width: "130px", minWidth: "130px", textAlign: "center" }}>Ações</th>
            </tr>
          </thead>
          {bebidas.length > 0 ? (
            <tbody>
              {bebidas.map(bebida => (
                <tr key={bebida.id}>
                  <td>{bebida.nome}</td>
                  <td>{bebida.descricao}</td>
                  <td>{bebida.categoria_nome}</td>
                  <td className='d-flex justify-content-around'>
                    <Link
                      className="btn btn-primary"
                      to={'/bebidas/visualizar/' + bebida.id}
                      variant="primary"
                      style={{ width: "30px", height: "30px" }}
                    >
                      <div className='d-flex justify-content-center'>
                        <span className='material-icons fs-5 text-dark'>
                          search
                        </span>
                      </div>
                    </Link>
                    <Link
                      className='btn btn-warning'
                      to={'/bebidas/editar/' + bebida.id}
                      style={{ width: "30px", height: "30px" }}
                      variant="warning"
                    >
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
          ) : (
            <tbody>
              <tr>
                <td colSpan={5} className="text-center">
                  Nenhuma bebida encontrada!
                </td>
              </tr>
            </tbody>
          )}
        </Table>
      </Card.Body>
    </Card>
  );
}

export default ListaBebidas;  