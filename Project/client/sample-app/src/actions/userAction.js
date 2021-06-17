
import axios from 'axios';

import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    CLEAR_ERRORS
} from '../reducers/userConstants';

// Login 
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST })

        const config = {
            header: {
                'content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('/login', { email, password }, config)
        console.log(data);

        dispatch({ type: LOGIN_SUCCESS, payload: data.user })

    } catch (error) {
        console.log(error.response.data.errMessage);
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response.data
        })
    }
}

// Register
export const register = (userData) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_USER_REQUEST })

        const config = {
            header: {
                'content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('/register', userData , config)
        console.log(data);

        dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user })

    } catch (error) {
        console.log(error.response.data.errMessage);
        dispatch({
            type: REGISTER_USER_FAIL,
            payload: error.response.data
        })
    }
}


// clear Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}