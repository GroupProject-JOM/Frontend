(() => {
  const body = document.querySelector("body"),
    sin = body.querySelector(".sin"),
    en = body.querySelector(".en"),
    sTitle = body.querySelector(".stockmg-title"),
    sText1 = body.querySelector(".stockmg-text1"),
    th1 = body.querySelector(".th1"),
    th2 = body.querySelector(".th2"),
    th3 = body.querySelector(".th3"),
    th4 = body.querySelector(".th4"),
    th5 = body.querySelector(".th5"),
    th6 = body.querySelector(".th6"),
    tbody = body.querySelector(".tbody");

  var lang = getCookie("lang"); // current language

  sin.addEventListener("click", () => {
    sin.classList.add("active");
    en.classList.remove("active");

    document.documentElement.setAttribute("lang", "sin");
    // sessionStorage.setItem("lang", "sin");
    document.cookie = "lang=sin; path=/";
    lang = "sin";

    sTitle.textContent = data["sin"]["sTitle"];
    sText.textContent = data["sin"]["sText"];
    setGreeting();
  });

  sin.addEventListener("click", () => {
    sin.classList.add("active");
    en.classList.remove("active");

    document.documentElement.setAttribute("lang", "sin");
    // sessionStorage.setItem("lang", "sin");
    document.cookie = "lang=sin; path=/";

    sTitle.textContent = data["sin"]["sTitle"];
    sText1.innerHTML = data["sin"]["sText1"];
    th1.textContent = data["sin"]["th1"];
    th2.textContent = data["sin"]["th2"];
    th3.textContent = data["sin"]["th3"];
    th4.textContent = data["sin"]["th4"];
    th5.textContent = data["sin"]["th5"];
    th6.textContent = data["sin"]["th6"];
    setGreeting();
  });

  en.addEventListener("click", () => {
    en.classList.add("active");
    sin.classList.remove("active");

    document.documentElement.setAttribute("lang", "en");
    // sessionStorage.setItem("lang", "en");
    document.cookie = "lang=en; path=/";

    sTitle.textContent = data["en"]["sTitle"];
    sText1.innerHTML = data["en"]["sText1"];
    th1.textContent = data["en"]["th1"];
    th2.textContent = data["en"]["th2"];
    th3.textContent = data["en"]["th3"];
    th4.textContent = data["en"]["th4"];
    th5.textContent = data["en"]["th5"];
    th6.textContent = data["en"]["th6"];
    setGreeting();
  });

  var data = {
    sin: {
      sTitle: "Collector's name",
      sText1: "එක් එක් දිනයේ පොල් එකතු කිරීමේ විස්තර බලන්න",
      th1: "සේවක හැදුනුම්පත",
      th2: "ප්රදේශය",
      th3: "සැපයුම්කරු",
      th4: "දුරකතන අංකය",
      th5: "ප්රමාණය",
      th6: "තත්ත්වය",
    },
    en: {
      sTitle: "Collectors Name",
      sText1: "View coconut collection details for each day",
      th1: "Collection ID",
      th2: "Area",
      th3: "Supplier",
      th4: "Phone No",
      th5: "Amount",
      th6: "Status",
    },
  };
})();
