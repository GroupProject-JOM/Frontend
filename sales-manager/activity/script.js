document.cookie = "id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
document.cookie = "dName=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
document.cookie = "dContact=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
document.cookie = "price=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
document.cookie = "visits=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";

(() => {
  const body = document.querySelector("body"),
    sin = body.querySelector(".sin"),
    en = body.querySelector(".en"),
    sTitle = body.querySelector(".salesmg-title"),
    sText = body.querySelector(".salesmg-text"),
    activityTable = body.querySelector(".activity-table"),
    searchBar = body.querySelector(".search"),
    datePicker = body.querySelector("#datePicker"),
    tbody = body.querySelector(".tbody");

  var lang = getCookie("lang"); // current language

  var searchBa = document.querySelectorAll(
    '.search-box input[type="text"] + span'
  );

  datePicker.value = new Date().toJSON().slice(0, 10);

  datePicker.addEventListener("input", () => {
    fetchData(datePicker.value);
  });

  searchBa.forEach((elm) => {
    elm.addEventListener("click", () => {
      elm.previousElementSibling.value = "";
      search(searchBar.value.toUpperCase(), activityTable);
    });
  });

  searchBar.addEventListener("keyup", () => {
    search(searchBar.value.toUpperCase(), activityTable);
  });

  const searchBox = document.getElementById("searchBox"),
    googleIcon = document.getElementById("filter-icon");

  googleIcon.onclick = function () {
    searchBox.classList.toggle("active");
  };

  sin.addEventListener("click", () => {
    sin.classList.add("active");
    en.classList.remove("active");

    document.documentElement.setAttribute("lang", "sin");
    document.cookie = "lang=sin; path=/";
    lang = "sin";

    sTitle.textContent = data["sin"]["sTitle"];
    sText.innerHTML = data["sin"]["sText"];
    setGreeting();
  });

  en.addEventListener("click", () => {
    en.classList.add("active");
    sin.classList.remove("active");

    document.documentElement.setAttribute("lang", "en");
    document.cookie = "lang=en; path=/";
    lang = "en";

    sTitle.textContent = data["en"]["sTitle"];
    sText.innerHTML = data["en"]["sText"];
    setGreeting();
  });

  var data = {
    sin: {
      sTitle: "ක්‍රියාකාරකම් ලොග",
      sText: "සමාගම් බෙදාහරින්නන්ගේ සියලුම ක්‍රියාකාරකම් ලොග බලන්න",
    },
    en: {
      sTitle: "Activity Logs",
      sText: "View all activity logs of company distributors",
    },
  };

  fetchData(new Date().toJSON().slice(0, 10));
  function fetchData(date) {
    var row = "";

    fetch(backProxy + "/activity?date=" + date, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((response) => {
        if (response.status == 200) {
          response.json().then((data) => {
            let arr = data.activity;
            arr.forEach(data_to_table);

            function data_to_table(item) {
              row +=
                `<tr>` +
                `<td>` +
                `<div class="activity">` +
                `<p class="activity-heading">` +
                `<span class="quantity">${item.quantity}</span>` +
                ` <span class="name">${item.category}</span>` +
                ` <span class="type">${item.type}</span>s to ` +
                ` <span class="outlet">${item.outletName} ${item.area}</span> each for Rs.` +
                `<span class="unit">${item.price / item.quantity}</span>` +
                `</p>` +
                `<p class="activity-text">` +
                `By` +
                ` <span class="distributor">${item.first_name} ${item.last_name}</span> on` +
                ` <span class="date">${item.date} at ${item.time}</span>.` +
                ` Received Rs.` +
                `<span class="total">${item.price}</span>` +
                `</p>` +
                `</div>` +
                `</td>` +
                `</tr>`;
            }

            tbody.innerHTML = row;
          });
        } else if (response.status === 202) {
          response.json().then((data) => {
            console.log(data.message);
            if (lang == "sin")
              Command: toastr["info"](date + " සඳහා ක්‍රියාකාරකම් ලොග නැත");
            else Command: toastr["info"]("No activity logs for " + date);
          });

          tbody.innerHTML = row;
        } else if (response.status === 401) {
          response.json().then((data) => {
            console.log(data.message);
          });
          if (lang == "sin") Command: toastr["error"]("වලංගු නොවන පරිශීලක");
          else Command: toastr["error"]("Invalid User");

          tbody.innerHTML = row;
        } else {
          console.error("Error:", response.status);
          Command: toastr["error"](response.status, "Error");

          tbody.innerHTML = row;
        }
      })
      .catch((error) => {
        console.error("An error occurred:", error);
        Command: toastr["error"](error);
      });
  }
})();
