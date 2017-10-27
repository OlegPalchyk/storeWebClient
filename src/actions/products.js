import {callApi} from '../utils/apiUtils';

export const GET_ITEMS_REQUEST = "GET_ITEMS_REQUEST";
export const GET_ITEMS_SUCCESS = "GET_ITEMS_SUCCESS";
export const GET_ITEMS_FAILURE = "GET_ITEMS_FAILURE";

export const ADD_PRODUCT_REQUEST = "ADD_PRODUCT_REQUEST";
export const ADD_PRODUCT_SUCCESS = "GET_ITEMS_SUCCESS";
export const ADD_PRODUCT_FAILURE = "ADD_PRODUCT_FAILURE";
export const DELETE_PRODUCT_SUCCESS = 'DELETE_PRODUCT_SUCCESS';
export const UPDATE_PRODUCT_SUCCESS = 'UPDATE_PRODUCT_SUCCESS';

export function getProducts(){
    const config = {
        method: "get",
        headers: {
            'Content-Type': 'application/json'
        }

    };
    return callApi(
        "",
        config,
        getProductsRequest(),
        getProductsSuccess,
        getProductsFailure
    );
}
function getProductsRequest() {
    return {
        type : GET_ITEMS_REQUEST
    }
}
function getProductsFailure(error) {
    return {
        type : GET_ITEMS_FAILURE,
        error
    }
}
function getProductsSuccess(response) {
    return {
        type : GET_ITEMS_SUCCESS,
        items : response.products
    }
}


export function addItem(item) {
    const config = {
        method: "post",
        headers: {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify(item)

    };
    return callApi(
        "",
        config,
        addProductsRequest(),
        addProductsSuccess,
        addProductsFailure
    );
}
function addProductsRequest() {
    return {
        type : ADD_PRODUCT_REQUEST
    }
}
function addProductsFailure(error) {
    return {
        type : ADD_PRODUCT_FAILURE,
        error
    }
}

function addProductsSuccess(response) {
    return {
        type : ADD_PRODUCT_SUCCESS,
        product : response.prod
    }
}
export function deleteItem(id){
    return {
        type : DELETE_PRODUCT_SUCCESS,
        id
    }
}
export function updateItem(item){
    return {
        type : UPDATE_PRODUCT_SUCCESS,
        item
    }
}

