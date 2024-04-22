document.cookie = "id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";

(() => {
  const body = document.querySelector("body"),
    sin = body.querySelector(".sin"),
    en = body.querySelector(".en"),
    pTitle = body.querySelector(".productionmg-title"),
    pText = body.querySelector(".production-history-text"),
    btn = body.querySelector(".form-button"),
    productionTable = body.querySelector(".production-table"),
    tbody = body.querySelector(".tbody"),
    searchBar = body.querySelector(".search1"),
    filter = body.querySelector(".filter-1");

  var lang = getCookie("lang"); // current language

  var searchBox = document.querySelectorAll(
    '.search-box1 input[type="text"] + span'
  );

  searchBox.forEach((elm) => {
    elm.addEventListener("click", () => {
      elm.previousElementSibling.value = "";
      search(searchBar.value.toUpperCase(), productionTable);
    });
  });

  searchBar.addEventListener("keyup", () => {
    search(searchBar.value.toUpperCase(), productionTable);
  });

  filter.addEventListener("input", () => {
    search(filter.value.toUpperCase(), productionTable);
  });

  const googleIcon = document.querySelectorAll("#filter-icon");

  googleIcon.forEach((icon) => {
    icon.addEventListener("click", () => {
      icon.parentElement.classList.toggle("active");
    });
  });

  sin.addEventListener("click", () => {
    sin.classList.add("active");
    en.classList.remove("active");

    document.documentElement.setAttribute("lang", "sin");
    document.cookie = "lang=sin; path=/";

    pTitle.textContent = data["sin"]["pTitle"];
    pText.textContent = data["sin"]["pText"];
    btn.textContent = data["sin"]["btn"];
    setGreeting();
  });

  en.addEventListener("click", () => {
    en.classList.add("active");
    sin.classList.remove("active");

    document.documentElement.setAttribute("lang", "en");
    document.cookie = "lang=en; path=/";

    pTitle.textContent = data["en"]["pTitle"];
    pText.textContent = data["en"]["pText"];
    btn.textContent = data["en"]["btn"];
    setGreeting();
  });

  var data = {
    sin: {
      pTitle: "නිෂ්පාදන දළ විශ්ලේෂණය",
      pText: "අතීත සහ දැනට පවතින නිෂ්පාදන කාණ්ඩ බලන්න",
      btn: "නව නිෂ්පාදනය",
    },
    en: {
      pTitle: "Production Overview",
      pText: "View past and ongoing production batches",
      btn: "New Production",
    },
  };

  let row = "";

  fetch(backProxy + "/batches", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  })
    .then((response) => {
      if (response.status == 200) {
        response.json().then((data) => {
          data.batches.forEach((item) => {
            var stat = "",
              st = "";

            if (item.status == 1) {
              stat = "pending";
              st = "Processing";
            } else if (item.status == 3) {
              stat = "rejected";
              st = "Terminated";
            } else {
              stat = "completed";
              st = "Completed";
            }

            var date_string1 = new Date(item.create_date);
            var end_date = "-";

            if (item.end_date != null) {
              var date_string2 = new Date(item.end_date);
              end_date = date_string2.toLocaleDateString();
            }

            var arr = item.products.split(",");

            row +=
              "<tr data-href='./view.html' id=" +
              item.id +
              ">" +
              "<td> P/B/" +
              item.id +
              "</td>" +
              "<td>" +
              date_string1.toLocaleDateString() +
              "</td>" +
              "<td>" +
              end_date +
              "</td>" +
              "<td>" +
              item.amount.toLocaleString("en-US") +
              "</td>" +
              "<td>" +
              arr.length +
              "</td>" +
              "<td>" +
              "<button class='" +
              stat +
              " status'>" +
              st +
              "</button>" +
              "</td>" +
              "</tr>";
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
      } else if (response.status === 202) {
        response.json().then((data) => {
          console.log(data.message);
        });
        if (lang == "sin") Command: toastr["info"]("නිෂ්පාදන කාණ්ඩ නොමැත");
        else Command: toastr["info"]("No production batches");
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
