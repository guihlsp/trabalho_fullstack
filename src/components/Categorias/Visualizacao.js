import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const VisualizacaoBebida = ({ bebida, onClose }) => {
    return (
        <Modal show={!!bebida} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Detalhes da Bebida</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5>Nome: {bebida?.nome}</h5>
                <p>Descrição: {bebida?.descricao}</p>
                <p>Categoria: {bebida?.categoria}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Fechar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default VisualizacaoBebida;
