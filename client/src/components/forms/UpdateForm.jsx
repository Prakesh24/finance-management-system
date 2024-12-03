import React, { useState } from "react";
import incomeServices from "../../services/income.service";
import { successToast } from "../toastNotifications";

function UpdateForm({
  data,
  updateItem,
  setIsUpdating,
}) {
  const [initialValues, setInitalValues] = useState(data)

  const handleChange = (key, value) => {
    if (!key) return

    setInitalValues((prev) => {
      return {
        ...prev,
        [key]: value
      }
    })
  }

  console.log(initialValues);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      title: initialValues.title,
      description: initialValues.description,
      amount: initialValues.amount,
      date: initialValues.date,
      category: initialValues.category
    }
    updateItem(data._id, payload)
  };

  return (
    <div>
      <h3>Update Income</h3>
      <form onSubmit={handleSubmit}>

        <div className="m-3">
          <label htmlFor="title">Title : </label>
          <input
            type="text"
            placeholder={data.title}
            onChange={(e) => handleChange('title', e.target.value)}
            className="border border-gray-400 rounded p-2"
          />
          <label htmlFor="description">Description : </label>
          <input
            type="text"
            placeholder={data.description}
            onChange={(e) => handleChange('description', e.target.value)}
            className="border border-gray-400 rounded p-2"
          />
        </div>
        <div className="m-3">

          <label htmlFor="amount">Amount : </label>
          <input
            type="number"
            placeholder={data.amount}
            onChange={(e) => handleChange('amount', e.target.value)}
            className="border border-gray-400 rounded p-2"
          />

          <label htmlFor="date">Date : </label>
          <input
            type="date"
            placeholder={data.date}
            onChange={(e) => handleChange('date', e.target.value)}
            className="border border-gray-400 rounded p-2"
          />
        </div>
        <div className="m-3">

          <label htmlFor="category">Category : </label>
          <input
            type="text"
            placeholder={data.category}
            onChange={(e) => handleChange('category', e.target.value)}
            className="border border-gray-400 rounded p-2"
          />
        </div>
        <button type="submit" class="bg-purple-700 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded">
          Save Changes
        </button>
        {/* <button onClick={() => updateItem(null)}>Cancel</button> */}
      </form>
    </div>
  );
}

export default UpdateForm;
