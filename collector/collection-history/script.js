document.cookie = "id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";

(() => {
  const body = document.querySelector("body"),
    sin = body.querySelector(".sin"),
    en = body.querySelector(".en"),
    cTitle = body.querySelector(".collection-title"),
    cSubTitle = body.querySelector(".collection-text"),
    searchBar = body.querySelector(".search1"),
    pastTable = body.querySelector(".past-table"),
    tbody1 = body.querySelector(".tbody1"),
    datePicker = body.querySelector("#datePicker");

  var lang = getCookie("lang"); // current language

  datePicker.addEventListener("input", () => {
    if (!checkDate(datePicker.value)) {
      if (lang == "sin") {
        Command: toastr["error"]("දිනය අතීතයේ විය යුතුය");
      } else {
        Command: toastr["error"]("Date must be in the past");
      }
    } else search(datePicker.value, pastTable);
  });

  var searchBa = document.querySelectorAll(
    '.search-box input[type="text"] + span'
  );

  searchBa.forEach((elm) => {
    elm.addEventListener("click", () => {
      elm.previousElementSibling.value = "";
      search(searchBar.value.toUpperCase(), pastTable);
    });
  });

  searchBar.addEventListener("keyup", () => {
    search(searchBar.value.toUpperCase(), pastTable);
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

    cTitle.textContent = data["sin"]["cTitle"];
    cSubTitle.textContent = data["sin"]["cSubTitle"];
    setGreeting();
  });

  en.addEventListener("click", () => {
    en.classList.add("active");
    sin.classList.remove("active");

    document.documentElement.setAttribute("lang", "en");
    document.cookie = "lang=en; path=/";
    lang = "en";

    cTitle.textContent = data["en"]["cTitle"];
    cSubTitle.textContent = data["en"]["cSubTitle"];
    setGreeting();
  });

  var data = {
    sin: {
      cTitle: "පැරණි එකතු කිරීම්",
      cSubTitle: "ඔබගේ සම්පුර්ණ කරන ලද පොල් එකතුව සවිස්තරාත්මකව",
    },
    en: {
      cTitle: "Past Collections",
      cSubTitle: "Detailed view of your completed coconut collections",
    },
  };

  var row = "";
  fetch(backProxy + "/collector", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  })
    .then((response) => {
      if (response.status == 200) {
        response.json().then((data) => {
          data.list.forEach((item) => {
            row +=
              `<tr data-href="../collection/view.html" id=${item.id}>` +
              `<td>${item.area}</td>` +
              `<td>${item.date}</td>` +
              `<td>${timeString(item.time)}</td>` +
              `<td>${item.amount.toLocaleString("en-US")}</td>` +
              `<td>${item.name} ${item.last_name}</td>` +
              `</tr>`;
          });
          tbody1.innerHTML = row;

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
          console.log(data.message);
          if (lang == "sin") Command: toastr["info"]("ඉදිරි එකතුවක් නැත");
          else Command: toastr["info"]("No upcoming collection");
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
})();

function checkDate(date) {
  if (date.trim().length === 0) return true;

  var selectedDate = new Date(date);
  var now = new Date();
  now.setDate(now.getDate() - 1);
  if (selectedDate < now) return true;
  else return false;
}
