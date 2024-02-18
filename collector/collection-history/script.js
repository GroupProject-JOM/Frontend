(() => {
    const body = document.querySelector("body"),
    sin = body.querySelector(".sin"),
    en = body.querySelector(".en"),
    cTitle = body.querySelector(".collection-title"),
    cSubTitle = body.querySelector(".collection-text");


    var lang = getCookie("lang"); // current language

  sin.addEventListener("click", () => {
    sin.classList.add("active");
    en.classList.remove("active");

    document.documentElement.setAttribute("lang", "sin");
    document.cookie = "lang=sin; path=/";
    lang = "sin";

    cTitle.textContent = data["sin"]["cTitle"];
    cSubTitle.textContent = data["sin"]["cTitle"];
    
    setGreeting();
  });

  en.addEventListener("click", () => {
    en.classList.add("active");
    sin.classList.remove("active");

    document.documentElement.setAttribute("lang", "en");
    document.cookie = "lang=en; path=/";
    lang = "en";

    cTitle.textContent = data["en"]["cTitle"];
    cSubTitle.textContent = data["sin"]["cTitle"];
    
    setGreeting();
  });

  var data = {
    sin: {
      cTitle: "එකතු කිරීමේ හැඳුනුම්පත ",
      cSubTitle: "ඔබගේ සම්පුර්ණ කරන ලද පොල් එකතුවේ සවිස්තරාත්මක දසුන",
      
    },
    en: {
      cTitle: "Past Collections",
      cSubTitle: "Detailed view of your completed coconut collections",
    },
  };
})