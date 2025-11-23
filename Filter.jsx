import React from "react";

export default function Filter({ filter, setFilter, expenses }) {
  const months = [...new Set(expenses.map((e) => new Date(e.date).getMonth() + 1))];

  return (
    <div className="flex gap-2 items-center mt-3">
      <select
        value={filter.category}
        onChange={(e) => setFilter((s) => ({ ...s, category: e.target.value }))}
        className="input w-36"
      >
        <option>All</option>
        <option>Food</option>
        <option>Travel</option>
        <option>Bills</option>
        <option>Other</option>
      </select>

      <select
        value={filter.month}
        onChange={(e) => setFilter((s) => ({ ...s, month: e.target.value }))}
        className="input w-32"
      >
        <option value="All">All months</option>
        {months.map((m) => (
          <option key={m} value={m}>
            {m}
          </option>
        ))}
      </select>
    </div>
  );
}
