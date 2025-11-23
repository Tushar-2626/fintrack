import React from "react";

export default function ExpenseList({ expenses, onEdit, onDelete }) {
  if (!expenses.length) return <div className="mt-4">No expenses found</div>;

  return (
    <ul className="mt-4 space-y-2">
      {expenses.map((e) => (
        <li key={e.id} className="flex justify-between border p-3 rounded">
          <div>
            <div className="font-medium">{e.title}</div>
            <div className="text-sm text-gray-500">
              {e.category} • {new Date(e.date).toLocaleDateString()}
            </div>
          </div>

          <div className="flex gap-3 items-center">
            <div className="font-semibold text-lg">₹{e.amount}</div>

            <button onClick={() => onEdit(e)} className="border px-2 py-1 text-sm rounded">
              Edit
            </button>

            <button onClick={() => onDelete(e.id)} className="border px-2 py-1 text-sm rounded">
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
