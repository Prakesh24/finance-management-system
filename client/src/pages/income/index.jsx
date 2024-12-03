import React, { useEffect } from 'react';
import { useGlobalContext } from '../../context/global-context';
import IncomeItem from '../../components/incomeItem';
import Form from '../../components/forms/incomeForm';

const Income = ({ isDarkMode }) => {
    const { incomes, getIncomes, updateIncome, totalIncome, deleteIncome } = useGlobalContext();

    useEffect(() => {
        getIncomes();
    }, []);

    return (
        <div
            className={`min-h-screen p-6 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}
        >
            <div className="container mx-auto">
                {/* Title */}
                <h1 className="font-serif font-extrabold text-4xl mb-6 text-center">
                    Incomes
                </h1>

                {/* Total Income Card */}
                <div
                    className={`flex justify-center items-center rounded-2xl shadow-lg p-6 mb-8 text-2xl font-bold 
                    ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'} border-2 
                    ${isDarkMode ? 'border-white' : 'border-gray-900'} hover:shadow-xl transition-shadow`}
                >
                    <span className="mr-2">Total Income:</span>
                    <span className="text-4xl font-extrabold text-green-500">
                        ${totalIncome()}
                    </span>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Form Section */}
                    <div className={`p-6 rounded-2xl shadow-lg bg-opacity-80 transition-transform transform hover:scale-105
                        ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} max-h-[32em]`}>
                        <h2 className="font-bold text-2xl mb-4">
                            Add New Income
                        </h2>
                        <Form isDarkMode={isDarkMode} />
                    </div>

                    {/* Income List */}
                    <div>
                        <h2 className="font-bold text-2xl mb-4">
                            Income History
                        </h2>
                        <div className="space-y-6">
                            {incomes.length > 0 ? (
                                incomes.map((income) => {
                                    const { _id } = income;
                                    return (
                                        <IncomeItem
                                            key={_id}
                                            isDarkMode={isDarkMode}
                                            data={income}
                                            indicatorColor="var(--color-green)"
                                            updateItem={updateIncome}
                                            deleteItem={deleteIncome}
                                            type={'income'}
                                        />
                                    );
                                })
                            ) : (
                                <p className="italic text-gray-500 text-center">
                                    No income entries found.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Income;
