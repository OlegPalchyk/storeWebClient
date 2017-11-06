import {callApi} from '../utils/apiUtils';
import store from "../store/store";

export const GET_ITEMS_REQUEST = "GET_ITEMS_REQUEST";
export const GET_ITEMS_SUCCESS = "GET_ITEMS_SUCCESS";
export const GET_ITEMS_FAILURE = "GET_ITEMS_FAILURE";

export const GET_ITEM_REQUEST = "GET_ITEM_REQUEST";
export const GET_ITEM_SUCCESS = "GET_ITEM_SUCCESS";
export const GET_ITEM_FAILURE = "GET_ITEM_FAILURE";



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
        [getProductsSuccess,getProduct],
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


export function getProduct(id){
    const config = {
        method: "get",
        headers: {
            'Content-Type': 'application/json'
        }

    };
    console.log(id.products[0]._id);

    return callApi(
        `/${id.products[0]._id}`,
        config,
        getProductRequest(),
        getProductSuccess,
        getProductFailure,

    )
}
function getProductRequest() {
    return {
        type : GET_ITEM_REQUEST
    }
}
function getProductFailure(error) {

    return {
        type : GET_ITEM_FAILURE,
        error
    }
}
function getProductSuccess(response) {
    return {
        type : GET_ITEM_SUCCESS,
        item : response.product
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

