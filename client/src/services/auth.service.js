import API_ENDPOINTS from "../constants/apiEndpoints";
import { clearToken, saveToken } from "../helpers/auth-token";
import { deleteAllLocalData, saveUserDetails } from "../helpers/localstorage";
import api from "./api.service";
const { jwtDecode } = require("jwt-decode");


const signUp = async (payload) => {
    try {
        const res = await api.post(API_ENDPOINTS.SIGNUP_API, payload)
        return res.data
    } catch (e) {
        console.log(e);
    }
}

const login = async (payload) => {
    try {
        const res = await api.post(API_ENDPOINTS.LOGIN_API, payload)
        console.log(res);
        setLoginToken(res.data.data)
        return res.data
    } catch (e) {
        console.log(e);
    }
}

const setLoginToken = (data) => {
    saveToken(data);
    const decoded = jwtDecode(data)
    saveUserDetails(decoded)
}

const logout = () => {
    clearToken();
    deleteAllLocalData();
}


const authServices = {
    signUp,
    login,
    logout,
}

export default authServices