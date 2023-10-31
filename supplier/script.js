document.cookie = "id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";

(() => {
  //   document.cookie = "name=Buddhika";
  //   document.cookie = "page=supplier";
  //   document.cookie = "sId=1";
  //   let cookies = document.cookie;
  //   console.log(cookies);

  // console.log(getCookie('lang'));

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
    tbody1 = body.querySelector(".tbody1"),
    tbody2 = body.querySelector(".tbody2"),
    income = body.querySelector(".income"),
    ongoingSupplyTable = body.querySelector(".ongoing-supply-table"),
    ongoingError = body.querySelector(".ongoing-error"),
    pastError = body.querySelector(".past-error"),
    pastSupplyTable = body.querySelector(".past-supply-table");

  sin.addEventListener("click", () => {
    sin.classList.add("active");
    en.classList.remove("active");

    document.documentElement.setAttribute("lang", "sin");
    // sessionStorage.setItem("lang", "sin");
    document.cookie = "lang=sin; path=/";

    w1.textContent = data["sin"]["w1"];
    w2.textContent = data["sin"]["w2"];
    c1.textContent = data["sin"]["c1"];
    c2.textContent = data["sin"]["c2"];
    c3.innerHTML = data["sin"]["c3"];
    c4.textContent = data["sin"]["c4"];
    c5.textContent = data["sin"]["c5"];
    ongoingError.textContent = data["sin"]["ongoingError"];
    pastError.textContent = data["sin"]["pastError"];
    setGreeting();
  });

  en.addEventListener("click", () => {
    en.classList.add("active");
    sin.classList.remove("active");

    document.documentElement.setAttribute("lang", "en");
    // sessionStorage.setItem("lang", "en");
    document.cookie = "lang=en; path=/";

    w1.textContent = data["en"]["w1"];
    w2.textContent = data["en"]["w2"];
    c1.textContent = data["en"]["c1"];
    c2.textContent = data["en"]["c2"];
    c3.innerHTML = data["en"]["c3"];
    c4.textContent = data["en"]["c4"];
    c5.textContent = data["en"]["c5"];
    ongoingError.textContent = data["en"]["ongoingError"];
    pastError.textContent = data["en"]["pastError"];
    setGreeting();
  });

  var data = {
    sin: {
      w1: "දැනට පවතින සැපයුම්",
      w2: "මාසික ආදායම",
      c1: "දැනට පවතින සැපයුම්",
      c2: "ඔබේ වතුවල දැනට පවතින සැපයුම් පිළිබඳ දළ විශ්ලේෂණය",
      c3: "*සැපයුම් පොල් ප්‍රමාණය අවශ්‍ය අවම මට්ටමට නොපැමිණීම හේතුවෙන් සැපයුම් හැඳුනුම්පත S092 ප්‍රතික්ෂේප කර ඇත. <br/>මෙය දින 7කින් ස්වයංක්‍රීයව මැකෙනු ඇත",
      c4: "අතීත සැපයුම්",
      c5: "ඔබේ වතුවල අතීත සැපයුම් පිළිබඳ දළ විශ්ලේෂණය",
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
      ongoingError: "**You have not any Ongoing Supplies",
      pastError: "**You have not any Past Supplies",
    },
  };

  let row1 = "",
    row2 = "",
    count = 0,
    value = 0;

  fetch(backProxy + "/collection?sId=" + getCookie("sId"), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  })
    .then((response) => {
      if (response.status == 200) {
        response.json().then((data) => {
          let arr = data.list;
          arr.forEach(data_to_table);

          function data_to_table(item) {
            // console.log(item);
            var stat = "",
              st = "";
            // Ongoing table
            if (0 < item.status && item.status < 4) {
              if (item.status == 1) {
                stat = "pending";
                st = "Pending Approval";
              } else if (item.status == 2) {
                stat = "ready";
                st = "Ready to pick-up";
              } else if (item.status == 3) {
                stat = "rejected";
                st = "Rejected";
              } else {
                return;
              }

              var T = item.time.split(":"),
                timeString = "";

              if (T[0] > 12) {
                T[0] -= 12;
                if (T[0] >= 12) {
                  timeString =
                    String(T[0]).padStart(2, "0") + ":" + T[1] + " AM";
                } else {
                  timeString =
                    String(T[0]).padStart(2, "0") + ":" + T[1] + " PM";
                }
              } else {
                timeString = String(T[0]).padStart(2, "0") + ":" + T[1] + " PM";
              }

              row1 +=
                "<tr data-href='./view.html' id=" +
                item.id +
                ">" +
                "<td>" +
                item.id +
                "</td>" +
                "<td>" +
                item.date +
                "</td>" +
                "<td>" +
                timeString +
                "</td>" +
                "<td>" +
                item.amount.toLocaleString("en-US") +
                "</td>" +
                "<td>" +
                "<button class='" +
                stat +
                " status'>" +
                st +
                "</button>" +
                "</td>" +
                "</tr>";

              count++;
            } else if (3 < item.status && item.status < 6) {
              // Past table
              if (item.status == 4) {
                stat = "pending";
                st = "Pending Paymant";
              } else if (item.status == 5) {
                stat = "paid";
                st = "Paid";
              } else {
                return;
              }

              row2 +=
                "<tr data-href='./view.html' id=" +
                item.id +
                ">" +
                "<td>" +
                item.id +
                "</td>" +
                "<td>" +
                item.date +
                "</td>" +
                "<td>" +
                item.final_amount.toLocaleString("en-US") +
                "</td>" +
                "<td>" +
                item.value.toLocaleString("en-US") +
                "</td>" +
                "<td>" +
                "<button class='" +
                stat +
                " status'>" +
                st +
                "</button>" +
                "</td>" +
                "</tr>";

              value += item.value;
            } else {
              return;
            }
          }

          tbody1.innerHTML = row1;
          tbody2.innerHTML = row2;
          ongoing.textContent = count;
          income.textContent = value.toLocaleString("en-US") + " LKR";

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
          console.log(data.size);
          ongoingSupplyTable.style.display = "none";
          pastSupplyTable.style.display = "none";
          c3.style.display = "none";
          ongoingError.style.display = "Block";
          pastError.style.display = "Block";
        });
      } else {
        console.error("Error:", response.status);
      }
    })
    .catch((error) => {
      console.error("An error occurred:", error);
    });

  ongoing.textContent = count;
  income.textContent = value.toLocaleString("en-US") + " LKR";
})();
