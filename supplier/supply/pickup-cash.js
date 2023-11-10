(() => {
  const body = document.querySelector("body"),
    sin = body.querySelector(".sin"),
    en = body.querySelector(".en"),
    sTitle = body.querySelector(".supply-title"),
    tText = body.querySelector(".top-text"),
    location = body.querySelector(".location"),
    locationError = body.querySelector(".location-error"),
    date = body.querySelector(".date"),
    dateError = body.querySelector(".date-error"),
    time = body.querySelector(".time"),
    timeError = body.querySelector(".time-error"),
    bText = body.querySelector(".bottom-text"),
    btn = body.querySelector(".form-button");

  let lop;

  var location_options =
      "<option value='' disabled selected hidden class='lop'></option>",
    lang = getCookie("lang"); // current language

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
        if (lang == "sin") location_options += "<option value='' disabled>වතු නැත</option>";
          else location_options += "<option value='' disabled>No Estates</option>";
        location.innerHTML = location_options;
      }
    })
    .catch((error) => {
      console.error("An error occurred:", error);
      Command: toastr["error"](error);
    });

  sin.addEventListener("click", () => {
    sin.classList.add("active");
    en.classList.remove("active");

    document.documentElement.setAttribute("lang", "sin");
    //   sessionStorage.setItem("lang", "sin");
    document.cookie = "lang=sin; path=/";
    lang = "sin";

    sTitle.textContent = data["sin"]["sTitle"];
    tText.innerHTML = data["sin"]["tText"];
    lop.textContent = data["sin"]["lop"];
    date.placeholder = data["sin"]["date"];
    time.placeholder = data["sin"]["time"];
    bText.innerHTML = data["sin"]["bText"];
    btn.textContent = data["sin"]["btn"];
  });

  en.addEventListener("click", () => {
    en.classList.add("active");
    sin.classList.remove("active");

    document.documentElement.setAttribute("lang", "en");
    //   sessionStorage.setItem("lang", "en");
    document.cookie = "lang=en; path=/";
    lang = "en";

    sTitle.textContent = data["en"]["sTitle"];
    tText.innerHTML = data["en"]["tText"];
    lop.textContent = data["en"]["lop"];
    date.placeholder = data["en"]["date"];
    time.placeholder = data["en"]["time"];
    bText.innerHTML = data["en"]["bText"];
    btn.textContent = data["en"]["btn"];
  });

  var data = {
    sin: {
      sTitle: "නව සැපයුම",
      tText:
        "ඔබගේ නව සැපයුම් ඉල්ලීම සඳහා විස්තර නිවැරදිව පුරවන්න. <br />ඉල්ලීම් පැය 24ක් ඇතුළත සමාලෝචනය කෙරේ. ඔබට ඒවා ඔබේ උපකරණ පුවරුව තුළ පරීක්ෂා කළ හැකිය.",
      lop: "වතුයායේ ස්ථානය",
      date: "දිනය",
      time: "වෙලාව",
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
      bText:
        "A cash payment for the collected coconuts will be made upon the collection. <br> Please help our collectors to validate the coconut amount.",
      btn: "Submit Request",
    },
  };

  var locationStatus = false,
    dateStatus = false,
    timeStatus = false;

    location.addEventListener("input", () => {
      location_status_func();
    });
    date.addEventListener("input", () => {
      date_status_func();
    });
    time.addEventListener("input", () => {
      time_status_func();
    });

  btn.addEventListener("click", () => {
    if (!time_status_func()) {
      time.focus();
    }
    if (!date_status_func()) {
      date.focus();
    }
    if (!location_status_func()) {
      location.focus();
    }

    if (locationStatus && dateStatus && timeStatus) {
      var formData = {
        //   collection_id: sessionStorage.getItem("id"),
        //   supplier_id: sessionStorage.getItem("sId"),
        collection_id: getCookie("id"),
        supplier_id: getCookie("sId"),
        estate_id: location.value,
        date: date.value,
        time: time.value,
      };
      fetch(backProxy + "/pickup", {
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
            window.location.href = "../";
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
  });

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