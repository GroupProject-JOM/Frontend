(() => {
  let loaded = false;

  const interval = setInterval(() => {
    const body = document.querySelector("body"),
      sin = body.querySelector(".sin"),
      en = body.querySelector(".en"),
      ml1 = body.querySelector(".menu-line1"),
      ml2 = body.querySelector(".menu-line2"),
      ml3 = body.querySelector(".menu-line3"),
      ml4 = body.querySelector(".menu-line4"),
      ml5 = body.querySelector(".menu-line5"),
      ml6 = body.querySelector(".menu-line6");

    if (!loaded && ml6) {
      loaded = true;
      clearInterval(interval);
    }

    sin.addEventListener("click", () => {
      sin.classList.add("active");
      en.classList.remove("active");

      document.documentElement.setAttribute("lang", "sin");
      sessionStorage.setItem("lang", "sin");

      ml1.textContent = data["sin"]["ml1"];
      ml2.textContent = data["sin"]["ml2"];
      ml3.textContent = data["sin"]["ml3"];
      ml4.textContent = data["sin"]["ml4"];
      ml5.textContent = data["sin"]["ml5"];
      ml6.innerHTML = data["sin"]["ml6"];
    });

    en.addEventListener("click", () => {
      en.classList.add("active");
      sin.classList.remove("active");

      document.documentElement.setAttribute("lang", "en");
      sessionStorage.setItem("lang", "en");

      ml1.textContent = data["en"]["ml1"];
      ml2.textContent = data["en"]["ml2"];
      ml3.textContent = data["en"]["ml3"];
      ml4.textContent = data["en"]["ml4"];
      ml5.textContent = data["en"]["ml5"];
      ml6.innerHTML = data["en"]["ml6"];
    });

    var data = {
      sin: {
        ml1: "ජයසිංහ ඔයිල් මිල්ස්",
        ml2: "පොල්තෙල් නිෂ්පාදකයින්",
        ml3: "මූලික තොරතුරු",
        ml4: "වතු ස්ථාන",
        ml5: "ගෙවීම් තොරතුරු",
        ml6: "දැනටමත් ගිණුමක් ඇත? <a href='../signin.html'>මෙතනින් පුරන්න.</a>",
      },
      en: {
        ml1: "Jayasinghe Oil Mills",
        ml2: "Coconut Oil Manufacturers",
        ml3: "Basic Information",
        ml4: "Estate Locations",
        ml5: "Payment Details",
        ml6: "Already have an account? <a href='../signin.html'>Sign in here.</a>",
      },
    };

    checkLng();
  }, 10);
})();

window.addEventListener("load", (e) => {
  const interval = setInterval(() => {
    let loaded = false;
    var pathname = window.location.pathname;
    pathname = pathname.split("/")[2] || "";

    if (!loaded && pathname) {
      loaded = true;
      clearInterval(interval);
    }

    const vl2 = document.querySelector(".vl2"),
      circle2 = document.querySelector(".circle2"),
      ml4 = document.querySelector(".menu-line4"),
      vl3 = document.querySelector(".vl3"),
      circle3 = document.querySelector(".circle3"),
      ml5 = document.querySelector(".menu-line5");

    if (
      pathname == "signup3.html" ||
      pathname == "signup4.html" ||
      pathname == "signup5.html"
    ) {
      vl2.classList.remove("disable1");
      circle2.classList.remove("disable2");
      ml4.classList.remove("disable3");
    }
    if (pathname == "signup4.html" || pathname == "signup5.html") {
      vl3.classList.remove("disable1");
      circle3.classList.remove("disable2");
      ml5.classList.remove("disable3");
    }
  }, 10);
});
