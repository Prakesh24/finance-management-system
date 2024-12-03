import React, { useEffect } from "react";
import { useGlobalContext } from "../../context/global-context";

const BudgetRecommendationsComp = () => {
    const { getBudgetRecommendations, budgetRecommendations } = useGlobalContext();

    useEffect(() => {
        getBudgetRecommendations();
    }, []);

    return (
        <div className="mt-12 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">
                Recommended Budgets
            </h2>
            <div className="space-y-6">
                {Object.keys(budgetRecommendations).map((category) => (
                    <div
                        key={category}
                        className="flex items-center justify-between p-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-lg shadow-md"
                    >
                        <div className="flex flex-col">
                            <h3 className="text-lg font-medium">{category}</h3>
                            <p className="text-sm text-gray-200">
                                Recommended Budget
                            </p>
                        </div>
                        <p className="text-xl font-bold">
                            ${budgetRecommendations[category].toFixed(2)}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BudgetRecommendationsComp;
