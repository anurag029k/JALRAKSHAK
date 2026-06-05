"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    district: "Delhi",
    reports: 45,
  },
  {
    district: "Noida",
    reports: 30,
  },
  {
    district: "Ghaziabad",
    reports: 55,
  },
  {
    district: "Gurgaon",
    reports: 25,
  },
  {
    district: "Faridabad",
    reports: 40,
  },
];

export default function BarGraph() {
  return (
    <div className="w-full h-[350px] bg-white rounded-lg shadow p-4">
      <h2 className="text-xl font-semibold mb-4">
        Pollution Reports by District
      </h2>

      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="district" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="reports"
            fill="#3b82f6"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}