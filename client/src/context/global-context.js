import { createContext, useContext, useState, useEffect } from "react";
import incomeServices from "../services/income.service";
import expensesServices from "../services/expense.service";
import { successToast } from "../components/toastNotifications";
import userServices from "../services/user.service";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    const [incomes, setIncomes] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [error, setError] = useState(null);
    const [budgetRecommendations, setBudgetRecommendations] = useState([])

    const totalIncome = () => {
        let totalIncome = 0;
        incomes.forEach((income) => {
            totalIncome += income.amount;
        });
        return totalIncome;
    };

    const totalExpenses = () => {
        let totalExpense = 0;
        expenses.forEach((expense) => {
            totalExpense += expense.amount;
        });
        return totalExpense;
    };

    const getIncomes = async () => {
        try {
            let res = await incomeServices.getIncomes();
            if (res.data) {
                setIncomes(res.data);
            }
        } catch (e) {
            console.log(e);
            setError(e);
        }
    };

    const getExpenses = async () => {
        try {
            let res = await expensesServices.getExpenses();
            if (res.data) {
                setExpenses(res.data);
            }
        } catch (e) {
            console.log(e);
            setError(e);
        }
    };

    const updateExpenses = async (id, payload) => {
        try {
            let res = await expensesServices.updateExpensesById(id, payload);
            if (res.data) {
                successToast("Updated expenses successfully");
            }
        } catch (e) {
            console.log(e);
        }
    };

    const updateIncome = async (id, payload) => {
        try {
            let res = await incomeServices.updateIncomeById(id, payload);
            if (res.data) {
                successToast("Updated income successfully");
            }
        } catch (e) {
            console.log(e);
        }
    };

    const totalBalance = () => {
        return totalIncome() - totalExpenses();
    };

    const transactionHistory = () => {
        const history = [...incomes, ...expenses];
        history.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
        });
        return history.slice(0, 3);
    };

    const deleteIncome = async (id) => {
        try {
            let res = await incomeServices.deleteIncomeById(id);
            if (res.data) {
                successToast("Income deleted successfully");
            }
        } catch (e) {
            console.log(e);
        }
    };

    const deleteExpenses = async (id) => {
        try {
            let res = await expensesServices.deleteIncomeById(id);
            if (res.data) {
                successToast("Expenses deleted successfully");
            }
        } catch (e) {
            console.log(e);
        }
    };

    const getBudgetRecommendations = async (id) => {
        try {
            let res = await userServices.getBudgetRecommendations(id);
            if (res.data) {
                setBudgetRecommendations(res.data);
            }
        } catch (e) {
            console.log(e);
        }
    };

    // useEffect to fetch data when the component mounts
    useEffect(() => {
        getIncomes();
        getExpenses();
        getBudgetRecommendations()
        // Cleanup function to reset data when the component unmounts
        return () => {
            setIncomes([]);
            setExpenses([]);
        };
    }, []); // Empty dependency array to run only on mount/unmount

    const contextValues = {
        incomes,
        getIncomes,
        updateIncome,
        getExpenses,
        expenses,
        updateExpenses,
        totalIncome,
        totalExpenses,
        totalBalance,
        transactionHistory,
        deleteIncome,
        deleteExpenses,
        getBudgetRecommendations,
        budgetRecommendations,
        error,
    };

    return (
        <GlobalContext.Provider value={contextValues}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => {
    const context = useContext(GlobalContext);
    return context;
};
