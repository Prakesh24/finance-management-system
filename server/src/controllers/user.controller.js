const { handleControllerError } = require("../../utils/helpers");
const Expense = require("../models/expense.model");
const Income = require("../models/income.model");
const User = require("../models/user.model");

const userCtrl = {
    getBudgetRecommendations
}

module.exports = userCtrl;

async function calculateBudgetRecomendation(userId) {
    try {
        const userExpenses = await Expense.find({ user: userId }).populate('user');

        const totalIncome = await Income.findOne({ user: userId }).sort({ date: -1 }).limit(1);

        const monthlyIncome = totalIncome.amount;

        let categoryTotals = {}
        // Get spending totals for each category
        userExpenses.forEach(expense => {
            const category = expense.category;
            const amount = expense.amount;
            if (!categoryTotals[category]) {
                categoryTotals[category] = 0
            }
            categoryTotals[category] += amount
        })

        // Calculate recommended budgets based on 10% of monthly income (example logic)
        let recommendedBudgets = {}

        Object.keys(categoryTotals).forEach(category => {
            const categoryTotal = categoryTotals[category];
            const categoryPercentage = (categoryTotal / monthlyIncome) * 100;
            const recommendedBudget = (categoryPercentage * monthlyIncome) / 100;
            recommendedBudgets[category] = recommendedBudget
        })

        console.log(categoryTotals, recommendedBudgets);

        await User.findByIdAndUpdate(userId, { recommendedBudgets })
    } catch (e) {
        throw handleControllerError(e)
    }
}

async function getBudgetRecommendations(req) {
    try {
        const userId = req.user._id;
        await calculateBudgetRecomendation(userId)
        const user = await User.findById(userId)

        console.log(user);
        return user.recommendedBudgets
    } catch (e) {
        throw handleControllerError(e)
    }
}

