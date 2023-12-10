(() => {
  const body = document.querySelector("body"),
    sin = body.querySelector(".sin"),
    en = body.querySelector(".en"),
    w1Title = body.querySelector(".w1-title"),
    w1Value = body.querySelector(".w1-value"),
    w1Period = body.querySelector(".w1-period"),
    w2Title = body.querySelector(".w2-title"),
    w2Value = body.querySelector(".w2-value"),
    w2Period = body.querySelector(".w2-period"),
    btn = body.querySelector(".form-button");

  var lang = getCookie("lang"); // current language

  sin.addEventListener("click", () => {
    sin.classList.add("active");
    en.classList.remove("active");

    document.documentElement.setAttribute("lang", "sin");
    document.cookie = "lang=sin; path=/";
    lang = "sin";

    w1Title.textContent = data["sin"]["w1Title"];
    w2Title.textContent = data["sin"]["w2Title"];
    w2Period.textContent = data["sin"]["w2Period"];
    btn.textContent = data["sin"]["btn"];
    setGreeting();
  });

  en.addEventListener("click", () => {
    en.classList.add("active");
    sin.classList.remove("active");

    document.documentElement.setAttribute("lang", "en");
    document.cookie = "lang=en; path=/";
    lang = "en";

    w1Title.textContent = data["en"]["w1Title"];
    w2Title.textContent = data["en"]["w2Title"];
    w2Period.textContent = data["en"]["w2Period"];
    btn.textContent = data["en"]["btn"];
    setGreeting();
  });

  var data = {
    sin: {
      w1Title: "අද පොල් මිල",
      w2Title: "සාමාන්‍ය පොල් මිල",
      w2Period: "මෙම මාසය සඳහා",
      btn: "වාර්තාව ජනනය කරන්න",
    },
    en: {
      w1Title: "Today's Coconut Rate",
      w2Title: "Average Coconut Rate",
      w2Period: "For this month",
      btn: "Generate Report",
    },
  };

  let coco = [];

  fetch(backProxy + "/report", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  })
    .then((response) => {
      if (response.status == 200) {
        response.json().then((data) => {
          if (lang == "sin") {
            w1Value.textContent = "රු. " + data.rate.price;
            w1Period.textContent = data.rate.date + " වන විට";
          } else {
            w1Value.textContent = "Rs. " + data.rate.price;
            w1Period.textContent = "As of " + data.rate.date;
          }

          data.last_six.forEach((item) => {
            coco.push(parseFloat(item.price));
          });
          rateChart(coco);

          var sum = coco.reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
          }, 0);

          if (lang == "sin")
            w2Value.textContent = "රු. " + data.avg[0].toFixed(2);
          else w2Value.textContent = "Rs. " + data.avg[0].toFixed(2);

          avgChart(data.avg);
        });
      } else if (response.status === 202) {
        response.json().then((data) => {
          // data.size=0
          if (lang == "sin") Command: toastr["info"]("ගාස්තු නැත");
          else Command: toastr["info"]("No rates");
        });
      } else {
        console.error("Error:", response.status);
        Command: toastr["error"](response.status, "Error");
      }
    })
    .catch((error) => {
      console.error("An error occurred:", error);
      Command: toastr["error"](error);
    });
})();

function rateChart(coco) {
  //coco rate chart design
  const dataLine3 = {
    labels: coco,
    datasets: [
      {
        data: coco,
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

  // coco rate chart visualizing
  const chartLine3 = new Chart(
    document.getElementById("coco-rate"),
    configLine3
  );
}

function avgChart(avg) {
  //avg rate chart design
  const dataLine4 = {
    labels: avg,
    datasets: [
      {
        data: avg,
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

  // average rate chart visualizing
  const chartLine4 = new Chart(
    document.getElementById("avg-rate"),
    configLine4
  );
}

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
