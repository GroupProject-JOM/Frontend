var enameStatus = false,
    locationStatus = false,
    areaStatus = false,
    lang = getCookie("lang"); // current language
    
(() => {
  const body = document.querySelector("body"),
    sin = body.querySelector(".sin"),
    en = body.querySelector(".en"),
    fh = body.querySelector(".form-heading"),
    fht = body.querySelector(".form-heading-text"),
    ename = body.querySelector(".estate-name"),
    enameError = body.querySelector(".ename-error"),
    location = body.querySelector(".location"),
    locationError = body.querySelector(".location-error"),
    area = body.querySelector(".area"),
    areaError = body.querySelector(".area-error"),
    next = body.querySelector(".next"),
    skip = body.querySelector(".skip");

  sin.addEventListener("click", () => {
    sin.classList.add("active");
    en.classList.remove("active");

    document.documentElement.setAttribute("lang", "sin");
    // sessionStorage.setItem("lang", "sin");
    document.cookie = "lang=sin; path=/";
    lang = "sin";

    fh.textContent = data["sin"]["fh"];
    fht.innerHTML = data["sin"]["fht"];
    ename.placeholder = data["sin"]["ename"];
    location.placeholder = data["sin"]["location"];
    area.placeholder = data["sin"]["area"];
    next.textContent = data["sin"]["next"];
    skip.textContent = data["sin"]["skip"];
  });

  en.addEventListener("click", () => {
    en.classList.add("active");
    sin.classList.remove("active");

    document.documentElement.setAttribute("lang", "en");
    // sessionStorage.setItem("lang", "en");
    document.cookie = "lang=en; path=/";
    lang = "en";

    fh.textContent = data["en"]["fh"];
    fht.innerHTML = data["en"]["fht"];
    ename.placeholder = data["en"]["ename"];
    location.placeholder = data["en"]["location"];
    area.placeholder = data["en"]["area"];
    next.textContent = data["en"]["next"];
    skip.textContent = data["en"]["skip"];
  });

  var data = {
    sin: {
      fh: "ඔබගේ ලිපිනයන්",
      fht: "ඔබේ මූලික වතු තොරතුරු එක් කරන්න. <br /> ඔබට උපකරණ පුවරුව තුළ තවත් වතුයායන් එක් කිරීමට හැකි වනු ඇත",
      ename: "වතුයායේ නම",
      location: "ස්ථානය",
      area: "ප්රදේශය/කලාපය",
      next: "සුරකින්න",
      skip: "මඟ හරින්න",
    },
    en: {
      fh: "Estate Locations",
      fht: "Add your primary estate information. <br /> You will be able to add more estate locations inside the dashboard",
      ename: "Estate Name",
      location: "Location",
      area: "Area/Region",
      next: "Save",
      skip: "Skip",
    },
  };  

  function ename_status() {
    if (typeof ename.value === "string" && ename.value.trim().length === 0) {
      if (lang == "sin") enameError.textContent = "වතු නම හිස් විය නොහැක";
      else enameError.textContent = "Estate name cannot be empty";
      enameStatus = false;
      return false;
    } else {
      enameError.textContent = "";
      enameStatus = true;
      return true;
    }
  }

  function location_status() {
    if (
      typeof location.value === "string" &&
      location.value.trim().length === 0
    ) {
      if (lang == "sin") locationError.textContent = "ස්ථානය හිස් විය නොහැක";
      else locationError.textContent = "Location cannot be empty";
      locationStatus = false;
      return false;
    } else {
      locationError.textContent = "";
      locationStatus = true;
      return true;
    }
  }

  function area_status() {
    if (typeof area.value === "string" && area.value.trim().length === 0) {
      if (lang == "sin") areaError.textContent = "ප්‍රදේශය හිස් විය නොහැක";
      else areaError.textContent = "Area cannot be empty";
      areaStatus = false;
      return false;
    } else {
      areaError.textContent = "";
      areaStatus = true;
      return true;
    }
  }

  ename.addEventListener("input", () => {
    ename_status();
  });
  location.addEventListener("input", () => {
    location_status();
  });
  area.addEventListener("input", () => {
    area_status();
  });

  next.addEventListener("click", () => {
    if (!area_status()) {
      area.focus();
    }
    if (!location_status()) {
      location.focus();
    }
    if (!ename_status()) {
      ename.focus();
    }

    if (enameStatus && locationStatus && areaStatus) {
      var formData = {
        // supplier_id: sessionStorage.getItem("sId"),
        supplier_id: getCookie("sId"),
        estate_name: ename.value,
        estate_location: location.value,
        area: area.value,
      };
      fetch(backProxy + "/estate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      })
        .then((response) => {
          if (response.status == 200) {
            response.json().then((data) => {
              console.log(data.message);
            });
            window.location.href = frontProxy + "/signup/signup4.html";
          } else if (response.status === 400) {
            response.json().then((data) => {
              console.log(data.message);
            });
          } else {
            console.error("Error:", response.status);
          }
        })
        .catch((error) => {
          console.error("An error occurred:", error);
        });
    }
  });
})();
