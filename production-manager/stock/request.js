(() => {
  const body = document.querySelector("body"),
    sin = body.querySelector(".sin"),
    en = body.querySelector(".en"),
    pTitle = body.querySelector(".productionmg-title"),
    pText = body.querySelector(".productionmg-subtitle"),
    yardH = body.querySelector(".yard-h3"),
    tbody = body.querySelector(".tbody"),
    rAmount = body.querySelector(".request-amount"),
    amountError = body.querySelector(".coco-error"),
    raLabel = body.querySelector(".reqest-amount-label"),
    sYard = body.querySelector(".sYard"),
    yBlock = body.querySelector(".yBlock"),
    yAmount = body.querySelector(".yAmount"),
    yDays = body.querySelector(".yDays"),
    btn = body.querySelector(".form-button");

  var lang = getCookie("lang"); // current language

  sin.addEventListener("click", () => {
    sin.classList.add("active");
    en.classList.remove("active");

    document.documentElement.setAttribute("lang", "sin");
    document.cookie = "lang=sin; path=/";
    lang = "sin";

    pTitle.textContent = data["sin"]["pTitle"];
    pText.textContent = data["sin"]["pText"];
    yardH.textContent = data["sin"]["yardH"];
    rAmount.placeholder = data["sin"]["rAmount"];
    raLabel.textContent = data["sin"]["raLabel"];
    btn.textContent = data["sin"]["btn"];
    setGreeting();
  });

  en.addEventListener("click", () => {
    en.classList.add("active");
    sin.classList.remove("active");

    document.documentElement.setAttribute("lang", "en");
    document.cookie = "lang=en; path=/";
    lang = "en";

    pTitle.textContent = data["en"]["pTitle"];
    pText.textContent = data["en"]["pText"];
    yardH.textContent = data["en"]["yardH"];
    rAmount.placeholder = data["en"]["rAmount"];
    raLabel.textContent = data["en"]["raLabel"];
    btn.textContent = data["en"]["btn"];
    setGreeting();
  });

  var data = {
    sin: {
      pTitle: "කොටස් තොරතුරු",
      pText: "වර්ණ-කේතගත කොටස් තොරතුරු බලන්න",
      yardH: "අංගනය " + getCookie("id").charAt(0),
      rAmount: "ඉල්ලන පොල් ප්‍රමාණය ඇතුලත් කරන්න",
      raLabel: "පොල් ප්‍රමාණය",
      btn: "තොග ඉල්ලන්න",
    },
    en: {
      pTitle: "View Block",
      pText: "View and Request Stock for Production",
      yardH: "Yard " + getCookie("id").charAt(0),
      rAmount: "Enter Requesting Coconut Amount",
      raLabel: "Coconut Amount",
      btn: "Request Stock",
    },
  };

  let row = "";

  var formData = {
    user: getCookie("user"),
    id: getCookie("id").slice(1),
    yard: getCookie("id").charAt(0),
  };

  fetch(backProxy + "/yards?user=" + getCookie("user"), {
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
          data.yard.forEach((item) => {
            var status = "";
            if (item.days > 30) status = "stock-level4";
            else if (item.days > 25) status = "stock-level3";
            else if (item.days > 15) status = "stock-level2";
            else status = "stock-level1";

            row +=
              `<tr id=` +
              item.id +
              ` class="` +
              status +
              `">` +
              `<td>` +
              item.id +
              `</td>` +
              `<td>` +
              item.days +
              `</td>` +
              `<td>` +
              item.count +
              `</td>` +
              `</tr>`;
          });

          tbody.innerHTML = row;

          sYard.textContent = "Yard " + getCookie("id").charAt(0);
          yBlock.textContent = data.block.id;
          yAmount.textContent = data.block.count;
          yDays.textContent = data.block.days;
        });
      } else if (response.status === 202) {
        response.json().then((data) => {
          console.log(data.message);
        });
        if (lang == "sin") Command: toastr["info"]("මොකක්හරි වැරැද්දක් වෙලා");
        else Command: toastr["info"]("Something went wrong");
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

  var amountStatus = false;

  rAmount.addEventListener("input", () => {
    rAmount_status_func();
  });

  btn.addEventListener("click", () => {
    if (!rAmount_status_func()) {
      rAmount.focus();
    }

    if (amountStatus) {
      var formData = {
        user: getCookie("user"),
        amount: rAmount.value,
        block: getCookie("id").slice(1),
        yard: getCookie("id").charAt(0),
      };
      fetch(backProxy + "/production", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      })
        .then((response) => {
          console.log(response.status);
          if (response.status == 200) {
            response.json().then((data) => {
              console.log(data.message);
            });
            if (lang == "sin") {
              var title = "සාර්ථකයි!",
                text = "ඔබේ නිෂ්පාදන ඉල්ලීම සාර්ථකව යවා ඇත.";
            } else {
              var title = "Successful!",
                text = "Your production request sent successfully.";
            }
            // sweet alert
            Swal.fire({
              title: title,
              text: text,
              icon: "success",
              confirmButtonColor: confirmButtonColor,
            }).then((response) => {
              window.location.href = "../";
            });
          } else if (response.status === 400) {
            response.json().then((data) => {
              console.log(data.message);
              Command: toastr["error"](data.message);
            });
          } else if (response.status === 401) {
            response.json().then((data) => {
              console.log(data.message);
              Command: toastr["error"](data.message);
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
    }
  });

  function rAmount_status_func() {
    if (
      typeof rAmount.value === "string" &&
      rAmount.value.trim().length === 0
    ) {
      if (lang == "sin") {
        amountError.textContent = "පොල් ප්‍රමාණය හිස් විය නොහැක";
        Command: toastr["warning"]("පොල් ප්‍රමාණය හිස් විය නොහැක");
      } else {
        amountError.textContent = "Coconut amount cannot be empty";
        Command: toastr["warning"]("Coconut amount cannot be empty");
      }
      amountStatus = false;
      return false;
    } else if (!checkInt(rAmount.value)) {
      if (lang == "sin") {
        amountError.textContent = "පොල් ප්‍රමාණය ධන නිඛිල විය යුතුය";
        Command: toastr["warning"]("පොල් ප්‍රමාණය ධන නිඛිල විය යුතුය");
      } else {
        amountError.textContent = "Coconut amount must be positive integer";
        Command: toastr["warning"]("Coconut amount must be positive integer");
      }
      amountStatus = false;
      return false;
    }
    if (rAmount.value > +yAmount.textContent) {
      if (lang == "sin") {
        amountError.textContent = "පොල් ප්‍රමාණය පවතින ප්‍රමාණය ඉක්මවිය නොහැක";
        Command: toastr["warning"](
          "පොල් ප්‍රමාණය පවතින ප්‍රමාණය ඉක්මවිය නොහැක"
        );
      } else {
        amountError.textContent =
          "The amount of coconut cannot exceed the available amount";
        Command: toastr["warning"](
          "The amount of coconut cannot exceed the available amount"
        );
      }
      log(rAmount.value, yAmount.textContent);
      amountStatus = false;
      return false;
    } else {
      amountError.textContent = "";
      amountStatus = true;
      return true;
    }
  }
})();

function checkInt(num) {
  if (Number.isInteger(+num) && +num > 0) return true;
  return false;
}
