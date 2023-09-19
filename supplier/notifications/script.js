(() => {
  let loaded = false;

  const interval = setInterval(() => {
    const body = document.querySelector("body"),
      sin = body.querySelector(".sin"),
      en = body.querySelector(".en"),
      closeBtn = body.querySelector(".close-btn"),
      bell = body.querySelector(".bell"),
      fabell = body.querySelector(".fa-bell"),
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
    });

    body.addEventListener("click", (e) => {
      if (
        !e.target.classList.contains("do-not")
      ) {
        notify.style.display = "none";
        // bell.classList.remove("active");
        fabell.classList.add("far");
        fabell.classList.remove("fas");
      }
    });

    bell.addEventListener("mouseover", () => {
      fabell.classList.add("fas");
      fabell.classList.remove("far");
    });

    bell.addEventListener("mouseleave", () => {
      if (notify.style.display == "none") {
        fabell.classList.add("far");
        fabell.classList.remove("fas");
      }
    });

    closeBtn.addEventListener("click", () => {
      notify.style.display = "none";
      fabell.classList.add("far");
        fabell.classList.remove("fas");
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
