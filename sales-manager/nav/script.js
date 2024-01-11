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
      greeting = body.querySelector(".greeting"),
      l0 = body.querySelector(".l0"),
      l1 = body.querySelector(".l1"),
      l2 = body.querySelector(".l2"),
      l3 = body.querySelector(".l3"),
      l4 = body.querySelector(".l4"),
      l5 = body.querySelector(".l5"),
      l6 = body.querySelector(".l6"),
      l7 = body.querySelector(".l7"),
      l8 = body.querySelector(".l8"),
      l9 = body.querySelector(".l9"),
      l11 = body.querySelector(".l11"),
      dashboard = body.querySelector(".dashboard"),
      distributor = body.querySelector(".distributor"),
      outlet = body.querySelector(".outlet"),
      productions = body.querySelector(".productions"),
      payouts = body.querySelector(".payouts"),
      products = body.querySelector(".products"),
      Uname = body.querySelector(".name"),
      logout = document.querySelector(".logout"),
      profile = body.querySelector(".profile"),
      bars = body.querySelector(".fa-bars"),
      navHide = body.querySelector(".nav-hide");

    logout.addEventListener("click", () => {
      signout();
    });

    dashboard.href = frontProxy + "/sales-manager/";
    distributor.href = frontProxy + "/sales-manager/distributors/view-all.html";
    outlet.href = frontProxy + "/sales-manager/outlet/";
    productions.href = frontProxy + "/sales-manager/productions/view-all.html";
    payouts.href = frontProxy + "/sales-manager/payouts/view-all.html";
    products.href = frontProxy + "/sales-manager/products/view-all.html";
    profile.href = frontProxy + "/sales-manager/profile/view.html";

    if (getCookie("name") != null) Uname.textContent = getCookie("name");
    else {
      document.cookie =
        "name=" + getPayload(getCookie("jwt")).name + "; path=/";
      Uname.textContent = getCookie("name");
    }

    if (!loaded && toggle && modeSwitch) {
      loaded = true;
      clearInterval(interval);
    }

    toggle.addEventListener("click", () => {
      sidebar.classList.toggle("close");
    });

    navHide.addEventListener("click", () => {
      sidebar.classList.remove("sidebar-active");
      bars.style.display = "block";
    });

    modeSwitch.addEventListener("click", () => {
      body.classList.toggle("dark");
      if (body.classList.contains("dark")) {
        document.cookie = "mode=dark; path=/";
        modeText.innerHTML = modeTranslate();
      } else {
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
      l5.textContent = data["sin"]["l5"]; 
      l6.textContent = data["sin"]["l6"];
      l7.textContent = data["sin"]["l7"];
      l8.textContent = data["sin"]["l8"];
      l9.textContent = modeTranslate();
      l11.textContent = data["sin"]["l11"];
    });

    en.addEventListener("click", () => {
      l0.textContent = data["en"]["l0"];
      l1.textContent = data["en"]["l1"];
      l2.textContent = data["en"]["l2"];
      l3.textContent = data["en"]["l3"];
      l4.textContent = data["en"]["l4"];
      l5.textContent = data["en"]["l5"];
      l6.textContent = data["en"]["l6"];
      l7.textContent = data["en"]["l7"];
      l8.textContent = data["en"]["l8"];
      l9.textContent = modeTranslate();
      l11.textContent = data["en"]["l11"];
    });

    var data = {
      sin: {
        l0: "පරිශීලක ක්‍රියා",
        l1: "බෙදාහරින්නන්",
        l2: "අලෙවිසැල්",
        l3: "නිෂ්පාදන",
        l4: "ගෙවීම්",
        l5: "නිෂ්පාදන",
        l6: "ප්‍රධාන ක්‍ර්‍රියා",
        l7: "පැතිකඩ බලන්න",
        l8: "ගිණුමෙන් ඉවත් වන්න",
        l11: "උපකරණ පුවරුව",
      },
      en: {
        l0: "USER ACTIONS",
        l1: "Distributors",
        l2: "Outlets",
        l3: "Productions",
        l4: "Payouts",
        l5: "Products",
        l6: "MAIN ACTIONS",
        l7: "View Profile",
        l8: "Log Out",
        l11: "Dashboard",
      },
    };

    bars.addEventListener("click", () => {
      sidebar.classList.add("sidebar-active");
      sidebar.style.display = "block";
      bars.style.display = "none";
      if (window.innerWidth <= 718) {
        document.body.addEventListener("click", (e) => {
          if (!sidebar.contains(e.target) && !bars.contains(e.target)) {
            sidebar.classList.remove("sidebar-active");
            bars.style.display = "block";
          }
        });
      }
    });

    setGreeting();
    checkLng();
    checkMode();
  }, 10);
})();

window.addEventListener("load", (e) => {
  const interval = setInterval(() => {
    let loaded = false;
    var pathname = window.location.pathname;
    pathname = pathname.split("/")[2] || "";
    pathname = pathname.split(".")[0];

    if (!pathname) {
      document.querySelector(`#nav-item-index`).classList.add("active");
    }
    // pathname = pathname.replace(".html", "");
    const navItems = [
      "distributors",
      "productions",
      "payouts",
      "outlet",
      "products",
      "index",
      "profile",
    ];
    if (!loaded && pathname) {
      loaded = true;
      clearInterval(interval);
    }

    for (const navItem of navItems) {
      const nav = document.querySelector(`#nav-item-${pathname}`);

      if (!nav) continue;

      if (navItem == pathname) {
        nav.classList.add("active");
        break;
      } else {
        nav.classList.remove("active");
      }
    }
    if (!pathname) clearInterval(interval);
  }, 10);
});
