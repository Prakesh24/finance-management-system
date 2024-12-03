import API_ENDPOINTS from "../constants/apiEndpoints";
import api from "./api.service";


const addExpenses = async (payload) => {
    try {
        const res = await api.post(API_ENDPOINTS.ADD_EXPENSES_API, payload)
        return res.data
    } catch (e) {
        console.log(e);
    }
}

const getExpenses = async () => {
    try {
        const res = await api.get(API_ENDPOINTS.GET_EXPENSES_API)
        return res.data
    } catch (e) {
        console.log(e);
    }
}

const updateExpensesById = async (expensesId, payload) => {
    try {
        const res = await api.patch(API_ENDPOINTS.UPDATE_EXPENSES_BY_ID_API(expensesId))
        return res.data
    } catch (e) {
        console.log(e);
    }
}

const deleteExpensesById = async (expensesId) => {
    try {
        const res = await api.delete(API_ENDPOINTS.DELETE_EXPENSES_BY_ID_API(expensesId))
        return res.data
    } catch (e) {
        console.log(e);
    }
}

const expensesServices = {
    addExpenses,
    getExpenses,
    updateExpensesById,
    deleteExpensesById
}

export default expensesServices;