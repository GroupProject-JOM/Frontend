(() => {
    const body = document.querySelector("body"),
      sin = body.querySelector(".sin"),
      en = body.querySelector(".en"),
      ml1 = body.querySelector(".menu-line1"),
      ml2 = body.querySelector(".menu-line2"),
      ml3 = body.querySelector(".menu-line3"),
      ml4 = body.querySelector(".menu-line4"),
      ml5 = body.querySelector(".menu-line5"),
      fh = body.querySelector(".form-heading"),
      fht = body.querySelector(".form-heading-text"),
      next = body.querySelector(".next");

  
    sin.addEventListener("click", () => {
      sin.classList.add("active");
      en.classList.remove("active");
  
      document.documentElement.setAttribute("lang", "sin");
      sessionStorage.setItem("lang", "sin");
  
      ml1.textContent = data["sin"]["ml1"];
      ml2.textContent = data["sin"]["ml2"];
      ml3.textContent = data["sin"]["ml3"];
      ml4.textContent = data["sin"]["ml4"];
      ml5.textContent = data["sin"]["ml5"];
      fh.textContent = data["sin"]["fh"];
      fht.innerHTML = data["sin"]["fht"];
      next.textContent = data["sin"]["next"];
    });
  
    en.addEventListener("click", () => {
      en.classList.add("active");
      sin.classList.remove("active");
  
      document.documentElement.setAttribute("lang", "en");
      sessionStorage.setItem("lang", "en");
  
      ml1.textContent = data["en"]["ml1"];
      ml2.textContent = data["en"]["ml2"];
      ml3.textContent = data["en"]["ml3"];
      ml4.textContent = data["en"]["ml4"];
      ml5.textContent = data["en"]["ml5"];
      fh.textContent = data["en"]["fh"];
      fht.innerHTML = data["en"]["fht"];
      next.textContent = data["en"]["next"];
    });
  
    var data = {
      sin: {
        ml1: "ජයසිංහ ඔයිල් මිල්ස්",
        ml2: "පොල්තෙල් නිෂ්පාදකයින්",
        ml3: "මූලික තොරතුරු",
        ml4: "වතු ස්ථාන",
        ml5: "ගෙවීම් තොරතුරු",
        fh: "ගිණුම සාදා ඇත",
        fht: "ඔබගේ ගිණුම සාර්ථකව නිර්මාණය කර ඇත. <br /> ඔබට දැන් පරිශීලක නාමය සහ මුරපදය භාවිතා කර ගිණුමට ලොග් විය හැක",
        next: "ඇතුල් වන්න",
      },
      en: {
        ml1: "Jayasinghe Oil Mills",
        ml2: "Coconut Oil Manufacturers",
        ml3: "Basic Information",
        ml4: "Estate Locations",
        ml5: "Payment Details",
        fh: "Account Created",
        fht: "Your account has been successfully created. <br /> You can now log in to the account using the username and password",
        next: "Log in",
      },
    };
  
    checkLng();
  })();
  