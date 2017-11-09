import {callApi} from '../utils/apiUtils';
import toFormData from '../helperFunction/object-to-form-data';

export const GET_ITEM_REQUEST = "GET_ITEM_REQUEST";
export const GET_ITEM_SUCCESS = "GET_ITEM_SUCCESS";
export const GET_ITEM_FAILURE = "GET_ITEM_FAILURE";

export const DELETE_PRODUCT_REQUEST = "DELETE_PRODUCT_REQUEST";
export const DELETE_PRODUCT_SUCCESS = "DELETE_PRODUCT_SUCCESS";
export const DELETE_PRODUCT_FAILURE = "DELETE_PRODUCT_FAILURE";

export const UPDATE_PRODUCT_REQUEST = "UPDATE_PRODUCT_REQUEST";
export const UPDATE_PRODUCT_SUCCESS = "UPDATE_PRODUCT_SUCCESS";
export const UPDATE_PRODUCT_FAILURE = "UPDATE_PRODUCT_FAILURE";


export const ADD_PRODUCT_REQUEST = "ADD_PRODUCT_REQUEST";
export const ADD_PRODUCT_SUCCESS = "ADD_PRODUCT_SUCCESS";
export const ADD_PRODUCT_FAILURE = "ADD_PRODUCT_FAILURE";

export function getProduct(id){
    const config = {
        method: "get",
        headers: {
            'Content-Type': 'application/json'
        }

    };

    return callApi(
        `/${id}`,
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
        method: "put",
        body : toFormData(item)
    };
    return callApi(
        "",
        config,
        addProductRequest(),
        addProductSuccess,
        addProductFailure
    );
}
function addProductRequest() {
    return {
        type : ADD_PRODUCT_REQUEST
    }
}
function addProductFailure(error) {
    return {
        type : ADD_PRODUCT_FAILURE,
        error
    }
}
function addProductSuccess(response) {
    return {
        type : ADD_PRODUCT_SUCCESS,
        payload : response.prod
    }
}

export function deleteItem(id){
    const config = {
        method: "delete",
        body : JSON.stringify({id})
    };
    return callApi(
        `/${id}`,
        config,
        deleteItemRequest(),
        deleteItemSuccess,
        deleteItemFailure
    );
}
function deleteItemRequest(){
    return {
        type : DELETE_PRODUCT_REQUEST
    }
}
function deleteItemFailure(error) {
    return {
        type : DELETE_PRODUCT_FAILURE,
        error
    }
}
function deleteItemSuccess(response) {
    return {
        type : DELETE_PRODUCT_SUCCESS,
        payload : response.id
    }
}

export function updateItem(id,item){
    const config = {
        method: "post",
        body : toFormData(item)
    };
    return callApi(
        `/${id}`,
        config,
        updateProductRequest(),
        updateProductSuccess,
        updateProductFailure
    );
}

function updateProductRequest() {
    return {
        type : UPDATE_PRODUCT_REQUEST
    }
}
function updateProductFailure(error) {
    return {
        type : UPDATE_PRODUCT_FAILURE,
        error
    }
}
function updateProductSuccess(response) {
    return {
        type : UPDATE_PRODUCT_SUCCESS,
        payload : response.product
    }
}

