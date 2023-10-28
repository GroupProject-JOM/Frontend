(() => {
    const body = document.querySelector("body"),
    sin = body.querySelector(".sin"),
    en = body.querySelector(".en"),
    sTitle = body.querySelector(".stockmg-title"),
    
    tbody = body.querySelector(".tbody"),
    btn = body.querySelector(".form-button");

    sin.addEventListener("click", () => {
        sin.classList.add("active");
        en.classList.remove("active");
    
        document.documentElement.setAttribute("lang", "sin");
        // sessionStorage.setItem("lang", "sin");
        document.cookie = "lang=sin; path=/";
    
        sTitle.textContent = data["sin"]["sTitle"];
        btn.textContent = data["sin"]["btn"];
      });

      en.addEventListener("click", () => {
        en.classList.add("active");
        sin.classList.remove("active");
    
        document.documentElement.setAttribute("lang", "en");
        // sessionStorage.setItem("lang", "en");
        document.cookie = "lang=en; path=/";
    
        sTitle.textContent = data["en"]["sTitle"];
        btn.textContent = data["en"]["btn"];
      });


      var data = {
        sin: {
          sTitle: "එකතුව බලන්න",
          
        },
        en: {
          sTitle: "View Collection",
          
        },
      };
})();