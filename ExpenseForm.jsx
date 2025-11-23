import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";

export default function ExpenseForm({ onAdd, editing, onUpdate, onCancel }) {
  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "Food",
    date: "",
  });

  useEffect(() => {
    if (editing) setForm(editing);
  }, [editing]);

  const handleChange = (e) =>
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title || !form.amount || !form.date) {
      return alert("Fill all required fields");
    }

    if (editing) {
      onUpdate(editing.id, form);
    } else {
      onAdd({ id: uuid(), ...form, amount: Number(form.amount) });
    }

    setForm({ title: "", amount: "", category: "Food", date: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 mb-4">
      <div>
        <label className="text-sm font-medium">Title</label>
        <input name="title" value={form.title} onChange={handleChange} className="input" />
      </div>

      <div>
        <label className="text-sm font-medium">Amount</label>
        <input
          name="amount"
          type="number"
          value={form.amount}
          onChange={handleChange}
          className="input"
        />
      </div>

      <div className="flex gap-3">
        <div className="flex-1">
          <label className="text-sm font-medium">Category</label>
          <select name="category" value={form.category} onChange={handleChange} className="input">
            <option>Food</option>
            <option>Travel</option>
            <option>Bills</option>
            <option>Other</option>
          </select>
        </div>

        <div className="flex-1">
          <label className="text-sm font-medium">Date</label>
          <input type="date" name="date" value={form.date} onChange={handleChange} className="input" />
        </div>
      </div>

      <div className="flex gap-2">
        <button className="px-4 py-2 bg-blue-600 text-white rounded">
          {editing ? "Update" : "Add"}
        </button>

        {editing && (
          <button type="button" onClick={onCancel} className="px-4 py-2 border rounded">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
