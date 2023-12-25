(() => {
  const body = document.querySelector("body"),
    sin = body.querySelector(".sin"),
    en = body.querySelector(".en"),
    pTitle = body.querySelector(".salesmg-title"),
    pText = body.querySelector(".salesmg-text"),
    closeBtn1 = body.querySelector(".close-btn1"),
    closeBtn2 = body.querySelector(".close-btn2"),
    closeBtn3 = body.querySelector(".close-btn3"),
    overlay1 = body.querySelector(".overlay1"),
    overlay2 = body.querySelector(".overlay2"),
    overlay3 = body.querySelector(".overlay3"),
    edit = body.querySelector(".edit-btn"),
    add = body.querySelector(".add");


  var lang = getCookie("lang"); // current language

  overlay1.addEventListener("click", (e) => {
    if (e.target.id === "overlay1") {
      overlay1.style.display = "none";
      document.querySelector(".view-product-container").style.display = "none";
    }
  });

  closeBtn1.addEventListener("click", () => {
    overlay1.style.display = "none";
    document.querySelector(".view-product-container").style.display = "none";
  });

  overlay2.addEventListener("click", (e) => {
    if (e.target.id === "overlay2") {
      overlay2.style.display = "none";
      document.querySelector(".add-product-container").style.display = "none";
    }
  });

  closeBtn2.addEventListener("click", () => {
    overlay2.style.display = "none";
    document.querySelector(".add-product-container").style.display = "none";
  });

  add.addEventListener("click", () => {
    overlay2.style.display = "block";
    document.querySelector(".add-product-container").style.display = "block";
  });
  
  edit.addEventListener("click", () => {
    overlay3.style.display = "block";
    document.querySelector(".edit-product-container").style.display = "block";
  });
  
  overlay3.addEventListener("click", (e) => {
    if (e.target.id === "overlay3") {
      overlay3.style.display = "none";
      document.querySelector(".edit-product-container").style.display = "none";
    }
  });
  
  closeBtn3.addEventListener("click", () => {
    overlay3.style.display = "none";
    document.querySelector(".edit-product-container").style.display = "none";
  });
  
  

  sin.addEventListener("click", () => {
    sin.classList.add("active");
    en.classList.remove("active");

    document.documentElement.setAttribute("lang", "sin");
    document.cookie = "lang=sin; path=/";
    lang = "sin";

    pTitle.textContent = data["sin"]["pTitle"];
    pText.innerHTML = data["sin"]["pText"];

    add.textContent = data["sin"]["add"];

    setGreeting();
  });

  en.addEventListener("click", () => {
    en.classList.add("active");
    sin.classList.remove("active");

    document.documentElement.setAttribute("lang", "en");
    document.cookie = "lang=en; path=/";
    lang = "en";

    pTitle.textContent = data["en"]["pTitle"];
    pText.innerHTML = data["en"]["pText"];
    add.textContent = data["en"]["add"];
    setGreeting();
  });

  var data = {
    sin: {
      pTitle: "නිෂ්පාදන",
      pText: "සමාගමේ නිෂ්පාදන විස්තර බලන්න සහ සංස්කරණය කරන්න",
      add: "අලුතින් එකතු කරන්න",
    },
    en: {
      pTitle: "Products",
      pText: "View and edit company product details",
      add: "Add New",
    },
  };
})();
