document.cookie = "id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";

(() => {
  const body = document.querySelector("body"),
    sin = body.querySelector(".sin"),
    en = body.querySelector(".en"),
    oTitle = body.querySelector(".outlet-title"),
    oText = body.querySelector(".outlet-text"),
    tbody = body.querySelector(".tbody"),
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

  sin.addEventListener("click", () => {
    sin.classList.add("active");
    en.classList.remove("active");

    document.documentElement.setAttribute("lang", "sin");
    document.cookie = "lang=sin; path=/";
    lang = "sin";

    oTitle.textContent = data["sin"]["oTitle"];
    oText.innerHTML = data["sin"]["oText"];
    setGreeting();
  });

  en.addEventListener("click", () => {
    en.classList.add("active");
    sin.classList.remove("active");

    document.documentElement.setAttribute("lang", "en");
    document.cookie = "lang=en; path=/";
    lang = "en";

    oTitle.textContent = data["en"]["oTitle"];
    oText.innerHTML = data["en"]["oText"];
    setGreeting();
  });

  var data = {
    sin: {
      oTitle: "අද එකතු කිරීම්",
      oText: "අද දිනට නියමිත පොල් එකතු කිරීම් බලන්න",
    },
    en: {
      oTitle: "Today's Pickups",
      oText: "View coconut pickups scheduled for today",
    },
  };

  getCollectionsByDate(new Date().toJSON().slice(0, 10));
  function getCollectionsByDate(date) {
    var row = "";
    tbody.innerHTML = "";

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

              row +=
                `<tr data-href='./view.html' id=` +
                item.id +
                `>` +
                `<td> C/P/` +
                item.id +
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

            tbody.innerHTML = row;

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
})();
