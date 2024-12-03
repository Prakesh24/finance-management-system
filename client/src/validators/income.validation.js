import { isEmpty } from "../helpers/common"

const addIncomeValidation = (payload) => {
    try {
        let errors = {}

        if (isEmpty(payload.title)) {
            errors.title = 'Title is required'
        }

        if (isEmpty(payload.description)) {
            errors.description = 'Description is required'
        }

        // if (isEmpty(payload.date)) {
        //     errors.date = 'Date is required'
        // }

        if (isEmpty(payload.amount)) {
            errors.amount = 'Amount is required'
        }

        if (isEmpty(payload.category)) {
            errors.category = 'Category is required'
        }


        return { errors, isValid: isEmpty(errors) }
    } catch (e) {
        return { errors: e, isValid: false }
    }
}

const incomeValidators = {
    addIncomeValidation
}

export default incomeValidators