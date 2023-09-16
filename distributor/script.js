(() => {
  const body = document.querySelector("body"),
    sin = body.querySelector(".sin"),
    en = body.querySelector(".en"),
    modeSwitch = body.querySelector(".toggle-switch"),
    closeBtn = body.querySelector(".close-btn"),
    bell = body.querySelector(".bell"),
    notify = body.querySelector("#notify"),
    l10 = body.querySelector(".l10"),
    w1 = body.querySelector(".w1"),
    w2 = body.querySelector(".w2"),
    c1 = body.querySelector(".c1"),
    c2 = body.querySelector(".c2");

  sin.addEventListener("click", () => {
    sin.classList.add("active");
    en.classList.remove("active");

    document.documentElement.setAttribute("lang", "sin");
    sessionStorage.setItem("lang", "sin");

    l10.textContent = data["sin"]["l10"];
    w1.textContent = data["sin"]["w1"];
    w2.textContent = data["sin"]["w2"];
    c1.textContent = data["sin"]["c1"];
    c2.textContent = data["sin"]["c2"];
    setGreeting();
  });

  en.addEventListener("click", () => {
    en.classList.add("active");
    sin.classList.remove("active");

    document.documentElement.setAttribute("lang", "en");
    sessionStorage.setItem("lang", "en");

    l10.textContent = data["en"]["l10"];
    w1.textContent = data["en"]["w1"];
    w2.textContent = data["en"]["w2"];
    c1.textContent = data["en"]["c1"];
    c2.textContent = data["en"]["c2"];
    setGreeting();
  });

  bell.addEventListener("click", () => {
    notify.style.display = "grid";
    bell.classList.add("active");
  });

  closeBtn.addEventListener("click", () => {
    notify.style.display = "none";
    bell.classList.remove("active");
  });

  body.addEventListener("click", (e) => {
    if (
      !e.target.classList.contains("do-not") &&
      bell.classList.contains("active")
    ) {
      notify.style.display = "none";
      bell.classList.remove("active");
    }
  });

  var data = {
    sin: {
      l10: "දැනුම්දීම්",
      w1: "වෙන් කළ නිෂ්පාදන",
      w2: "අද විකුණුම්",
      c1: "අලෙවිසැල්",
      c2: "අලෙවිසැල් තොරතුරු බලන්න සහ යාවත්කාලීන කරන්න",
    },
    en: {
      l10: "Notifications",
      w1: "Allocated Products",
      w2: "Today's Sales",
      c1: "Outlets",
      c2: "View and update Outlet Information",
    },
  };

  checkLng();
  checkMode();

  modeSwitch.addEventListener("click", () => {
    body.classList.toggle("dark");
    if (body.classList.contains("dark")) {
      sessionStorage.setItem("mode", "dark");
    } else {
      sessionStorage.setItem("mode", "light");
    }
  });
})();
