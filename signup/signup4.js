(() => {
    const body = document.querySelector("body"),
      sin = body.querySelector(".sin"),
      en = body.querySelector(".en"),
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
  
      
      fh.textContent = data["en"]["fh"];
      fht.innerHTML = data["en"]["fht"];
      hname.placeholder = data["en"]["hname"];
      acc.placeholder = data["en"]["acc"];
      bank.placeholder = data["en"]["bank"];
      next.textContent = data["en"]["next"];
    });
  
    var data = {
      sin: {
       
        fh: "ගෙවීම් තොරතුරු",
        fht: "ඔබගේ බැංකු ගිණුම් විස්තර එක් කරන්න. <br />ඔබට උපකරණ පුවරුව තුළ ගෙවීම් ක්‍රම සංස්කරණය කිරීමට හැකි වනු ඇත",
        hname: "ගිණුම් හිමියාගේ නම",
        acc: "ගිණුම් අංකය.",
        bank: "බැංකුව",
        next: "ඊළඟ",
      },
      en: {
        
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
  