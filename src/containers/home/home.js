import React, {Component} from 'react';
import Item from "../../components/main/listItem/item";
import DeleteModal from '../../components/main/listItem/deleteModal';
import {connect} from "react-redux";
import './home.css';
import {getProducts} from "../../actions/products";
import {deleteItem} from "../../actions/product";
import Spinner from '../../components/repeatable/spinner';


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            deletableItem: {},
        };

        this.compState = {
            'failure': () => <span>Failure</span>,
            'loading': () => <Spinner/>,
            'default': () => this.props.products.items.length > 0 ?
                this.props.products.items.map((item) => {
                    return <Item key={item._id} item={item} deleteItem={() => this.deleteItemFromModal(item)}
                                 showItem={() => {
                                     this.showItem(item._id)
                                 }}/>
                })
                : <span>Empty</span>

        }
    };

    componentDidMount() {
        if (!this.props.products.loaded) {
            this.props.dispatch(getProducts())
        }
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
                deletableItem: item
            }
        )
    }

    showItem(id) {
        this.props.history.push(`/products/${id}`);
    }

    showState(loaded, failure){
        if(failure){
            return this.compState['failure']();
        }else {
            if(loaded) {
                return this.compState['default']()
            }else{
                return this.compState['loading']()
            }
        }
    }

    render() {
        let { getItemsFailure, loaded} = this.props.products;
        return (
            <div className="home-page">
                {this.showState(loaded, getItemsFailure)}
                {this.state.showModal ? (
                    <DeleteModal item={this.state.deletableItem} cancel={() => {
                        this.setState({showModal: false, deletableItem: {}})
                    }} apply={() => {
                        this.deleteItem(this.state.deletableItem._id)
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
