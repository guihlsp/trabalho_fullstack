import React, { useEffect, useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import api from '../../service/api';
import { useParams, useNavigate, Link } from 'react-router-dom';

const FormularioBebida = (props) => {
    let id = useParams().id;
    const navigate = useNavigate();

    const [categorias, setCategorias] = useState([]);
    const [bebida, setFormValues] = useState({
        nome: '',
        descricao: '',
        categoria: '',
        categoria_nome: '',
        teor_alcoolico: '',
    });
    const [alertMessageSuccess, setAlertMessageSucces] = useState('');
    const [alertMessageError, setAlertMessageError] = useState('');

    useEffect(() => {
        if (props.action === 'adicionar') {
            api.get('bebidas/adicionar')
                .then(response => {
                    const { categorias } = response.data;
                    setCategorias(categorias);
                })
                .catch(error => {
                    console.log(error);
                });
        } else if (props.action === 'editar') {
            api.get(`bebidas/editar/${id}`)
                .then(response => {
                    const { bebida, categorias } = response.data;
                    setFormValues(bebida);
                    setCategorias(categorias);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }, [props.action, id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues(prevState => ({
            ...prevState,
            [name]: value,
            categoria_id: name === 'categoria' ? e.target.value : prevState.categoria_id,
            categoria_nome: name === 'categoria' ? e.target.options[e.target.selectedIndex].text : prevState.categoria_nome,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let url = '/bebidas/';
        if (props.action === 'editar') {
            api.put(url + 'editar/' + id, {
                bebida,
            })
                .then(response => {
                    const { status, message } = response.data;
                    if (status === 'error') {
                        setAlertMessageError(message);
                        setTimeout(() => {
                            setAlertMessageError('');
                        }, 1500);
                    } else {
                        setAlertMessageSucces(message);
                        setTimeout(() => {
                            setAlertMessageSucces('');
                            navigate('/bebidas');
                        }, 1500);
                    }
                })
                .catch(error => {
                    console.log(error)
                });
        } else {
            api.post(url + 'adicionar', {
                bebida,
            })
                .then(response => {
                    const { status, message } = response.data;
                    if (status === 'error') {
                        setAlertMessageError(message);
                        setTimeout(() => {
                            setAlertMessageError('');
                        }, 1500);
                    } else {
                        setAlertMessageSucces(message);
                        setTimeout(() => {
                            setAlertMessageSucces('');
                            navigate('/bebidas');
                        }, 1500);
                    }
                })
                .catch(error => {
                    console.log(error)
                });
        }
    };

    return (
        <Card className="mx-auto mt-4" style={{ maxWidth: '800px' }}>
            <Card.Header className=''>
                <Link to="/bebidas" style={{ position: 'absolute', marginTop: '5px', color: 'black' }}>
                    <span className="material-icons">arrow_back</span>
                </Link>
                <div className="text-center">
                    <h4>{props.action === 'editar' ? 'Editar' : 'Adicionar'} bebida</h4>
                </div>
            </Card.Header>
            <Card.Body>
                {alertMessageSuccess && (
                    <div className="alert alert-success">{alertMessageSuccess}</div>
                )}
                {alertMessageError && (
                    <div className="alert alert-danger">{alertMessageError}</div>
                )}
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="nome">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control
                            type="text"
                            name="nome"
                            value={bebida.nome || ''}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="descricao" className='mt-2'>
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control
                            as="textarea"
                            name="descricao"
                            value={bebida.descricao || ''}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="categoria" className='mt-2'>
                        <Form.Label>Categoria</Form.Label>
                        <Form.Control
                            as="select"
                            name="categoria"
                            value={bebida.categoria || ''}
                            onChange={handleInputChange}
                        >
                            <option value="">Selecione uma categoria</option>
                            {categorias.map(categoria => (
                                <option key={categoria.id} value={categoria.id}>{categoria.nome}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="teor_alcoolico" className='mt-2'>
                        <Form.Label>Teor alcóolico (%)</Form.Label>
                        <Form.Control
                            type="text"
                            name="teor_alcoolico"
                            value={bebida.teor_alcoolico || ''}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Button variant="warning" type="submit" className='mt-3'>
                        Salvar
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default FormularioBebida;