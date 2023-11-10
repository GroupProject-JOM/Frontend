var accStatus = false,
bankStatus = false,
hnameStatus = false,
lang = getCookie("lang"); // current language

(() => {
    const body = document.querySelector("body"),
      sin = body.querySelector(".sin"),
      en = body.querySelector(".en"),
      fh = body.querySelector(".form-heading"),
      fht = body.querySelector(".form-heading-text"),
      hname = body.querySelector(".acc-holder-name"),
      holderError = body.querySelector(".holder-error"),
      acc = body.querySelector(".acc-no"),
      accError = body.querySelector(".acc-error"),
      bank = body.querySelector(".bank"),
      bankError = body.querySelector(".bank-error"),
      next = body.querySelector(".next"),
      skip = body.querySelector(".skip");
  
    sin.addEventListener("click", () => {
      sin.classList.add("active");
      en.classList.remove("active");
  
      document.documentElement.setAttribute("lang", "sin");
      // sessionStorage.setItem("lang", "sin");
      document.cookie="lang=sin; path=/";
      lang = "sin";  
      
      fh.textContent = data["sin"]["fh"];
      fht.innerHTML = data["sin"]["fht"];
      hname.placeholder = data["sin"]["hname"];
      acc.placeholder = data["sin"]["acc"];
      bank.placeholder = data["sin"]["bank"];
      next.textContent = data["sin"]["next"];
      skip.textContent = data["sin"]["skip"];

    });
  
    en.addEventListener("click", () => {
      en.classList.add("active");
      sin.classList.remove("active");
  
      document.documentElement.setAttribute("lang", "en");
      // sessionStorage.setItem("lang", "en");
      document.cookie="lang=en; path=/";
      lang = "en";
      
      fh.textContent = data["en"]["fh"];
      fht.innerHTML = data["en"]["fht"];
      hname.placeholder = data["en"]["hname"];
      acc.placeholder = data["en"]["acc"];
      bank.placeholder = data["en"]["bank"];
      next.textContent = data["en"]["next"];
      skip.textContent = data["en"]["skip"];

    });
  
    var data = {
      sin: {
       
        fh: "ගෙවීම් තොරතුරු",
        fht: "ඔබගේ බැංකු ගිණුම් විස්තර එක් කරන්න. <br />ඔබට උපකරණ පුවරුව තුළ ගෙවීම් ක්‍රම සංස්කරණය කිරීමට හැකි වනු ඇත",
        hname: "ගිණුම් හිමියාගේ නම",
        acc: "ගිණුම් අංකය.",
        bank: "බැංකුව",
        next: "සුරකින්න",
        skip: "මඟ හරින්න",
      },
      en: {
        
        fh: "Payment Details",
        fht: "Add your bank account details. <br />You will be able to edit payment methods inside the dashboard",
        hname: "Account Holder Name",
        acc: "Account No.",
        bank: "Bank",
        next: "Save",
        skip: "Skip",
      },
    };

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
      if (
        typeof acc.value === "string" &&
        acc.value.trim().length === 0
      ) {
        if (lang == "sin") accError.textContent = "ගිණුම් අංකය හිස් විය නොහැක";
        else accError.textContent = "Account number cannot be empty";
        accStatus = false;
        return false;
      } else {
        accError.textContent = "";
        accStatus = true;
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
    acc.addEventListener("input", () => {
      acc_status();
    });
    bank.addEventListener("input", () => {
      bank_status();
    });

  next.addEventListener("click", () => {    
    if (!bank_status()) {
      bank.focus();
    }
    if (!acc_status()) {
      acc.focus();
    }
    if (!hname_status()) {
      hname.focus();
    }

    if (accStatus && bankStatus && hnameStatus) {
      var formData = {
        // supplier_id: sessionStorage.getItem("sId"),
        supplier_id: getCookie("sId"),
        name: hname.value,
        account_number: acc.value,
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
          if (response.status == 200) {
            response.json().then((data) => {
              console.log(data.message);
            });
            // sessionStorage.removeItem("sId");
            document.cookie = "sId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/signup";
            window.location.href = frontProxy + "/signup/signup5.html";
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
  