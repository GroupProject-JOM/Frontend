document.cookie = "id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";

(() => {
  const body = document.querySelector("body"),
    sin = body.querySelector(".sin"),
    en = body.querySelector(".en"),
    t1 = body.querySelector(".stockmg-t1"),
    tx1 = body.querySelector(".stockmg-tx1"),
    t2 = body.querySelector(".stockmg-t2"),
    tx2 = body.querySelector(".stockmg-tx2"),
    t3 = body.querySelector(".stockmg-t3"),
    tx3 = body.querySelector(".stockmg-tx3"),
    tbody = body.querySelector(".tbody");

  var lang = getCookie("lang"); // current language

  sin.addEventListener("click", () => {
    sin.classList.add("active");
    en.classList.remove("active");

    document.documentElement.setAttribute("lang", "sin");
    // sessionStorage.setItem("lang", "sin");
    document.cookie = "lang=sin; path=/";
    lang = "sin";

    t1.textContent = data["sin"]["t1"];
    tx1.textContent = data["sin"]["tx1"];
    t2.textContent = data["sin"]["t2"];
    tx2.textContent = data["sin"]["tx2"];
    t3.textContent = data["sin"]["t3"];
    tx3.textContent = data["sin"]["tx3"];
    setGreeting();
  });

  en.addEventListener("click", () => {
    en.classList.add("active");
    sin.classList.remove("active");

    document.documentElement.setAttribute("lang", "en");
    // sessionStorage.setItem("lang", "en");
    document.cookie = "lang=en; path=/";
    lang = "en";

    t1.textContent = data["en"]["t1"];
    tx1.textContent = data["en"]["tx1"];
    t2.textContent = data["en"]["t2"];
    tx2.textContent = data["en"]["tx2"];
    t3.textContent = data["en"]["t3"];
    tx3.textContent = data["en"]["tx3"];
    setGreeting();
  });

  var data = {
    sin: {
      t1: "පිළිගත් එකතු කිරීම්",
      tx1: "එකතු කළ යුතු සියලුම පිළිගත් සැපයුම් ඉල්ලීම්",
      t2: "ප්‍රතික්ෂේප කළ එකතු කිරීම්",
      tx2: "ප්‍රතික්ෂේප කරන ලද සියලුම සැපයුම් ඉල්ලීම්",
      t3: "සම්පුර්ණ කෙරූ එකතු කිරීම්",
      tx3: "සම්පුර්ණ කරන ලද සියලුම පොල් එකතු කිරීම්",
    },
    en: {
      t1: "Accepted Collections",
      tx1: "All accepted supply requests that has to be collected",
      t2: "Declined Collections",
      tx2: "All declined supply requests",
      t3: "Completed Collections",
      tx3: "All completed coconut collections",
    },
  };
})();
