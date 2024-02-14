document.cookie = "id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";

(() => {
  const body = document.querySelector("body"),
    sin = body.querySelector(".sin"),
    en = body.querySelector(".en"),
    w1 = body.querySelector(".w1"),
    ongoing = body.querySelector(".ongoing"),
    w2 = body.querySelector(".w2"),
    c1 = body.querySelector(".c1"),
    c2 = body.querySelector(".c2"),
    c3 = body.querySelector(".c3"),
    c4 = body.querySelector(".c4"),
    c5 = body.querySelector(".c5"),
    c6 = body.querySelector(".c6"),
    c7 = body.querySelector(".c7"),
    tbody1 = body.querySelector(".tbody1"),
    tbody2 = body.querySelector(".tbody2"),
    tbody3 = body.querySelector(".tbody3"),
    income = body.querySelector(".income"),
    ongoingError = body.querySelector(".ongoing-error"),
    pastError = body.querySelector(".past-error"),
    ongoingSupplyTable = body.querySelector(".ongoing-supply-table"),
    pastSupplyTable = body.querySelector(".past-supply-table"),
    rejectSupplyTable = body.querySelector(".reject-supply-table"),
    searchBar1 = body.querySelector(".search1"),
    searchBar2 = body.querySelector(".search2"),
    searchBar3 = body.querySelector(".search3"),
    filter1 = body.querySelector(".filter-1"),
    filter2 = body.querySelector(".filter-2"),
    filter3 = body.querySelector(".filter-3"),
    aBar = body.querySelector(".action-bar"),
    aId = body.querySelector(".action-id"),
    aAmount = body.querySelector(".action-amount"),
    aBtn = body.querySelector(".action-button");

  // initalize serach boxes
  var searchBox1 = document.querySelectorAll(
    '.search-box1 input[type="text"] + span'
  );
  var searchBox2 = document.querySelectorAll(
    '.search-box2 input[type="text"] + span'
  );
  var searchBox3 = document.querySelectorAll(
    '.search-box3 input[type="text"] + span'
  );

  // search box search function on click
  searchBox1.forEach((elm) => {
    elm.addEventListener("click", () => {
      elm.previousElementSibling.value = "";
      search(searchBar1.value.toUpperCase(), ongoingSupplyTable);
    });
  });
  searchBox2.forEach((elm) => {
    elm.addEventListener("click", () => {
      elm.previousElementSibling.value = "";
      search(searchBar2.value.toUpperCase(), pastSupplyTable);
    });
  });
  searchBox3.forEach((elm) => {
    elm.addEventListener("click", () => {
      elm.previousElementSibling.value = "";
      search(searchBar3.value.toUpperCase(), rejectSupplyTable);
    });
  });

  // search box search function on input
  searchBar1.addEventListener("keyup", () => {
    search(searchBar1.value.toUpperCase(), ongoingSupplyTable);
  });
  searchBar2.addEventListener("keyup", () => {
    search(searchBar2.value.toUpperCase(), pastSupplyTable);
  });
  searchBar3.addEventListener("keyup", () => {
    search(searchBar3.value.toUpperCase(), rejectSupplyTable);
  });

  // filters filter functions
  filter1.addEventListener("input", () => {
    search(filter1.value.toUpperCase(), ongoingSupplyTable);
  });
  filter2.addEventListener("input", () => {
    search(filter2.value.toUpperCase(), pastSupplyTable);
  });
  filter3.addEventListener("input", () => {
    search(filter3.value.toUpperCase(), rejectSupplyTable);
  });

  // toggle view hide filter on click
  const googleIcon = document.querySelectorAll("#filter-icon");
  googleIcon.forEach((icon) => {
    icon.addEventListener("click", () => {
      icon.parentElement.classList.toggle("active");
    });
  });

  // translate to sinhala on click sin
  sin.addEventListener("click", () => {
    sin.classList.add("active");
    en.classList.remove("active");

    document.documentElement.setAttribute("lang", "sin");
    document.cookie = "lang=sin; path=/";

    w1.textContent = data["sin"]["w1"];
    w2.textContent = data["sin"]["w2"];
    c1.textContent = data["sin"]["c1"];
    c2.textContent = data["sin"]["c2"];
    c3.innerHTML = data["sin"]["c3"];
    c4.textContent = data["sin"]["c4"];
    c5.textContent = data["sin"]["c5"];
    c6.textContent = data["sin"]["c6"];
    c7.textContent = data["sin"]["c7"];
    ongoingError.textContent = data["sin"]["ongoingError"];
    pastError.textContent = data["sin"]["pastError"];
    setGreeting();
  });

  // translate to en on click en
  en.addEventListener("click", () => {
    en.classList.add("active");
    sin.classList.remove("active");

    document.documentElement.setAttribute("lang", "en");
    document.cookie = "lang=en; path=/";

    w1.textContent = data["en"]["w1"];
    w2.textContent = data["en"]["w2"];
    c1.textContent = data["en"]["c1"];
    c2.textContent = data["en"]["c2"];
    c3.innerHTML = data["en"]["c3"];
    c4.textContent = data["en"]["c4"];
    c5.textContent = data["en"]["c5"];
    c6.textContent = data["en"]["c6"];
    c7.textContent = data["en"]["c7"];
    ongoingError.textContent = data["en"]["ongoingError"];
    pastError.textContent = data["en"]["pastError"];
    setGreeting();
  });

  // trasnslation and page text contents
  var data = {
    sin: {
      w1: "දැනට පවතින සැපයුම්",
      w2: "මාසික ආදායම",
      c1: "දැනට පවතින සැපයුම්",
      c2: "ඔබේ වතුවල දැනට පවතින සැපයුම් පිළිබඳ දළ විශ්ලේෂණය",
      c3: "*සැපයුම් පොල් ප්‍රමාණය අවශ්‍ය අවම මට්ටමට නොපැමිණීම හේතුවෙන් සැපයුම් හැඳුනුම්පත S092 ප්‍රතික්ෂේප කර ඇත. <br/>මෙය දින 7කින් ස්වයංක්‍රීයව මැකෙනු ඇත",
      c4: "අතීත සැපයුම්",
      c5: "ඔබේ වතුවල අතීත සැපයුම් පිළිබඳ දළ විශ්ලේෂණය",
      c6: "Rejected Supplies",
      c7: "ඔබේ වතුවල ප්‍රතික්ෂේප වූ සැපයුම් පිළිබඳ දළ විශ්ලේෂණය",
      ongoingError: "**ඔබට අඛණ්ඩ සැපයුම් කිසිවක් නොමැත",
      pastError: "**ඔබට අතීත සැපයුම් කිසිවක් නොමැත",
    },
    en: {
      w1: "Ongoing Supplies",
      w2: "Monthly Income",
      c1: "Ongoing Supplies",
      c2: "Overview of ongoing supplies at your estates",
      c3: "*Supply ID S092 has been rejected due to the supply coconut amount not meeting the minimum required. <br/>This will be automatically deleted in 7 days",
      c4: "Past Supplies",
      c5: "Overview of past supplies at your estates",
      c6: "Rejected Supplies",
      c7: "Overview of rejected supplies at your estates",
      ongoingError: "**You don't have any ongoing supplies",
      pastError: "**You don't have any past supplies",
    },
  };

  // initallize rows for data handling
  let row1 = "",
    row2 = "",
    row3 = "",
    count = 0;

  // retrive data from backend and assign to tbodies
  fetch(backProxy + "/collections", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  })
    .then((response) => {
      if (response.status == 200) {
        response.json().then((data) => {
          data.ongoing.forEach((item) => {
            // inialize default values for status
            var stat = "",
              st = "",
              oTable = true;

            // set status for supplies
            if (item.status == 1) {
              stat = "pending";
              st = "Pending Approval";
              if (window.innerWidth <= 718) st = "Pending";
              count++;
            } else if (item.status == 2) {
              stat = "accept";
              st = "Accepted";
              count++;
            } else if (item.status == 3) {
              stat = "ready";
              st = "Ready to Pickup";
              if (window.innerWidth <= 718) st = "Ready";
              count++;
            } else if (item.status == 4) {
              stat = "rejected";
              st = "Rejected";
              oTable = checkDate(item.date);
            } else {
              return;
            }

            // appent to relevant row
            if (oTable) {
              row1 +=
                "<tr data-href='./supply-view.html' id=" +
                item.id +
                ">" +
                "<td class='hide'>" +
                item.id +
                "</td>" +
                "<td>" +
                item.date +
                "</td>" +
                "<td>" +
                timeString(item.name) +
                "</td>" +
                "<td class='hide'>" +
                item.amount.toLocaleString("en-US") +
                "</td>" +
                "<td class='hide'>" +
                capitalize(item.method) +
                "</td>" +
                "<td>" +
                "<button class='" +
                stat +
                " status'>" +
                st +
                "</button>" +
                "</td>" +
                "</tr>";
            } else {
              prefix =
                "<tr data-href='./supply-view.html' id=" +
                item.id +
                ">" +
                "<td class='hide'>" +
                item.id +
                "</td>" +
                "<td>" +
                item.date +
                "</td>" +
                "<td class='hide'>" +
                item.amount.toLocaleString("en-US") +
                "</td>" +
                "<td class='hide'>" +
                capitalize(item.method) +
                "</td>" +
                "<td>" +
                "<button class='rejected status'>Rejected</button>" +
                "</td>" +
                "</tr>";

              row3 = prefix + row3;
            }
          });

          // Past supplies table
          data.past.forEach((item) => {
            var stat = "",
              st = "";

            if (item.status == 5) {
              stat = "pending";
              st = "Pending Paymant";
              if (window.innerWidth <= 718) st = "Pending";
            } else if (item.status == 6) {
              stat = "paid";
              st = "Paid";
            } else {
              return;
            }

            var date_string = new Date(item.date);

            row2 +=
              "<tr data-href='./supply-view.html' id=" +
              item.id +
              ">" +
              "<td>" +
              item.id +
              "</td>" +
              "<td class='hide'>" +
              date_string.toLocaleDateString() +
              "</td>" +
              "<td>" +
              item.final_amount.toLocaleString("en-US") +
              "</td>" +
              "<td class='hide'>" +
              capitalize(item.method) +
              "</td>" +
              "<td>" +
              item.value.toLocaleString("en-US") +
              " LKR</td>" +
              "<td>" +
              "<button class='" +
              stat +
              " status'>" +
              st +
              "</button>" +
              "</td>" +
              "</tr>";
          });

          // assign tobodies
          tbody1.innerHTML = row1;
          tbody2.innerHTML = row2;
          tbody3.innerHTML = row3;
          ongoing.textContent = count;
          income.textContent = data.income.toLocaleString("en-US") + " LKR";

          // row click to view page
          const rows = document.querySelectorAll("tr[data-href]");
          rows.forEach((r) => {
            r.addEventListener("click", () => {
              document.cookie = "id=" + r.id + "; path=/";
              window.location.href = r.dataset.href;
            });
          });

          // pagination for 3 tables
          pagination("table1", 15);
          pagination("table2", 10);
          pagination("table3", 10);
        });
      } else if (response.status === 202) {
        response.json().then((data) => {
          console.log(data.size);
          ongoingSupplyTable.style.display = "none";
          c3.style.display = "none";
          ongoingError.style.display = "Block";

          // Past table
          data.past.forEach((item) => {
            var stat = "",
              st = "";

            if (item.status == 5) {
              stat = "pending";
              st = "Pending Paymant";
              if (window.innerWidth <= 718) st = "Pending";
            } else if (item.status == 6) {
              stat = "paid";
              st = "Paid";
            } else {
              return;
            }

            var date_string = new Date(item.date);

            row2 +=
              "<tr data-href='./supply-view.html' id=" +
              item.id +
              ">" +
              "<td>" +
              item.id +
              "</td>" +
              "<td class='hide'>" +
              date_string.toLocaleDateString() +
              "</td>" +
              "<td>" +
              item.final_amount.toLocaleString("en-US") +
              "</td>" +
              "<td>" +
              capitalize(item.method) +
              "</td>" +
              "<td>" +
              item.value.toLocaleString("en-US") +
              " LKR</td>" +
              "<td>" +
              "<button class='" +
              stat +
              " status'>" +
              st +
              "</button>" +
              "</td>" +
              "</tr>";
          });

          tbody2.innerHTML = row2;
          income.textContent = data.income.toLocaleString("en-US") + " LKR";

          // pagination for table 2
          pagination("table2", 10);
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

  ongoing.textContent = count;
  income.textContent = 0 + " LKR";

  // web socket
  const socket = new WebSocket(
    "ws://127.0.0.1:8090/JOM_war_exploded/verify-amount/" +
      getPayload(getCookie("jwt")).user
  );

  socket.onmessage = function (event) {
    // Handle messages received from the server
    const message = event.data;
    if (message.length != 0) {
      var arr = message.split(":");
      sessionStorage.setItem("amount", arr[0]);
      sessionStorage.setItem("id", arr[1]);

      actionBar();
    }
  };

  actionBar();
  function actionBar() {
    if (
      sessionStorage.getItem("id") != null &&
      sessionStorage.getItem("amount") != null
    ) {
      aId.textContent = sessionStorage.getItem("id");
      aAmount.textContent = sessionStorage.getItem("amount");
      aBar.style.display = "";
    }
  }

  socket.onclose = function (event) {
    console.log("WebSocket closed:", event);
    Command: toastr["error"]("WebSocket closed");
  };

  socket.onerror = function (error) {
    console.error("WebSocket error:", error);
    Command: toastr["error"]("WebSocket error");
  };

  aBtn.addEventListener("click", () => {
    document.cookie = "id=" + aId.textContent + "; path=/";
    window.location.href = "./supply-view.html";
  });
})();

function checkDate(date) {
  var selectedDate = new Date(date);
  var now = new Date();
  now.setDate(now.getDate() - 1);
  if (selectedDate > now) return true;
  else return false;
}
