import React from 'react';
import { Spinner } from 'react-bootstrap';

function CustomSpinner() {
    return (
        <div className="d-flex justify-content-center align-items-center">
            <Spinner className="mt-5" style={{width: '200px', height: '200px'}} animation="border" variant="warning" />
        </div>
    );
}

export default CustomSpinner;
