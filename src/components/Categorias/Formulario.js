import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import api from '../../service/api';

const FormularioBebida = () => {
    const [formValues, setFormValues] = useState({
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
        // Lógica para enviar os dados do formulário para o backend e adicionar ou atualizar uma bebida
        api.post('/api/bebidas/adicionar')
        .then(response => {
        })
        .catch(error => {
            console.log(error);
        });
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="nome">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                    type="text"
                    name="nome"
                    value={formValues.nome}
                    onChange={handleInputChange}
                />
            </Form.Group>
            <Form.Group controlId="descricao">
                <Form.Label>Descrição</Form.Label>
                <Form.Control
                    as="textarea"
                    name="descricao"
                    value={formValues.descricao}
                    onChange={handleInputChange}
                />
            </Form.Group>
            <Form.Group controlId="categoria">
                <Form.Label>Categoria</Form.Label>
                <Form.Control
                    type="text"
                    name="categoria"
                    value={formValues.categoria}
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
