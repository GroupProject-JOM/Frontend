(() => {
  const body = document.querySelector("body"),
    sin = body.querySelector(".sin"),
    en = body.querySelector(".en"),
    sTitle = body.querySelector(".supply-title"),
    tx1 = body.querySelector(".personal-info"),
    tx2 = body.querySelector(".profile-address"),
    tx3 = body.querySelector(".additional-info");

  var lang = getCookie("lang"); // current language

  sin.addEventListener("click", () => {
    sin.classList.add("active");
    en.classList.remove("active");

    document.documentElement.setAttribute("lang", "sin");
    // sessionStorage.setItem("lang", "sin");
    document.cookie = "lang=sin; path=/";
    lang = "sin";

    sTitle.textContent = data["sin"]["sTitle"];
    tx1.innerHTML = data["sin"]["tx1"];
    tx2.innerHTML = data["sin"]["tx2"];
    tx3.innerHTML = data["sin"]["tx3"];

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
    tx1.innerHTML = data["en"]["tx1"];
    tx2.innerHTML = data["en"]["tx2"];
    tx3.innerHTML = data["en"]["tx3"];

    setGreeting();
  });

  var data = {
    sin: {
      sTitle: "ගිණුම් තොරතුරු බලන්න",
      tx1: "පුද්ගලික තොරතුරු",
      tx2: "ලිපිනය",
      tx3: "අමතර තොරතුරු",
    },
    en: {
      sTitle: "Your Profile",
      tx1: "Personal Information",
      tx2: "Address",
      tx3: "Additional Information",
    },
  };
})();
