(() => {
  const body = document.querySelector("body"),
    sin = body.querySelector(".sin"),
    en = body.querySelector(".en"),
    w1 = body.querySelector(".w1"),
    w2 = body.querySelector(".w2"),
    c1 = body.querySelector(".c1"),
    c2 = body.querySelector(".c2"),
    c4 = body.querySelector(".c4"),
    c5 = body.querySelector(".c5"),
    tbody2 = body.querySelector(".tbody2"),
    c6 = body.querySelector(".c6"),
    c7 = body.querySelector(".c7");

  var lang = getCookie("lang"); // current language

  sin.addEventListener("click", () => {
    sin.classList.add("active");
    en.classList.remove("active");

    document.documentElement.setAttribute("lang", "sin");
    // sessionStorage.setItem("lang", "sin");
    document.cookie = "lang=sin; path=/";
    lang = "sin";

    w1.textContent = data["sin"]["w1"];
    w2.textContent = data["sin"]["w2"];
    c1.textContent = data["sin"]["c1"];
    c2.textContent = data["sin"]["c2"];
    c4.textContent = data["sin"]["c4"];
    c5.textContent = data["sin"]["c5"];
    c6.textContent = data["sin"]["c6"];
    c7.textContent = data["sin"]["c7"];
    setGreeting();
  });

  en.addEventListener("click", () => {
    en.classList.add("active");
    sin.classList.remove("active");

    document.documentElement.setAttribute("lang", "en");
    // sessionStorage.setItem("lang", "en");
    document.cookie = "lang=en; path=/";
    lang = "en";

    w1.textContent = data["en"]["w1"];
    w2.textContent = data["en"]["w2"];
    c1.textContent = data["en"]["c1"];
    c2.textContent = data["en"]["c2"];
    c4.textContent = data["en"]["c4"];
    c5.textContent = data["en"]["c5"];
    c6.textContent = data["en"]["c6"];
    c7.textContent = data["en"]["c7"];
    setGreeting();
  });

  var data = {
    sin: {
      w1: "අද මුළු එකතුව",
      w2: "අද ඉතිරිය",
      c1: "නිෂ්පාදන ඉල්ලීම්",
      c2: "නිෂ්පාදන කළමනාකරුගේ ඉල්ලීම් බලන්න සහ ප්රතිචාර දක්වන්න",
      c4: "සැපයුම්කරු ඉල්ලීම්",
      c5: "සැපයුම්කරුගේ ඉල්ලීම් බලන්න සහ ප්රතිචාර දක්වන්න",
      c6: "කොටස් තොරතුරු",
      c7: "වර්ණ-කේතගත අමු ද්රව්ය තොරතුරු බලන්න",
    },
    en: {
      w1: "Today's Total",
      w2: "Today's Remaining",
      c1: "Production Requests Overview",
      c2: "View and respond to production manager requests",
      c4: "Supplier Requests Overview",
      c5: "View and update Supplier requests",
      c6: "Stock Information",
      c7: "View color-coded stock information",
    },
  };

  let row2 = "";

  fetch(backProxy + "/stock-manager?sId=" + getCookie("sId"), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  })
    .then((response) => {
      if (response.status == 200) {
        response.json().then((data) => {
          console.log(data);
          let arr = data.list;
          arr.forEach(data_to_table);

          function data_to_table(item) {
            row2 +=
              "<tr data-href='./supply-requests/view-request1.html' id=" +
              item.id +
              ">" +
              "<td>" +
              item.id +
              "</td>" +
              "<td>" +
              item.name +
              "</td>" +
              "<td>" +
              item.date +
              "</td>" +
              "<td>" +
              item.amount.toLocaleString("en-US") +
              "</td>" +
              "<td>" +
              item.method.charAt(0).toUpperCase() +
              item.method.slice(1) +
              "</td>" +
              "</tr>";
          }

          tbody2.innerHTML = row2;

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
