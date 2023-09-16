(() => {
  const body = document.querySelector("body"),
    sin = body.querySelector(".sin"),
    en = body.querySelector(".en"),
    modeSwitch = body.querySelector(".toggle-switch"),
    w1 = body.querySelector(".w1"),
    w2 = body.querySelector(".w2"),
    c1 = body.querySelector(".c1"),
    c2 = body.querySelector(".c2"),
    c4 = body.querySelector(".c4"),
    c5 = body.querySelector(".c5");

  sin.addEventListener("click", () => {
    sin.classList.add("active");
    en.classList.remove("active");

    document.documentElement.setAttribute("lang", "sin");
    sessionStorage.setItem("lang", "sin");

    w1.textContent = data["sin"]["w1"];
    w2.textContent = data["sin"]["w2"];
    c1.textContent = data["sin"]["c1"];
    c2.textContent = data["sin"]["c2"];
    c4.textContent = data["sin"]["c4"];
    c5.textContent = data["sin"]["c5"];
    setGreeting();
  });

  en.addEventListener("click", () => {
    en.classList.add("active");
    sin.classList.remove("active");

    document.documentElement.setAttribute("lang", "en");
    sessionStorage.setItem("lang", "en");

    w1.textContent = data["en"]["w1"];
    w2.textContent = data["en"]["w2"];
    c1.textContent = data["en"]["c1"];
    c2.textContent = data["en"]["c2"];
    c4.textContent = data["en"]["c4"];
    c5.textContent = data["en"]["c5"];
    setGreeting();
  });

  var data = {
    sin: {
      w1: "මුළු විකුණුම් පරිමාව",
      w2: "පොරොත්තු ගෙවීම්",
      c1: "විකුණුම් දත්ත",
      c2: "මාසික විකුණුම් දත්ත දෘශ්‍යකරණය",
      c4: "බෙදාහරින්නාගේ විකුණුම්",
      c5: "එක් එක් බෙදාහරින්නා සඳහා විකුණුම් දත්ත දෘශ්‍යකරණය",
    },
    en: {
      w1: "Total Sales Volume",
      w2: "Pending Payments",
      c1: "Sales Data",
      c2: "Monthly Sales Data Visualisation",
      c4: "Disributor Sales",
      c5: "Sales Data Visualisation for each distributor",
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
