import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { plus } from "../../utils/Icons";
import Button from "../button";
import incomeValidators from "../../validators/income.validation";
import incomeServices from "../../services/income.service";
import { successToast } from "../toastNotifications";
import { useGlobalContext } from './../../context/global-context';

const Form = ({ isDarkMode }) => {
    const { getIncomes } = useGlobalContext()
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
        // setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { errors, isValid } = incomeValidators.addIncomeValidation(initialValues)

            if (!isValid) {
                setErrors(errors)
                return
            }

            let res = await incomeServices.addIncome(initialValues)
            await getIncomes()
            if (res.data) {
                successToast("Income saved successfully")
            }
        } catch (e) {
            console.log(e);
        } finally {

        }
    };
    console.log(initialValues);
    return (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            {/* {error && <p className="text-red-500 text-sm">{error}</p>} */}

            <div className="input-control">
                <input
                    type="text"
                    name="title"
                    placeholder="Salary Title"
                    onChange={(e) => handleChange("title", e.target.value)}
                    className={`w-full p-2 rounded border-2 shadow-sm ${isDarkMode ? "bg-gray-800 text-white placeholder-white" : "bg-white text-gray-800 placeholder-gray-600"}`}
                />
            </div>

            <div className="input-control">
                <input
                    type="number"
                    name="amount"
                    placeholder="Salary Amount"
                    onChange={(e) => handleChange("amount", e.target.value)}
                    className={`w-full p-2 rounded border-2 shadow-sm ${isDarkMode ? "bg-gray-800 text-white placeholder-white" : "bg-white text-gray-800 placeholder-gray-600"}`}
                />
            </div>

            <div className="input-control">
                <DatePicker
                    id="date"
                    placeholderText="Enter A Date"
                    dateFormat="dd/MM/yyyy"
                    value={initialValues.date}
                    onChange={(date) => handleChange('date', date)}
                    customInput={
                        <input
                            className={`w-full p-2 rounded border-2 shadow-sm ${isDarkMode ? "bg-gray-800 text-white placeholder-white" : "bg-white text-gray-800 placeholder-gray-600"}`}
                        />
                    }
                />
            </div>

            <div className="input-control">
                <select
                    required
                    name="category"
                    id="category"
                    onChange={(e) => handleChange("category", e.target.value)}
                    className={`w-full p-2 rounded border-2 shadow-sm ${isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"}`}
                >
                    <option value="" disabled>
                        Select Option
                    </option>
                    <option value="salary">Salary</option>
                    <option value="pocketMoney">Pocket Money</option>
                    <option value="selling">Selling</option>
                    <option value="freelancing">Freelancing</option>
                    <option value="investments">Investments</option>
                    <option value="stocks">Stocks</option>
                    <option value="interest">Interest</option>
                    <option value="bank">Bank Transfer</option>
                    <option value="gift">Gifts</option>
                    <option value="commission">Commission</option>
                    <option value="youtube">YouTube</option>
                    <option value="other">Other</option>
                </select>
            </div>

            <div className="input-control">
                <textarea
                    name="description"
                    placeholder="Add a reference"
                    id="description"
                    cols="30"
                    rows="4"
                    onChange={(e) => handleChange("description", e.target.value)}
                    className={`w-full p-2 rounded border-2 shadow-sm resize-none ${isDarkMode ? "bg-gray-800 text-white placeholder-white" : "bg-white text-gray-800 placeholder-gray-600"}`}
                ></textarea>
            </div>

            <div className="submit-btn">
                <Button
                    type="submit"
                    name="Add Income"
                    icon={plus}
                    bPad="px-4 py-2"
                    bRad="rounded-full"
                    bg="bg-green-500"
                    color="text-white"
                />
            </div>
        </form>
    );
};

export default Form;
