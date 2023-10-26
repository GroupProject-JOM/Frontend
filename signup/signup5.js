(() => {
    const body = document.querySelector("body"),
      sin = body.querySelector(".sin"),
      en = body.querySelector(".en"),
      
      fh = body.querySelector(".form-heading"),
      fht = body.querySelector(".form-heading-text"),
      next = body.querySelector(".next");

  
    sin.addEventListener("click", () => {
      sin.classList.add("active");
      en.classList.remove("active");
  
      document.documentElement.setAttribute("lang", "sin");
      // sessionStorage.setItem("lang", "sin");
      document.cookie="lang=sin; path=/";
  
      
      fh.textContent = data["sin"]["fh"];
      fht.innerHTML = data["sin"]["fht"];
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
      next.textContent = data["en"]["next"];
    });
  
    var data = {
      sin: {
       
        fh: "ගිණුම සාදා ඇත",
        fht: "ඔබගේ ගිණුම සාර්ථකව නිර්මාණය කර ඇත. <br /> ඔබට දැන් පරිශීලක නාමය සහ මුරපදය භාවිතා කර ගිණුමට ලොග් විය හැක",
        next: "ඇතුල් වන්න",
      },
      en: {
        
        fh: "Account Created",
        fht: "Your account has been successfully created. <br /> You can now log in to the account using the username and password",
        next: "Log in",
      },
    };
  
    checkLng();
  })();
  