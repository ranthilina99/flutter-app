export const LOAD_USER = "LOAD USER";
export const LOGIN_FAIL = "LOGIN FAIL";
export const LOG_OUT = "LOG OUT";
export const AUTH_ERROR = "AUTHENTICATION ERROR";
export const LOGIN_SUCCESS = "LOGIN SUCCESS";

export const SERVER_ADDRESS = getServerPath();

export const CLIENT_ADDRESS = getClientPath();

function getClientPath() {

    if (process.env.NODE_ENV === 'production') {
        return document.location.origin;
    } else {
        return 'http://localhost:3000';
    }
}

function getServerPath() {
    if (process.env.NODE_ENV === 'production') {
        return document.location.origin;
    } else {
        return 'http://localhost:5000';
    }
}
