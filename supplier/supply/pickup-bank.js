(() => {
  const body = document.querySelector("body"),
    sin = body.querySelector(".sin"),
    en = body.querySelector(".en"),
    sTitle = body.querySelector(".supply-title"),
    tText = body.querySelector(".top-text"),
    location = body.querySelector(".location"),
    lop = body.querySelector(".lop"),
    date = body.querySelector(".date"),
    time = body.querySelector(".time"),
    bank = body.querySelector(".bank"),
    bop = body.querySelector(".bop"),
    bText = body.querySelector(".bottom-text"),
    btn = body.querySelector(".form-button");

  sin.addEventListener("click", () => {
    sin.classList.add("active");
    en.classList.remove("active");

    document.documentElement.setAttribute("lang", "sin");
    sessionStorage.setItem("lang", "sin");

    sTitle.textContent = data["sin"]["sTitle"];
    tText.innerHTML = data["sin"]["tText"];
    lop.textContent = data["sin"]["lop"];
    date.placeholder = data["sin"]["date"];
    time.placeholder = data["sin"]["time"];
    bop.textContent = data["sin"]["bop"];
    bText.innerHTML = data["sin"]["bText"];
    btn.textContent = data["sin"]["btn"];
  });

  en.addEventListener("click", () => {
    en.classList.add("active");
    sin.classList.remove("active");

    document.documentElement.setAttribute("lang", "en");
    sessionStorage.setItem("lang", "en");

    sTitle.textContent = data["en"]["sTitle"];
    tText.innerHTML = data["en"]["tText"];
    lop.textContent = data["en"]["lop"];
    date.placeholder = data["en"]["date"];
    time.placeholder = data["en"]["time"];
    bop.textContent = data["en"]["bop"];
    bText.innerHTML = data["en"]["bText"];
    btn.textContent = data["en"]["btn"];
  });

  var data = {
    sin: {
      sTitle: "නව සැපයුම",
      tText:
        "ඔබගේ නව සැපයුම් ඉල්ලීම සඳහා විස්තර නිවැරදිව පුරවන්න. <br />ඉල්ලීම් පැය 24ක් ඇතුළත සමාලෝචනය කෙරේ. ඔබට ඒවා ඔබේ උපකරණ පුවරුව තුළ පරීක්ෂා කළ හැකිය.",
      lop: "වතු ස්ථානය",
      date: "හැකි දිනය",
      time: "හැකි කාලය",
      bop: "බැංකු ගිණුම",
      bText:
        "එකතු කරන ලද පොල් එකතු කිරීම මත මුදල් ගෙවීමක් සිදු කරනු ලැබේ. <br> කරුණාකර පොල් ප්‍රමාණය වලංගු කිරීමට අපගේ එකතුකරන්නන්ට උදවු කරන්න.",
      btn: "ඉල්ලීම ඉදිරිපත් කරන්න",
    },
    en: {
      sTitle: "New Supply",
      tText:
        "Fill up the details correctly for your new supply request. <br />Requests will be reviewed within 24 hours. You can check them inside  your dashboard.",
      lop: "Estate Location",
      date: "feasible date",
      time: "feasible time",
      bop: "Bank Account",
      bText:
        "A cash payment for the collected coconuts will be made upon the collection. <br> Please help our collectors to validate the coconut amount.",
      btn: "Submit Request",
    },
  };

  var locationStatus = false,
    dateStatus = false,
    timeStatus = false,
    bankStatus = false;

  btn.addEventListener("click", () => {
    if (
      typeof location.value === "string" &&
      location.value.trim().length === 0
    ) {
      console.log("Location cannot be empty");
      location.focus();
    } else {
      locationStatus = true;
    }

    if (typeof date.value === "string" && date.value.trim().length === 0) {
      console.log("Date cannot be empty");
      date.focus();
    } else {
      dateStatus = true;
    }

    if (typeof time.value === "string" && time.value.trim().length === 0) {
      console.log("Time cannot be empty");
      time.focus();
    } else {
      timeStatus = true;
    }

    if (typeof bank.value === "string" && bank.value.trim().length === 0) {
      console.log("Bank cannot be empty");
      bank.focus();
    } else {
      bankStatus = true;
    }

    if (locationStatus && dateStatus && timeStatus && bankStatus) {
      var formData = {
        collection_id: sessionStorage.getItem("id"),
        supplier_id: sessionStorage.getItem("sId"),
        estate_id: location.value,
        date: date.value,
        time: time.value,
        account_id: bank.value,
      };
      console.log(formData);
      fetch(backProxy + "/pickup-bank", {
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
              console.log(data.message);
            });
          } else if (response.status === 400) {
            response.json().then((data) => {
              console.log(data.message);
            });
          } else {
            console.error("Error:", response.status);
          }
        })
        .catch((error) => {
          console.error("An error occurred:", error);
        });
    }
  });
})();
