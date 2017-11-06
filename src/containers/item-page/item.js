import React, {Component} from 'react';
import Item from '../../components/item/item';
import './singleItem.css';
import {deleteItem, getProduct, GET_ITEM_SUCCESS, DELETE_PRODUCT_SUCCESS, updateItem, UPDATE_PRODUCT_SUCCESS} from "../../actions/products";
import {connect} from "react-redux";
import DeleteModal from '../../components/main/listItem/deleteModal';
import EditItem from './editItem';


class ItemPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: null,
            edit: false,
            showModal: false,
            updatingItem: null
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

    deleteItem() {
        this.props.dispatch(deleteItem(this.state.item.id));

    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.products.type === DELETE_PRODUCT_SUCCESS) {
            this.props.history.push('/');
        }
        if (nextProps.products.type === UPDATE_PRODUCT_SUCCESS && this.state.updatingItem) {
            this.setState({
                edit: false,
                item: this.state.updatingItem,
                updatingItem: null,

            })
        }

        if(nextProps.products.type === GET_ITEM_SUCCESS){
            this.setState({
                item : nextProps.products.singleItem
            })
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

    updateItem(item) {
        this.setState({
            updatingItem: item
        });
        this.props.dispatch(updateItem(item));
    }


    render() {

        return (
            this.state.item ? (
                <div className="item-page">
                    {
                        this.state.edit ? (
                            <EditItem item={Object.assign({}, this.state.item)} cancelEdit={()=>this.cancelEdit()}
                                      updateItem={(item)=>this.updateItem(item)}/>
                        ) : (
                            <Item item={this.state.item} deleteItem={()=> {
                                this.deleteModal()
                            }} showItem="" editItem={()=> {
                                this.editItem()
                            }}/>
                        )
                    }

                    {this.state.showModal ? (
                        <DeleteModal item={this.state.item} cancel={()=> {
                            this.setState({showModal: false})
                        }} apply={()=> {
                            this.deleteItem(this.state.item.id)
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
    const {products} = state;
    return {
        products
    }


}

export default connect(mapStateToProps)(ItemPage);
