(() => {
  const body = document.querySelector("body"),
    sin = body.querySelector(".sin"),
    en = body.querySelector(".en"),
    pTitle = body.querySelector(".productionmg-title"),
    pText = body.querySelector(".productionmg-subtitle"),
    yardH = body.querySelector(".yard-h3"),
    yLabel = body.querySelector(".yard-label"),
    bLabel = body.querySelector(".block-label"),
    raLabel = body.querySelector(".reqest-amount-label"),
    rAmount = body.querySelector(".request-amount"),
    tbody = body.querySelector(".tbody"),
    sYard = body.querySelector(".sYard"),
    yBlock = body.querySelector(".yBlock"),
    yardError = body.querySelector(".yard-error"),
    blockError = body.querySelector(".block-error"),
    amountError = body.querySelector(".coco-error"),
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
    yLabel.textContent = data["sin"]["yLabel"];
    bLabel.textContent = data["sin"]["bLabel"];
    raLabel.textContent = data["sin"]["raLabel"];
    rAmount.placeholder = data["sin"]["rAmount"];
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
    yLabel.textContent = data["en"]["yLabel"];
    bLabel.textContent = data["en"]["bLabel"];
    raLabel.textContent = data["en"]["raLabel"];
    rAmount.placeholder = data["en"]["rAmount"];
    btn.textContent = data["en"]["btn"];

    setGreeting();
  });

  var data = {
    sin: {
      pTitle: "ඉල්ලීම සංස්කරණය කරන්න",
      pText: "කොටස් ඉල්ලීම් විස්තර සංස්කරණය කරන්න",
      yLabel: "අංගනය",
      bLabel: "කුට්ටි",
      raLabel: "පොල් ගාණක් ඉල්ලුවා",
      rAmount: "පොල් ප්‍රමාණය ඇතුළත් කරන්න",
      btn: "සුරකින්න",
    },
    en: {
      pTitle: "Edit Request",
      pText: "Edit stock request details",
      yLabel: "Yard",
      bLabel: "Block",
      raLabel: "Requested coconut amount",
      rAmount: "Enter coconut amount",
      btn: "Save Changes",
    },
  };

  fetch(backProxy + "/production?id=" + getCookie("id"), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  })
    .then((response) => {
      console.log(response.status);
      if (response.status == 200) {
        response.json().then((data) => {
          getYard(data.request.block, data.request.yard);

          sYard.value = data.request.yard;
          yBlock.value = data.request.block;
          rAmount.value = data.request.amount;
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

  let yAmount = 0;

  function getYard(id, yard) {
    let row = "";

    var formData = {
      id: id,
      yard: yard,
    };

    fetch(backProxy + "/yards", {
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

            yAmount = data.block.count;
            tbody.innerHTML = row;

            if (lang == "sin") yardH.textContent = "අංගනය " + yard;
            else yardH.textContent = "Yard " + yard;
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
  }

  var yardStatus = false,
    blockStatus = false,
    amountStatus = false;

  sYard.addEventListener("input", () => {
    yard_status_func();
    getYard(yBlock.value, sYard.value);
  });

  yBlock.addEventListener("input", () => {
    block_status_func();
    getYard(yBlock.value, sYard.value);
  });

  rAmount.addEventListener("input", () => {
    rAmount_status_func();
  });

  btn.addEventListener("click", () => {
    if (!yard_status_func()) {
      sYard.focus();
    }
    if (!block_status_func()) {
      yBlock.focus();
    }
    if (!rAmount_status_func()) {
      rAmount.focus();
    }

    if (yardStatus && blockStatus && amountStatus) {
      var formData = {
        id: getCookie("id"),
        amount: rAmount.value,
        block: yBlock.value,
        yard: sYard.value,
      };

      fetch(backProxy + "/production", {
        method: "PUT",
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
              var title = "යාවත්කාලීන කරන ලදී!",
                text = "ඔබගේ නිෂ්පාදන ඉල්ලීම සාර්ථකව යාවත්කාලීන කරන ලදී.";
            } else {
              var title = "Updated!",
                text = "Your production request updated successfully.";
            }
            // sweet alert
            Swal.fire({
              title: title,
              text: text,
              icon: "success",
              confirmButtonColor: confirmButtonColor,
            }).then((response) => {
              window.location.href = "./view.html";
            });
          } else if (response.status === 400) {
            response.json().then((data) => {
              console.log(data.message);
              Command: toastr["error"](data.message);
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
    }
  });

  function yard_status_func() {
    if (typeof sYard.value === "string" && sYard.value.trim().length === 0) {
      if (lang == "sin") yardError.textContent = "අංගනය හිස් විය නොහැක!";
      else yardError.textContent = "Yard cannot be empty";
      yardStatus = false;
      return false;
    } else {
      yardStatus = true;
      yardError.textContent = "";
      return true;
    }
  }

  function block_status_func() {
    if (typeof yBlock.value === "string" && yBlock.value.trim().length === 0) {
      if (lang == "sin") blockError.textContent = "කුට්ටි හිස් විය නොහැක!";
      else blockError.textContent = "Block cannot be empty";
      blockStatus = false;
      return false;
    } else {
      blockStatus = true;
      blockError.textContent = "";
      return true;
    }
  }

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
    } else if (rAmount.value > yAmount) {
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
