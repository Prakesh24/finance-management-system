import React from 'react';
import { useGlobalContext } from '../../context/global-context';

const TransactionsPage = ({ isDarkMode }) => {
    const { transactionHistory, incomes, expenses } = useGlobalContext();

    const history = transactionHistory(); // Extract transaction history

    return (
        <div className={`${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'} min-h-screen p-8`}>
            <div className="container mx-auto">
                <h1 className={`font-serif font-extrabold text-4xl mb-8 text-center`}>
                    All Transactions
                </h1>

                <div className="grid gap-8">
                    {/* History Section */}
                    <div>
                        <h2 className="text-2xl font-bold mb-4 border-b pb-2 dark:border-gray-600">
                            Transaction History
                        </h2>

                        {history.length > 0 ? (
                            <div className="flex flex-col gap-4">
                                {history.map((item) => {
                                    const { _id, title, amount, type } = item;
                                    return (
                                        <div
                                            key={_id}
                                            className="flex justify-between items-center p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                                            style={{
                                                backgroundColor: isDarkMode ? '#1e1b2f' : '#ffffff',
                                                border: isDarkMode ? '2px solid #393653' : '2px solid #e0e0e0',
                                            }}
                                        >
                                            <div className="flex items-center gap-2">
                                                <p
                                                    className={`font-bold ${type === 'expense' ? 'text-red-500' : 'text-green-500'}`}
                                                >
                                                    {title}
                                                </p>
                                                <span
                                                    className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded-lg"
                                                    style={{
                                                        backgroundColor: isDarkMode ? '#2a2746' : '#f3f3f3',
                                                    }}
                                                >
                                                    {type.charAt(0).toUpperCase() + type.slice(1)}
                                                </span>
                                            </div>
                                            <p className={`font-semibold ${type === 'expense' ? 'text-red-500' : 'text-green-500'}`}>
                                                {type === 'expense' ? `-$${Math.abs(amount)}` : `+$${Math.abs(amount)}`}
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <p className="text-gray-500 italic text-center">
                                No transactions available.
                            </p>
                        )}
                    </div>

                    {/* Income Stats Section */}
                    <div>
                        <h2 className="text-2xl font-bold mb-4 border-b pb-2 dark:border-gray-600">
                            Income Summary
                        </h2>
                        {incomes.length > 0 ? (
                            <div
                                className="flex justify-between items-center p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                                style={{
                                    backgroundColor: isDarkMode ? '#1e1b2f' : '#ffffff',
                                    border: isDarkMode ? '2px solid #393653' : '2px solid #e0e0e0',
                                }}
                            >
                                <p className="text-green-500 font-semibold">
                                    Min: ${Math.min(...incomes.map((item) => item.amount))}
                                </p>
                                <p className="text-green-500 font-semibold">
                                    Max: ${Math.max(...incomes.map((item) => item.amount))}
                                </p>
                            </div>
                        ) : (
                            <p className="text-gray-500 italic text-center">
                                No income data available.
                            </p>
                        )}
                    </div>

                    {/* Expense Stats Section */}
                    <div>
                        <h2 className="text-2xl font-bold mb-4 border-b pb-2 dark:border-gray-600">
                            Expense Summary
                        </h2>
                        {expenses.length > 0 ? (
                            <div
                                className="flex justify-between items-center p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                                style={{
                                    backgroundColor: isDarkMode ? '#1e1b2f' : '#ffffff',
                                    border: isDarkMode ? '2px solid #393653' : '2px solid #e0e0e0',
                                }}
                            >
                                <p className="text-red-500 font-semibold">
                                    Min: ${Math.min(...expenses.map((item) => item.amount))}
                                </p>
                                <p className="text-red-500 font-semibold">
                                    Max: ${Math.max(...expenses.map((item) => item.amount))}
                                </p>
                            </div>
                        ) : (
                            <p className="text-gray-500 italic text-center">
                                No expense data available.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TransactionsPage;
