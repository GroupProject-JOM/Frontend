(() => {
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
  
    sin.addEventListener("click", () => {
      greeting.textContent = data["sin"]["greeting"];
      l6.textContent = data["sin"]["l6"];
      l7.textContent = data["sin"]["l7"];
      l8.textContent = data["sin"]["l8"];
      l9.textContent = data["sin"]["l9"];
    });
  
    en.addEventListener("click", () => {
      greeting.textContent = data["en"]["greeting"];
      l6.textContent = data["en"]["l6"];
      l7.textContent = data["en"]["l7"];
      l8.textContent = data["en"]["l8"];
      l9.textContent = data["en"]["l9"];
    });
  
    var data = {
      sin: {
        l6: "ප්‍රධාන ක්‍ර්‍රියාවන්",
        l7: "පැතිකඩ බලන්න",
        l8: "ගිණුමෙන් ඉවත් වන්න",
        l9: "අඳුරු මාදිලිය",
        greeting: "සුභ දහවලක්",
      },
      en: {
        l6: "MAIN ACTIONS",
        l7: "View Profile",
        l8: "Log Out",
        l9: "Dark Mode",
        greeting: "Good Afternoon",
      },
    };
  
    checkLng();
  })();
  