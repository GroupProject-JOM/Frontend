(() => {
  const body = document.querySelector("body"),
    sin = body.querySelector(".sin"),
    en = body.querySelector(".en"),
    cTitle = body.querySelector(".collection-title"),
    cSubTitle = body.querySelector(".collection-subtitle"),
    t1 = body.querySelector(".t1"),
    initAmount = body.querySelector(".initial-amount"),
    t2 = body.querySelector(".t2"),
    amount = body.querySelector(".collected-amount"),
    t3 = body.querySelector(".t3"),
    btn = body.querySelector(".form-button");

  cSubTitle.textContent = getCookie("area");
  initAmount.textContent = getCookie("amount");
  amount.textContent = getCookie("final");

  var lang = getCookie("lang"); // current language

  sin.addEventListener("click", () => {
    sin.classList.add("active");
    en.classList.remove("active");

    document.documentElement.setAttribute("lang", "sin");
    document.cookie = "lang=sin; path=/";
    lang = "sin";

    cTitle.textContent = data["sin"]["cTitle"];
    t1.textContent = data["sin"]["t1"];
    t2.textContent = data["sin"]["t2"];
    t3.textContent = data["sin"]["t3"];
    btn.textContent = data["sin"]["btn"];
    setGreeting();
  });

  en.addEventListener("click", () => {
    en.classList.add("active");
    sin.classList.remove("active");

    document.documentElement.setAttribute("lang", "en");
    document.cookie = "lang=en; path=/";
    lang = "en";

    cTitle.textContent = data["en"]["cTitle"];
    t1.textContent = data["en"]["t1"];
    t2.textContent = data["en"]["t2"];
    t3.textContent = data["en"]["t3"];
    btn.textContent = data["en"]["btn"];
    setGreeting();
  });

  var data = {
    sin: {
      cTitle: "එකතු කිරීමේ හැඳුනුම්පත S/P/" + getCookie("id"),
      t1: "ආරම්භක පොල් ප්‍රමාණය",
      t2: "අවසාන පොල් ප්‍රමාණය",
      t3: "එකතුව සම්පූර්ණ ලෙස ලකුණු කර ඇත",
      btn: "උපකරණ පුවරුව වෙත ආපසු යන්න",
    },
    en: {
      cTitle: "Collection ID S/P/" + getCookie("id"),
      t1: "Initial Coconut Amount",
      t2: "Final Coconut Amount",
      t3: "Collection Marked as Complete",
      btn: "Back to Dashboard",
    },
  };
})();
