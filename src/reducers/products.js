import defaultItems from '../jsons/items.json';
import {
    ADD_PRODUCT_SUCCESS,
    DELETE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_SUCCESS
} from '../actions/products';

function initializeState() {
    let items= [];
    if(!localStorage.getItem('products')) {
        items = defaultItems;

    } else {
        items= JSON.parse(localStorage.getItem('products'));
    }
    return Object.assign({}, {items});
}
function makeCounter() {
    var currentCount = 1;
    return {
        incId() {
            return currentCount++;
        },
        getId: function () {
            return currentCount;
        }
    };
}
let currentId = makeCounter();

function getUniqueNextId(arr) {
    let a;
    while (arr.find((item)=> {
        return item.id === currentId.getId()
    })) {

        currentId.incId();
    }
    a = currentId.getId();
    return a;
}

export default function products(state = initializeState(), action = {}) {
    switch (action.type) {
        case ADD_PRODUCT_SUCCESS : {
            let item = action.item;
            item.id = getUniqueNextId(state.items);
            let items = state.items;
            items.push(item);

            localStorage.setItem('products', JSON.stringify(items) );

            return Object.assign({}, state, {
                items,
                type: action.type,
                lastAddedItemId: item.id
            });

        }
        case DELETE_PRODUCT_SUCCESS : {
            let items = state.items;
            let itemIndex = items.findIndex((item)=> {
                return item.id === action.id
            });
            if (itemIndex !== -1) {
                items.splice(itemIndex, 1);
            }
            localStorage.setItem('products', JSON.stringify(items) );
            return Object.assign({}, state, {
                items,
                type: action.type,
            });
        }
        case UPDATE_PRODUCT_SUCCESS : {
            let items = state.items;
            let itemIndex = items.findIndex((item)=> {
                return item.id === action.item.id
            });
            if (itemIndex !== -1) {
                items[itemIndex] = action.item;
            }
            localStorage.setItem('products', JSON.stringify(items) );
            return Object.assign({}, state, {
                items,
                type: action.type,
            });
        }


        default:
            return state;
    }
}