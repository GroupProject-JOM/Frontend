(() => {
  const body = document.querySelector("body"),
    sin = body.querySelector(".sin"),
    en = body.querySelector(".en"),
    sTitle = body.querySelector(".salesmg-title"),
    sText = body.querySelector(".salesmg-text"),
    distributorsTable = body.querySelector(".distributors-table"),
    searchBar = body.querySelector(".search"),
    collect = body.querySelector(".collect"),
    overlay = body.querySelector(".overlay"),
    closeBtn = body.querySelector(".close-btn"),
    tbody = body.querySelector(".tbody");

  var lang = getCookie("lang"); // current language



  collect.addEventListener("click", () => {
    overlay.style.display = "flex";
    document.querySelector(".collect-revenue-container").style.display = "block";
  });

  overlay.addEventListener("click", (e) => {
    if (e.target.id === "overlay") {
      overlay.style.display = "none";
      document.querySelector(".collect-revenue-container").style.display = "none";
    }
  });

  closeBtn.addEventListener("click", () => {
    overlay.style.display = "none";
    document.querySelector(".collect-revenue-container").style.display = "none";
  });

  sTitle.textContent = getCookie("dName")
  sText.textContent = getCookie("dContact")

  var searchBa = document.querySelectorAll(
    '.search-box input[type="text"] + span'
  );

  searchBa.forEach((elm) => {
    elm.addEventListener("click", () => {
      elm.previousElementSibling.value = "";
      search(searchBar.value.toUpperCase(), distributorsTable);
    });
  });

  searchBar.addEventListener("keyup", () => {
    search(searchBar.value.toUpperCase(), distributorsTable);
  });

  sin.addEventListener("click", () => {
    sin.classList.add("active");
    en.classList.remove("active");

    document.documentElement.setAttribute("lang", "sin");
    document.cookie = "lang=sin; path=/";
    lang = "sin";

    setGreeting();
  });

  en.addEventListener("click", () => {
    en.classList.add("active");
    sin.classList.remove("active");

    document.documentElement.setAttribute("lang", "en");
    document.cookie = "lang=en; path=/";
    lang = "en";

    setGreeting();
  });

  var formData = {
    distributor: getCookie("id"),
  };

  var row = "";
  fetch(backProxy + "/distributors", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
    credentials: "include",
  })
    .then((response) => {
      if (response.status == 200) {
        response.json().then((data) => {
          let arr = data.allocated;
          arr.forEach(data_to_table);

          function data_to_table(item) {
            row +=
              `<tr id=` +
              item.id +
              `>` +
              `<td>` +
              item.id +
              `</td>` +
              `<td>` +
              item.category +
              `</td><td> ` +
              item.type +
              `</td>` +
              `<td>` +
              item.remaining +
              `</td>` +
              `</tr>`;
          }
          tbody.innerHTML = row;
        });
      } else if (response.status === 202) {
        response.json().then((data) => {
          console.log(data.allocated);
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
