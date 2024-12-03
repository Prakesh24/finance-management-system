import { isEmpty } from "../helpers/common"


const signUpValidator = (payload) => {
    try {
        let errors = {}

        if (isEmpty(payload.email)) {
            errors.email = 'Email is required'
        }

        if (isEmpty(payload.password)) {
            errors.password = 'password is required'
        } else if (payload.password !== payload.confirm_password) {
            errors.confirm_password = "Password should match"
        }

        return { errors, isValid: isEmpty(errors) }
    } catch (e) {
        return { errors: e, isValid: false }
    }
}

const loginValidator = (payload) => {
    try {
        let errors = {}

        console.log(payload);

        if (isEmpty(payload.email)) {
            errors.email = 'Email is required'
        }

        if (isEmpty(payload.password)) {
            errors.password = 'password is required'
        }

        return { errors, isValid: isEmpty(errors) }
    } catch (e) {
        return { errors: e, isValid: false }
    }
}
const authValidators = {
    signUpValidator,
    loginValidator
}

export default authValidators