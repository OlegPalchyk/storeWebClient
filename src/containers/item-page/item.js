import React, {Component} from 'react';
import {connect} from "react-redux";
import Item from '../../components/item/item';
import './singleItem.css';
import {deleteItem, getProduct, UPDATE_PRODUCT_SUCCESS, DELETE_PRODUCT_SUCCESS, updateItem} from "../../actions/product";
import DeleteModal from '../../components/main/listItem/deleteModal';
import EditItem from './editItem';

class ItemPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            showModal: false,

        }
    }

    componentDidMount() {
        this.props.dispatch(getProduct(this.props.match.params.productId))
    }

    deleteModal() {
        this.setState({
            showModal: true
        })
    }

    deleteItem(id) {
        this.props.dispatch(deleteItem(id));

    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.product.type === DELETE_PRODUCT_SUCCESS) {
            this.props.history.push('/');
        }
        if(nextProps.product.type === UPDATE_PRODUCT_SUCCESS){
            this.cancelEdit();
        }
    }

    editItem() {
        this.setState({
            edit: true
        })
    }

    cancelEdit() {
        this.setState({
            edit: false
        })
    }

    updateItem(id, item) {
        this.props.dispatch(updateItem(id, item));
    }


    render() {

        return (
            !this.props.product.itemLoading ? (
                <div className="item-page">
                    {
                        this.state.edit ? (
                            <EditItem item={Object.assign({}, this.props.product.singleItem)} cancelEdit={()=>this.cancelEdit()}
                                      updateItem={(id, item)=>this.updateItem(id, item)}/>
                        ) : (

                            this.props.product.singleItem?
                                <Item item={this.props.product.singleItem} deleteItem={()=> {
                                this.deleteModal()
                            }} showItem="" editItem={()=> {
                                this.editItem()
                            }}/> : <span>NoItem</span>
                        )
                    }

                    {this.state.showModal ? (
                        <DeleteModal item={this.props.product.singleItem} cancel={()=> {
                            this.setState({showModal: false})
                        }} apply={()=> {
                            this.deleteItem(this.props.product.singleItem._id)
                        }}/>
                    ) : null}
                </div>
            ) : (
                <span>loading</span>
            )

        );
    }
}


function mapStateToProps(state) {
    const {product} = state;
    return {
        product
    }
}

export default connect(mapStateToProps)(ItemPage);
