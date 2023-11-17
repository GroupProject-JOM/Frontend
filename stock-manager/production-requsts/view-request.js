(() => {
    const body = document.querySelector("body"),
    sin = body.querySelector(".sin"),
    en = body.querySelector(".en"),
    sTitle = body.querySelector(".stockmg-title"),
    sText = body.querySelector(".stockmg-subtitle"),
    accept = body.querySelector(".accept"),
    decline = body.querySelector(".decline");


    sin.addEventListener("click", () => {
        sin.classList.add("active");
        en.classList.remove("active");
    
        document.documentElement.setAttribute("lang", "sin");
        // sessionStorage.setItem("lang", "sin");
        document.cookie = "lang=sin; path=/";
        lang = "sin";
    
        sTitle.textContent = data["sin"]["sTitle"];
        accept.textContent = data["sin"]["accept"];
        decline.textContent = data["sin"]["decline"];
        assign.textContent = data["sin"]["assign"];
        setGreeting();
      });

      en.addEventListener("click", () => {
        en.classList.add("active");
        sin.classList.remove("active");
    
        document.documentElement.setAttribute("lang", "en");
        // sessionStorage.setItem("lang", "en");
        document.cookie = "lang=en; path=/";
        lang = "en";
    
        sTitle.textContent = data["en"]["sTitle"];
        accept.textContent = data["en"]["accept"];
        decline.textContent = data["en"]["decline"];
        assign.textContent = data["en"]["assign"];
        setGreeting();
      });

      var data = {
        sin: {
          sTitle: "ඉල්ලීම බලන්න",
          accept: "පිළිගන්න",
          decline: "ප්රතික්ෂේප කරන්න",
          assign: "එකතුකරන්නා පවරන්න",
        },
        en: {
          sTitle: "View Request",
          accept: "Accept",
          decline: "Decline",
          assign: "Assign Collector",
        },
      };
})();
