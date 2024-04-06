(() => {
  const body = document.querySelector("body"),
    sin = body.querySelector(".sin"),
    en = body.querySelector(".en"),
    sTitle = body.querySelector(".supply-title"),
    sText = body.querySelector(".supply-text"),
    amount = body.querySelector(".collected-amount"),
    amountError = body.querySelector(".coco-error"),
    op0 = body.querySelector(".op0"),
    op1 = body.querySelector(".op1"),
    op2 = body.querySelector(".op2"),
    op3 = body.querySelector(".op3"),
    op4 = body.querySelector(".op4"),
    op5 = body.querySelector(".op5"),
    date = body.querySelector(".date"),
    dateError = body.querySelector(".date-error"),
    time = body.querySelector(".time"),
    timeError = body.querySelector(".time-error"),
    method = body.querySelector(".method"),
    location = body.querySelector(".location"),
    locationError = body.querySelector(".location-error"),
    collectionError = body.querySelector(".collection-error"),
    payment = body.querySelector(".payment"),
    bank = body.querySelector(".bank"),
    bankError = body.querySelector(".bank-error"),
    paymentError = body.querySelector(".payment-error"),
    btn = body.querySelector(".add-button"),
    amountLabel = body.querySelector(".amount-label"),
    methodLabel = body.querySelector(".method-label"),
    paymentLabel = body.querySelector(".payment-label"),
    dText = body.querySelector(".date-label"),
    tText = body.querySelector(".time-label");

  var lang = getCookie("lang"); // current language

  sin.addEventListener("click", () => {
    sin.classList.add("active");
    en.classList.remove("active");

    document.documentElement.setAttribute("lang", "sin");
    document.cookie = "lang=sin; path=/";
    lang = "sin";

    sTitle.textContent = data["sin"]["sTitle"];
    sText.textContent = data["sin"]["sText"];
    amount.placeholder = data["sin"]["amount"];
    op0.textContent = data["sin"]["op0"];
    op1.textContent = data["sin"]["op1"];
    op2.textContent = data["sin"]["op2"];
    op3.textContent = data["sin"]["op3"];
    op4.textContent = data["sin"]["op4"];
    op5.textContent = data["sin"]["op5"];
    lop.textContent = data["sin"]["lop"];
    bop.textContent = data["sin"]["bop"];
    btn.textContent = data["sin"]["btn"];
    amountLabel.textContent = data["sin"]["amountLabel"];
    methodLabel.textContent = data["sin"]["methodLabel"];
    paymentLabel.textContent = data["sin"]["paymentLabel"];

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
    amount.placeholder = data["en"]["amount"];
    op0.textContent = data["en"]["op0"];
    op1.textContent = data["en"]["op1"];
    op2.textContent = data["en"]["op2"];
    op3.textContent = data["en"]["op3"];
    op4.textContent = data["en"]["op4"];
    op5.textContent = data["en"]["op5"];
    lop.textContent = data["en"]["lop"];
    bop.textContent = data["en"]["bop"];
    btn.textContent = data["en"]["btn"];
    amountLabel.textContent = data["en"]["amountLabel"];
    methodLabel.textContent = data["en"]["methodLabel"];
    paymentLabel.textContent = data["en"]["paymentLabel"];

    setGreeting();
  });

  var data = {
    sin: {
      sTitle: "සැපයුම සංස්කරණය කරන්න",
      sText: "ඔබගේ සැපයුම් ඉල්ලීම් විස්තර සංස්කරණය කරන්න",
      amount: "පොල් ප්‍රමාණය ඇතුළත් කරන්න",
      op0: "සැපයුම් ක්‍රමය තෝරන්න",
      op1: "වත්තෙන් එකතු කිරීම",
      op2: "අංගනයට භාර දීම",
      op3: "ගෙවීම් ක්‍රමය තෝරන්න",
      op4: "අත්පිට මුදල්",
      op5: "බැංකු හුවමාරුව",
      lop: "වතුයායේ ස්ථානය",
      bop: "බැංකු ගිණුම",
      btn: "සුරකින්න",
      amountLabel: "පොල් ප්‍රමාණය",
      methodLabel: "සැපයුම් ක්රමය",
      paymentLabel: "ගෙවීම් ක්රමය",
    },
    en: {
      sTitle: "Edit Supply",
      sText: "Edit your supply request details",
      amount: "Enter coconut amount",
      op0: "Select supply method",
      op1: "Pickup from estate",
      op2: "Delivered to yard",
      op3: "Select payment method",
      op4: "Cash on pickup",
      op5: "Transfer to bank",
      lop: "Estate Location",
      bop: "Bank Account",
      btn: "Save Changes",
      amountLabel: "Coconut Amount",
      methodLabel: "Supply Method",
      paymentLabel: "Payment Method",
    },
  };

  let lop, bop;

  var location_options =
      "<option value='' disabled selected hidden class='lop'></option>",
    bank_options =
      "<option value='' disabled selected hidden class='bop'></option>";

  // Get estates
  fetch(backProxy + "/estates", {
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
          arr.forEach(setter);

          function setter(item) {
            location_options +=
              "<option value=" + item.id + ">" + item.estate_name + "</option>";
          }
          location.innerHTML = location_options;
          lop = body.querySelector(".lop");
        });
      } else if (response.status === 202) {
        response.json().then((data) => {
          // data.size=0
          if (lang == "sin") {
            location_options += "<option value='' disabled>වතුයායන් නැත</option>";
            Command: toastr["info"]("වතුයායන් නැත");
          } else {
            location_options += "<option value='' disabled>No Estates</option>";
            Command: toastr["info"]("No Estates");
          }
          location.innerHTML = location_options;
          lop = body.querySelector(".lop");
        });
      } else {
        console.error("Error:", response.status);
        Command: toastr["error"](response.status, "Error");
        if (lang == "sin")
          location_options += "<option value='' disabled>වතුයායන් නැත</option>";
        else
          location_options += "<option value='' disabled>No Estates</option>";
        location.innerHTML = location_options;
        lop = body.querySelector(".lop");
      }
    })
    .catch((error) => {
      console.error("An error occurred:", error);
      Command: toastr["error"](error);
    });

  //Get bank accounts
  // bankWait = await
  fetch(backProxy + "/accounts", {
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
          arr.forEach(setter);

          function setter(item) {
            bank_options +=
              "<option value=" + item.id + ">" + item.name + "</option>";
          }
          bank.innerHTML = bank_options;
          bop = body.querySelector(".bop");
        });
      } else if (response.status === 202) {
        response.json().then((data) => {
          // data.size=0
          if (lang == "sin") {
            bank_options +=
              "<option value='' disabled >බැංකු ගිණුම් නැත</option>";
            Command: toastr["info"]("බැංකු ගිණුම් නැත");
          } else {
            bank_options +=
              "<option value='' disabled >No Bank Accounts</option>";
            Command: toastr["info"]("No Bank Accounts");
          }
          bank.innerHTML = bank_options;
          bop = body.querySelector(".bop");
        });
      } else {
        console.error("Error:", response.status);
        Command: toastr["error"](response.status, "Error");
        if (lang == "sin")
          bank_options +=
            "<option value='' disabled >බැංකු ගිණුම් නැත</option>";
        else
          bank_options +=
            "<option value='' disabled >No Bank Accounts</option>";
        bank.innerHTML = bank_options;
        bop = body.querySelector(".bop");
      }
    })
    .catch((error) => {
      console.error("An error occurred:", error);
      Command: toastr["error"](error);
    });

  var dateStatus = false,
    timeStatus = false,
    amountStatus = false,
    proceed = false,
    locationStatus = false,
    bankStatus = false;

  amount.addEventListener("input", () => {
    amount_status_func();
  });
  date.addEventListener("input", () => {
    date_status_func();
  });
  time.addEventListener("input", () => {
    time_status_func();
  });
  method.addEventListener("input", () => {
    log(method.value);
    if (method.value == "pickup") {
      location.style.display = "block";
      location_status_func();
    } else {
      location.style.display = "none";
    }
  });
  payment.addEventListener("input", () => {
    log(payment.value);
    if (payment.value == "bank") {
      bank.style.display = "block";
      bank_status_func();
    } else {
      bank.style.display = "none";
    }
  });

  btn.addEventListener("click", () => {
    if (!amount_status_func()) {
      amount.focus();
    }
    if (!date_status_func()) {
      date.focus();
    }
    if (!time_status_func()) {
      time.focus();
    }

    if (method.value == "pickup") location_status_func();

    if (payment.value == "bank") bank_status_func();

    if (amountStatus && dateStatus && timeStatus) {
      if (method.value == "pickup") {
        if (payment.value == "bank") {
          if (locationStatus && bankStatus) {
            proceed = true;
            var formData = {
              id: getCookie("id"),
              initial_amount: amount.value,
              payment_method: payment.value,
              supply_method: method.value,
              estate: location.value,
              date: date.value,
              time: time.value,
              account: bank.value,
            };
          }
        } else if (payment.value == "cash") {
          if (locationStatus) {
            proceed = true;
            var formData = {
              id: getCookie("id"),
              initial_amount: amount.value,
              payment_method: payment.value,
              supply_method: method.value,
              estate: location.value,
              date: date.value,
              time: time.value,
            };
          }
        }
      } else if (method.value == "yard") {
        if (payment.value == "bank") {
          if (bankStatus) {
            proceed = true;
            var formData = {
              id: getCookie("id"),
              initial_amount: amount.value,
              payment_method: payment.value,
              supply_method: method.value,
              date: date.value,
              time: time.value,
              account: bank.value,
            };
          }
        } else if (payment.value == "cash") {
          proceed = true;
          var formData = {
            id: getCookie("id"),
            initial_amount: amount.value,
            payment_method: payment.value,
            supply_method: method.value,
            date: date.value,
            time: time.value,
          };
        }
      }
      if (proceed) {
        log(formData);
        fetch(backProxy + "/collection", {
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
                console.log(data.message);
              });
              window.location.href = "./supply-view.html";
            } else if (response.status === 401) {
              response.json().then((data) => {
                console.log(data.message);
              });
              if (lang == "sin") Command: toastr["error"]("වලංගු නොවන පරිශීලක");
              else Command: toastr["error"]("Invalid User");
            } else if (response.status === 400) {
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
    }
  });

  fetch(backProxy + "/supply-request?id=" + getCookie("id"), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  })
    .then((response) => {
      if (response.status == 200) {
        response.json().then((data) => {
          amount.value = data.request.amount;
          method.value = data.request.method;
          payment.value = data.request.payment_method;
          date.value = data.request.date;
          time.value = data.request.time;

          if (data.request.method == "pickup") {
            if (lang == "sin") {
              dText.textContent = "රැගෙන යන දිනය";
              tText.textContent = "රැගෙන යන වේලාව";
            } else {
              dText.textContent = "Pickup Date";
              tText.textContent = "Pickup Time";
            }
            location.value = data.request.estate_id;
            location.style.display = "block";
          } else {
            if (lang == "sin") {
              dText.textContent = "ලබා දෙන දිනය";
              tText.textContent = "ලබා දෙන වේලාව";
            } else {
              dText.textContent = "Delivery Date";
              tText.textContent = "Delivery Time";
            }
          }

          if (data.request.payment_method == "bank") {
            bank.value = data.request.account_id;
            bank.style.display = "block";
          }
        });
      } else if (response.status === 202) {
        response.json().then((data) => {
          console.log(data.request);
          Command: toastr["error"](data.request);
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

  function amount_status_func() {
    if (typeof amount.value === "string" && amount.value.trim().length === 0) {
      if (lang == "sin") {
        amountError.textContent = "පොල් ප්‍රමාණය හිස් විය නොහැක";
        Command: toastr["warning"]("පොල් ප්‍රමාණය හිස් විය නොහැක");
      } else {
        amountError.textContent = "Coconut amount cannot be empty";
        Command: toastr["warning"]("Coconut amount cannot be empty");
      }
      amountStatus = false;
      return false;
    } else if (!checkInt(amount.value)) {
      if (lang == "sin") {
        amountError.textContent = "පොල් ප්‍රමාණය 0 ට වඩා වැඩි විය යුතුය";
        Command: toastr["warning"]("පොල් ප්‍රමාණය 0 ට වඩා වැඩි විය යුතුය");
      } else {
        amountError.textContent = "Coconut amount must be greater than 0";
        Command: toastr["warning"]("Coconut amount must be greater than 0");
      }
      amountStatus = false;
      return false;
    } else {
      amountError.textContent = "";
      amountStatus = true;
      return true;
    }
  }

  function date_status_func() {
    if (typeof date.value === "string" && date.value.trim().length === 0) {
      if (lang == "sin") {
        dateError.textContent = "දිනය හිස් විය නොහැක";
        Command: toastr["warning"]("දිනය හිස් විය නොහැක");
      } else {
        dateError.textContent = "Date cannot be empty";
        Command: toastr["warning"]("Date cannot be empty");
      }
      dateStatus = false;
      return false;
    } else if (!checkDate(date.value)) {
      if (lang == "sin") {
        dateError.textContent = "දිනය අනාගතයේ විය යුතුය";
        Command: toastr["warning"]("දිනය අනාගතයේ විය යුතුය");
      } else {
        dateError.textContent = "Date must be in the future";
        Command: toastr["warning"]("Date must be in the future");
      }
    } else {
      dateError.textContent = "";
      dateStatus = true;
      return true;
    }
  }

  function time_status_func() {
    if (typeof time.value === "string" && time.value.trim().length === 0) {
      if (lang == "sin") {
        timeError.textContent = "වේලාව හිස් විය නොහැක";
        Command: toastr["warning"]("වේලාව හිස් විය නොහැක");
      } else {
        timeError.textContent = "Time cannot be empty";
        Command: toastr["warning"]("Time cannot be empty");
      }
      timeStatus = false;
      return false;
    } else if (!checkTime(time.value)) {
      if (lang == "sin") {
        timeError.textContent = "වේලාව 08:00:AM සහ 05:00:PM අතර විය යුතුය";
        Command: toastr["warning"]("වේලාව 08:00:AM සහ 05:00:PM අතර විය යුතුය");
      } else {
        timeError.textContent = "Time must be between 08:00:AM and 05:00:PM";
        Command: toastr["warning"](
          "Time must be between 08:00:AM and 05:00:PM"
        );
      }
      timeStatus = false;
      return false;
    } else {
      timeError.textContent = "";
      timeStatus = true;
      return true;
    }
  }

  function location_status_func() {
    if (
      typeof location.value === "string" &&
      location.value.trim().length === 0
    ) {
      if (lang == "sin") {
        locationError.textContent = "ස්ථානය හිස් විය නොහැක";
        Command: toastr["warning"]("ස්ථානය හිස් විය නොහැක");
      } else {
        locationError.textContent = "Location cannot be empty";
        Command: toastr["warning"]("Location cannot be empty");
      }
      locationStatus = false;
      return false;
    } else {
      locationError.textContent = "";
      locationStatus = true;
      return true;
    }
  }

  function bank_status_func() {
    if (typeof bank.value === "string" && bank.value.trim().length === 0) {
      if (lang == "sin") {
        bankError.textContent = "බැංකුව හිස් විය නොහැක";
        Command: toastr["warning"]("බැංකුව හිස් විය නොහැක");
      } else {
        bankError.textContent = "Bank cannot be empty";
        Command: toastr["warning"]("Bank cannot be empty");
      }
      bankStatus = false;
      return false;
    } else {
      bankError.textContent = "";
      bankStatus = true;
      return true;
    }
  }
})();

function checkInt(num) {
  if (Number.isInteger(+num) && +num > 0) return true;
  return false;
}

function checkDate(date) {
  var selectedDate = new Date(date);
  var now = new Date();
  now.setDate(now.getDate() - 1);
  if (selectedDate > now) return true;
  else return false;
}

function checkTime(time) {
  var t = time.split(":");
  var hour = +t[0],
    min = +t[1];
  if (8 <= hour && 17 > hour) return true;
  else return false;
}
