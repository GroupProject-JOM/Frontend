(() => {
    const body = document.querySelector("body"),
      sin = body.querySelector(".sin"),
      en = body.querySelector(".en"),
      closeBtn = body.querySelector(".close-btn"),
      bell = body.querySelector(".bell"),
      notify = body.querySelector("#notify"),
      l10 = body.querySelector(".l10");
  
    sin.addEventListener("click", () => {
      sin.classList.add("active");
      en.classList.remove("active");
  
      document.documentElement.setAttribute("lang", "sin");
      sessionStorage.setItem("lang", "sin");
  
      l10.textContent = data["sin"]["l10"];
    });
  
    en.addEventListener("click", () => {
      en.classList.add("active");
      sin.classList.remove("active");
  
      document.documentElement.setAttribute("lang", "en");
      sessionStorage.setItem("lang", "en");
  
      l10.textContent = data["en"]["l10"];
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
      },
      en: {
        l10: "Notifications",
      },
    };
  
    checkLng();
  })();
  