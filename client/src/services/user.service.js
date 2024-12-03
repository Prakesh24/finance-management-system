import API_ENDPOINTS from "../constants/apiEndpoints";
import api from "./api.service";


const getBudgetRecommendations = async (payload) => {
    try {
        const res = await api.get(API_ENDPOINTS.GET_BUDGET_RECOMMENDATIONS_API, payload)
        return res.data
    } catch (e) {
        console.log(e);
    }
}


const userServices = {
    getBudgetRecommendations
}

export default userServices;