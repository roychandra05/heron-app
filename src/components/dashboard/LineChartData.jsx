"use client";
import currencyFormatter from "@/lib/currencyFormatter";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const LineChartData = ({ datas }) => {
  return (
    <ResponsiveContainer className="bg-black p-2" width="100%" minHeight={300}>
      <LineChart
        className="text-xs"
        // width={500}
        // height={300}

        data={datas}
        margin={{
          top: 5,
          right: 5,
          left: 32,
          bottom: 100,
        }}
      >
        <CartesianGrid />
        <XAxis dataKey="package" />
        <YAxis tickFormatter={(value) => currencyFormatter(value)}/>
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="price" stroke="#8884d8" />
        {/* <Line type="monotone" dataKey="quantity" stroke="#82ca9d" /> */}
      </LineChart>
    </ResponsiveContainer>
  );
};
export default LineChartData;
