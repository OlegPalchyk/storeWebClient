import React, {Component} from 'react';
import Item from "../../components/main/listItem/item";
import DeleteModal from '../../components/main/listItem/deleteModal';
import {connect} from "react-redux";
import './home.css';
import {deleteItem} from "../../actions/products";


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: this.props.products.items || [],
            showModal: false,
            deletableItem: {}

        };
    }

    deleteItem(id) {
        this.props.dispatch(deleteItem(id));
        this.setState({
            showModal: false
        })
    }

    deleteItemFromModal(item) {
        this.setState({
                showModal: true,
                deletableItem : item
            }
        )
    }

    showItem(id) {
        this.props.history.push(`/products/${id}`);
    }

    render() {
        return (
            <div className="home-page">
                {this.props.products.items ? (
                    this.state.items.map((item)=> {
                        return <Item key={item.id} item={item} deleteItem={()=>this.deleteItemFromModal(item)}
                                     showItem={()=> {
                                         this.showItem(item.id)
                                     }}/>
                    })
                ) : (<span>Empty</span>)}
                {this.state.showModal ? (
                    <DeleteModal item={this.state.deletableItem} cancel={()=> {
                        this.setState({showModal: false,deletableItem : {} })
                    }} apply={()=> {
                        this.deleteItem(this.state.deletableItem.id)
                    }}/>
                ) : null}
            </div>
        );
    }
}


function mapStateToProps(state) {
    const {products} = state;
    return {
        products
    }


}

export default connect(mapStateToProps)(Home);
