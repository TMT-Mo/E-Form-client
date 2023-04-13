import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import faker from "faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  plugins: {
    title: {
      display: true,
      text: "Chart.js Bar Chart - Stacked",
    },
  },
  responsive: true,
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

const labels = ["IT", "Marketing", "HR", "Sales", "System", "Online", "Production"];

export const data = {
  labels,
  datasets: [
    {
      label: "Rejected",
      //   data: labels.map(() => { min: -1000, max: 1000 }),
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: "rgb(255, 99, 132)",
    },
    {
      label: "Approved",
      //   data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      data: [6, 19, 3, 5, 2, 3],
      backgroundColor: "rgb(75, 192, 192)",
    },
    {
      label: "Waiting",
      //   data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: "rgb(53, 162, 235)",
    },
  ],
};

export function ChartBar() {
  return <Bar options={options} data={data} />;
}
