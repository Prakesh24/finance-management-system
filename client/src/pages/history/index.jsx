import React from 'react';
import IncomeItem from '../../components/incomeItem';
import { useGlobalContext } from '../../context/global-context';

const HistoryPage = ({ isDarkMode }) => {
    const { transactionHistory, expenses, incomes, updateIncome, updateExpense, deleteIncome,deleteExpenses} = useGlobalContext();
    const [...history] = transactionHistory();

    return (
        <div
            className={`p-8 md:p-12 lg:p-16 rounded-lg shadow-lg space-y-12 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'
                }`}
        >
            <h2
                className={`text-4xl lg:text-5xl font-bold tracking-wide text-center ${isDarkMode ? 'text-gray-200' : 'text-gray-800'
                    }`}
            >
                Transaction History
            </h2>

            {/* Recent History Section */}
            <div className="space-y-8">
                <h3
                    className={`text-2xl md:text-3xl font-semibold tracking-wide ${isDarkMode ? 'text-gray-300' : 'text-gray-800'
                        }`}
                >
                    Recent History
                </h3>
                {history.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {history.map(({ _id, title, amount, type }) => (
                            <div
                                key={_id}
                                className={`p-4 rounded-lg shadow-md transition-transform transform hover:scale-105 ${isDarkMode
                                    ? 'bg-gray-800 hover:bg-gray-700'
                                    : 'bg-white hover:bg-gray-200'
                                    }`}
                            >
                                <p
                                    className={`font-medium text-lg ${type === 'expense' ? 'text-red-500' : 'text-green-500'
                                        }`}
                                >
                                    {title}
                                </p>
                                <p
                                    className={`font-bold text-xl ${type === 'expense' ? 'text-red-500' : 'text-green-500'
                                        }`}
                                >
                                    {type === 'expense' ? `- $${amount}` : `+ $${amount}`}
                                    {type === 'expense' ? `- $${amount}` : `+ $${amount}`}
                                </p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p
                        className={`text-center italic ${isDarkMode ? 'text-gray-400' : 'text-gray-500'
                            }`}
                    >
                        No recent transactions found.
                    </p>
                )}
            </div>

            {/* Income History Section */}
            <div className="space-y-8">
                <h3
                    className={`text-2xl md:text-3xl font-semibold tracking-wide ${isDarkMode ? 'text-green-400' : 'text-green-600'
                        }`}
                >
                    Income History
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {incomes.length > 0 ? (
                        incomes.map((income) => (
                            <IncomeItem
                                key={income._id}
                                isDarkMode={isDarkMode}
                                data={income}
                                indicatorColor="text-green-500"
                                deleteItem={deleteIncome}
                                updateItem={updateIncome}
                                type={'income'}
                            />
                        ))
                    ) : (
                        <p
                            className={`text-center italic ${isDarkMode ? 'text-gray-400' : 'text-gray-500'
                                }`}
                        >
                            No income records found.
                        </p>
                    )}
                </div>
            </div>

            {/* Expense History Section */}
            <div className="space-y-8">
                <h3
                    className={`text-2xl md:text-3xl font-semibold tracking-wide ${isDarkMode ? 'text-red-400' : 'text-red-600'
                        }`}
                >
                    Expenses History
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {expenses.length > 0 ? (
                        expenses.map((expense) => (
                            <IncomeItem
                                key={expense._id}
                                isDarkMode={isDarkMode}
                                data={expense}
                                indicatorColor="text-red-500"
                                deleteItem={deleteExpenses}
                                updateItem={updateExpense}
                                type={'expense'}
                            />
                        ))
                    ) : (
                        <p
                            className={`text-center italic ${isDarkMode ? 'text-gray-400' : 'text-gray-500'
                                }`}
                        >
                            No expense records found.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HistoryPage;
