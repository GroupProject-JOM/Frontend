// sessionStorage.removeItem("id");
document.cookie = "id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
(() => {
  const body = document.querySelector("body"),
    sin = body.querySelector(".sin"),
    en = body.querySelector(".en"),
    sTitle = body.querySelector(".supply-title"),
    sText = body.querySelector(".supply-text"),
    hname = body.querySelector(".acc-holders"),
    holderError = body.querySelector(".holder-error"),
    accNum = body.querySelector(".account-number"),
    accError = body.querySelector(".acc-error"),
    bank = body.querySelector(".bank"),
    bankError = body.querySelector(".bank-error"),
    btn = body.querySelector(".form-button");

  var lang = getCookie("lang"); // current language

  sin.addEventListener("click", () => {
    sin.classList.add("active");
    en.classList.remove("active");

    document.documentElement.setAttribute("lang", "sin");
    // sessionStorage.setItem("lang", "sin");
    document.cookie = "lang=sin; path=/";
    lang = "sin";

    sTitle.textContent = data["sin"]["sTitle"];
    sText.innerHTML = data["sin"]["sText"];
    hname.placeholder = data["sin"]["hname"];
    accNum.placeholder = data["sin"]["accNum"];
    bank.placeholder = data["sin"]["bank"];
    btn.textContent = data["sin"]["btn"];
    setGreeting();
  });

  en.addEventListener("click", () => {
    en.classList.add("active");
    sin.classList.remove("active");

    document.documentElement.setAttribute("lang", "en");
    // sessionStorage.setItem("lang", "en");
    document.cookie = "lang=en; path=/";
    lang = "en";

    sTitle.textContent = data["en"]["sTitle"];
    sText.innerHTML = data["en"]["sText"];
    hname.placeholder = data["en"]["hname"];
    accNum.placeholder = data["en"]["accNum"];
    bank.placeholder = data["en"]["bank"];
    btn.textContent = data["en"]["btn"];
    setGreeting();
  });

  var data = {
    sin: {
      sTitle: "නව බැංකු ගිණුමක් එක් කරන්න",
      sText:
        "නව බැංකු ගිණුමක් සඳහා තොරතුරු එක් කරන්න. <br />ඔබට ඕනෑම වේලාවක උපකරණ පුවරුව > ගෙවීමේදී මෙම තොරතුරු සංස්කරණය කළ හැක",
      hname: "ගිණුම් හිමියාගේ නම",
      accNum: "ගිණුම් අංකය.",
      bank: "බැංකුව",
      btn: "එකතු කරන්න",
    },
    en: {
      sTitle: "Add New Bank Account",
      sText:
        "Add information for a new bank account. <br />You can edit these information any time at Dashboard > Payment",
      hname: "Account Holder Name",
      accNum: "Account No.",
      bank: "Bank",
      btn: "Add",
    },
  };

  var hnameStatus = false,
    accNumStatus = false,
    bankStatus = false;

  function hname_status() {
    if (typeof hname.value === "string" && hname.value.trim().length === 0) {
      if (lang == "sin") holderError.textContent = "දරන්නාගේ නම හිස් විය නොහැක";
      else holderError.textContent = "Holder name cannot be empty";
      hnameStatus = false;
      return false;
    } else {
      holderError.textContent = "";
      hnameStatus = true;
      return true;
    }
  }

  function acc_status() {
    if (typeof accNum.value === "string" && accNum.value.trim().length === 0) {
      if (lang == "sin") accError.textContent = "ගිණුම් අංකය හිස් විය නොහැක";
      else accError.textContent = "Account number cannot be empty";
      accNumStatus = false;
      return false;
    } else {
      accError.textContent = "";
      accNumStatus = true;
      return true;
    }
  }

  function bank_status() {
    if (typeof bank.value === "string" && bank.value.trim().length === 0) {
      if (lang == "sin") bankError.textContent = "බැංකුව හිස් විය නොහැක";
      else bankError.textContent = "Bank cannot be empty";
      bankStatus = false;
      return false;
    } else {
      bankError.textContent = "";
      bankStatus = true;
      return true;
    }
  }

  hname.addEventListener("input", () => {
    hname_status();
  });
  accNum.addEventListener("input", () => {
    acc_status();
  });
  bank.addEventListener("input", () => {
    bank_status();
  });

  btn.addEventListener("click", () => {
    if (!bank_status()) {
      bank.focus();
    }
    if (!acc_status()) {
      accNum.focus();
    }
    if (!hname_status()) {
      hname.focus();
    }

    if (hnameStatus && accNumStatus && bankStatus) {
      var formData = {
        name: hname.value,
        account_number: accNum.value,
        bank: bank.value,
      };
      fetch(backProxy + "/account", {
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
            window.location.href = "./view-all.html";
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
})();
