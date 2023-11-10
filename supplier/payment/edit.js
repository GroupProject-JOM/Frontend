(() => {
  const body = document.querySelector("body"),
    sin = body.querySelector(".sin"),
    en = body.querySelector(".en"),
    sTitle = body.querySelector(".supply-title"),
    sText = body.querySelector(".supply-text"),
    hname = body.querySelector(".acc-holders"),
    accNum = body.querySelector(".account-number"),
    bank = body.querySelector(".bank"),
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
    bank.textContent = data["sin"]["bank"];
    btn.textContent = data["sin"]["btn"];
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
    bank.textContent = data["en"]["bank"];
    btn.textContent = data["en"]["btn"];
  });

  var data = {
    sin: {
      sTitle: "බැංකු විස්තර සංස්කරණය කරන්න",
      sText: "ඔබගේ බැංකු ගිණුම් තොරතුරු සංස්කරණය කරන්න",
      hname: "ගිණුම් හිමියාගේ නම",
      accNum: "ගිණුම් අංකය.",
      bank: "බැංකුව",
      btn: "සුරකින්න",
    },
    en: {
      sTitle: "Edit Bank Details",
      sText: "Edit your bank account information",
      hname: "Account Holder Name",
      accNum: "Account No.",
      bank: "Bank",
      btn: "Save",
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
        // id: sessionStorage.getItem("id"),
        // supplier_id: sessionStorage.getItem("sId"),
        id: getCookie("id"),
        supplier_id: getCookie("sId"),
        name: hname.value,
        account_number: accNum.value,
        bank: bank.value,
      };

      fetch(backProxy + "/account", {
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
            window.location.href = "./view.html";
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

  //Get data
  fetch(
    backProxy +
      "/account?sId=" +
      // sessionStorage.getItem("sId") +
      getCookie("sId") +
      "&id=" +
      // sessionStorage.getItem("id"),
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
          console.log(data.account);
          hname.value = data.account.name;
          accNum.value = data.account.account_number;
          bank.value = data.account.bank;
        });
      } else if (response.status === 202) {
        response.json().then((data) => {
          console.log(data.account);
          Command: toastr["error"](data.account);
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
})();
