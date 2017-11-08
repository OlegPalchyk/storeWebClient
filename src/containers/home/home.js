import React, {Component} from 'react';
import Item from "../../components/main/listItem/item";
import DeleteModal from '../../components/main/listItem/deleteModal';
import {connect} from "react-redux";
import './home.css';
import {deleteItem, getProducts} from "../../actions/products";
import Spinner from '../../components/repeatable/spinner';


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            deletableItem: {},
        };
    }

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


    render() {
        return (
            <div className="home-page">
                {this.props.getItemsFailure? <span>Failure</span> :
                    !this.props.products.loaded ?
                        <Spinner/>
                        :
                        this.props.products.items.length > 0 ?
                            this.props.products.items.map((item) => {
                                return <Item key={item._id} item={item} deleteItem={() => this.deleteItemFromModal(item)}
                                             showItem={() => {
                                                 this.showItem(item._id)
                                             }}/>
                            })
                            : <span>Empty</span>
                }
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
