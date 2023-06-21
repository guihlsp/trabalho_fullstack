import React from 'react';
import { Button } from 'react-bootstrap';

const VisualizacaoBebida = ({ bebida }) => {
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
};

export default VisualizacaoBebida;
