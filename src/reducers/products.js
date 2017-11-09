import {
    GET_ITEMS_SUCCESS,
    GET_ITEMS_FAILURE,
    GET_ITEMS_REQUEST

} from '../actions/products';

import {
    ADD_PRODUCT_SUCCESS,
    DELETE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_SUCCESS,
} from '../actions/product'

function initializeState() {
    let items = [];
    let loaded = false;
    return Object.assign({}, {items, loaded});
}


export default function products(state = initializeState(), action = {}) {
    switch (action.type) {
        case GET_ITEMS_REQUEST :

        case GET_ITEMS_FAILURE : {
            return Object.assign({}, state, {
                type: action.type,
                message: action.error,
                getItemsFailure: true
            });

        }
        case UPDATE_PRODUCT_SUCCESS : {
            let items = state.items;
            if (state.loaded) {
                let newProduct = action.payload;
                let indexProduct = state.items.findIndex(item => {
                    return item._id === newProduct._id;
                });

                if (indexProduct !== -1) {
                    items[indexProduct] = newProduct;
                }
            }

            return Object.assign({}, state, {
                type: action.type,
                items: items,
            });
        }
        case GET_ITEMS_SUCCESS : {
            return Object.assign({}, state, {
                type: action.type,
                items: action.items,
                loaded: true,
                getItemsFailure: false

            });

        }
        case ADD_PRODUCT_SUCCESS : {
            let items = state.items;
            if (state.loaded) {
                items.unshift(action.payload);
            }
            return Object.assign({}, state, {
                items: items,
                type: action.type,
            });
        }
        case DELETE_PRODUCT_SUCCESS : {
            let items = state.items;
            if (state.loaded) {
                let itemIndex = state.items.findIndex((item) => {
                    return item._id === action.payload;
                });
                if (itemIndex === -1) {

                } else {
                    items.splice(itemIndex, 1);
                }
            }
            return Object.assign({}, state, {
                type: action.type,
                items,
            });
        }
        default:
            return state;
    }
}