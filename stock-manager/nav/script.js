// if (sessionStorage.getItem("page") != "stock-manager") {
//   if (
//     sessionStorage.getItem("page") == null ||
//     sessionStorage.getItem("page").length === 0
//   ) {
//     window.location.href = frontProxy + "/signin.html";
//   } else {
//     window.location.href = frontProxy + "/" + sessionStorage.getItem("page");
//   }
// }

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
      l0 = body.querySelector(".l0"),
      l1 = body.querySelector(".l1"),
      l2 = body.querySelector(".l2"),
      l3 = body.querySelector(".l3"),
      l4 = body.querySelector(".l4"),
      l6 = body.querySelector(".l6"),
      l7 = body.querySelector(".l7"),
      l8 = body.querySelector(".l8"),
      l9 = body.querySelector(".l9"),
      Uname = body.querySelector(".name");
      trackcollectors = body.querySelector(".trackcollectors"),
      supplyRequests = body.querySelector(".supplyRequests"),


    // Uname.textContent = sessionStorage.getItem("name");
    Uname.textContent = getCookie('name');

    trackcollectors.href = frontProxy + "/stock-manager/track-collectors/view-all.html";
    supplyRequests.href = frontProxy + "/stock-manager/supply-requests/view-request1.html";


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
        // sessionStorage.setItem("mode", "dark");
        document.cookie = "mode=dark; path=/";
        modeText.innerHTML = modeTranslate();
      } else {
        // sessionStorage.setItem("mode", "light");
        document.cookie = "mode=light; path=/";
        modeText.innerHTML = modeTranslate();
      }
    });

    sin.addEventListener("click", () => {
      l0.textContent = data["sin"]["l0"];
      l1.textContent = data["sin"]["l1"];
      l2.textContent = data["sin"]["l2"];
      l3.textContent = data["sin"]["l3"];
      l4.textContent = data["sin"]["l4"];
      l6.textContent = data["sin"]["l6"];
      l7.textContent = data["sin"]["l7"];
      l8.textContent = data["sin"]["l8"];
      l9.textContent = modeTranslate();
    });

    en.addEventListener("click", () => {
      l0.textContent = data["en"]["l0"];
      l1.textContent = data["en"]["l1"];
      l2.textContent = data["en"]["l2"];
      l3.textContent = data["en"]["l3"];
      l4.textContent = data["en"]["l4"];
      l6.textContent = data["en"]["l6"];
      l7.textContent = data["en"]["l7"];
      l8.textContent = data["en"]["l8"];
      l9.textContent = modeTranslate();
    });

    var data = {
      sin: {
        l0: "පරිශීලක ක්‍රියා",
        l1: "එකතුකරන්නන් ලුහුබැඳීම",
        l2: "සැපයුම් ඉල්ලීම්",
        l3: "කතාබස් කරන්න",
        l4: "සියලුම එකතු කිරීම්",
        l6: "ප්‍රධාන ක්‍ර්‍රියා",
        l7: "පැතිකඩ බලන්න",
        l8: "ගිණුමෙන් ඉවත් වන්න",
      },
      en: {
        l0: "USER ACTIONS",
        l1: "Track Collectors",
        l2: "Supply Requests",
        l3: "Chat",
        l4: "All Collections",
        l6: "MAIN ACTIONS",
        l7: "View Profile",
        l8: "Log Out",
      },
    };

    setGreeting();
    checkLng();
    checkMode();
  }, 10);
})();
