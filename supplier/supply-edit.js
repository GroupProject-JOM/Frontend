(() => {
  const body = document.querySelector("body"),
    sin = body.querySelector(".sin"),
    en = body.querySelector(".en"),
    sTitle = body.querySelector(".supply-title"),
    sText = body.querySelector(".supply-text"),
    aText = body.querySelector(".amount-text"),
    amount = body.querySelector(".collected-amount"),
    amountError = body.querySelector(".coco-error"),
    mText = body.querySelector(".method-text"),
    op0 = body.querySelector(".op0"),
    op1 = body.querySelector(".op1"),
    op2 = body.querySelector(".op2"),
    pText = body.querySelector(".payment-text"),
    op3 = body.querySelector(".op3"),
    op4 = body.querySelector(".op4"),
    op5 = body.querySelector(".op5"),
    dText = body.querySelector(".date-text"),
    date = body.querySelector(".date"),
    dateError = body.querySelector(".date-error"),
    tText = body.querySelector(".time-text"),
    time = body.querySelector(".time"),
    timeError = body.querySelector(".time-error"),
    method = body.querySelector(".method"),
    location = body.querySelector(".location"),
    locationError = body.querySelector(".location-error"),
    collectionError = body.querySelector(".collection-error"),
    payment = body.querySelector(".payment"),
    bank = body.querySelector(".bank"),
    bankError = body.querySelector(".bank-error"),
    paymentError = body.querySelector(".payment-error");

  var lang = getCookie("lang"); // current language

  sin.addEventListener("click", () => {
    sin.classList.add("active");
    en.classList.remove("active");

    document.documentElement.setAttribute("lang", "sin");
    document.cookie = "lang=sin; path=/";
    lang = "sin";

    sTitle.textContent = data["sin"]["sTitle"];
    sText.textContent = data["sin"]["sText"];
    aText.textContent = data["sin"]["aText"];
    amount.placeholder = data["sin"]["amount"];
    mText.textContent = data["sin"]["mText"];
    op0.textContent = data["sin"]["op0"];
    op1.textContent = data["sin"]["op1"];
    op2.textContent = data["sin"]["op2"];
    pText.textContent = data["sin"]["pText"];
    op3.textContent = data["sin"]["op3"];
    op4.textContent = data["sin"]["op4"];
    op5.textContent = data["sin"]["op5"];
    lop.textContent = data["sin"]["lop"];
    bop.textContent = data["sin"]["bop"];
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
    aText.textContent = data["en"]["aText"];
    amount.placeholder = data["en"]["amount"];
    mText.textContent = data["en"]["mText"];
    op0.textContent = data["en"]["op0"];
    op1.textContent = data["en"]["op1"];
    op2.textContent = data["en"]["op2"];
    pText.textContent = data["en"]["pText"];
    op3.textContent = data["en"]["op3"];
    op4.textContent = data["en"]["op4"];
    op5.textContent = data["en"]["op5"];
    lop.textContent = data["en"]["lop"];
    bop.textContent = data["en"]["bop"];
    setGreeting();
  });

  var data = {
    sin: {
      sTitle: "සැපයුම සංස්කරණය කරන්න",
      sText: "ඔබගේ සැපයුම් ඉල්ලීම් විස්තර සංස්කරණය කරන්න",
      aText: "පොල් ප්‍රමාණය",
      amount: "පොල් ප්‍රමාණය ඇතුළත් කරන්න",
      mText: "සැපයුම් ක්රමය",
      op0: "සැපයුම් ක්‍රමය තෝරන්න",
      op1: "වත්තෙන් පිකප්",
      op2: "අංගනයට භාර දෙනු ලැබේ",
      pText: "ගෙවීම්",
      op3: "ගෙවීම් ක්‍රමය තෝරන්න",
      op4: "පිකප් මත මුදල්",
      op5: "බැංකුවට මාරු කරන්න",
      lop: "වතුයායේ ස්ථානය",
      bop: "බැංකු ගිණුම",
    },
    en: {
      sTitle: "Edit Supply",
      sText: "Edit your supply request details",
      aText: "Coconut Amount",
      amount: "Enter coconut amount",
      mText: "Supply Method",
      op0: "Select supply method",
      op1: "Pickup from estate",
      op2: "Delivered to yard",
      pText: "Payment method",
      op3: "Select payment method",
      op4: "Cash on pickup",
      op5: "Transfer to bank",
      lop: "Estate Location",
      bop: "Bank Account",
    },
  };

  let lop, bop;

  var location_options =
      "<option value='' disabled selected hidden class='lop'></option>",
    bank_options =
      "<option value='' disabled selected hidden class='bop'></option>";

  // Get estates
  fetch(backProxy + "/estates?sId=" + getCookie("sId"), {
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
            location_options += "<option value='' disabled>වතු නැත</option>";
            Command: toastr["info"]("වතු නැත");
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
          location_options += "<option value='' disabled>වතු නැත</option>";
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
  fetch(backProxy + "/accounts?sId=" + getCookie("sId"), {
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
    amountStatus = false;

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
    if(method.value == 'pickup'){      
      location.style.display = "block";
    }else{      
      location.style.display = "none";
    }
  });
  payment.addEventListener("input", () => {
    log(payment.value);
    if(payment.value == 'bank'){      
      bank.style.display = "block";
    }else{      
      bank.style.display = "none";
    }
  });

  fetch(
    backProxy +
      "/collection?sId=" +
      getCookie("sId") +
      "&id=" +
      getCookie("id"),
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  )
    .then((response) => {
      if (response.status == 200) {
        response.json().then((data) => {
          log(data);
          amount.value = data.collection.init_amount;
          method.value = data.collection.sMethod;
          payment.value = data.collection.pMethod;
          date.value = data.collection.date;
          time.value = data.collection.time;

          if (data.collection.sMethod == "pickup") {
            if (lang == "sin") {
              dText.textContent = "රැගෙන යන දිනය";
              tText.textContent = "රැගෙන යන කාලය";
            } else {
              dText.textContent = "Pickup Date";
              tText.textContent = "Pickup Time";
            }
            location.value = data.collection.estate;
            location.style.display = "block";
          } else {
            if (lang == "sin") {
              dText.textContent = "බෙදාහැරීමේ දිනය";
              tText.textContent = "බෙදාහැරීමේ කාලය";
            } else {
              dText.textContent = "Delivery Date";
              tText.textContent = "Delivery Time";
            }
          }

          if (data.collection.pMethod == "bank") {
            bank.value = data.collection.account;
            bank.style.display = "block";
          }
        });
      } else if (response.status === 202) {
        response.json().then((data) => {
          console.log(data.collection);
          Command: toastr["error"](data.collection);
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
        amountError.textContent = "පොල් ප්‍රමාණය ධන නිඛිල විය යුතුය";
        Command: toastr["warning"]("පොල් ප්‍රමාණය ධන නිඛිල විය යුතුය");
      } else {
        amountError.textContent = "Coconut amount must be positive integer";
        Command: toastr["warning"]("Coconut amount must be positive integer");
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
        timeError.textContent = "කාලය හිස් විය නොහැක";
        Command: toastr["warning"]("කාලය හිස් විය නොහැක");
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
