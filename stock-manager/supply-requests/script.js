document.cookie = "id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
(() => {
  const body = document.querySelector("body"),
    sin = body.querySelector(".sin"),
    en = body.querySelector(".en"),
    sTitle = body.querySelector(".stockmg-title"),
    sText = body.querySelector(".stockmg-text"),
    addressTable = body.querySelector(".addresses-table"),
    searchBar1 = body.querySelector(".search1"),
    filter1 = body.querySelector(".filter-1"),
    tbody = body.querySelector(".tbody");

  var lang = getCookie("lang"); // current language

  var searchBox1 = document.querySelectorAll(
    '.search-box1 input[type="text"] + span'
  );

  searchBox1.forEach((elm) => {
    elm.addEventListener("click", () => {
      elm.previousElementSibling.value = "";
      search(searchBar1.value.toUpperCase(), addressTable);
    });
  });

  searchBar1.addEventListener("keyup", () => {
    search(searchBar1.value.toUpperCase(), addressTable);
  });

  filter1.addEventListener("input", () => {
    search(filter1.value.toUpperCase(), addressTable);
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
    lang = "sin";

    sTitle.textContent = data["sin"]["sTitle"];
    sText.textContent = data["sin"]["sText"];
    setGreeting();
  });

  en.addEventListener("click", () => {
    en.classList.add("active");
    sin.classList.remove("active");

    document.documentElement.setAttribute("lang", "en");
    document.cookie = "lang=en; path=/";
    lang = "en";

    sTitle.textContent = data["en"]["sTitle"];
    sText.textContent = data["en"]["sText"];
    setGreeting();
  });

  var data = {
    sin: {
      sTitle: "සැපයුම් ඉල්ලීම්",
      sText: "සැපයුම්කරුවන්ගේ ඉල්ලීම් බලන්න සහ අනුමත කරන්න",
    },
    en: {
      sTitle: "Supply Requests",
      sText: "View and approve supplier requests",
    },
  };

  let row = "";

  fetch(backProxy + "/supply-requests", {
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
            let status = "Pending Approval";
            if (item.status == 2)
              if (item.method == "yard") return;
              else status = "Assign collector";

            row +=
              "<tr data-href='./view-request.html' id=" +
              item.id +
              ">" +
              "<td>" +
              item.id +
              "</td>" +
              "<td class='hide'>" +
              item.name +
              "</td>" +
              "<td>" +
              item.date +
              "</td>" +
              "<td>" +
              item.amount.toLocaleString("en-US") +
              "</td>" +
              "<td>" +
              capitalize(item.method) +
              "</td>" +
              "<td class='hide'>" +
              status +
              "</td>" +
              "</tr>";
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
          console.log(data.size);
        });
        if (lang == "sin") Command: toastr["info"]("සැපයුම් ඉල්ලීම් නොමැත");
        else Command: toastr["info"]("No Supply requests");
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
