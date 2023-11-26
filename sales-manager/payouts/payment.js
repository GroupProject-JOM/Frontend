document.cookie = "id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";

(() => {
  const body = document.querySelector("body"),
    sin = body.querySelector(".sin"),
    en = body.querySelector(".en"),
    sTitle = body.querySelector(".salesmg-title"),
    sName = body.querySelector(".sName"),
    sMethod = body.querySelector(".sMethod"),
    dText = body.querySelector(".date-text"),
    date = body.querySelector(".date"),
    amount = body.querySelector(".amount"),
    payment = body.querySelector(".payment"),
    pMethod = body.querySelector(".pMethod"),
    hNameRow = body.querySelector(".hName-row"),
    hName = body.querySelector(".hName"),
    accountRow = body.querySelector(".account-row"),
    account = body.querySelector(".account"),
    bankRow = body.querySelector(".bank-row"),
    bank = body.querySelector(".bank"),
    btn = body.querySelector(".form-button");

    var lang = getCookie("lang"); // current language

  sin.addEventListener("click", () => {
    sin.classList.add("active");
    en.classList.remove("active");

    document.documentElement.setAttribute("lang", "sin");
    document.cookie = "lang=sin; path=/";
    lang = "sin";

    sTitle.textContent = data["sin"]["sTitle"];
    btn.textContent = data["sin"]["btn"];
    setGreeting();
  });

  en.addEventListener("click", () => {
    en.classList.add("active");
    sin.classList.remove("active");

    document.documentElement.setAttribute("lang", "en");
    document.cookie = "lang=en; path=/";
    lang = "en";

    sTitle.textContent = data["en"]["sTitle"];
    btn.textContent = data["en"]["btn"];
    setGreeting();
  });

  var data = {
    sin: {
      sTitle: "ගෙවීම් තොරතුරු",
      btn: "ගෙවීම අවසන්",
    },
    en: {
      sTitle: "Payment Details",
      btn: "Payment Completed",
    },
  };

  fetch(
    backProxy +
      "/payout?id=" +
      getCookie("id") +
      "&sId=" +
      getCookie("user"),
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
          log(data.payout);
        });
      } else if (response.status === 202) {
        response.json().then((data) => {
          console.log(data.payout);
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
