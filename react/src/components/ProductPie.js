import React from 'react';
import {Pie} from "react-chartjs-2";

function getPieData(chartData) {
  const colorRandom = () => {
    return `#${Math.floor(Math.random() * (1000000 - 9999999) + 9999999).toString(16)}`;
  };

  const labels = [...chartData.keys()];
  return {
    labels,
    datasets: [
      {
        label: '# Values',
        data: [...chartData.values()],
        backgroundColor: labels.map(colorRandom),
      }
    ]
  }
}

const ProductPie = ({ className, chartData }) => {
  return (
    <div className={className}>
      <Pie data={getPieData(chartData)} />
    </div>
  );
};

export default ProductPie;