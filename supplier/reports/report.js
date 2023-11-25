//for all charts
let labels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// sales chart data
let sales1 = [70, 50, 50, 30, 70, 11, 15, 10, 21, 30, 45, 12];
let sales2 = [23, 67, 12, 34, 54, 12, 34, 5, 55, 24, 67, 89];

//earnings chart data
let earning1 = [70, 50, 50, 30, 70, 11, 15, 10, 21, 30, 45, 12];
let earning2 = [23, 67, 12, 34, 54, 12, 34, 5, 55, 24, 67, 89];

//coco rate data
let cocoRate = [
  70, 50, 50, 30, 70, 11, 15, 10, 21, 30, 45, 12, 123, 234, 12, 312, 123, 23, 2,
  34, 1, 312, 3, 234, 23, 42, 4, 234, 1, 234, 2, 4, 21, 4, 234, 12, 34, 123, 4,
];
//avg rate data
let avgRate = [
  70, 50, 50, 30, 70, 11, 15, 10, 21, 30, 45, 12, 123, 234, 12, 312, 123, 23, 2,
];

//sales chart design
const dataLine1 = {
  labels: labels,
  datasets: [
    {
      label: "This year",
      data: sales1,
      // fill: true,
      borderColor: "#BB9056",
      borderWidth: 2,
      // hoverBorderColor: '#000000',
      // backgroundColor:'#ffe0b6'
      tension: 0.1,
      pointRadius: 0,
      hoverPointRadius: 0,
    },
    {
      label: "Last year",
      data: sales2,
      // fill: true,
      borderColor: "#949494",
      borderWidth: 2,
      // hoverBorderColor: '#000000',
      // backgroundColor:'#ffe0b6'
      tension: 0.1,
      pointRadius: 0,
      hoverPointRadius: 0,
    },
  ],
};

//earnings chart design
const dataLine2 = {
  labels: labels,
  datasets: [
    {
      label: "This year",
      data: earning1,
      // fill: true,
      borderColor: "#BB9056",
      borderWidth: 2,
      // hoverBorderColor: '#000000',
      // backgroundColor:'#ffe0b6'
      tension: 0.1,
      pointRadius: 0,
      hoverPointRadius: 0,
    },
    {
      label: "Last year",
      data: earning2,
      // fill: true,
      borderColor: "#949494",
      borderWidth: 2,
      // hoverBorderColor: '#000000',
      // backgroundColor:'#ffe0b6'
      tension: 0.1,
      pointRadius: 0,
      hoverPointRadius: 0,
    },
  ],
};

//coco rate chart design
const dataLine3 = {
  labels: cocoRate,
  datasets: [
    {
      data: cocoRate,
      //   fill: true,
      borderColor: "#22C55E",
      borderWidth: 2,
      // hoverBorderColor: '#000000',
      // backgroundColor:'#ffe0b6',
      tension: 0.4,
      pointRadius: 0,
      hoverPointRadius: 0,
    },
  ],
};

//avg rate chart design
const dataLine4 = {
  labels: avgRate,
  datasets: [
    {
      data: avgRate,
      //   fill: true,
      borderColor: "#22C55E",
      borderWidth: 2,
      // hoverBorderColor: '#000000',
      // backgroundColor:'#ffe0b6',
      tension: 0.4,
      pointRadius: 0,
      hoverPointRadius: 0,
    },
  ],
};

//sales chart configuration
const configLine1 = {
  type: "line",
  data: dataLine1,
  options: {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          boxWidth: 30,
          boxHeight: 2,
        },
      },
      title: {
        display: true,
        text: "Monthly Sales",
      },
    },
  },
};

//earnings chart configuration
const configLine2 = {
  type: "line",
  data: dataLine2,
  options: {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          boxWidth: 30,
          boxHeight: 2,
        },
      },
      title: {
        display: true,
        text: "Monthly Earnings",
      },
    },
  },
};

//coco rate chart configuration
const configLine3 = {
  type: "line",
  data: dataLine3,
  options: {
    scales: {
      x: {
        ticks: {
          display: false,
        },
        grid: {
          display: false,
          borderWidth: 0,
        },
      },
      y: {
        ticks: {
          display: false,
        },
        grid: {
          display: false,
          borderWidth: 0,
        },
      },
    },
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: "top",
      },
      title: {
        display: false,
      },
    },
  },
};

//avg rate chart configuration
const configLine4 = {
  type: "line",
  data: dataLine4,
  options: {
    scales: {
      x: {
        ticks: {
          display: false,
        },
        grid: {
          display: false,
          borderWidth: 0,
        },
      },
      y: {
        ticks: {
          display: false,
        },
        grid: {
          display: false,
          borderWidth: 0,
        },
      },
    },
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: "top",
      },
      title: {
        display: false,
      },
    },
  },
};

// sales chart visualizing
const chartLine1 = new Chart(
  document.getElementById("sales-graph"),
  configLine1
);

// earning chart visualizing
const chartLine2 = new Chart(
  document.getElementById("earnings-graph"),
  configLine2
);
// coco rate chart visualizing
const chartLine3 = new Chart(document.getElementById("coco-rate"), configLine3);

// average rate chart visualizing
const chartLine4 = new Chart(document.getElementById("avg-rate"), configLine4);
