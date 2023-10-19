(() => {
    const body = document.querySelector("body"),
      sin = body.querySelector(".sin"),
      en = body.querySelector(".en"),
      sTitle = body.querySelector(".supply-title"),
      tText = body.querySelector(".top-text"),
      bank = body.querySelector(".bank");
      
      var bop;
    var bank_options =
      "<option value='' disabled selected hidden class='bop'></option>";
    // fetch(backProxy + "/accounts?sId=" + sessionStorage.getItem("sId"), {
    fetch(backProxy + "/accounts?sId=" + getCookie("sId"), {
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
              bank_options +=
                "<option value=" + item.id + ">" + item.name + "</option>";
            }
            bank.innerHTML = bank_options;
            bop = body.querySelector(".bop");
          });
        } else if (response.status === 202) {
          response.json().then((data) => {
            console.log(data.size);
          });
        } else {
          console.error("Error:", response.status);
        }
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  
    const bText = body.querySelector(".bottom-text"),
      btn = body.querySelector(".form-button");
  
    sin.addEventListener("click", () => {
      sin.classList.add("active");
      en.classList.remove("active");
  
      document.documentElement.setAttribute("lang", "sin");
    //   sessionStorage.setItem("lang", "sin");
    document.cookie = "lang=sin; path=/";
  
      sTitle.textContent = data["sin"]["sTitle"];
      tText.innerHTML = data["sin"]["tText"];
      bop.textContent = data["sin"]["bop"];
      bText.innerHTML = data["sin"]["bText"];
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
      bop.textContent = data["en"]["bop"];
      bText.innerHTML = data["en"]["bText"];
      btn.textContent = data["en"]["btn"];
    });
  
    var data = {
      sin: {
        sTitle: "නව සැපයුම",
        tText:
          "ඔබගේ නව සැපයුම් ඉල්ලීම සඳහා විස්තර නිවැරදිව පුරවන්න. <br />ඉල්ලීම් පැය 24ක් ඇතුළත සමාලෝචනය කෙරේ. ඔබට ඒවා ඔබේ උපකරණ පුවරුව තුළ පරීක්ෂා කළ හැකිය.",
        bop: "බැංකු ගිණුම",
        bText:
          "එකතු කරන ලද පොල් එකතු කිරීම මත මුදල් ගෙවීමක් සිදු කරනු ලැබේ. <br> කරුණාකර පොල් ප්‍රමාණය වලංගු කිරීමට අපගේ එකතුකරන්නන්ට උදවු කරන්න.",
        btn: "ඉල්ලීම ඉදිරිපත් කරන්න",
      },
      en: {
        sTitle: "New Supply",
        tText:
          "Fill up the details correctly for your new supply request. <br />Requests will be reviewed within 24 hours. You can check them inside  your dashboard.",
        bop: "Bank Account",
        bText:
          "A cash payment for the collected coconuts will be made upon the collection. <br> Please help our collectors to validate the coconut amount.",
        btn: "Submit Request",
      },
    };
  
    var bankStatus = false;
  
    btn.addEventListener("click", () => {  
      if (typeof bank.value === "string" && bank.value.trim().length === 0) {
        console.log("Bank cannot be empty");
        bank.focus();
      } else {
        bankStatus = true;
      }
  
      if (dateStatus && timeStatus && bankStatus) {
        var formData = {
          collection_id: sessionStorage.getItem("id"),
          supplier_id: sessionStorage.getItem("sId"),
          account_id: bank.value,
        };
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
  