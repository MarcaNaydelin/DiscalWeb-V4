import React from 'react';
import { Radar } from 'react-chartjs-2';

export const RadarChart = ({ data, options }) => {
  return <Radar data={data} options={options} />;
};