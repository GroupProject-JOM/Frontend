(() => {
    const body = document.querySelector("body"),
    sin = body.querySelector(".sin"),
    en = body.querySelector(".en"),
    stitle = body.querySelector(".stockmg-title"),
    stext = body.querySelector(".stockmg-text");

    sin.addEventListener("click", () => {
        sin.classList.add("active");
        en.classList.remove("active");
    
        document.documentElement.setAttribute("lang", "sin");
        // sessionStorage.setItem("lang", "sin");
        document.cookie = "lang=sin; path=/";
        lang = "sin";
    
        stitle.textContent = data["sin"]["stitle"];
        stext.textContent = data["sin"]["stext"];        
        setGreeting();
      });

      en.addEventListener("click", () => {
        en.classList.add("active");
        sin.classList.remove("active");
    
        document.documentElement.setAttribute("lang", "en");
        // sessionStorage.setItem("lang", "en");
        document.cookie = "lang=en; path=/";
        lang = "en";
    
        stitle.textContent = data["en"]["stitle"];
        stext.textContent = data["en"]["stext"]; 
        setGreeting();
      });

      var data = {
        sin: {
            stitle: "ගබඩා තොරතුරු",
            stext: "ගබඩාවල ඇති පොල් තොග පිළිබඳ තොරතුරු",
        },
        en: {
            stitle: "Block Information",
            stext: "Detailed view of the stock information for each block within company yards",
        },
      }

})();