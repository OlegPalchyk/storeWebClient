import React from "react";
import PropTypes from "prop-types";
import {Button, Image} from 'react-bootstrap';

const Item = ({item, deleteItem, showItem}) => {
    const {title, price, url} = item;
     return (
        <div className="product-list-item">
            <Image src={url} thumbnail onClick={()=>showItem()}/>

            <div className="product-list-detail">
                <p className="product-list-item-title">{title}</p>
                <p className="product-list-item-price">{price +" "} $</p>
                <Button bsStyle="primary" onClick={()=>showItem()}>Show</Button>
                <Button bsStyle="danger" onClick={()=>deleteItem()}>Delete</Button>
            </div>

        </div>
    );
};

Item.propTypes = {
    item: PropTypes.shape({
        title: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,

    }).isRequired,
    deleteItem :PropTypes.func.isRequired,
    showItem :PropTypes.func.isRequired
};

export default Item;
