import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import {
    BarChart,
    XAxis,
    YAxis,
    Legend,
    Tooltip,
    CartesianGrid,
    Bar,
} from "recharts";
import { ArcElement, Chart } from "chart.js";
import { useGlobalContext } from './../../context/global-context';
import BudgetRecommendationComp from "../../components/budgetRecommendations";

Chart.register(ArcElement);

const Dashboard = ({ isDarkMode }) => {
    const {
        totalExpenses,
        incomes,
        expenses,
        totalBalance,
        getIncomes,
        getExpenses,

    } = useGlobalContext();

    // useEffect(() => {
    //     getBudgetRecommendations()
    // }, []);

    const [timeRange, setTimeRange] = useState("today"); // Default time range

    useEffect(() => {
        getIncomes();
        getExpenses();
    }, []);

    // Filter incomes and expenses based on time range
    const filteredIncomes = filterDataByTimeRange(incomes, timeRange);
    const filteredExpenses = filterDataByTimeRange(expenses, timeRange);

    const incomeColors = ["#4caf50", "#2196f3", "#ffc107"];
    const expenseColors = ["#f44336", "#9c27b0", "#ff9800"];

    const incomePieChartData = generateChartData(filteredIncomes, incomeColors);
    const expensesPieChartData = generateChartData(filteredExpenses, expenseColors);

    const totalIncomeValue = filteredIncomes.reduce((sum, i) => sum + i.amount, 0);
    const totalExpensesValue = filteredExpenses.reduce((sum, e) => sum + e.amount, 0);

    const barChartData = [
        { name: "Total Income", amount: totalIncomeValue },
        { name: "Total Expenses", amount: totalExpensesValue },
    ];

    const budgetRecommendations = getBudgetRecommendations(filteredExpenses);

    return (
        <div
            className={`p-6 min-h-screen ${isDarkMode
                ? "bg-gray-900 text-white"
                : "bg-gray-50 text-gray-900"
                }`}
        >
            {/* Header */}
            <div className="flex justify-between items-center p-6 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg shadow-lg mb-8">
                <h1 className="text-4xl font-extrabold">Dashboard</h1>
                <div className="flex gap-4">
                    {["today", "thisWeek", "thisMonth"].map((range) => (
                        <button
                            key={range}
                            onClick={() => setTimeRange(range)}
                            className={`${timeRange === range
                                ? "bg-indigo-700 text-white"
                                : "bg-white text-purple-500"
                                } font-semibold py-2 px-4 rounded shadow hover:bg-gray-200`}
                        >
                            {range === "today"
                                ? "Today"
                                : range === "thisWeek"
                                    ? "This Week"
                                    : "This Month"}
                        </button>
                    ))}
                </div>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Total Balance Card */}
                <Card
                    title="Total Balance"
                    value={`$${totalBalance().toFixed(2)}`}
                    bgGradient="from-green-400 to-blue-500"
                    isDarkMode={isDarkMode}
                />

                {/* Pie Charts */}
                <PieChartCard
                    title="Income Breakdown"
                    data={incomePieChartData}
                    total={totalIncomeValue}
                    isDarkMode={isDarkMode}
                />
                <PieChartCard
                    title="Expense Breakdown"
                    data={expensesPieChartData}
                    total={totalExpensesValue}
                    isDarkMode={isDarkMode}
                />
            </div>

            {/* Budget Recommendation Section */}
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
                <h2 className="text-2xl font-bold mb-4 text-center flex items-center justify-center">
                    Budget Recommendations
                </h2>
                {budgetRecommendations.map((recommendation, index) => (
                    <BudgetCard
                        key={index}
                        title={recommendation.category}
                        recommendedBudget={recommendation.recommended}
                        actualSpending={recommendation.actual}
                        isDarkMode={isDarkMode}
                    />
                ))}
            </div>

            {/* Bar Chart */}
            <div className="mt-8 p-6 bg-white rounded-xl shadow-lg">
                <h2 className="text-xl font-bold mb-4">Income vs Expenses</h2>
                <BarChart
                    width={600}
                    height={300}
                    data={barChartData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="amount" fill="#8884d8" />
                </BarChart>
            </div>
        </div>
    );
};

// Budget Recommendation Card
const BudgetCard = ({ title, recommendedBudget, actualSpending, isDarkMode }) => {
    const isOverBudget = actualSpending > recommendedBudget;
    return (
        <div
            className={`p-6 rounded-2xl shadow-lg transform transition duration-300 ease-in-out hover:scale-105 ${isDarkMode
                ? "bg-gray-800 text-white"
                : "bg-gradient-to-br from-indigo-300 to-purple-400 text-white"
                }`}
        >
            {/* Card Title */}
            <h2 className="text-2xl font-bold mb-4 flex justify-center items-center">{title}</h2>

            {/* Budget Info */}
            <div className="mb-4 space-y-2">
                <p className="text-lg">
                    <span className="font-semibold">Recommended Budget:</span> ${recommendedBudget.toFixed(2)}
                </p>
                <p className="text-lg">
                    <span className="font-semibold">Actual Spending:</span> ${actualSpending.toFixed(2)}
                </p>
            </div>

            {/* Budget Status */}
            <p
                className={`text-lg font-semibold mt-2 ${isOverBudget ? "text-red-500" : "text-green-500"
                    }`}
            >
                {isOverBudget
                    ? "You’ve exceeded your budget!"
                    : "You’re within your budget!"}
            </p>

            {/* Optional Indicator for Budget Status */}
            <div className={`mt-4 flex items-center ${isOverBudget ? "text-red-500" : "text-green-500"}`}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="mr-2"
                >
                    {isOverBudget ? (
                        <path
                            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
                        />
                    ) : (
                        <path
                            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
                        />
                    )}
                </svg>
                <span>{isOverBudget ? "Consider adjusting your spending" : "Great job staying on budget!"}</span>
            </div>
        </div>
    );
};

// Card Component
const Card = ({ title, value, bgGradient, isDarkMode }) => (
    <div
        className={`p-6 rounded-2xl shadow-lg ${isDarkMode
            ? "bg-gray-800 text-white"
            : `bg-gradient-to-br ${bgGradient} text-white`
            }`}
    >
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="text-4xl font-extrabold">{value}</p>
    </div>
);

// Pie Chart Card
const PieChartCard = ({ title, data, total, isDarkMode }) => (
    <div
        className={`p-6 rounded-2xl shadow-lg ${isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
            }`}
    >
        <h2 className="text-xl font-bold">{title}</h2>
        <Pie data={data} height={200} width={200} />
        <p className="text-lg font-semibold mt-4">
            Total: <span className="font-bold">${total.toFixed(2)}</span>
        </p>
    </div>
);

// Helper Functions
const generateChartData = (dataItems, colors) => {
    const categories = dataItems.reduce((acc, { category, amount }) => {
        acc[category] = (acc[category] || 0) + amount;
        return acc;
    }, {});

    return {
        labels: Object.keys(categories),
        datasets: [
            {
                data: Object.values(categories),
                backgroundColor: colors,
            },
        ],
    };
};

const filterDataByTimeRange = (data, range) => {
    const now = new Date();
    return data.filter(({ date }) => {
        const itemDate = new Date(date);
        if (range === "today") {
            return itemDate.toDateString() === now.toDateString();
        } else if (range === "thisWeek") {
            const startOfWeek = new Date(
                now.setDate(now.getDate() - now.getDay())
            );
            return itemDate >= startOfWeek;
        } else if (range === "thisMonth") {
            return (
                itemDate.getMonth() === now.getMonth() &&
                itemDate.getFullYear() === now.getFullYear()
            );
        }
        return true;
    });
};

// Budget Recommendations Based on Categories
const getBudgetRecommendations = (expenses) => {
    const categoryAverages = expenses.reduce((acc, { category, amount }) => {
        if (!acc[category]) acc[category] = [];
        acc[category].push(amount);
        return acc;
    }, {});

    return Object.keys(categoryAverages).map((category) => {
        const totalSpent = categoryAverages[category].reduce((sum, amount) => sum + amount, 0);
        const averageSpent = totalSpent / categoryAverages[category].length;

        // Simple budget recommendation logic
        let recommendedBudget = averageSpent;
        if (category === "Groceries") {
            recommendedBudget = averageSpent * 1.1; // For groceries, slightly increase budget
        } else if (category === "Entertainment") {
            recommendedBudget = averageSpent * 0.9; // Reduce entertainment budget
        }

        return {
            category,
            recommended: recommendedBudget,
            actual: totalSpent,
        };
    });
};

export default Dashboard;
