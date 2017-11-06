import {
    ADD_PRODUCT_SUCCESS,
    DELETE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_SUCCESS,
    GET_ITEMS_SUCCESS,
    GET_ITEMS_FAILURE,
    GET_ITEMS_REQUEST,
    GET_ITEM_FAILURE,
    GET_ITEM_REQUEST,
    GET_ITEM_SUCCESS
} from '../actions/products';

function initializeState() {
    let items= [];
    let loaded = false;
    return Object.assign({}, {items, loaded});
}


export default function products(state = initializeState(), action = {}) {
    switch (action.type) {
        case GET_ITEM_REQUEST : {
            return Object.assign({}, state, {type : action.type})
        }
        case GET_ITEM_FAILURE : {
            return Object.assign({}, state, {
                type: action.type,
                message : action.error
            });
        }
        case GET_ITEM_SUCCESS : {
            return Object.assign({}, state , {
                type : action.type,
                singleItem : action.item 
            })
        }
        case GET_ITEMS_REQUEST : {
            return Object.assign({}, state, {
                type: action.type,
            });

        }
        case GET_ITEMS_SUCCESS : {
            return Object.assign({}, state, {
                type: action.type,
                items : action.items,
                loaded : true
            });

        }
        case GET_ITEMS_FAILURE : {
            return Object.assign({}, state, {
                type: action.type,
                message : action.error
            });

        }
        case ADD_PRODUCT_SUCCESS :{
            return Object.assign({}, state, {
                items : [...state.items, action.product],
                message : action.error,
                lastAddedItemId : action.product._id
            });
        }


        default:
            return state;
    }
}