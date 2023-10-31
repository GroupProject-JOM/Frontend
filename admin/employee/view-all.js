// sessionStorage.setItem("id", 0);
document.cookie = "id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
(() => {
  const body = document.querySelector("body"),
    sin = body.querySelector(".sin"),
    en = body.querySelector(".en"),
    oTitle = body.querySelector(".outlet-title"),
    oText = body.querySelector(".outlet-text"),
    tbody = body.querySelector(".tbody"),
    btn = body.querySelector(".form-button");

  sin.addEventListener("click", () => {
    sin.classList.add("active");
    en.classList.remove("active");

    document.documentElement.setAttribute("lang", "sin");
    // sessionStorage.setItem("lang", "sin");
    document.cookie = "lang=sin; path=/";

    oTitle.textContent = data["sin"]["oTitle"];
    oText.innerHTML = data["sin"]["oText"];
    btn.textContent = data["sin"]["btn"];
  });

  en.addEventListener("click", () => {
    en.classList.add("active");
    sin.classList.remove("active");

    document.documentElement.setAttribute("lang", "en");
    // sessionStorage.setItem("lang", "en");
    document.cookie = "lang=en; path=/";

    oTitle.textContent = data["en"]["oTitle"];
    oText.innerHTML = data["en"]["oText"];
    btn.textContent = data["en"]["btn"];
  });

  var data = {
    sin: {
      oTitle: "සේවකයින් බලන්න",
      oText: "සීමාසහිත ජයසිංහ ඔයිල් මිල්ස් (PVT) හි සියලුම සේවකයින් බලන්න",
      btn: "සේවකයා එකතු කරන්න",
    },
    en: {
      oTitle: "View Employees",
      oText: "View all the employees of Jayasinghe Oil Mills (PVT) Ltd",
      btn: "Add Employee",
    },
  };

  var row = "";
  // fetch(backProxy + "/estates?sId=" + sessionStorage.getItem("sId"), {
  fetch(backProxy + "/employees", {
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
            row +=
              "<tr data-href='./view.html' id=" +
              item.id +
              ">" +
              "<td>" +
              item.first_name +
              "</td>" +
              "<td>" +
              item.role +
              "</td>" +
              "<td>" +
              item.phone +
              "</td>" +
              "<td>" +
              item.add_line_3 +
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
      } else {
        console.error("Error:", response.status);
      }
    })
    .catch((error) => {
      console.error("An error occurred:", error);
    });
})();
