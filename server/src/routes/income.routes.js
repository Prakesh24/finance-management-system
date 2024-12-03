const express = require('express')
const { createResponse, createError } = require('../../utils/helpers');
const { resMsg, resStatusCode } = require('../../config/constants');
const incomeCtrl = require('../controllers/income.controller');
const asyncHandler = require('express-async-handler')
const passport = require('passport');
const router = express.Router()

router.post('/add-income', passport.authenticate('jwt', { session: false }), asyncHandler(addIncome))

router.get('/get-incomes', passport.authenticate('jwt', { session: false }), asyncHandler(getIncomes))

router.patch('/:incomeId/update-income', passport.authenticate('jwt', { session: false }), asyncHandler(updateIncomeById))

router.delete('/:incomeId/delete-income', passport.authenticate('jwt', { session: false }), asyncHandler(deleteIncomeById))



async function addIncome(req, res, next) {
    try {
        const response = await incomeCtrl.addIncome(req);
        if (response) return createResponse(res, resStatusCode.CREATED, resMsg.CREATED, response);
        return createError(res, resStatusCode.UNABLE_CREATE, { message: resMsg.UNABLE_CREATE })
    } catch (e) {
        return createError(res, resStatusCode.BAD_REQUEST, e)
    }
}

async function updateIncomeById(req, res, next) {
    try {
        const response = await incomeCtrl.updateIncomeById(req);
        if (response) return createResponse(res, resStatusCode.UPDATED, resMsg.UPDATED, response);
        return createError(res, resStatusCode.UNABLE_UPDATE, { message: resMsg.UNABLE_UPDATE })
    } catch (e) {
        return createError(res, resStatusCode.BAD_REQUEST, e)
    }
}

async function getIncomes(req, res, next) {
    try {
        const response = await incomeCtrl.getIncomes(req);
        if (response) return createResponse(res, resStatusCode.SUCCESS_FETCH, resMsg.SUCCESS_FETCH, response);
        return createError(res, resStatusCode.UNABLE_FETCH, { message: resMsg.UNABLE_FETCH })
    } catch (e) {
        return createError(res, resStatusCode.BAD_REQUEST, e)
    }
}

async function deleteIncomeById(req, res, next) {
    try {
        const response = await incomeCtrl.deleteIncomeById(req);
        if (response) return createResponse(res, resStatusCode.DELETED, resMsg.DELETED, response);
        return createError(res, resStatusCode.UNABLE_DELETE, { message: resMsg.UNABLE_DELETE })
    } catch (e) {
        return createError(res, resStatusCode.BAD_REQUEST, e)
    }
}

module.exports = router