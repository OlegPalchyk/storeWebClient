import React from "react";
import PropTypes from "prop-types";
import { Grid, Col, Image, Button} from 'react-bootstrap';


const Item = ({item, deleteItem, editItem}) => {
    const {title, price, url , description} = item;
     return (
         <Grid>
             <Col xs={12} md={4} lg={3} >
                 <Image src={url} thumbnail />
             </Col>
             <Col xs={12} md={8} lg={9}>
                 <div className="buttons-wrapper">
                     <Button bsStyle="warning" onClick={()=>editItem()}>Edit</Button>
                     <Button bsStyle="danger" onClick={()=>deleteItem()}>Delete</Button>
                 </div>
                 <p className="single-item-title">{title}</p>
                 <p className="single-item-price">{price +" "} $</p>
                 <p className="single-item-description">{description} $</p>
             </Col>
         </Grid>

    );
};

Item.propTypes = {
    item: PropTypes.shape({
        title: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        description : PropTypes.string.isRequired

    }).isRequired,
    deleteItem : PropTypes.func.isRequired,
    editItem : PropTypes.func.isRequired
};

export default Item;
