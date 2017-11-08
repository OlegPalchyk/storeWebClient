import {
    ADD_PRODUCT_SUCCESS,
    ADD_PRODUCT_REQUEST,
    ADD_PRODUCT_FAILURE,
    DELETE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAILURE,
    UPDATE_PRODUCT_REQUEST,
    GET_ITEMS_SUCCESS,
    GET_ITEMS_FAILURE,
    GET_ITEMS_REQUEST,
    GET_ITEM_FAILURE,
    GET_ITEM_REQUEST,
    GET_ITEM_SUCCESS
} from '../actions/products';

function initializeState() {
    let items = [];
    let loaded = false;
    return Object.assign({}, {items, loaded});
}


export default function products(state = initializeState(), action = {}) {
    switch (action.type) {
        case GET_ITEM_REQUEST : {
            return Object.assign({}, state, {
                type: action.type,
                getItemFailure: false,
                itemLoading: true
            })
        }
        case GET_ITEMS_REQUEST :
        case ADD_PRODUCT_REQUEST :
        case UPDATE_PRODUCT_REQUEST :{
            return Object.assign({}, state, {
                type: action.type,
            })
        }
        case UPDATE_PRODUCT_FAILURE: {
            return Object.assign({}, state, {
                type: action.type,
                message: action.error,
                updateFailure : true,
            });
        }
        case GET_ITEM_FAILURE : {
            return Object.assign({}, state, {
                type: action.type,
                message: action.error,
                getItemFailure: true,
                itemLoading: false
            });
        }
        case ADD_PRODUCT_FAILURE : {
            return Object.assign({}, state, {
                type: action.type,
                message: action.error
            });
        }
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
                singleItem: action.payload,
            });
        }
        case GET_ITEM_SUCCESS : {
            return Object.assign({}, state, {
                type: action.type,
                singleItem: action.item,
                getItemFailure: false,
                itemLoading: false

            })
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
                lastAddedItemId: action.payload._id
            });
        }
        case DELETE_PRODUCT_SUCCESS : {
            let items = state.items;

            if (state.loaded) {
                let itemIndex = state.items.find((item) => {
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
                lastAddedItemId: action.payload._id
            });
        }


        default:
            return state;
    }
}