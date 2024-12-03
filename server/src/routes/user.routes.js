const express = require('express');
const userCtrl = require('../controllers/user.controller');
const asyncHandler = require('express-async-handler');
const { createResponse, createError } = require('../../utils/helpers');
const { resStatusCode, resMsg } = require('../../config/constants');
const router = express.Router();

module.exports = router

router.get('/budget-recommendations', asyncHandler(getBudgetRecommendations))

async function getBudgetRecommendations(req, res, next) {
    try {
        const response = await userCtrl.getBudgetRecommendations(req);
        if (response) return createResponse(res, resStatusCode.CREATED, resMsg.CREATED, response);
        return createError(res, resStatusCode.UNABLE_CREATE, { message: resMsg.UNABLE_CREATE })
    } catch (e) {
        return createError(res, resStatusCode.BAD_REQUEST, e)
    }
}