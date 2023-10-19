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
    c5 = body.querySelector(".c5"),
    c6 = body.querySelector(".c6"),
    c7 = body.querySelector(".c7");

  sin.addEventListener("click", () => {
    sin.classList.add("active");
    en.classList.remove("active");

    document.documentElement.setAttribute("lang", "sin");
    // sessionStorage.setItem("lang", "sin");
    document.cookie="lang=sin; path=/";

    w1.textContent = data["sin"]["w1"];
    w2.textContent = data["sin"]["w2"];
    c1.textContent = data["sin"]["c1"];
    c2.textContent = data["sin"]["c2"];
    c4.textContent = data["sin"]["c4"];
    c5.textContent = data["sin"]["c5"];
    c6.textContent = data["sin"]["c6"];
    c7.textContent = data["sin"]["c7"];
    setGreeting();
  });

  en.addEventListener("click", () => {
    en.classList.add("active");
    sin.classList.remove("active");

    document.documentElement.setAttribute("lang", "en");
    // sessionStorage.setItem("lang", "en");
    document.cookie="lang=en; path=/";

    w1.textContent = data["en"]["w1"];
    w2.textContent = data["en"]["w2"];
    c1.textContent = data["en"]["c1"];
    c2.textContent = data["en"]["c2"];
    c4.textContent = data["en"]["c4"];
    c5.textContent = data["en"]["c5"];
    c6.textContent = data["en"]["c6"];
    c7.textContent = data["en"]["c7"];
    setGreeting();
  });

  var data = {
    sin: {
      w1: "අද මුළු එකතුව",
      w2: "අද ඉතිරිය",
      c1: "නිෂ්පාදන ඉල්ලීම් දළ විශ්ලේෂණය",
      c2: "නිෂ්පාදන කළමනාකරු ඉල්ලීම් බලන්න සහ යාවත්කාලීන කරන්න",
      c4: "සැපයුම්කරු ඉල්ලීම් දළ විශ්ලේෂණය",
      c5: "සැපයුම්කරුගේ ඉල්ලීම් බලන්න සහ යාවත්කාලීන කරන්න",
      c6: "කොටස් තොරතුරු",
      c7: "වර්ණ-කේතගත කොටස් තොරතුරු බලන්න",
    },
    en: {
      w1: "Today's Total",
      w2: "Today's Remaining",
      c1: "Production Requests Overview",
      c2: "View and update production manager requests",
      c4: "Supplier Requests Overview",
      c5: "View and update Supplier requests",
      c6: "Stock Information",
      c7: "View color-coded stock information",
    },
  };
    
})();
