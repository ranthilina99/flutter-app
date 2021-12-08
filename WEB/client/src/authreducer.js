import {
    LOAD_USER,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOG_OUT,
} from './Constants/Constants';

const initialState = {
    token: localStorage.getItem('token'),
    isLoggedIn: false,
    errors: {},
}

const authReducer = (state = initialState,action) => {
    const { type,payload } = action;
    switch (type) {
        case LOGIN_SUCCESS:
            localStorage.setItem('token', payload.token);
            return{
                ...state,
                isLoggedIn: true
            };
        case LOAD_USER:
            localStorage.getItem('token');
            return {
                ...state,
                isLoggedIn: true
            }
        case LOGIN_FAIL:
        case LOG_OUT:
            localStorage.removeItem('token');
            localStorage.removeItem('userType');
            localStorage.removeItem('userId');
            localStorage.removeItem('userEmail');
            localStorage.removeItem('fullName');
            localStorage.removeItem('admin');
            localStorage.removeItem('Employee');
            return {
                ...state,
                isLoggedIn: false
            }
        default:
            return state;
    }
}

export default authReducer;