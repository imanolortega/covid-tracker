import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";

const options = {
  legend: {
    display: false,
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0,0");
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "ll",
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          callback: function (value, index, values) {
            return numeral(value).format("0a");
          },
        },
      },
    ],
  },
};

const LineGraph = () => {
  const [data, setData] = useState({});

  const buildChartData = (data, casesType = "cases") => {
    const chartData = [];
    let lastDataPoint;

    for (let date in data.cases) {
      if (lastDataPoint) {
        const newDataPoint = {
          x: date,
          y: data[casesType][date] - lastDataPoint,
        };
        chartData.push(newDataPoint);
      }
      lastDataPoint = data[casesType][date];
    }
    return chartData;
  };

  useEffect(() => {
    const fetchMyAPI = async () => {
      let response = await fetch(
        "https://disease.sh/v3/covid-19/historical/all?lastdays=all"
      );
      response = await response.json();
      const chartData = buildChartData(response);
      console.log(chartData);
      setData(chartData);
    };
    fetchMyAPI();
  }, []);

  return (
    <div>
      {data?.length > 0 && (
        <Line
          data={{
            datasets: [
              {
                elements: {
                  point: {
                    radius: 0,
                  },
                },
                label: "Casos",
                fill: true,
                backgroundColor: "rgba(204,16,52,0.3)",
                borderColor: "#CC1034",
                data: data,
              },
            ],
          }}></Line>
      )}
    </div>
  );
};

export default LineGraph;
