import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { plus } from "../../utils/Icons";
import { useGlobalContext } from "../../context/global-context";
import Button from "../../components/button";
import { successToast } from "../../components/toastNotifications";
import expensesServices from "../../services/expense.service";
import expensesValidator from "../../validators/expenses.validation";

function ExpenseForm({ isDarkMode }) {
    const { addExpense, getExpenses, error, setError } = useGlobalContext();
    const [initialValues, setInitialValues] = useState({
        title: "",
        amount: null,
        date: "",
        category: "",
        description: "",
    });
    const [errors, setErrors] = useState(null)

    console.log(errors);
    const handleChange = (key, value) => {

        if (!key) return;

        setInitialValues((prev) => {
            return {
                ...prev,
                [key]: value
            }
        })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { errors, isValid } = expensesValidator.addExpensesValidator(initialValues)

            if (!isValid) {
                setErrors(errors)
                return
            }

            let res = await expensesServices.addExpenses(initialValues)
            // await getIncomes()
            if (res.data) {
                successToast("Expenses saved successfully")
            }
        } catch (e) {
            console.log(e);
        } finally {

        }
    };
    console.log(initialValues);

    return (
        <form
            className="flex flex-col gap-8 p-6"
            onSubmit={handleSubmit}
        >

            <div className="flex flex-col">
                <input
                    type="text"
                    name="title"
                    placeholder="Expense Title"
                    onChange={(e) => handleChange("title", e.target.value)}
                    className={`w-full p-2 border rounded-md shadow-sm ${isDarkMode ? "bg-gray-800 text-white placeholder-white" : "bg-transparent text-gray-700 placeholder-gray-500"}`}
                />
            </div>

            <div className="flex flex-col">
                <input
                    type="number"
                    name="amount"
                    placeholder="Expense Amount"
                    onChange={(e) => handleChange("amount", e.target.value)}
                    className={`w-full p-2 border rounded-md shadow-sm ${isDarkMode ? "bg-gray-800 text-white placeholder-white" : "bg-transparent text-gray-700 placeholder-gray-500"}`}
                />
            </div>

            <div className="flex flex-col">
                <DatePicker
                    id="date"
                    placeholderText="Enter A Date"
                    dateFormat="dd/MM/yyyy"
                    onChange={(date) => handleChange('date', date)}
                    className={`w-full p-2 border rounded-md shadow-sm ${isDarkMode ? "bg-gray-800 text-white" : "bg-transparent text-gray-700"}`}
                />
            </div>

            <div className="flex flex-col">
                <select
                    required
                    name="category"
                    id="category"
                    onChange={(e) => handleChange("category", e.target.value)}
                    className={`w-full p-2 border rounded-md shadow-sm ${isDarkMode ? "bg-gray-800 text-white" : "bg-transparent text-gray-700"}`}
                >
                    <option value="" disabled>Select Option</option>
                    <option value="education">Education</option>
                    <option value="groceries">Groceries</option>
                    <option value="health">Health</option>
                    <option value="food">Food</option>
                    <option value="clothing">Clothing</option>
                    <option value="subscriptions">Subscriptions</option>
                    <option value="travelling">Travelling</option>
                    <option value="taxi">Taxi</option>
                    <option value="rent">Rent</option>
                    <option value="gift">Gift</option>
                    <option value="takeaways">Takeaways</option>
                    <option value="other">Other</option>
                </select>
            </div>

            <div className="flex flex-col">
                <textarea
                    name="description"
                    placeholder="Add A Reference"
                    id="description"
                    cols="30"
                    rows="4"
                    onChange={(e) => handleChange("description", e.target.value)}
                    className={`w-full p-2 border rounded-md shadow-sm resize-none ${isDarkMode ? "bg-gray-800 text-white placeholder-white" : "bg-transparent text-gray-700 placeholder-gray-500"}`}
                ></textarea>
            </div>

            <div className="flex justify-end">
                <Button
                    name="Add Expense"
                    icon={plus}
                    bPad=".8rem 1.6rem"
                    bRad="30px"
                    bg="var(--color-accent)"
                    color="#fff"
                />
            </div>
        </form>
    );
}

export default ExpenseForm;
