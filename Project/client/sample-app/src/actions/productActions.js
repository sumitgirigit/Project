
import axios from 'axios';

import {
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS,
    ALL_PRODUCTS_FAIL,
    CLEAR_ERRORS
} from '../reducers/productContants';

export const getProducts = () => async(dispatch) => {
    try{
        dispatch({ type: ALL_PRODUCTS_REQUEST })
        const { data } = await axios.get('/product/get')
        console.log(data);
        // console.log(data.sucess);
        // console.log(data.count);

        dispatch({ type: ALL_PRODUCTS_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: ALL_PRODUCTS_FAIL,
            payload: error.response.data.message
        })
    }
}

// clear Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}