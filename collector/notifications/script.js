(() => {
  let loaded = false;

  const interval = setInterval(() => {
    const body = document.querySelector("body"),
      sin = body.querySelector(".sin"),
      en = body.querySelector(".en"),
      closeBtn = body.querySelector(".close-btn"),
      bell = body.querySelector(".bell"),
      notify = body.querySelector("#notify"),
      l10 = body.querySelector(".l10");

    if (!loaded && l10) {
      loaded = true;
      clearInterval(interval);
    }

    sin.addEventListener("click", () => {
      l10.textContent = data["sin"]["l10"];
    });

    en.addEventListener("click", () => {
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
  }, 10);
})();
