const mongoose = require('mongoose')

const customSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
    },

    profilePicture: {
        type: String,
        default:
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    },
    recommendedBudgets: {
        type: Map,
        of: Number, // stores budget recommendations for each category
    },

    goals: [{
        goal_name: {
            type: String,
            require: true,
        },
        goal_amount: {
            type: Number,
            required: true,
        },
        amount_saved: {
            type: Number,
            default: 0,
        },
        target_date: {
            type: Date,
            required: true,
        },
        recurring_amount: {
            type: Number,
            required: true,
        },
        goal_type: {
            type: String,
            enum: ['vacation', 'debt repayment', 'emergency', 'custom'],
            default: 'custom'
        },
        status: {
            type: String,
            enum: ['active', 'completed', 'abandoned'],
            default: 'active'
        }
    }]
}, { timestamps: true })

const User = mongoose.model('User', customSchema)
module.exports = User;