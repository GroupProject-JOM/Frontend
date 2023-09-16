(() => {
  let loaded = false;

  const interval = setInterval(() => {
    const body = document.querySelector("body"),
      sidebar = body.querySelector(".sidebar"),
      toggle = body.querySelector(".toggle"),
      modeSwitch = body.querySelector(".toggle-switch"),
      modeText = body.querySelector(".mode-text"),
      sin = body.querySelector(".sin"),
      en = body.querySelector(".en"),
      greeting = body.querySelector(".greeting"),
      l6 = body.querySelector(".l6"),
      l7 = body.querySelector(".l7"),
      l8 = body.querySelector(".l8"),
      l9 = body.querySelector(".l9");

    if (!loaded && toggle && modeSwitch) {
      loaded = true;
      clearInterval(interval);
    }

    toggle.addEventListener("click", () => {
      sidebar.classList.toggle("close");
    });

    modeSwitch.addEventListener("click", () => {
      body.classList.toggle("dark");

      if (body.classList.contains("dark")) {
        sessionStorage.setItem("mode", "dark");

        if (sin.classList.contains("active")) {
          modeText.innerHTML = "ආලෝක මාදිලිය";
        } else {
          modeText.innerHTML = "Light Mode";
        }
      } else {
        sessionStorage.setItem("mode", "light");

        if (sin.classList.contains("active")) {
          modeText.innerHTML = "අඳුරු මාදිලිය";
        } else {
          modeText.innerHTML = "Dark Mode";
        }
      }
    });

    sin.addEventListener("click", () => {
      l6.textContent = data["sin"]["l6"];
      l7.textContent = data["sin"]["l7"];
      l8.textContent = data["sin"]["l8"];
      l9.textContent = data["sin"]["l9"];
    });

    en.addEventListener("click", () => {
      l6.textContent = data["en"]["l6"];
      l7.textContent = data["en"]["l7"];
      l8.textContent = data["en"]["l8"];
      l9.textContent = data["en"]["l9"];
    });

    var data = {
      sin: {
        l6: "ප්‍රධාන ක්‍ර්‍රියා",
        l7: "පැතිකඩ බලන්න",
        l8: "ගිණුමෙන් ඉවත් වන්න",
        l9: "අඳුරු මාදිලිය",
      },
      en: {
        l6: "MAIN ACTIONS",
        l7: "View Profile",
        l8: "Log Out",
        l9: "Dark Mode",
      },
    };

    setGreeting();
    checkLng();
    checkMode();
  }, 100);
})();
