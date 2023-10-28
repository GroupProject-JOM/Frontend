(() => {
    const body = document.querySelector("body"),
      sin = body.querySelector(".sin"),
      en = body.querySelector(".en"),
      fh = body.querySelector(".form-heading"),
      fht = body.querySelector(".form-heading-text"),
      hname = body.querySelector(".acc-holder-name"),
      acc = body.querySelector(".acc-no"),
      bank = body.querySelector(".bank"),
      next = body.querySelector(".next");

  
    sin.addEventListener("click", () => {
      sin.classList.add("active");
      en.classList.remove("active");
  
      document.documentElement.setAttribute("lang", "sin");
      // sessionStorage.setItem("lang", "sin");
      document.cookie="lang=sin; path=/";
  
      
      fh.textContent = data["sin"]["fh"];
      fht.innerHTML = data["sin"]["fht"];
      hname.placeholder = data["sin"]["hname"];
      acc.placeholder = data["sin"]["acc"];
      bank.placeholder = data["sin"]["bank"];
      next.textContent = data["sin"]["next"];
    });
  
    en.addEventListener("click", () => {
      en.classList.add("active");
      sin.classList.remove("active");
  
      document.documentElement.setAttribute("lang", "en");
      // sessionStorage.setItem("lang", "en");
      document.cookie="lang=en; path=/";
  
      
      fh.textContent = data["en"]["fh"];
      fht.innerHTML = data["en"]["fht"];
      hname.placeholder = data["en"]["hname"];
      acc.placeholder = data["en"]["acc"];
      bank.placeholder = data["en"]["bank"];
      next.textContent = data["en"]["next"];
    });
  
    var data = {
      sin: {
       
        fh: "ගෙවීම් තොරතුරු",
        fht: "ඔබගේ බැංකු ගිණුම් විස්තර එක් කරන්න. <br />ඔබට උපකරණ පුවරුව තුළ ගෙවීම් ක්‍රම සංස්කරණය කිරීමට හැකි වනු ඇත",
        hname: "ගිණුම් හිමියාගේ නම",
        acc: "ගිණුම් අංකය.",
        bank: "බැංකුව",
        next: "සුරකින්න",
      },
      en: {
        
        fh: "Payment Details",
        fht: "Add your bank account details. <br />You will be able to edit payment methods inside the dashboard",
        hname: "Account Holder Name",
        acc: "Account No.",
        bank: "Bank",
        next: "Save",
      },
    };
  
    checkLng();

    var accStatus = false,
    bankStatus = false,
    hnameStatus = false;

  next.addEventListener("click", () => {    
    if (
      typeof bank.value === "string" &&
      bank.value.trim().length === 0
      ) {
        console.log("Bank cannot be empty");
        bank.focus();
      } else {
        bankStatus = true;
      }
      
      if (typeof acc.value === "string" && acc.value.trim().length === 0) {
        console.log("Account number cannot be empty");
        acc.focus();
      } else {
        accStatus = true;
      }
      
      if (typeof hname.value === "string" && hname.value.trim().length === 0) {
        console.log("Holder name cannot be empty");
        hname.focus();
      } else {
        hnameStatus = true;
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
  