import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
  ChartDataset,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useTranslation } from "react-i18next";
import zoomPlugin from "chartjs-plugin-zoom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  zoomPlugin
);

export const options: ChartOptions<"bar"> = {
  plugins: {
    title: {
      display: true,
      text: "Stacked chart bar of all department in system",
    },
    zoom: {
      pan: {
        enabled: true,
        mode: "x",
      },
      zoom: {
        pinch: {
          enabled: true, // Enable pinch zooming
        },
        wheel: {
          enabled: true, // Enable wheel zooming
        },
        mode: "x",
      },
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

interface Props {
  labels: string[];
  datasets: ChartDataset<"bar">[];
}

export function ChartBar(props: Props) {
  const { datasets, labels } = props;
  const { t } = useTranslation();

  const data: ChartData<"bar"> = {
    labels: labels.map(label => t(label)),
    datasets,
  };

  return (
    <Bar
      options={options}
      data={data}
      style={{
        overflowX: "scroll",
      }}
    />
  );
}
