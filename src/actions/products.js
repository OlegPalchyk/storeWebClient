import {callApi} from '../utils/apiUtils';

export const GET_ITEMS_REQUEST = "GET_ITEMS_REQUEST";
export const GET_ITEMS_SUCCESS = "GET_ITEMS_SUCCESS";
export const GET_ITEMS_FAILURE = "GET_ITEMS_FAILURE";

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

