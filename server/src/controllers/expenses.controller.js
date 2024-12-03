const Joi = require('joi')
const { handleControllerError, isValidObjectId } = require('../../utils/helpers')
const Expense = require('../models/expense.model')
const { categorizeExpense } = require('../../utils/categorize')


const expenseCtrl = {
    addExpenses,
    getExpenses,
    updateExpensesById,
    deleteExpensesById
}

module.exports = expenseCtrl

const addExpensesSchema = Joi.object({
    title: Joi.string().required().max(50),
    amount: Joi.number().required(),
    category: Joi.string().required(),
    description: Joi.string().required(),
    date: Joi.string().allow(null)
})

async function addExpenses(req) {
    try {
        const { error } = addExpensesSchema.validate(req.body)

        if (error) {
            throw Error(error.details[0].message)
        }

        const { title, amount, category, description, date } = req.body;

        const naturalCategory = categorizeExpense(description);

        const expense = new Expense({
            title,
            amount,
            category: naturalCategory,
            description,
            date,
            user: req.user,
        });

        await expense.save();


        return true
    } catch (e) {
        throw handleControllerError(e)
    }
}

async function getExpenses(req) {
    try {
        const expense = await Expense.find()
        if (expense.length === 0) {
            throw Error("no income found")
        }
        return expense
    } catch (e) {
        throw handleControllerError(e)
    }
}

async function updateExpensesById(req) {
    try {
        const { error } = addExpensesSchema.validate(req.body)

        if (error) {
            throw Error(error.details[0].message)
        }

        const { expenseId } = req.params

        if (!isValidObjectId(expenseId)) {
            throw Error("Invalid income id")
        }

        const naturalCategory = categorizeExpense(req.body.description);


        const expense = await Expense.findByIdAndUpdate(expenseId, { ...req.body, category: naturalCategory })

        await expense.save();

        return expense
    } catch (e) {
        throw handleControllerError(e)
    }
}

async function deleteExpensesById(req) {
    try {

        const { expenseId } = req.params

        if (!isValidObjectId(expenseId)) {
            throw Error("Invalid income id")
        }

        await Expense.findByIdAndDelete(expenseId)

        return true
    } catch (e) {
        throw handleControllerError(e)
    }
}