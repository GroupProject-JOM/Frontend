(() => {
  const body = document.querySelector("body"),
    sin = body.querySelector(".sin"),
    en = body.querySelector(".en"),
    sTitle = body.querySelector(".salesmg-title"),
    sText = body.querySelector(".salesmg-text"),
    dName = body.querySelector(".dname"),
    dValue = body.querySelector(".dvalue"),
    visits = body.querySelector(".visits"),
    cAmount = body.querySelector(".cash-amount"),
    cError = body.querySelector(".cash-error"),
    confirm = body.querySelector(".confirm"),
    distributorsTable = body.querySelector(".distributors-table"),
    searchBar = body.querySelector(".search"),
    collect = body.querySelector(".collect"),
    overlay = body.querySelector(".overlay"),
    closeBtn = body.querySelector(".close-btn"),
    tbody = body.querySelector(".tbody");

  var lang = getCookie("lang"); // current language

  collect.addEventListener("click", () => {
    overlay.style.display = "flex";
    document.querySelector(".collect-revenue-container").style.display =
      "block";
  });

  overlay.addEventListener("click", (e) => {
    if (e.target.id === "overlay") {
      overlay.style.display = "none";
      document.querySelector(".collect-revenue-container").style.display =
        "none";
    }
  });

  closeBtn.addEventListener("click", () => {
    overlay.style.display = "none";
    document.querySelector(".collect-revenue-container").style.display = "none";
  });

  sTitle.textContent = getCookie("dName");
  dName.textContent = getCookie("dName");
  dValue.textContent = (+getCookie("price")).toLocaleString("en-US") + " LKR";
  cAmount.value = +getCookie("price");
  visits.textContent = getCookie("visits");
  sText.textContent = getCookie("dContact");

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
              `<td> P/B/` +
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

  var cStatus = false;

  cAmount.addEventListener("input", () => {
    price_status_func();
  });

  confirm.addEventListener("click", () => {
    if (!price_status_func()) {
      cAmount.focus();
    }

    if (cStatus) {
      if (lang == "sin") {
        var title = "ඔයාට විශ්වාස ද?",
          text = "ඔබට මෙය ප්‍රතිවර්තනය කිරීමට නොහැකි වනු ඇත!",
          confirmButtonText = "ඔව්, එකතු කරන්න!",
          cancelButtonText = "අවලංගු කරන්න";
      } else {
        var title = "Are you sure?",
          text = "You won't be able to revert this!",
          confirmButtonText = "Yes, collect it!",
          cancelButtonText = "Cancel";
      }
      Swal.fire({
        title: title,
        text: text,
        confirmButtonText: confirmButtonText,
        cancelButtonText: cancelButtonText,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: confirmButtonColor,
        cancelButtonColor: cancelButtonColor,
      }).then((result) => {
        if (result.isConfirmed) {
          var formData = {
              cash: cAmount.value,
              distributor: getCookie("id"),
            },
            onHnad = 0;

          fetch(backProxy + "/distributors", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
            credentials: "include",
          })
            .then((response) => {
              if (response.status == 200) {
                response.json().then((data) => {
                  log(data.message);
                  onHnad = data.cash;
                });
                if (lang == "sin") {
                  var title = "එකතු කළා!",
                    text = "මුදල් සාර්ථකව එකතු කර ඇත.";
                } else {
                  var title = "Collected!",
                    text = "Money Collected Successfully.";
                }
                // sweet alert
                Swal.fire({
                  title: title,
                  text: text,
                  icon: "success",
                  confirmButtonColor: confirmButtonColor,
                }).then((response) => {
                  document.cookie = "price=" + +onHnad + "; path=/";
                  dValue.textContent =
                    (+onHnad).toLocaleString("en-US") + " LKR";
                  if (+getCookie("price") <= 0) {
                    document.cookie = "visits=0; path=/";
                    visits.textContent = 0;
                  }
                  cAmount.value = onHnad;
                  closeBtn.click();
                });
              } else if (response.status === 400) {
                response.json().then((data) => {
                  console.log(data.message);
                });
                if (lang == "sin")
                  Command: toastr["error"]("මුදල් එකතු කිරීම සාර්ථක නොවේ");
                else
                  Command: toastr["error"]("Money Collection is not Succeed");
              } else if (response.status === 401) {
                response.json().then((data) => {
                  console.log(data.message);
                });
                if (lang == "sin")
                  Command: toastr["error"]("වලංගු නොවන පරිශීලක");
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
        }
      });
    }
  });

  function price_status_func() {
    if (
      typeof cAmount.value === "string" &&
      cAmount.value.trim().length === 0
    ) {
      if (lang == "sin") cError.textContent = "එකතු කරන මුදල හිස් විය නොහැක";
      else cError.textContent = "Collecting amount cannot be empty";
      cStatus = false;
      return false;
    } else if (!checkInt(cAmount.value)) {
      if (lang == "sin") cError.textContent = "එකතු කරන මුදල ධනාත්මක විය යුතුය";
      else cError.textContent = "Collecting amount must be positive";
      cStatus = false;
      return false;
    } else if (cAmount.value > +getCookie("price")) {
      if (lang == "sin")
        cError.textContent = "එකතු කරන මුදල පවතින මුදලට වඩා වැඩි විය නොහැක";
      else
        cError.textContent =
          "Collecting amount cannot greater than existing amount";
      cStatus = false;
      return false;
    } else {
      cError.textContent = "";
      cStatus = true;
      return true;
    }
  }
})();

function checkInt(num) {
  if (Number.isInteger(+num) && +num > 0) return true;
  return false;
}
