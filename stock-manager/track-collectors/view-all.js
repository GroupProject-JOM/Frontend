(() => {
  const body = document.querySelector("body"),
    sin = body.querySelector(".sin"),
    en = body.querySelector(".en"),
    sTitle = body.querySelector(".stockmg-title"),
    sText1 = body.querySelector(".stockmg-text1"),
    sText2 = body.querySelector(".stockmg-text2"),
    th1 = body.querySelector(".th1"),
    th2 = body.querySelector(".th2"),
    th3 = body.querySelector(".th3"),
    th4 = body.querySelector(".th4"),
    th5 = body.querySelector(".th5"),
    tbody = body.querySelector(".tbody"),
    btn = body.querySelector(".form-button");

  const rows = document.querySelectorAll("tr[data-href]");
  rows.forEach((r) => {
    r.addEventListener("click", () => {
      document.cookie = "id=" + r.id + "; path=/";
      window.location.href = r.dataset.href;
    });
  });

  sin.addEventListener("click", () => {
    sin.classList.add("active");
    en.classList.remove("active");

    document.documentElement.setAttribute("lang", "sin");
    // sessionStorage.setItem("lang", "sin");
    document.cookie = "lang=sin; path=/";

    sTitle.textContent = data["sin"]["sTitle"];
    sText1.innerHTML = data["sin"]["sText1"];
    sText2.innerHTML = data["sin"]["sText2"];
    th1.textContent = data["sin"]["th1"];
    th2.textContent = data["sin"]["th2"];
    th3.textContent = data["sin"]["th3"];
    th4.textContent = data["sin"]["th4"];
    th5.textContent = data["sin"]["th5"];
    btn.textContent = data["sin"]["btn"];
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
    sText2.innerHTML = data["en"]["sText2"];
    th1.textContent = data["en"]["th1"];
    th2.textContent = data["en"]["th2"];
    th3.textContent = data["en"]["th3"];
    th4.textContent = data["en"]["th4"];
    th5.textContent = data["en"]["th5"];
    btn.textContent = data["en"]["btn"];
    setGreeting();
  });

  var data = {
    sin: {
      sTitle: "එකතුකරන්නන් සොයා ගන්න",
      sText1:
        "සක්‍රිය එකතු කිරීම් සහ දැනට පවතින එකතු කිරීම් පිළිබඳ තත්‍ය කාලීන තොරතුරු බලන්න",
      sText2: "එකතුකරන්නන්ගේ තත්‍ය කාලීන ස්ථාන සමඟ සිතියම විවෘත කරයි",
      th1: "සේවක හැදුනුම්පත",
      th2: "එකතුකරන්නාගේ නම",
      th3: "ප්රදේශය",
      th4: "වත්මන් එකතුව",
      th5: "ධාරිතාව",
      btn: "සිතියමෙන් බලන්න",
    },
    en: {
      sTitle: "Track Collectors",
      sText1:
        "View real-time information on active collections and ongoing collections",
      sText2: "Opens the map with real-time locations of the collectors",
      th1: "Employee ID",
      th2: "Collector Name",
      th3: "Area",
      th4: "Current Collection",
      th5: "Capacity",
      btn: "View on Map",
    },
  };
})();
