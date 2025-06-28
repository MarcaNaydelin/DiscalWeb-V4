import React from 'react';
import { Bar } from 'react-chartjs-2';

export const BarChart = ({ data, options }) => {
  return <Bar data={data} options={options} />;
};