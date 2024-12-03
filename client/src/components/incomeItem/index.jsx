import React, { useState } from "react";
import {
    bitcoin,
    book,
    calender,
    cancel,
    card,
    circle,
    clothing,
    comment,
    edit,
    food,
    freelance,
    medical,
    money,
    piggy,
    stocks,
    takeaway,
    trash,
    tv,
    users,
    yt,
    other,
    pocketMoney,
    commition,
    interest,
    gift,
    rent,
    taxi,
    health,
    commssion,
} from "../../utils/Icons";
import { dateFormat } from './../../utils/dateFormat';
import Button from "../button";
import UpdateForm from "../forms/UpdateForm";

function IncomeItem({
    data,
    deleteItem,
    indicatorColor,
    type,
    updateItem
}) {
    const [isUpdating, setIsUpdating] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const handleUpdateClick = () => {
        setIsUpdating(!isUpdating);
        setIsEditing(!isEditing);
    };

    const handleCancelClick = () => {
        setIsUpdating(false);
    };

    console.log(type);

    const categoryIcon = () => {
        switch (data?.category) {
            case "salary":
                return money;
            case "freelancing":
                return freelance;
            case "investments":
                return stocks;
            case "stocks":
                return users;
            case "bitcoin":
                return bitcoin;
            case "bank":
                return card;
            case "youtube":
                return yt;
            case "other":
                return other;
            case "pocketMoney":
                return pocketMoney;
            case "commition":
                return commition;
            case "interest":
                return interest;
            case "gift":
                return gift;
            case "rent":
                return rent;
            case "taxi":
                return taxi;
            case "food":
                return food;
            case "commision":
                return commssion
            default:
                return "";
        }
    };
    console.log(data.category);
    const expenseCatIcon = () => {
        console.log("hello");
        switch (data?.category) {
            case "salary":
                return money;
            case "freelancing":
                return freelance;
            case "investments":
                return stocks;
            case "stocks":
                return users;
            case "bitcoin":
                return bitcoin;
            case "bank":
                return card;
            case "youtube":
                return yt;
            case "other":
                return other;
            case "pocketMoney":
                return pocketMoney;
            case "commition":
                return commition;
            case "interest":
                return interest;
            case "gift":
                return gift;
            case "rent":
                return rent;
            case "taxi":
                return taxi;
            case "food":
                return food;
            case "health":
                return health
            case "commission":
                return commssion
            default:
                return "";
        }
    };

    return (
        <div
            className={`bg-white border-2 border-gray-200 shadow-lg rounded-lg p-6 mb-6 flex items-center gap-6 w-full text-gray-900 transition-all transform hover:scale-105 hover:shadow-xl`}
            style={{ borderColor: indicatorColor }}
        >
            <div className="w-16 h-16 rounded-lg bg-gray-200 flex items-center justify-center">
                {type === "expense" ? expenseCatIcon() : categoryIcon()}
            </div>
            <div className="flex-1 flex flex-col gap-3">
                <h5 className="text-2xl font-semibold relative">
                    {data?.title}
                    <span
                        className="absolute left-0 top-1/2 transform -translate-y-1/2 w-2 h-2 rounded-full"
                        style={{ backgroundColor: indicatorColor }}
                    ></span>
                </h5>
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3 text-primary opacity-80">
                        <p className="text-lg font-medium">{data.amount}</p>
                        <p className="flex items-center gap-1 text-sm">{calender} {dateFormat(data.date)}</p>
                        <p className="flex items-center gap-1 text-sm">{comment} {data.description}</p>
                    </div>
                    <div className="flex gap-4">
                        <Button
                            icon={trash}
                            bPad="p-3"
                            bRad="rounded-full"
                            bg="bg-red-500"
                            color="text-white"
                            onClick={() => deleteItem(data._id)}
                        />
                        {!isUpdating ? (
                            <Button
                                icon={edit}
                                bPad="p-3"
                                bRad="rounded-full"
                                bg="bg-blue-500"
                                color="text-white"
                                onClick={handleUpdateClick}
                            />
                        ) : (
                            <Button
                                icon={cancel}
                                bPad="p-3"
                                bRad="rounded-full"
                                bg="bg-gray-500"
                                color="text-white"
                                onClick={handleCancelClick}
                            />
                        )}
                    </div>
                </div>

                <div>
                    {isUpdating ? (
                        <UpdateForm
                            data={data}
                            updateItem={updateItem}
                            setIsUpdating={setIsUpdating}
                        />
                    ) : (
                        <div className="text-sm text-gray-600 space-y-2">
                            <p><strong>Title:</strong> {data.title}</p>
                            <p><strong>Description:</strong> {data.description}</p>
                            <p><strong>Amount:</strong> {data.amount}</p>
                            <p><strong>Date:</strong> {data.date}</p>
                            <p><strong>Type:</strong> {data.type}</p>
                            <p><strong>Category:</strong> {data.category}</p>
                            <button
                                onClick={handleUpdateClick}
                                className="bg-purple-600 hover:bg-purple-500 text-white font-semibold py-1 px-4 rounded mt-3 focus:outline-none focus:shadow-outline"
                            >
                                Edit
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default IncomeItem;
