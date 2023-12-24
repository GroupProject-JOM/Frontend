(() => {
  const body = document.querySelector("body"),
    sin = body.querySelector(".sin"),
    en = body.querySelector(".en"),
    dTitle = body.querySelector(".distributor-title"),
    oArea = body.querySelector(".outlet-area"),
    btn = body.querySelector(".next");

  sin.addEventListener("click", () => {
    sin.classList.add("active");
    en.classList.remove("active");

    document.documentElement.setAttribute("lang", "sin");
    document.cookie = "lang=sin; path=/";
    lang = "sin";

    btn.textContent = data["sin"]["btn"];
    setGreeting();
  });

  en.addEventListener("click", () => {
    en.classList.add("active");
    sin.classList.remove("active");

    document.documentElement.setAttribute("lang", "en");
    document.cookie = "lang=en; path=/";
    lang = "en";

    btn.textContent = data["en"]["btn"];
    setGreeting();
  });

  var data = {
    sin: {
      btn: "ඉදිරිපත් කරන්න",
    },
    en: {
      btn: "Submit",
    },
  };
})();
