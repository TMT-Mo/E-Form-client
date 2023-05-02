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
  TooltipItem,
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

interface Props {
  labels: string[];
  datasets: ChartDataset<"bar">[];
}

export function ChartBar(props: Props) {
  const { datasets, labels } = props;
  const { t } = useTranslation();

  const data: ChartData<"bar"> = {
    labels: labels.map((label) => t(label)),
    datasets,
  };

  const footer = (tooltipItems: TooltipItem<'bar'>[]) => {
    let sum = 0;
  
    tooltipItems.forEach(function(tooltipItem) {
      sum += tooltipItem.parsed.y;
    });
    return `${t('Sum')}: ` + sum;
  };
  
  const options: ChartOptions<"bar"> = {
    plugins: {
      title: {
        display: true,
        text: t("Stacked chart bar of all department in system"),
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
      tooltip: {
        callbacks: {
          footer: footer,
        }
      }
    },
    
    interaction: {
      intersect: false,
      mode: 'index',
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
