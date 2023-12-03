(() => {
    const body = document.querySelector("body"),
    sin = body.querySelector(".sin"),
    en = body.querySelector(".en"),
    pTitle = body.querySelector(".productionmg-title"),
    pText = body.querySelector(".productionmg-subtitle"),
    yardH = body.querySelector(".yard-h3"),
    btn = body.querySelector(".form-button");


    var lang = getCookie("lang"); // current language

    sin.addEventListener("click", () => {
        sin.classList.add("active");
        en.classList.remove("active");
    
        document.documentElement.setAttribute("lang", "sin");
        document.cookie = "lang=sin; path=/";
        lang = "sin";
    
        pTitle.textContent = data["sin"]["pTitle"];
        pText.textContent = data["sin"]["pText"];
        yardH.textContent = data["sin"]["yardH"];
        btn.textContent = data["sin"]["btn"];


        setGreeting();
      });
    
      en.addEventListener("click", () => {
        en.classList.add("active");
        sin.classList.remove("active");
    
        document.documentElement.setAttribute("lang", "en");
        document.cookie = "lang=en; path=/";
        lang = "en";
    
        pTitle.textContent = data["en"]["pTitle"];
        pText.textContent = data["en"]["pText"];
        yardH.textContent = data["en"]["yardH"];
        btn.textContent = data["en"]["btn"];

        
        setGreeting();
      });
    
      var data = {
        sin: {
          pTitle: "කොටස් තොරතුරු",
          pText: "වර්ණ-කේතගත කොටස් තොරතුරු බලන්න",
          btn: "සුරකින්න",
        //   yardH: "අංගනය " + getCookie("id").charAt(0),
          
        },
        en: {
          pTitle: "Edit Request",
          pText: "Edit stock request details",
        //   yardH: "Yard " + getCookie("id").charAt(0),
        yardH: "Yard 01",
          btn: "Save Changes",
        },
      };
    
})();