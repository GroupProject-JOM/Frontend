// sessionStorage.removeItem("id");
document.cookie = "id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
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
  
    sin.addEventListener("click", () => {
      sin.classList.add("active");
      en.classList.remove("active");
  
      document.documentElement.setAttribute("lang", "sin");
      // sessionStorage.setItem("lang", "sin");
      document.cookie = "lang=sin; path=/";
  
      sTitle.textContent = data["sin"]["sTitle"];
      sText.innerHTML = data["sin"]["sText"];
      hname.placeholder = data["sin"]["hname"];
      accNum.placeholder = data["sin"]["accNum"];
      bank.placeholder = data["sin"]["bank"];
      btn.textContent = data["sin"]["btn"];
    });
  
    en.addEventListener("click", () => {
      en.classList.add("active");
      sin.classList.remove("active");
  
      document.documentElement.setAttribute("lang", "en");
      // sessionStorage.setItem("lang", "en");
      document.cookie = "lang=en; path=/";
  
      sTitle.textContent = data["en"]["sTitle"];
      sText.innerHTML = data["en"]["sText"];
      hname.placeholder = data["en"]["hname"];
      accNum.placeholder = data["en"]["accNum"];
      bank.placeholder = data["en"]["bank"];
      btn.textContent = data["en"]["btn"];
    });
  
    var data = {
      sin: {
        sTitle: "නව බැංකු ගිණුමක් එක් කරන්න",
        sText:
          "නව බැංකු ගිණුමක් සඳහා තොරතුරු එක් කරන්න. <br />ඔබට ඕනෑම වේලාවක උපකරණ පුවරුව > ගෙවීමේදී මෙම තොරතුරු සංස්කරණය කළ හැක",
        hname: "ගිණුම් හිමියාගේ නම",
        accNum: "ගිණුම් අංකය.",
        bank:"බැංකුව",
        btn: "එකතු කරන්න",
      },
      en: {
        sTitle: "Add New Bank Account",
        sText:
          "Add information for a new bank account. <br />You can edit these information any time at Dashboard > Payment",
        hname: "Account Holder Name",
        accNum: "Account No.",
        bank:"Bank",
        btn: "Add",
      },
    };
  
    var hnameStatus = false,
      accNumStatus = false,
      bankStatus = false;
  
    btn.addEventListener("click", () => {
      if (
        typeof bank.value === "string" &&
        bank.value.trim().length === 0
      ) {
        console.log("Bank cannot be empty");
        bank.focus();
      } else {
        bankStatus = true;
      }
  
      if (
        typeof accNum.value === "string" &&
        accNum.value.trim().length === 0
      ) {
        console.log("Account Number cannot be empty");
        accNum.focus();
      } else {
        accNumStatus = true;
      }
  
      if (typeof hname.value === "string" && hname.value.trim().length === 0) {
        console.log("Account holder name cannot be empty");
        hname.focus();
      } else {
        hnameStatus = true;
      }
  
      if (hnameStatus && accNumStatus && bankStatus) {
        var formData = {
          // supplier_id: sessionStorage.getItem("sId"),
          supplier_id: getCookie("sId"),
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
            console.log(response.status)
            if (response.status == 200) {
              response.json().then((data) => {
                console.log(data.message);
              });
              window.location.href = "./view-all.html";
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
  