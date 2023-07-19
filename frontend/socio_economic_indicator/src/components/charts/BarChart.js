import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CustomBarChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data} layout="vertical">
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" />
        <YAxis dataKey="date" type="category" />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="rgba(75, 192, 192, 0.6)" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CustomBarChart;
