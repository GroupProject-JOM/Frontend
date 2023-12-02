document.cookie = "id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";

(() => {
  const body = document.querySelector("body"),
    sin = body.querySelector(".sin"),
    en = body.querySelector(".en"),
    sTitle = body.querySelector(".stockmg-title"),
    sText1 = body.querySelector(".stockmg-text1"),
    tbody = body.querySelector(".tbody"),
  yText = body.querySelector(".yard-text"),
  yValue = body.querySelector(".yard-value"),
  btn = body.querySelector(".yard-button"),
  mapBtn = body.querySelector(".map-button"),
  closeBtn = body.querySelector(".close-btn"),
  overlay = body.querySelector(".overlay");


  var lang = getCookie("lang"); // current language
  sTitle.textContent = getCookie("cName");
  yValue.textContent = getCookie("total");

  mapBtn.addEventListener("click", () => {
    overlay.style.display = "flex";
    document.querySelector(".collections-map").style.display = "block";
  });

  overlay.addEventListener("click", (e) => {
    if (e.target.id === "overlay") {
      overlay.style.display = "none";
      document.querySelector(".collections-map").style.display = "none";
    }
  });

  closeBtn.addEventListener("click", () => {
    overlay.style.display = "none";
    document.querySelector(".collections-map").style.display = "none";
  });

  sin.addEventListener("click", () => {
    sin.classList.add("active");
    en.classList.remove("active");

    document.documentElement.setAttribute("lang", "sin");
    document.cookie = "lang=sin; path=/";
    lang = "sin";

    sText1.textContent = data["sin"]["sText1"];
    yText.textContent = data["sin"]["yText"];
    btn.textContent = data["sin"]["btn"];
    mapBtn.textContent = data["sin"]["mapBtn"];
    setGreeting();
  });

  en.addEventListener("click", () => {
    en.classList.add("active");
    sin.classList.remove("active");

    document.documentElement.setAttribute("lang", "en");
    document.cookie = "lang=en; path=/";
    lang = "en";

    sText1.innerHTML = data["en"]["sText1"];
    yText.innerHTML = data["en"]["yText"];
    btn.innerHTML = data["en"]["btn"];
    mapBtn.innerHTML = data["en"]["mapBtn"];
    setGreeting();
  });

  var data = {
    sin: {
      sText1: "එක් එක් දිනයේ පොල් එකතු කිරීමේ විස්තර බලන්න",
      yText: "දැනට එකතුකරන්නා විසින් එකතු කරන ලද පොල් ප්‍රමාණය:",
      btn: "යාරවලට පවරන්න",
      mapBtn: "සිතියමෙන් බලන්න",
    },
    en: {
      sText1: "View coconut collection details for each day",
      yText: "Currently collected coconut amount by the collector:",
      btn: "Assign To Yards",
      mapBtn: "View in map",
    },
  };

  let row = "";

  fetch(
    backProxy +
      "/pickup-collections?user=" +
      getCookie("user") +
      "&id=" +
      getCookie("cId"),
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  )
    .then((response) => {
      if (response.status == 200) {
        response.json().then((data) => {          
          makeChart(data.calender);
          let arr = data.collections;
          arr.forEach(data_to_table);

          function data_to_table(item) {
            var status = "",
              amount = "";

            if (item.status < 4) status = "pending";
            else {
              status = "completed";
              amount = item.amount.toLocaleString("en-US");
            }

            row +=
              `<tr data-href="../supply-requests/view-request.html" id=` +
              item.id +
              `>` +
              `<td>` +
              item.id +
              `</td>` +
              `<td>` +
              item.name +
              ` ` +
              item.last_name +
              `</td>` +
              `<td>` +
              item.phone +
              `</td>` +
              `<td>` +
              item.area +
              `</td>` +
              `<td>` +
              amount +
              `</td>` +
              `<td><button class="` +
              status +
              ` status">` +
              capitalize(status) +
              `</button></td>` +
              `</tr>`;
          }

          tbody.innerHTML = row;

          const rows = document.querySelectorAll("tr[data-href]");
          rows.forEach((r) => {
            r.addEventListener("click", () => {
              document.cookie = "id=" + r.id + "; path=/";
              window.location.href = r.dataset.href;
            });
          });
        });
      } else if (response.status === 202) {
        response.json().then((data) => {
          makeChart(data.calender);
          console.log(data.collections);
        });
        if (lang == "sin") Command: toastr["info"]("එකතු කිරීම් නැත");
        else Command: toastr["info"]("No collections");
      } else if (response.status === 401) {
        response.json().then((data) => {
          console.log(data.message);
        });
        if (lang == "sin") Command: toastr["error"]("වලංගු නොවන පරිශීලක");
        else Command: toastr["error"]("Invalid User");
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

var chart,
  chartConfig = {
    debug: true,
    //Without data, a view must be specified.
    type: "calendar month solid",
    title_label_text: "This month collections",
    yAxis_visible: false,
    legend: {
      //Add custom entries
      template: "%icon %name",
      position: "bottom",
      customEntries: [
        {
          name: "Available",
          icon_color: "#cbf2b7",
        },
        {
          name: "Free",
          // icon: {
          //   hatch: {
          //     // style: "light-upward-diagonal",
          //     // color: "#a2a2a2",
          //   },
          // },
        },
      ],
    },
    calendar: {
      // range: ["12/1/2023", "12/31/2023"],
      defaultEdgePoint: {
        mouseTracking: false,
        label_visible: true,
      },
    },
    defaultSeries: {
      opacity: 0.6,
      legendEntry_visible: true,
      defaultPoint: {
        outline_width: 0,
        label_text: "<b>%name</b>",
      },
    },
    toolbar_visible: true,
  };

// loadData(makeChart);

// function loadData(cb) {
//   JSC.fetch("./bookingData.csv")
//     .then(function (response) {
//       return response.text();
//     })
//     .then(function (csv) {
//       cb(JSC.parseCsv(csv).data);
//     })
//     .catch(function (ex) {
//       console.error(ex);
//     });
// }

// makeChart(arrr)

function makeChart(data) {
  // console.log(data);
  chartConfig.series = [
    {
      points: data.map(function (row) {
        var isAvailable = row.count != 0;
        return isAvailable
          ? {
              date: row.date,
              color: "#cbf2b7",
              // tooltip: "{%date:date d}<hr><b>"+row.count+" Available</b>",
              tooltip: false,
            }
          : {
              date: row.date,
              // tooltip: "{%date:date d}<hr><b>Free</b>",
              tooltip:false
              // hatch: {
              //   style: "light-upward-diagonal",
              //   color: "#a2a2a2",
              // },
            };
      }),
    },
  ];
  chart = JSC.chart("chartDiv", chartConfig);
}
