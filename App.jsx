import React, { useState, useMemo } from "react";
import { useLocalStorage } from "./utils/useLocalStorage";
import { SAMPLE_EXPENSES } from "./data/sampleData";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import Filter from "./components/Filter";
import MonthlyChart from "./components/MonthlyChart";

export default function App() {
  const [expenses, setExpenses] = useLocalStorage("fintrack_expenses", SAMPLE_EXPENSES);
  const [filter, setFilter] = useState({ category: "All", month: "All" });
  const [editing, setEditing] = useState(null);

  const addExpense = (exp) => setExpenses((prev) => [exp, ...prev]);

  const updateExpense = (id, data) => {
    setExpenses((prev) => prev.map((e) => (e.id === id ? { ...e, ...data } : e)));
    setEditing(null);
  };

  const deleteExpense = (id) => {
    if (!confirm("Delete this expense?")) return;
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };

  const filtered = useMemo(() => {
    return expenses.filter((e) => {
      if (filter.category !== "All" && e.category !== filter.category) return false;
      if (filter.month !== "All") {
        const m = new Date(e.date).getMonth() + 1;
        if (String(m) !== String(filter.month)) return false;
      }
      return true;
    });
  }, [expenses, filter]);

  return (
    <div className="min-h-screen bg-linear-to-r from-gray-700 via-rose-500 to-orange-400 p-6">
      <div className="max-w-4xl mx-auto bg-red-200 shadow rounded p-6">
        <h1 className="text-2xl font-bold mb-4">FinTrack — Smart Expense Manager</h1>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <ExpenseForm
              onAdd={addExpense}
              onUpdate={updateExpense}
              editing={editing}
              onCancel={() => setEditing(null)}
            />

            <Filter filter={filter} setFilter={setFilter} expenses={expenses} />
            <ExpenseList expenses={filtered} onEdit={setEditing} onDelete={deleteExpense} />
          </div>

          <div>
            <MonthlyChart expenses={expenses} />
            <div className="mt-4 text-sm text-gray-600">
              Data stored in LocalStorage
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
