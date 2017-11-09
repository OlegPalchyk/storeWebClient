import {
    ADD_PRODUCT_SUCCESS,
    ADD_PRODUCT_REQUEST,
    ADD_PRODUCT_FAILURE,
    DELETE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAILURE,
    UPDATE_PRODUCT_REQUEST,
    GET_ITEM_FAILURE,
    GET_ITEM_REQUEST,
    GET_ITEM_SUCCESS
} from '../actions/product';

function initializeState() {
    return Object.assign({}, {});
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
        case ADD_PRODUCT_REQUEST :
        case UPDATE_PRODUCT_REQUEST : {
            return Object.assign({}, state, {
                type: action.type,
            })
        }
        case UPDATE_PRODUCT_FAILURE: {
            return Object.assign({}, state, {
                type: action.type,
                message: action.error,
                updateFailure: true,
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
        case UPDATE_PRODUCT_SUCCESS : {
            return Object.assign({}, state, {
                type: action.type,
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
        case ADD_PRODUCT_SUCCESS : {
            return Object.assign({}, state, {
                type: action.type,
                lastAddedItemId: action.payload._id
            });
        }
        case DELETE_PRODUCT_SUCCESS : {
            return Object.assign({}, state, {
                type: action.type,
                lastAddedItemId: action.payload._id
            });
        }
        default:
            return state;
    }
}