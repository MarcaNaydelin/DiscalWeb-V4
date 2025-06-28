import React from 'react';
import { Line } from 'react-chartjs-2';

export const LineChart = ({ data, options }) => {
  return <Line data={data} options={options} />;
};