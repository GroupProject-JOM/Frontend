(() => {
  const body = document.querySelector("body"),
    sin = body.querySelector(".sin"),
    en = body.querySelector(".en"),
    sTitle = body.querySelector(".stockmg-title"),
    sText = body.querySelector(".stockmg-subtitle"),
    tbody = body.querySelector(".tbody"),
    prTable = body.querySelector(".production-request-table"),
    searchBar1 = body.querySelector(".search1"),
    filter1 = body.querySelector(".filter-1");

  var searchBox1 = document.querySelectorAll(
    '.search-box1 input[type="text"] + span'
  );

  searchBox1.forEach((elm) => {
    elm.addEventListener("click", () => {
      elm.previousElementSibling.value = "";
      search(searchBar1.value.toUpperCase(), prTable);
    });
  });

  searchBar1.addEventListener("keyup", () => {
    search(searchBar1.value.toUpperCase(), prTable);
  });

  filter1.addEventListener("input", () => {
    search(filter1.value.toUpperCase(), prTable);
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
      sTitle: "නිෂ්පාදන ඉල්ලීම්",
      sText: "නිෂ්පාදන කළමනාකරු විසින් එවන ලද නිෂ්පාදන ඉල්ලීම්",
    },
    en: {
      sTitle: "Production Requests",
      sText: "Production requests sent by production manager",
    },
  };

  let row = "";

  fetch(backProxy + "/production-manager", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  })
    .then((response) => {
      if (response.status == 200) {
        response.json().then((data) => {
          data.productions.forEach((item) => {
            var stat = "",
              st = "";

            if (item.status == 1) {
              stat = "pending";
              st = "Pending Approval";
              if (window.innerWidth <= 718) st = "Pending";
            } else if (item.status == 2 || item.status == 4) {
              stat = "accept";
              st = "Accepted";
            } else if (item.status == 3) {
              stat = "rejected";
              st = "Rejected";
            }

            var date_string = new Date(item.date);

            row +=
              "<tr data-href='./view-request.html' id=" +
              item.id +
              ">" +
              "<td>" +
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
          console.log(data.size);
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
