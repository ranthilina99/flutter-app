import {
    LOGIN_SUCCESS,
    AUTH_ERROR,
    LOGIN_FAIL,
    LOAD_USER,
    SERVER_ADDRESS
} from '../Constants/Constants';
import axios from 'axios';
import {setToken} from "../setToken";
import Swal from "sweetalert2";

export const LoadUserOther = async () => {
    if (localStorage.getItem('token')) {
        setToken(localStorage.getItem('token'));
    }
    return await axios.get(SERVER_ADDRESS + '/users');
}

export const LoadUser = () => async dispatch => {
    if (localStorage.getItem('token')) {
        setToken(localStorage.getItem('token'));
    }
    try {
        const response = await axios.get(SERVER_ADDRESS + '/users');
        const position = response.data.position;
        console.log(position);
        dispatch({
            type: LOAD_USER,
            payload: response.data,
        })
    } catch (e) {
        dispatch({
            type: AUTH_ERROR,
            payload: e
        })
    }
}
const InvalidLogin = () => {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please check your email and password!'
    })
    window.location.replace('/login')
}
const LoggedAlert = () => {
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'You have successfully logged in',
        showConfirmButton: false,
        timer: 3000
    })
}

export const LoginUser = (email, password) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const body = JSON.stringify({email, password})
        const response1 = await axios.post(SERVER_ADDRESS + '/users/login', body, config);
        if (response1.data !== undefined) {
            LoggedAlert();
        }
        dispatch({
            type: LOGIN_SUCCESS,
            payload: response1.data,
        })
        dispatch(LoadUser());
    } catch (e) {
        if (e) {
            InvalidLogin();
        }
        dispatch({
            type: LOGIN_FAIL,
            payload: e,
        })
    }
}
