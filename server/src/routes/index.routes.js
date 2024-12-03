const express = require('express')
const authRoutes = require('./auth.routes')
const incomeRoutes = require('./income.routes')
const expensesRoutes = require('./expenses.routes')
const userRoutes = require('./user.routes')
const passport = require('passport')
const router = express.Router()

router.use('/auth', authRoutes)

router.use('/income', passport.authenticate('jwt', { session: false }), incomeRoutes)

router.use('/expenses', passport.authenticate('jwt', { session: false }), expensesRoutes)

router.use('/user', passport.authenticate('jwt', { session: false }), userRoutes)

module.exports = router