(() => {
  const body = document.querySelector("body"),
    sin = body.querySelector(".sin"),
    en = body.querySelector(".en"),
    sTitle = body.querySelector(".supply-title"),
    tText = body.querySelector(".top-text"),
    bText = body.querySelector(".bottom-text"),
    date = body.querySelector(".date"),
    dateError = body.querySelector(".date-error"),
    time = body.querySelector(".time"),
    timeError = body.querySelector(".time-error"),
    address = body.querySelector(".cAddress"),
    btn = body.querySelector(".form-button");

  let lang = getCookie("lang"); // current language

  sin.addEventListener("click", () => {
    sin.classList.add("active");
    en.classList.remove("active");

    document.documentElement.setAttribute("lang", "sin");
    //   sessionStorage.setItem("lang", "sin");
    document.cookie = "lang=sin; path=/";
    lang = "sin";

    sTitle.textContent = data["sin"]["sTitle"];
    tText.innerHTML = data["sin"]["tText"];
    bText.innerHTML = data["sin"]["bText"];
    date.placeholder = data["sin"]["date"];
    time.placeholder = data["sin"]["time"];
    address.innerHTML = data["sin"]["address"];
    btn.textContent = data["sin"]["btn"];
    setGreeting();
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
    bText.innerHTML = data["en"]["bText"];
    date.placeholder = data["en"]["date"];
    time.placeholder = data["en"]["time"];
    address.innerHTML = data["en"]["address"];
    btn.textContent = data["en"]["btn"];
    setGreeting();
  });

  var data = {
    sin: {
      sTitle: "නව සැපයුම",
      tText:
        "ඔබගේ නව සැපයුම් ඉල්ලීම සඳහා විස්තර නිවැරදිව පුරවන්න. <br />ඉල්ලීම් පැය 24ක් ඇතුළත සමාලෝචනය කෙරේ. ඔබට ඒවා ඔබේ උපකරණ පුවරුව තුළ පරීක්ෂා කළ හැකිය.",
      bText: "එකතු කරන ලද පොල් එකතු කිරීම මත මුදල් ගෙවීමක් සිදු කරනු ලැබේ.",
      date: "දිනය",
      time: "වෙලාව",
      address:
        "කරුණාකර මෙම ස්ථානයට පොල් ලබා දෙන්න: <br> <br> <br><span class='supply-address supply-text'>ජයසිංහ තෙල් මිල්ස්, <br> අංක 105, රවිට පාර, වෙල්පල්ල, ශ්‍රී ලංකාව. <br><br></span>",
      btn: "ඉල්ලීම ඉදිරිපත් කරන්න",
    },
    en: {
      sTitle: "New Supply",
      tText:
        "Fill up the details correctly for your new supply request. <br />Requests will be reviewed within 24 hours. You can check them inside  your dashboard.",
      bText:
        "A cash payment for the collected coconuts will be made upon the collection. ",
      date: "feasible date",
      time: "feasible time",
      address:
        "Please deliver the coconuts to this location: <br> <br> <br><span class='supply-address supply-text'>Jayasinghe Oil Mills, <br> No 105, Ravita Road, Welpalla, Sri Lanka. <br><br></span>",
      btn: "Submit Request",
    },
  };

  var dateStatus = false,
    timeStatus = false;

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

    var dateTime = false;
    var selected_time = new Date(date.value + " " + time.value);
    var now = new Date();

    if (selected_time > now) dateTime = true;
    else {
      if (lang == "sin") {
        timeError.textContent = "කාලය අනාගතයේ විය යුතුය";
        Command: toastr["error"]("කාලය අනාගතයේ විය යුතුය");
      } else {
        time.textContent = "Time must be in future";
        Command: toastr["error"]("Time must be in future");
      }
    }

    if (dateStatus && timeStatus && dateTime) {
      var formData = {
        collection_id: getCookie("id"),
        supplier_id: getCookie("sId"),
        date: date.value,
        time: time.value,
      };
      fetch(backProxy + "/yard", {
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
    } else if (checkTwoWeeks(date.value)) {
      if (lang == "sin") {
        dateError.textContent = "දිනය ඉදිරි සති දෙක තුළ විය යුතුය";
        Command: toastr["warning"]("දිනය ඉදිරි සති දෙක තුළ විය යුතුය");
      } else {
        dateError.textContent = "The date should be within the next two weeks";
        Command: toastr["warning"](
          "The date should be within the next two weeks"
        );
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

function checkTwoWeeks(date) {
  var selectedDate = new Date(date);
  var now = new Date();
  now.setDate(now.getDate() + 14);
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
