export const isEmpty = value => {
    if(!value) return true
    return false
}
export const isEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
export const isMobile = mobile =>{
    const reg=/^(?:7|0|(?:\+94))[0-9]{9,10}$/
    return reg.test(mobile);
}
export const isLength = password => {
    if(password.length < 3) return true
    return false
}
export const isMatch = (password, cf_password) => {
    if(password === cf_password) return true
    return false
}
