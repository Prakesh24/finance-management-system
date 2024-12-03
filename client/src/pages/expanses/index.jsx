import React, { useEffect } from "react";
import { useGlobalContext } from "../../context/global-context";
import ExpenseForm from "./expanseForm";
import IncomeItem from "../../components/incomeItem";

const Expenses = ({ isDarkMode }) => {
    const {
        expenses,
        getExpenses,
        updateExpenses,
        totalExpenses,
        deleteExpenses,
        addExpense,  // Assuming you have a function to add an expense
    } = useGlobalContext();

    // Fetch expenses initially
    useEffect(() => {
        getExpenses();
    }, []);

    const handleExpenseSubmit = async (newExpense) => {
        // Optimistically update the UI
        addExpense(newExpense); // Add expense to global state immediately

        // Call API or update state here to persist the new expense
        try {
            await addExpense(newExpense); // Assuming addExpense sends the API request
            getExpenses(); // Optionally re-fetch the expenses to ensure data is up-to-date
        } catch (error) {
            console.error("Error adding expense:", error);
            // Optionally handle the error (e.g., rollback the optimistic update)
        }
    };

    return (
        <div
            className={`min-h-screen p-8 ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}
        >
            <div className="container mx-auto">
                {/* Header Section */}
                <h1 className="font-serif font-extrabold text-4xl text-center mb-8">
                    Expenses
                </h1>

                {/* Total Expense Card */}
                <div
                    className={`flex justify-center items-center rounded-2xl shadow-lg p-6 mb-10 text-2xl font-bold
                        ${isDarkMode ? "bg-gray-800 text-white border-white" : "bg-white text-gray-900 border-gray-800"}
                        border-2 hover:shadow-xl transition-shadow`}
                >
                    <span>Total Expense:</span>
                    <span className="ml-3 text-4xl font-extrabold text-red-500">
                        ${totalExpenses()}
                    </span>
                </div>

                {/* Content Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Form Section */}
                    <div
                        className={`p-6 rounded-2xl shadow-md transition-transform transform hover:scale-105
                            ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}
                            border max-h-[40em]`}
                    >
                        <h2 className="text-2xl font-bold mb-4">Add New Expense</h2>
                        <ExpenseForm isDarkMode={isDarkMode} onSubmit={handleExpenseSubmit} />
                    </div>

                    {/* Expense List */}
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Expense History</h2>
                        <div className="space-y-6">
                            {expenses.length > 0 ? (
                                expenses.map((expense) => {
                                    return (
                                        <IncomeItem
                                            key={expense._id}
                                            isDarkMode={isDarkMode}
                                            data={expense}
                                            indicatorColor="var(--color-red)"
                                            updateItem={updateExpenses}
                                            deleteItem={deleteExpenses}
                                            type={'expense'}
                                        />
                                    );
                                })
                            ) : (
                                <p className="italic text-gray-500 text-center">
                                    No expense entries found.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Expenses;
