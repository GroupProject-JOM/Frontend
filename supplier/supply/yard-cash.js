(() => {
  const body = document.querySelector("body"),
    sin = body.querySelector(".sin"),
    en = body.querySelector(".en"),
    sTitle = body.querySelector(".supply-title"),
    tText = body.querySelector(".top-text"),
    date = body.querySelector(".date"),
    time = body.querySelector(".time"),
    btn = body.querySelector(".form-button");

  sin.addEventListener("click", () => {
    sin.classList.add("active");
    en.classList.remove("active");

    document.documentElement.setAttribute("lang", "sin");
    //   sessionStorage.setItem("lang", "sin");
    document.cookie = "lang=sin; path=/";

    sTitle.textContent = data["sin"]["sTitle"];
    tText.innerHTML = data["sin"]["tText"];
    date.placeholder = data["sin"]["date"];
    time.placeholder = data["sin"]["time"];
    btn.textContent = data["sin"]["btn"];
  });

  en.addEventListener("click", () => {
    en.classList.add("active");
    sin.classList.remove("active");

    document.documentElement.setAttribute("lang", "en");
    //   sessionStorage.setItem("lang", "en");
    document.cookie = "lang=en; path=/";

    sTitle.textContent = data["en"]["sTitle"];
    tText.innerHTML = data["en"]["tText"];
    date.placeholder = data["en"]["date"];
    time.placeholder = data["en"]["time"];
    btn.textContent = data["en"]["btn"];
  });

  var data = {
    sin: {
      sTitle: "නව සැපයුම",
      tText:
        "ඔබගේ නව සැපයුම් ඉල්ලීම සඳහා විස්තර නිවැරදිව පුරවන්න. <br />ඉල්ලීම් පැය 24ක් ඇතුළත සමාලෝචනය කෙරේ. ඔබට ඒවා ඔබේ උපකරණ පුවරුව තුළ පරීක්ෂා කළ හැකිය.",
      date: "දිනය",
      time: "වෙලාව",
      btn: "ඉල්ලීම ඉදිරිපත් කරන්න",
    },
    en: {
      sTitle: "New Supply",
      tText:
        "Fill up the details correctly for your new supply request. <br />Requests will be reviewed within 24 hours. You can check them inside  your dashboard.",
      date: "feasible date",
      time: "feasible time",
      btn: "Submit Request",
    },
  };

  btn.addEventListener("click", () => {
    var dateStatus = false,
      timeStatus = false;

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

    if (dateStatus && timeStatus) {
      var formData = {
        // collection_id: sessionStorage.getItem("id"),
        // supplier_id: sessionStorage.getItem("sId"),
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
