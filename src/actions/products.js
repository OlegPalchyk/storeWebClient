// export const GET_ITEMS_SUCCESS = "GET_ITEMS_SUCCESS";
export const ADD_PRODUCT_SUCCESS = 'ADD_PRODUCT_SUCCESS';
export const DELETE_PRODUCT_SUCCESS = 'DELETE_PRODUCT_SUCCESS';
export const UPDATE_PRODUCT_SUCCESS = 'UPDATE_PRODUCT_SUCCESS';
// export function getProducts(){
//     return {
//         type : GET_ITEMS_SUCCESS
//     }
// }
export function addItem(item) {
    return {
        type : ADD_PRODUCT_SUCCESS,
        item
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

