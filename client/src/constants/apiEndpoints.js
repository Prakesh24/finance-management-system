
const API_ENDPOINTS = {
    // App routes
    SIGNUP_API: '/auth/sign-up',
    LOGIN_API: '/auth/login',
    APP_USER_DETAILS_API: '/user/user-details',

    ADD_INCOME_API: '/income/add-income',
    GET_INCOMES_API: '/income/get-incomes',
    UPDATE_INCOME_BY_ID_API: (incomeId) => `/income/${incomeId}/update-income`,
    DELETE_INCOME_BY_ID_API: (incomeId) => `/income/${incomeId}/delete-income`,


    ADD_EXPENSES_API: '/expenses/add-expenses',
    GET_EXPENSES_API: '/expenses/get-expenses',
    UPDATE_EXPENSES_BY_ID_API: (expensesId) => `/expenses/${expensesId}/update-expenses`,
    DELETE_EXPENSES_BY_ID_API: (incomeId) => `/income/${incomeId}/delete-expenses`,

    GET_BUDGET_RECOMMENDATIONS_API: '/user/budget-recommendations',




}

export default API_ENDPOINTS