(() => {
  const body = document.querySelector("body"),
    sin = body.querySelector(".sin"),
    en = body.querySelector(".en"),
    pTitle = body.querySelector(".productionmg-title"),
    pText = body.querySelector(".production-history-text"),
    tbody = body.querySelector(".tbody");

  var lang = getCookie("lang"); // current language

  sin.addEventListener("click", () => {
    sin.classList.add("active");
    en.classList.remove("active");

    document.documentElement.setAttribute("lang", "sin");
    document.cookie = "lang=sin; path=/";

    pTitle.textContent = data["sin"]["pTitle"];
    pText.textContent = data["sin"]["pText"];
    setGreeting();
  });

  en.addEventListener("click", () => {
    en.classList.add("active");
    sin.classList.remove("active");

    document.documentElement.setAttribute("lang", "en");
    document.cookie = "lang=en; path=/";

    pTitle.textContent = data["en"]["pTitle"];
    pText.textContent = data["en"]["pText"];
    setGreeting();
  });

  var data = {
    sin: {
      pTitle: "නිෂ්පාදන",
      pText: "සම්පුර්ණ කරන ලද සහ දැනට පවතින නිෂ්පාදන විස්තර බලන්න",
    },
    en: {
      pTitle: "Productions",
      pText: "View the completed and ongoing production details",
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

            var date_string2 = new Date(item.end_date);
            var end_date = date_string2.toLocaleDateString();

            if (item.status == 1) {
              stat = "accept";
              st = "Pending";
              end_date = "-";
            } else if (item.status == 2) {
              stat = "pending";
              st = "Ready";
            } else if (item.status == 3) {
              stat = "rejected";
              st = "Terminated";
            } else if (item.status == 4) {
              stat = "pending";
              st = "Ongoing";
            } else if (item.status == 5) {
              stat = "complete";
              st = "Completed";
            }

            var date_string1 = new Date(item.create_date);

            var arr = item.products.split(",");

            row +=
              "<tr data-href='./view.html' id=" +
              item.id +
              ">" +
              "<td>" +
              item.id +
              "</td>" +
              "<td>" +
              date_string1.toLocaleDateString() +
              "</td>" +
              "<td>" +
              end_date +
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
        if (lang == "sin") Command: toastr["info"]("නිෂ්පාදන කණ්ඩායම් නොමැත");
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
