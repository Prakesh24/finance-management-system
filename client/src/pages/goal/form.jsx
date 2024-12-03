// AddGoalForm.js
import React, { useState } from 'react';
import axios from 'axios';

const AddGoalForm = ({ onGoalAdded }) => {
    const [goalName, setGoalName] = useState('');
    const [goalAmount, setGoalAmount] = useState('');
    const [targetDate, setTargetDate] = useState('');
    const [recurringAmount, setRecurringAmount] = useState('');
    const [goalType, setGoalType] = useState('custom');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newGoal = {
            goalName,
            goalAmount: Number(goalAmount),
            targetDate,
            recurringAmount: Number(recurringAmount),
            goalType,
            status: 'active',
        };

        try {
            // Send the new goal to the backend (assuming you have an API endpoint to handle this)
            const response = await axios.post('/api/goals', newGoal);
            onGoalAdded(response.data); // Callback to update the parent component
            resetForm();
        } catch (error) {
            console.error('Error adding goal:', error);
        }
    };

    const resetForm = () => {
        setGoalName('');
        setGoalAmount('');
        setTargetDate('');
        setRecurringAmount('');
        setGoalType('custom');
    };

    return (
        <div className="p-4 border rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Add New Goal</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block">Goal Name</label>
                    <input
                        type="text"
                        value={goalName}
                        onChange={(e) => setGoalName(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block">Goal Amount ($)</label>
                    <input
                        type="number"
                        value={goalAmount}
                        onChange={(e) => setGoalAmount(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block">Target Date</label>
                    <input
                        type="date"
                        value={targetDate}
                        onChange={(e) => setTargetDate(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block">Recurring Monthly Savings ($)</label>
                    <input
                        type="number"
                        value={recurringAmount}
                        onChange={(e) => setRecurringAmount(e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block">Goal Type</label>
                    <select
                        value={goalType}
                        onChange={(e) => setGoalType(e.target.value)}
                        className="w-full p-2 border rounded"
                    >
                        <option value="vacation">Vacation</option>
                        <option value="debt repayment">Debt Repayment</option>
                        <option value="emergency fund">Emergency Fund</option>
                        <option value="custom">Custom</option>
                    </select>
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">Add Goal</button>
            </form>
        </div>
    );
};

export default AddGoalForm;
