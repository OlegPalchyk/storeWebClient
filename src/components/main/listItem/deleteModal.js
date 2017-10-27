import React from "react";
import PropTypes from "prop-types";
import {Button, Modal} from 'react-bootstrap';

const DeleteModal = ({item, cancel,apply}) => {
    const {title,} = item;
    return (
        <Modal show={true}  onHide={()=>cancel()}
               aria-labelledby="ModalHeader">
            <Modal.Header>
                <Modal.Title>You sure that you want delete ?</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {`${title} will be deleted`}
            </Modal.Body>

            <Modal.Footer>
                <Button onClick={()=>cancel()}>Close</Button>
                <Button bsStyle="danger" onClick={()=>apply()}>Delete</Button>
            </Modal.Footer>

        </Modal>
    );
};

DeleteModal.propTypes = {
    item: PropTypes.shape({
        title: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,

    }).isRequired,
    cancel :PropTypes.func.isRequired,
    apply :PropTypes.func.isRequired
};

export default DeleteModal;

