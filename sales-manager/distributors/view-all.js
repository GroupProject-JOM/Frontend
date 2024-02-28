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
    collectorsTable = body.querySelector(".track-collectors-table"),
    searchBar = body.querySelector(".search"),
    tbody = body.querySelector(".tbody");

  var lang = getCookie("lang"); // current language

  var searchBa = document.querySelectorAll(
    '.search-box input[type="text"] + span'
  );

  searchBa.forEach((elm) => {
    elm.addEventListener("click", () => {
      elm.previousElementSibling.value = "";
      search(searchBar.value.toUpperCase(), collectorsTable);
    });
  });

  searchBar.addEventListener("keyup", () => {
    search(searchBar.value.toUpperCase(), collectorsTable);
  });

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
      sTitle: "බෙදාහරින්නන් බලන්න",
      sText: "බෙදාහරින්නාගේ විස්තර බලන්න",
    },
    en: {
      sTitle: "View Distributors",
      sText: "View Distributor Details",
    },
  };

  var row = "",
    cashOnHand = [];

  fetch(backProxy + "/distributors", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  })
    .then((response) => {
      if (response.status == 200) {
        response.json().then((data) => {
          let arr = data.distributors;
          arr.forEach(data_to_table);

          function data_to_table(item) {
            cashOnHand.push(item.price);
            row +=
              `<tr data-href='./view.html' id=` +
              item.id +
              `>` +
              `<td>` +
              item.first_name +
              ` ` +
              item.last_name +
              `</td>` +
              `<td>` +
              item.phone +
              `</td>` +
              `<td>${item.product}</td>` +
              `<td>${(+item.price).toLocaleString("en-US")} LKR</td>` +
              `<td>${item.visits}</td>` +
              `</tr>`;
          }
          tbody.innerHTML = row;

          const rows = document.querySelectorAll("tr[data-href]");

          rows.forEach((r, index) => {
            r.addEventListener("click", () => {
              document.cookie = "id=" + r.id + "; path=/";
              document.cookie =
                "dName=" + r.children[0].textContent + "; path=/";
              document.cookie =
                "dContact=" + r.children[1].textContent + "; path=/";
              document.cookie = "price=" + cashOnHand[index] + "; path=/";
              document.cookie =
                "visits=" + r.children[4].textContent + "; path=/";
              window.location.href = r.dataset.href;
            });
          });
        });
      } else if (response.status === 202) {
        response.json().then((data) => {
          console.log(data.distributors);
          if (lang == "sin") Command: toastr["error"]("බෙදාහරින්නන් නැත");
          else Command: toastr["error"]("No distributors");
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
