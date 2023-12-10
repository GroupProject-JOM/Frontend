(() => {
    const body = document.querySelector("body"),
    sin = body.querySelector(".sin"),
    en = body.querySelector(".en"),
    stitle = body.querySelector(".stockmg-title"),
    amountLabel = body.querySelector(".amount-label"),
    periodLabel = body.querySelector(".period-label");


    sin.addEventListener("click", () => {
        sin.classList.add("active");
        en.classList.remove("active");
    
        document.documentElement.setAttribute("lang", "sin");
        document.cookie = "lang=sin; path=/";
        lang = "sin";
    
        stitle.textContent = data["sin"]["stitle"];
        amountLabel.textContent = data["sin"]["amountLabel"];
        periodLabel.textContent = data["sin"]["periodLabel"];
        
        setGreeting();
      });
    
      en.addEventListener("click", () => {
        en.classList.add("active");
        sin.classList.remove("active");
    
        document.documentElement.setAttribute("lang", "en");
        document.cookie = "lang=en; path=/";
        lang = "en";
    
        stitle.textContent = data["en"]["stitle"];
        amountLabel.textContent = data["en"]["amountLabel"];
        periodLabel.textContent = data["en"]["periodLabel"];
        setGreeting();
      });
    
      var data = {
        sin: {
          stitle: "ගබඩා තොරතුරු සංස්කරණය කරන්න",
          amountLabel: "පොල් ප්රමාණය",
          periodLabel: "දින ගණන",
        },
        en: {
          stitle: "Edit Block Information",
          amountLabel: "Coconut Amount",
          periodLabel: "Number of Days",
        },
      };
})();