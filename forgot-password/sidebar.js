(() => {
  let loaded = false;

  const interval = setInterval(() => {
    const body = document.querySelector("body"),
      sin = body.querySelector(".sin"),
      en = body.querySelector(".en"),
      ml1 = body.querySelector(".menu-line1"),
      ml2 = body.querySelector(".menu-line2");

    if (!loaded && ml2) {
      loaded = true;
      clearInterval(interval);
    }

    sin.addEventListener("click", () => {
      ml1.textContent = data["sin"]["ml1"];
      ml2.textContent = data["sin"]["ml2"];
    });

    en.addEventListener("click", () => {
      ml1.textContent = data["en"]["ml1"];
      ml2.textContent = data["en"]["ml2"];
    });

    var data = {
      sin: {
        ml1: "ජයසිංහ ඔයිල් මිල්ස්",
        ml2: "පොල්තෙල් නිෂ්පාදකයින්",
      },
      en: {
        ml1: "Jayasinghe Oil Mills",
        ml2: "Coconut Oil Manufacturers",
      },
    };

    checkLng();
  }, 10);
})();