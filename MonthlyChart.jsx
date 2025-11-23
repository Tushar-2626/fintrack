import React, { useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function MonthlyChart({ expenses }) {
  const data = useMemo(() => {
    const summary = {};

    expenses.forEach((e) => {
      const d = new Date(e.date);
      const key = `${d.getFullYear()}-${d.getMonth() + 1}`;
      summary[key] = (summary[key] || 0) + e.amount;
    });

    return Object.entries(summary).map(([k, v]) => ({ month: k, amount: v }));
  }, [expenses]);

  return (
    <div className="bg-gray-100 p-4 rounded">
      <h3 className="font-medium mb-2">Monthly Spending</h3>

      {data.length ? (
        <div style={{ width: "100%", height: 240 }}>
          <ResponsiveContainer>
            <BarChart data={data}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="text-gray-500 text-sm">No data to show</div>
      )}
    </div>
  );
}
