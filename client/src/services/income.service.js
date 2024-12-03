import API_ENDPOINTS from "../constants/apiEndpoints";
import api from "./api.service";


const addIncome = async (payload) => {
    try {
        const res = await api.post(API_ENDPOINTS.ADD_INCOME_API, payload)
        return res.data
    } catch (e) {
        console.log(e);
    }
}

const getIncomes = async () => {
    try {
        const res = await api.get(API_ENDPOINTS.GET_INCOMES_API)
        return res.data
    } catch (e) {
        console.log(e);
    }
}

const updateIncomeById = async (incomeId, payload) => {
    try {
        const res = await api.patch(API_ENDPOINTS.UPDATE_INCOME_BY_ID_API(incomeId), payload)
        return res.data
    } catch (e) {
        console.log(e);
    }
}

const deleteIncomeById = async (incomeId, payload) => {
    try {
        const res = await api.delete(API_ENDPOINTS.DELETE_INCOME_BY_ID_API(incomeId), payload)
        return res.data
    } catch (e) {
        console.log(e);
    }
}

const incomeServices = {
    addIncome,
    getIncomes,
    updateIncomeById,
    deleteIncomeById
}

export default incomeServices;