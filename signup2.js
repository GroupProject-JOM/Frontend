(() => {
    const body = document.querySelector("body"),
      sin = body.querySelector(".sin"),
      en = body.querySelector(".en"),
      ml1 = body.querySelector(".menu-line1"),
      ml2 = body.querySelector(".menu-line2"),
      ml3 = body.querySelector(".menu-line3"),
      ml4 = body.querySelector(".menu-line4"),
      ml5 = body.querySelector(".menu-line5"),
      fh = body.querySelector(".form-heading"),
      fht = body.querySelector(".form-heading-text"),
      ename = body.querySelector(".estate-name"),
      location = body.querySelector(".location"),
      area = body.querySelector(".area"),
      next = body.querySelector(".next");

  
    sin.addEventListener("click", () => {
      sin.classList.add("active");
      en.classList.remove("active");
  
      document.documentElement.setAttribute("lang", "sin");
      sessionStorage.setItem("lang", "sin");
  
      ml1.textContent = data["sin"]["ml1"];
      ml2.textContent = data["sin"]["ml2"];
      ml3.textContent = data["sin"]["ml3"];
      ml4.innerHTML = data["sin"]["ml4"];
      ml5.textContent = data["sin"]["ml5"];
      fh.textContent = data["sin"]["fh"];
      fht.textContent = data["sin"]["fht"];
      ename.placeholder = data["sin"]["ename"];
      location.placeholder = data["sin"]["location"];
      area.placeholder = data["sin"]["area"];
      next.textContent = data["sin"]["next"];
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
      fh.textContent = data["en"]["fh"];
      fht.textContent = data["en"]["fht"];
      ename.placeholder = data["en"]["ename"];
      location.placeholder = data["en"]["location"];
      area.placeholder = data["en"]["area"];
      next.textContent = data["en"]["next"];
    });
  
    var data = {
      sin: {
        ml1: "ජයසිංහ ඔයිල් මිල්ස්",
        ml2: "පොල්තෙල් නිෂ්පාදකයින්",
        ml3: "මූලික තොරතුරු",
        ml4: "වතු ස්ථාන",
        ml5: "ගෙවීම් තොරතුරු",
        fh: "වතු ස්ථාන",
        fht: "ඔබේ මූලික වතු තොරතුරු එක් කරන්න. <br /> ඔබට උපකරණ පුවරුව තුළ තවත් වතු ස්ථාන එක් කිරීමට හැකි වනු ඇත",
        ename: "වතු නම",
        location: "ස්ථානය",
        area: "ප්රදේශය/කලාපය",
        next: "ඊළඟ",
      },
      en: {
        ml1: "Jayasinghe Oil Mills",
        ml2: "Coconut Oil Manufacturers",
        ml3: "Basic Information",
        ml4: "Estate Locations",
        ml5: "Payment Details",
        fh: "Estate Locations",
        fht: "Add your primary estate information. <br /> You will be able to add more estate locations inside the dashboard",
        ename: "Estate Name",
        location: "Location",
        area: "Area/Region",
        next: "Next",
      },
    };
  
    checkLng();
  })();
  