// checkLng();
loadNav();
topBar();

function topBar() {
  const body = document.querySelector("body"),
  sidebar = body.querySelector(".sidebar"),
  toggle = body.querySelector(".toggle"),
  modeSwitch = body.querySelector(".toggle-switch"),
  modeText = body.querySelector(".mode-text"),
    sin = body.querySelector(".sin"),
    en = body.querySelector(".en"),
    closeBtn = body.querySelector(".close-btn"),
    bell = body.querySelector(".bell"),
    notify = body.querySelector("#notify"),
    greeting = body.querySelector(".greeting"),
    l6 = body.querySelector(".l6"),
    l7 = body.querySelector(".l7"),
    l8 = body.querySelector(".l8"),
    l9 = body.querySelector(".l9"),
    l10 = body.querySelector(".l10");

  const curLng = sessionStorage.getItem("lang");
  if (curLng == "sin") {
    sin.click();
  }

  toggle.addEventListener("click", () => {
    sidebar.classList.toggle("close");
  });

  modeSwitch.addEventListener("click", () => {
    body.classList.toggle("dark");

    if (body.classList.contains("dark")) {
      if (sin.classList.contains("active")) {
        modeText.innerHTML = "ආලෝක මාදිලිය";
      } else {
        modeText.innerHTML = "Light Mode";
      }
    } else {
      if (sin.classList.contains("active")) {
        modeText.innerHTML = "අඳුරු මාදිලිය";
      } else {
        modeText.innerHTML = "Dark Mode";
      }
    }
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
      l6: "ප්‍රධාන ක්‍ර්‍රියාවන්",
      l7: "පැතිකඩ බලන්න",
      l8: "ගිණුමෙන් ඉවත් වන්න",
      l9: "අඳුරු මාදිලිය",
      l10: "දැනුම්දීම්",
      greeting: "සුභ දහවලක්",
    },
    en: {
      l6: "MAIN ACTIONS",
      l7: "View Profile",
      l8: "Log Out",
      l9: "Dark Mode",
      l10: "Notifications",
      greeting: "Good Afternoon",
    },
  };

  sin.addEventListener("click", () => {
    sin.classList.add("active");
    en.classList.remove("active");

    document.documentElement.setAttribute("lang", "sin");
    sessionStorage.setItem("lang", "sin");

    greeting.textContent = data["sin"]["greeting"];
    l6.textContent = data["sin"]["l6"];
    l7.textContent = data["sin"]["l7"];
    l8.textContent = data["sin"]["l8"];
    l9.textContent = data["sin"]["l9"];
    l10.textContent = data["sin"]["l10"];
  });

  en.addEventListener("click", () => {
    sin.classList.remove("active");
    en.classList.add("active");

    document.documentElement.setAttribute("lang", "en");
    sessionStorage.setItem("lang", "en");

    greeting.textContent = data["en"]["greeting"];
    l6.textContent = data["en"]["l6"];
    l7.textContent = data["en"]["l7"];
    l8.textContent = data["en"]["l8"];
    l9.textContent = data["en"]["l9"];
    l10.textContent = data["en"]["l10"];
  });

}

// function checkLng() {
//   const body = document.querySelector("body"),
//     sin = body.querySelector(".sin");

//   //reload language detecter
//   const curLng = sessionStorage.getItem("lang");
//   if (curLng == "sin") {
//     sin.click();
//   }
// }

function loadNav() {
  const sidebar = document.querySelector(".sidebar");
  fetch("nav/nav.html")
    .then((res) => res.text())
    .then((data) => {
      sidebar.innerHTML = data;
    });

  const navScript = document.createElement("script");
  navScript.setAttribute("src", "nav/script.js");
  document.body.appendChild(navScript);
}
