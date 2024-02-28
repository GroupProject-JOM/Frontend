document.cookie = "id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";

(() => {
  const body = document.querySelector("body"),
    sin = body.querySelector(".sin"),
    en = body.querySelector(".en"),
    text = body.querySelector(".text"),
    w1 = body.querySelector(".w1"),
    w2 = body.querySelector(".w2"),
    c1 = body.querySelector(".c1"),
    c2 = body.querySelector(".c2"),
    c4 = body.querySelector(".c4"),
    c5 = body.querySelector(".c5"),
    tbody1 = body.querySelector(".tbody1"),
    tbody2 = body.querySelector(".tbody2"),
    tbody3 = body.querySelector(".tbody3"),
    c6 = body.querySelector(".c6"),
    c7 = body.querySelector(".c7"),
    w1Value = body.querySelector(".w1-value"),
    w2Value = body.querySelector(".w2-value"),
    rText = body.querySelector(".rate-text"),
    rValue = body.querySelector(".rate-value"),
    rwText = body.querySelector(".rate-window-text"),
    rwValue = body.querySelector(".rate-window-value"),
    rLabel = body.querySelector(".rate-label"),
    rConfirm = body.querySelector(".rate-confirm"),
    rate = body.querySelector(".coco-rate"),
    rateError = body.querySelector(".coco-error"),
    closeBtn = body.querySelector(".close-btn"),
    overlay = body.querySelector(".overlay"),
    rateBtn = body.querySelector(".rate-button"),
    searchBar = body.querySelector(".search"),
    todayTable = body.querySelector(".today-collections-table"),
    datePicker = body.querySelector("#datePicker");

  datePicker.value = new Date().toJSON().slice(0, 10);

  datePicker.addEventListener("input", () => {
    getCollectionsByDate(datePicker.value);
  });

  var searchBa = document.querySelectorAll(
    '.search-box input[type="text"] + span'
  );

  searchBa.forEach((elm) => {
    elm.addEventListener("click", () => {
      elm.previousElementSibling.value = "";
      search(searchBar.value.toUpperCase(), todayTable);
    });
  });

  searchBar.addEventListener("keyup", () => {
    search(searchBar.value.toUpperCase(), todayTable);
  });

  const searchBox = document.getElementById("searchBox"),
    googleIcon = document.getElementById("filter-icon");

  googleIcon.onclick = function () {
    searchBox.classList.toggle("active");
  };

  var lang = getCookie("lang"); // current language

  rateBtn.addEventListener("click", () => {
    overlay.style.display = "flex";
    document.querySelector(".rate-window").style.display = "block";
  });

  overlay.addEventListener("click", (e) => {
    if (e.target.id === "overlay") {
      overlay.style.display = "none";
      document.querySelector(".rate-window").style.display = "none";
    }
  });

  closeBtn.addEventListener("click", () => {
    overlay.style.display = "none";
    document.querySelector(".rate-window").style.display = "none";
  });

  sin.addEventListener("click", () => {
    sin.classList.add("active");
    en.classList.remove("active");

    document.documentElement.setAttribute("lang", "sin");
    document.cookie = "lang=sin; path=/";
    lang = "sin";

    w1.textContent = data["sin"]["w1"];
    w2.textContent = data["sin"]["w2"];
    c1.textContent = data["sin"]["c1"];
    c2.textContent = data["sin"]["c2"];
    c4.textContent = data["sin"]["c4"];
    c5.textContent = data["sin"]["c5"];
    c6.textContent = data["sin"]["c6"];
    c7.textContent = data["sin"]["c7"];
    text.textContent = data["sin"]["text"];
    rateBtn.textContent = data["sin"]["rateBtn"];
    rate.placeholder = data["sin"]["rate"];
    rLabel.textContent = data["sin"]["rLabel"];
    rConfirm.textContent = data["sin"]["rConfirm"];
    setGreeting();
  });

  en.addEventListener("click", () => {
    en.classList.add("active");
    sin.classList.remove("active");

    document.documentElement.setAttribute("lang", "en");
    document.cookie = "lang=en; path=/";
    lang = "en";

    w1.textContent = data["en"]["w1"];
    w2.textContent = data["en"]["w2"];
    c1.textContent = data["en"]["c1"];
    c2.textContent = data["en"]["c2"];
    c4.textContent = data["en"]["c4"];
    c5.textContent = data["en"]["c5"];
    c6.textContent = data["en"]["c6"];
    c7.textContent = data["en"]["c7"];
    text.textContent = data["en"]["text"];
    rateBtn.textContent = data["en"]["rateBtn"];
    rate.placeholder = data["en"]["rate"];
    rLabel.textContent = data["en"]["rLabel"];
    rConfirm.textContent = data["en"]["rConfirm"];
    setGreeting();
  });

  var data = {
    sin: {
      w1: "සැපයුම්කරු ඉල්ලීම්",
      w2: "අද ඉතිරිය",
      c1: "නිෂ්පාදන ඉල්ලීම්",
      c2: "නිෂ්පාදන කළමනාකරුගේ ඉල්ලීම් බලන්න සහ ප්රතිචාර දක්වන්න",
      c4: "සැපයුම්කරු ඉල්ලීම්",
      c5: "සැපයුම්කරුගේ ඉල්ලීම් බලන්න සහ ප්රතිචාර දක්වන්න",
      c6: "පොල් එකතු කිරීම්",
      c7: "සෑම දිනකම පොල් එකතු කිරීම් තෝරා බලන්න",
      text: "උපකරණ පුවරුව",
      rateBtn: "අද පොල් මිල ඇතුලත් කරන්න",
      rate: "නව පොල් මිල ඇතුළත් කරන්න",
      rLabel: "නව අනුපාතය",
      rConfirm: "තහවුරු කරන්න",
    },
    en: {
      w1: "Supply Requests",
      w2: "Remaining Collections",
      c1: "Production Requests Overview",
      c2: "View and respond to production manager requests",
      c4: "Supplier Requests Overview",
      c5: "View and update Supplier requests",
      c6: "Coconut Collections",
      c7: "Filter and view coconut collections for each day",
      text: "Dashboard",
      rateBtn: "Enter Today's Coconut Rate",
      rate: "Enter new coconut rate",
      rLabel: "New rate",
      rConfirm: "Confirm",
    },
  };

  let row1 = "",
    row2 = "";

  w1Value.textContent = 0;
  w2Value.innerHTML = `0<span>/0</span>`;

  fetch(backProxy + "/stock-manager", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  })
    .then((response) => {
      if (response.status == 200) {
        response.json().then((data) => {
          w1Value.textContent = data.size;
          w2Value.innerHTML =
            data.remaining +
            `<span>/` +
            (parseInt(data.completed) + parseInt(data.remaining)) +
            `</span>`;

          if (data.p_request == 0) {
            if (lang == "sin")
              Command: toastr["info"]("අද නිෂ්පාදන ඉල්ලීම් නොමැත");
            else Command: toastr["info"]("No production requests today");
          } else {
            data.production.forEach((item) => {
              var date_string = new Date(item.date);

              row1 +=
                "<tr data-href='./production-requests/view-request.html' id=" +
                item.id +
                ">" +
                "<td> P/R/" +
                item.id +
                "</td>" +
                "<td>" +
                date_string.toLocaleDateString() +
                "</td>" +
                "<td>" +
                item.amount.toLocaleString("en-US") +
                "</td>" +
                "<td>Yard " +
                item.yard +
                "</td>" +
                "<td>Block " +
                item.block +
                "</td>" +
                "</tr>";
            });

            tbody1.innerHTML = row1;

            const rows = document.querySelectorAll("tr[data-href]");
            rows.forEach((r) => {
              r.addEventListener("click", () => {
                document.cookie = "id=" + r.id + "; path=/";
                window.location.href = r.dataset.href;
              });
            });
          }

          if (data.size == 0) {
            if (lang == "sin") Command: toastr["info"]("සැපයුම් ඉල්ලීම් නොමැත");
            else Command: toastr["info"]("No Supply requests");
          } else {
            data.list.forEach((item) => {
              row2 +=
                "<tr data-href='./supply-requests/view-request.html' id=" +
                item.id +
                ">" +
                "<td>S/" +
                capitalize(item.method)[0] +
                "/" +
                item.id +
                "</td>" +
                "<td>" +
                item.name +
                "</td>" +
                "<td>" +
                item.date +
                "</td>" +
                "<td>" +
                item.amount.toLocaleString("en-US") +
                "</td>" +
                "<td class='hide'>" +
                capitalize(item.method) +
                "</td>" +
                "</tr>";
            });

            tbody2.innerHTML = row2;

            // pagination for supply requests tables
            pagination("table2", 4);

            const rows = document.querySelectorAll("tr[data-href]");
            rows.forEach((r) => {
              r.addEventListener("click", () => {
                document.cookie = "id=" + r.id + "; path=/";
                window.location.href = r.dataset.href;
              });
            });
          }
        });
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

  //get coco rate
  getRate();
  function getRate() {
    fetch(backProxy + "/coco-rate", {
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
              rText.innerHTML =
                "<span>" +
                data.rate.date +
                "</span> වන විට සමාගම් සැපයුම්කරුවන් සඳහා පොල් මිල";
              rwText.innerHTML =
                "<span>" + data.rate.date + "</span> වන විට නවතම පොල් මිල";
              rValue.textContent = "රු. " + data.rate.price;
              rwValue.textContent = "රු. " + data.rate.price;
            } else {
              rText.innerHTML =
                "As of <span>" +
                data.rate.date +
                "</span> the coconut rate for company suppliers is";
              rwText.innerHTML =
                "Latest coconut rate as of <span>" + data.rate.date + "</span>";
              rValue.textContent = data.rate.price + " LKR";
              rwValue.textContent = data.rate.price + " LKR";
            }

            let rate = [];
            data.last_seven.forEach((item) => {
              rate.push(parseFloat(item.price));
            });
            rateChart(getLastSevenDays().reverse(), rate.reverse());
          });
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
  }

  getCollectionsByDate(new Date().toJSON().slice(0, 10));
  function getCollectionsByDate(date) {
    let row3 = "";
    tbody3.innerHTML = "";

    fetch(backProxy + "/collection-by-date?date=" + date, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((response) => {
        if (response.status == 200) {
          response.json().then((data) => {
            data.list.forEach((item) => {
              var fName = "-",
                lName = "-";

              if (item.method == "pickup") {
                fName = item.c_fName;
                lName = item.c_lName;
              }

              row3 +=
                `<tr data-href='./supply-requests/view-request.html' id=` +
                item.id +
                `>` +
                `<td>S/${capitalize(item.method)[0]}/${item.id}` +
                `</td>` +
                `<td>` +
                item.name +
                ` ` +
                item.last_name +
                `</td>` +
                `<td>` +
                timeString(item.time) +
                `</td>` +
                `<td>` +
                fName +
                ` ` +
                lName +
                `</td>` +
                `<td>` +
                item.amount.toLocaleString("en-US") +
                `</td>` +
                `<td>` +
                capitalize(item.method) +
                `</td>` +
                `</tr>`;
            });

            tbody3.innerHTML = row3;

            const rows = document.querySelectorAll("tr[data-href]");
            rows.forEach((r) => {
              r.addEventListener("click", () => {
                document.cookie = "id=" + r.id + "; path=/";
                window.location.href = r.dataset.href;
              });
            });
          });
        } else if (response.status === 401) {
          response.json().then((data) => {
            console.log(data.message);
          });
          if (lang == "sin") Command: toastr["error"]("වලංගු නොවන පරිශීලක");
          else Command: toastr["error"]("Invalid User");
        } else if (response.status === 202) {
          response.json().then((data) => {
            console.log(data.size);
          });
          if (lang == "sin") Command: toastr["info"]("එකතු කිරීම් නැත");
          else Command: toastr["info"]("No collections");
        } else {
          console.error("Error:", response.status);
          Command: toastr["error"](response.status, "Error");
        }
      })
      .catch((error) => {
        console.error("An error occurred:", error);
        Command: toastr["error"](error);
      });
  }

  var rateStatus = false;

  rate.addEventListener("input", () => {
    rate_status_func();
  });

  rConfirm.addEventListener("click", () => {
    if (!rate_status_func()) {
      rate.focus();
    }

    if (rateStatus) {
      var formData = {
        price: rate.value,
      };
      fetch(backProxy + "/coco-rate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      })
        .then((response) => {
          console.log(response.status);
          if (response.status == 200) {
            response.json().then((data) => {
              console.log(data.message);
              closeBtn.click();
              getRate();
            });
            if (lang == "sin")
              Command: toastr["success"]("පොල් මිල සාර්ථකව යාවත්කාලීන කරන ලදී");
            else
              Command: toastr["success"]("Coconut rate updated successfully");
          } else if (response.status === 400) {
            response.json().then((data) => {
              console.log(data.message);
              Command: toastr["error"](data.message);
            });
          } else if (response.status === 401) {
            response.json().then((data) => {
              console.log(data.message);
              Command: toastr["error"](data.message);
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
    }
  });

  function rate_status_func() {
    if (typeof rate.value === "string" && rate.value.trim().length === 0) {
      if (lang == "sin") {
        rateError.textContent = "පොල් මිල හිස් විය නොහැක";
        Command: toastr["warning"]("පොල් මිල හිස් විය නොහැක");
      } else {
        rateError.textContent = "Coconut rate cannot be empty";
        Command: toastr["warning"]("Coconut rate cannot be empty");
      }
      rateStatus = false;
      return false;
    } else if (!checkPositive(rate.value)) {
      if (lang == "sin") {
        rateError.textContent = "පොල් මිල ධනාත්මක විය යුතුය";
        Command: toastr["warning"]("පොල් මිල ධනාත්මක විය යුතුය");
      } else {
        rateError.textContent = "Coconut rate must be positive";
        Command: toastr["warning"]("Coconut rate must be positive");
      }
      rateStatus = false;
      return false;
    } else {
      rateError.textContent = "";
      rateStatus = true;
      return true;
    }
  }

  function checkPositive(num) {
    if (+num > 0) return true;
    return false;
  }
})();

function rateChart(days, rate) {
  const dataLine = {
    labels: days,
    datasets: [
      {
        data: rate,
        //   fill: true,
        borderColor: "#bb9056",
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
  const configLine = {
    type: "line",
    data: dataLine,
    options: {
      maintainAspectRatio: false,
      responsive: true,
      plugins: {
        legend: {
          display: false,
          position: "top",
        },
        title: {
          display: true,
          text: "Daily Coconut Rate",
        },
      },
    },
  };

  // coco rate chart visualizing
  const chartLine = new Chart(
    document.getElementById("coco-rate-chart"),
    configLine
  );
}

function getLastSevenDays() {
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const currentDate = new Date();
  const lastSevenDays = [];

  for (let i = 1; i <= 7; i++) {
    const day = new Date(currentDate);
    day.setDate(currentDate.getDate() - i);
    const dayOfWeek = daysOfWeek[day.getDay()];
    lastSevenDays.push(`${dayOfWeek}`);
  }

  return lastSevenDays;
}
