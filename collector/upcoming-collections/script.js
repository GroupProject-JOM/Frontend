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
    cSubTitle.textContent = data["sin"]["cSubTitle"];
    setGreeting();
  });

  en.addEventListener("click", () => {
    en.classList.add("active");
    sin.classList.remove("active");

    document.documentElement.setAttribute("lang", "en");
    document.cookie = "lang=en; path=/";
    lang = "en";

    cTitle.textContent = data["en"]["cTitle"];
    cSubTitle.textContent = data["en"]["cSubTitle"];
    setGreeting();
  });

  var data = {
    sin: {
      cTitle: "ඉදිරියට එන එකතු කිරීම්",
      cSubTitle: "ඉදිරි දිනවලදී ඔබට පවරා ඇති පොල් එකතු කිරීම් පිළිබඳ සවිස්තරාත්මක දසුනක්",
    },
    en: {
      cTitle: "Upcoming Collections",
      cSubTitle: "Detailed view of coconut collections assigned to yourself in upcoming days",
    },
  };
})();
