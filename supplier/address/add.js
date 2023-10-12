sessionStorage.removeItem("id");
(() => {
  const body = document.querySelector("body"),
    sin = body.querySelector(".sin"),
    en = body.querySelector(".en"),
    sTitle = body.querySelector(".supply-title"),
    sText = body.querySelector(".supply-text"),
    ename = body.querySelector(".estate-name"),
    location = body.querySelector(".location"),
    dropdown = body.querySelector(".dropdown"),
    op1 = body.querySelector(".op1"),
    op2 = body.querySelector(".op2"),
    op3 = body.querySelector(".op3"),
    op4 = body.querySelector(".op4"),
    btn = body.querySelector(".form-button");

  sin.addEventListener("click", () => {
    sin.classList.add("active");
    en.classList.remove("active");

    document.documentElement.setAttribute("lang", "sin");
    sessionStorage.setItem("lang", "sin");

    sTitle.textContent = data["sin"]["sTitle"];
    sText.innerHTML = data["sin"]["sText"];
    ename.placeholder = data["sin"]["ename"];
    location.placeholder = data["sin"]["location"];
    op1.textContent = data["sin"]["op1"];
    op2.textContent = data["sin"]["op2"];
    op3.textContent = data["sin"]["op3"];
    op4.textContent = data["sin"]["op4"];
    btn.textContent = data["sin"]["btn"];
  });

  en.addEventListener("click", () => {
    en.classList.add("active");
    sin.classList.remove("active");

    document.documentElement.setAttribute("lang", "en");
    sessionStorage.setItem("lang", "en");

    sTitle.textContent = data["en"]["sTitle"];
    sText.innerHTML = data["en"]["sText"];
    ename.placeholder = data["en"]["ename"];
    location.placeholder = data["en"]["location"];
    op1.textContent = data["en"]["op1"];
    op2.textContent = data["en"]["op2"];
    op3.textContent = data["en"]["op3"];
    op4.textContent = data["en"]["op4"];
    btn.textContent = data["en"]["btn"];
  });

  var data = {
    sin: {
      sTitle: "නව වතු ස්ථානය එක් කරන්න",
      sText:
        "නව වතු ස්ථානයක් සඳහා තොරතුරු එක් කරන්න. <br />ඔබට ඕනෑම වේලාවක උපකරණ පුවරුව > ලිපිනයන් හිදී මෙම තොරතුරු සංස්කරණය කළ හැක",
      ename: "වතු නම",
      location: "ස්ථානය",
      op1: "ඔබේ ප්රදේශය තෝරන්න",
      op2: "පිළියන්දල",
      op3: "කැස්බෑව",
      op4: "ප්රදේශය51",
      btn: "එකතු කරන්න",
    },
    en: {
      sTitle: "Add New Estate Location",
      sText:
        "Add information for a new estate location. <br />You can edit these information any time at Dashboard > Addresses",
      ename: "Estate Name",
      location: "Location",
      op1: "Select your Area",
      op2: "piliyandala",
      op3: "Kasbawa",
      op4: "area51",
      btn: "Add",
    },
  };

  var enameStatus = false,
    locationStatus = false,
    dropdownStatus = false;

  btn.addEventListener("click", () => {
    if (
      typeof dropdown.value === "string" &&
      dropdown.value.trim().length === 0
    ) {
      console.log("Area cannot be empty");
      dropdown.focus();
    } else {
      dropdownStatus = true;
    }

    if (
      typeof location.value === "string" &&
      location.value.trim().length === 0
    ) {
      console.log("Location cannot be empty");
      location.focus();
    } else {
      locationStatus = true;
    }

    if (typeof ename.value === "string" && ename.value.trim().length === 0) {
      console.log("Estate name cannot be empty");
      ename.focus();
    } else {
      enameStatus = true;
    }

    if (enameStatus && locationStatus && dropdownStatus) {
      var formData = {
        supplier_id: sessionStorage.getItem("sId"),
        estate_name: ename.value,
        estate_location: location.value,
        area: dropdown.value,
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
            window.location.href = "./view-all.html";
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
