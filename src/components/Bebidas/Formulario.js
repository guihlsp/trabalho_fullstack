import React, { useEffect, useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import api from '../../service/api';
import { useParams } from 'react-router-dom';

const FormularioBebida = (props) => {
    let id = useParams().id;

    const [categorias, setCategorias] = useState([]);
    const [fabricantes, setFabricantes] = useState([]);
    const [bebida, setFormValues] = useState({
        nome: '',
        descricao: '',
        categoria: '',
        fabricante: '',
        teor_alcoolico: '',
    });

    useEffect(() => {
        if (props.action === 'adicionar') {
            api.get('bebidas/adicionar')
                .then(response => {
                    const { categorias, fabricantes } = response.data;
                    setCategorias(categorias);
                    setFabricantes(fabricantes);
                })
                .catch(error => {
                    console.log(error);
                });
        } else if (props.action === 'editar') {
            api.get(`bebidas/editar/${id}`)
                .then(response => {
                    const { bebida, categorias, fabricantes } = response.data;
                    setFormValues(bebida);
                    setCategorias(categorias);
                    setFabricantes(fabricantes);
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
                    console.log(response);
                })
                .catch(error => {
                    console.log(error);
                });
        } else {
            api.post(url + 'adicionar', {
                bebida,
            })
                .then(response => {
                    console.log(response);
                })
                .catch(error => {
                    console.log(error);
                });
        }
        // Lógica para enviar os dados do formulário para o backend e adicionar ou atualizar uma bebida
    };

    return (
        <Card className="mx-auto mt-4" style={{ maxWidth: '800px' }}>
            <Card.Header className="text-center">
                <h4>{props.action === 'editar' ? 'Editar' : 'Adicionar'} bebida</h4>
            </Card.Header>
            <Card.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="nome">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control
                            type="text"
                            name="nome"
                            value={bebida.nome}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="descricao" className='mt-2'>
                        <Form.Label>Descrição</Form.Label>
                        <Form.Control
                            as="textarea"
                            name="descricao"
                            value={bebida.descricao}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="categoria" className='mt-2'>
                        <Form.Label>Categoria</Form.Label>
                        <Form.Control
                            as="select"
                            name="categoria"
                            value={bebida.categoria}
                            onChange={handleInputChange}
                        >
                            <option value="">Selecione uma categoria</option>
                            {categorias.map(categoria => (
                                <option key={categoria.id} value={categoria.id}>{categoria.nome}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="fabricante" className='mt-2'>
                        <Form.Label>Fabricante</Form.Label>
                        <Form.Control
                            as="select"
                            name="fabricante"
                            value={bebida.fabricante}
                            onChange={handleInputChange}
                        >
                            <option value="">Selecione um fabricante</option>
                            {fabricantes.map(fabricante => (
                                <option key={fabricante.id} value={fabricante.id}>{fabricante.nome}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="teor_alcoolico" className='mt-2'>
                        <Form.Label>Teor alcóolico (%)</Form.Label>
                        <Form.Control
                            type="text"
                            name="teor_alcoolico"
                            value={bebida.teor_alcoolico}
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
