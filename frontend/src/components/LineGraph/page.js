"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    month: "Jan",
    pollution: 40,
  },
  {
    month: "Feb",
    pollution: 55,
  },
  {
    month: "Mar",
    pollution: 48,
  },
  {
    month: "Apr",
    pollution: 70,
  },
  {
    month: "May",
    pollution: 60,
  },
  {
    month: "Jun",
    pollution: 45,
  },
];

export default function LineGraph() {
  return (
    <div className="w-full h-[350px] bg-white rounded-lg p-4 shadow">
      <h2 className="text-xl font-semibold mb-4">
        Water Pollution Trend
      </h2>

      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="pollution"
            stroke="#2563eb"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}