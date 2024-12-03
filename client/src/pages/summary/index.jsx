import React from "react";
import { useGlobalContext } from "../../context/global-context";
import {
    Tooltip,
    BarChart,
    XAxis,
    YAxis,
    Legend,
    CartesianGrid,
    Bar,
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
} from "recharts";
import BudgetRecommendationsComp from "../../components/budgetRecommendations";

const SummaryPage = ({ isDarkMode }) => {
    const {
        incomes,
        expenses,
    } = useGlobalContext();

    const totalIncome = incomes.reduce((total, income) => total + income.amount, 0);
    const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
    const totalBalance = totalIncome - totalExpenses;

    const categorizedIncome = {};
    incomes.forEach(({ category, amount }) => {
        categorizedIncome[category] = (categorizedIncome[category] || 0) + amount;
    });

    const categorizedExpenses = {};
    expenses.forEach(({ category, amount }) => {
        categorizedExpenses[category] = (categorizedExpenses[category] || 0) + amount;
    });

    const incomeData = Object.keys(categorizedIncome).map((category) => ({
        name: category,
        value: categorizedIncome[category],
    }));

    const expenseData = Object.keys(categorizedExpenses).map((category) => ({
        name: category,
        value: categorizedExpenses[category],
    }));

    const barChartData = [
        { name: "Income", amount: totalIncome },
        { name: "Expenses", amount: totalExpenses },
    ];

    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

    return (
        <div
            className={`p-6 rounded-md shadow-md ${isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
                }`}
        >
            <h2
                className={`text-4xl font-extrabold font-serif mb-8 ${isDarkMode ? "text-white" : "text-gray-800"
                    }`}
            >
                Financial Summary
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                <div className="flex flex-col items-center p-4 rounded-md shadow-md bg-purple-200 text-purple-800">
                    <p className="text-xl font-bold">Total Income</p>
                    <p className="text-2xl font-extrabold">{`$${totalIncome}`}</p>
                </div>
                <div className="flex flex-col items-center p-4 rounded-md shadow-md bg-red-200 text-red-800">
                    <p className="text-xl font-bold">Total Expenses</p>
                    <p className="text-2xl font-extrabold">{`$${totalExpenses}`}</p>
                </div>
                <div className="flex flex-col items-center p-4 rounded-md shadow-md bg-green-200 text-green-800">
                    <p className="text-xl font-bold">Total Balance</p>
                    <p className="text-2xl font-extrabold">{`$${totalBalance}`}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div className="flex flex-col items-center">
                    <h3 className="text-xl font-bold mb-4">Income by Category</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={incomeData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                fill="#8884d8"
                                label
                            >
                                {incomeData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                <div className="flex flex-col items-center">
                    <h3 className="text-xl font-bold mb-4">Expenses by Category</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={expenseData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                fill="#82ca9d"
                                label
                            >
                                {expenseData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="my-10">
                <h3 className="text-xl font-bold mb-4 text-center">Overall Income vs Expenses</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={barChartData}>
                        <XAxis dataKey="name" stroke={isDarkMode ? "#ffffff" : "#333"} />
                        <YAxis stroke={isDarkMode ? "#ffffff" : "#333"} />
                        <Tooltip />
                        <Legend />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Bar dataKey="amount" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <BudgetRecommendationsComp />
        </div>
    );
};

export default SummaryPage;
