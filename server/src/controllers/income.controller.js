const Joi = require('joi')
const Income = require('../models/income.model')
const { handleControllerError, isValidObjectId } = require('../../utils/helpers')


const incomeCtrl = {
    addIncome,
    getIncomes,
    updateIncomeById,
    deleteIncomeById
}

module.exports = incomeCtrl

const addIncomeSchema = Joi.object({
    title: Joi.string().required().max(50),
    amount: Joi.number().required(),
    category: Joi.string().required(),
    description: Joi.string().required(),
    date: Joi.string().allow(null)
})

async function addIncome(req) {
    try {
        const { error } = addIncomeSchema.validate(req.body)

        if (error) {
            throw Error(error.details[0].message)
        }

        const { title, amount, category, description, date } = req.body;

        const income = new Income({
            title,
            amount,
            category,
            description,
            date,
            user: req.user,
        });

        await income.save();


        return true
    } catch (e) {
        throw handleControllerError(e)
    }
}

async function getIncomes(req) {
    try {
        const incomes = await Income.find()
        if (incomes.length === 0) {
            throw Error("no income found")
        }
        return incomes
    } catch (e) {
        throw handleControllerError(e)
    }
}

async function updateIncomeById(req) {
    try {
        const { error } = addIncomeSchema.validate(req.body)

        if (error) {
            throw Error(error.details[0].message)
        }

        const { incomeId } = req.params

        if (!isValidObjectId(incomeId)) {
            throw Error("Invalid income id")
        }

        const income = await Income.findByIdAndUpdate(incomeId, req.body)

        await income.save();

        return income
    } catch (e) {
        throw handleControllerError(e)
    }
}

async function deleteIncomeById(req) {
    try {
        const { incomeId } = req.params

        if (!isValidObjectId(incomeId)) {
            throw Error("Invalid income id")
        }

        await Income.findByIdAndDelete(incomeId)

        return true
    } catch (e) {
        throw handleControllerError(e)
    }
}