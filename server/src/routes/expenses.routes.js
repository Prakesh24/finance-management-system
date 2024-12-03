const express = require('express')
const { createResponse, createError } = require('../../utils/helpers');
const { resMsg, resStatusCode } = require('../../config/constants');
const asyncHandler = require('express-async-handler')
const passport = require('passport');
const expenseCtrl = require('../controllers/expenses.controller');
const router = express.Router()

router.post('/add-expenses', passport.authenticate('jwt', { session: false }), asyncHandler(addExpenses))

router.get('/get-expenses', passport.authenticate('jwt', { session: false }), asyncHandler(getExpenses))

router.patch('/:expenseId/update-expenses', passport.authenticate('jwt', { session: false }), asyncHandler(updateExpensesById))

router.delete('/:expenseId/delete-expenses', passport.authenticate('jwt', { session: false }), asyncHandler(deleteExpensesById))

async function addExpenses(req, res, next) {
    try {
        const response = await expenseCtrl.addExpenses(req);
        if (response) return createResponse(res, resStatusCode.CREATED, resMsg.CREATED, response);
        return createError(res, resStatusCode.UNABLE_CREATE, { message: resMsg.UNABLE_CREATE })
    } catch (e) {
        return createError(res, resStatusCode.BAD_REQUEST, e)
    }
}

async function updateExpensesById(req, res, next) {
    try {
        const response = await expenseCtrl.updateExpensesById(req);
        if (response) return createResponse(res, resStatusCode.UPDATED, resMsg.UPDATED, response);
        return createError(res, resStatusCode.UNABLE_UPDATE, { message: resMsg.UNABLE_UPDATE })
    } catch (e) {
        return createError(res, resStatusCode.BAD_REQUEST, e)
    }
}

async function getExpenses(req, res, next) {
    try {
        const response = await expenseCtrl.getExpenses(req);
        if (response) return createResponse(res, resStatusCode.SUCCESS_FETCH, resMsg.SUCCESS_FETCH, response);
        return createError(res, resStatusCode.UNABLE_FETCH, { message: resMsg.UNABLE_FETCH })
    } catch (e) {
        return createError(res, resStatusCode.BAD_REQUEST, e)
    }
}

async function deleteExpensesById(req, res, next) {
    try {
        const response = await expenseCtrl.deleteExpensesById(req);
        if (response) return createResponse(res, resStatusCode.DELETED, resMsg.DELETED, response);
        return createError(res, resStatusCode.UNABLE_DELETE, { message: resMsg.UNABLE_DELETE })
    } catch (e) {
        return createError(res, resStatusCode.BAD_REQUEST, e)
    }
}

module.exports = router