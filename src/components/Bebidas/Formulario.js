import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import api from '../../service/api';
import { useParams } from 'react-router-dom';

const FormularioBebida = (props) => {
    let id = useParams().id;

    const [bebida, setFormValues] = useState({
        nome: '',
        descricao: '',
        categoria: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let url = '/bebidas/'
        if (props.action === 'editar') {
            api.put(url + 'editar/' + id, 
            {
                bebida
            })
                .then(response => {
                    console.log(response);
                })
                .catch(error => {
                    console.log(error);
                });
        } else {
            api.post(url + 'adicionar', 
            {
                bebida
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
            <Form.Group controlId="descricao">
                <Form.Label>Descrição</Form.Label>
                <Form.Control
                    as="textarea"
                    name="descricao"
                    value={bebida.descricao}
                    onChange={handleInputChange}
                />
            </Form.Group>
            <Form.Group controlId="categoria">
                <Form.Label>Categoria</Form.Label>
                <Form.Control
                    type="text"
                    name="categoria"
                    value={bebida.categoria}
                    onChange={handleInputChange}
                />
            </Form.Group>
            <Button variant="primary" type="submit">
                Salvar
            </Button>
        </Form>
    );
};

export default FormularioBebida;
