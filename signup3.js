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
      hname = body.querySelector(".acc-holder-name"),
      acc = body.querySelector(".acc-no"),
      bank = body.querySelector(".bank"),
      next = body.querySelector(".next");

  
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
      fh.textContent = data["sin"]["fh"];
      fht.innerHTML = data["sin"]["fht"];
      hname.placeholder = data["sin"]["hname"];
      acc.placeholder = data["sin"]["acc"];
      bank.placeholder = data["sin"]["bank"];
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
      fht.innerHTML = data["en"]["fht"];
      hname.placeholder = data["en"]["hname"];
      acc.placeholder = data["en"]["acc"];
      bank.placeholder = data["en"]["bank"];
      next.textContent = data["en"]["next"];
    });
  
    var data = {
      sin: {
        ml1: "ජයසිංහ ඔයිල් මිල්ස්",
        ml2: "පොල්තෙල් නිෂ්පාදකයින්",
        ml3: "මූලික තොරතුරු",
        ml4: "වතු ස්ථාන",
        ml5: "ගෙවීම් තොරතුරු",
        fh: "ගෙවීම් තොරතුරු",
        fht: "ඔබගේ බැංකු ගිණුම් විස්තර එක් කරන්න. <br />ඔබට උපකරණ පුවරුව තුළ ගෙවීම් ක්‍රම සංස්කරණය කිරීමට හැකි වනු ඇත",
        hname: "ගිණුම් හිමියාගේ නම",
        acc: "ගිණුම් අංකය.",
        bank: "බැංකුව",
        next: "ඊළඟ",
      },
      en: {
        ml1: "Jayasinghe Oil Mills",
        ml2: "Coconut Oil Manufacturers",
        ml3: "Basic Information",
        ml4: "Estate Locations",
        ml5: "Payment Details",
        fh: "Payment Details",
        fht: "Add your bank account details. <br />You will be able to edit payment methods inside the dashboard",
        hname: "Account Holder Name",
        acc: "Account No.",
        bank: "Bank",
        next: "Next",
      },
    };
  
    checkLng();
  })();
  