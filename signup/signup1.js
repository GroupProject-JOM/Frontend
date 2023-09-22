(() => {
    const body = document.querySelector("body"),
      sin = body.querySelector(".sin"),
      en = body.querySelector(".en"),
      fh = body.querySelector(".form-heading"),
      fname = body.querySelector(".fname"),
      lname = body.querySelector(".lname"),
      email = body.querySelector(".email"),
      password = body.querySelector(".password"),
      phone = body.querySelector(".phone"),
      address = body.querySelector(".address"),
      address1 = body.querySelector(".address1"),
      address2 = body.querySelector(".address2"),
      address3 = body.querySelector(".address3"),
      next = body.querySelector(".next");

  
    sin.addEventListener("click", () => {
      sin.classList.add("active");
      en.classList.remove("active");
  
      document.documentElement.setAttribute("lang", "sin");
      sessionStorage.setItem("lang", "sin");
  
      fh.textContent = data["sin"]["fh"];
      fname.placeholder = data["sin"]["fname"];
      lname.placeholder = data["sin"]["lname"];
      email.placeholder = data["sin"]["email"];
      password.placeholder = data["sin"]["password"];
      phone.placeholder = data["sin"]["phone"];
      address.textContent = data["sin"]["address"];
      address1.placeholder = data["sin"]["address1"];
      address2.placeholder = data["sin"]["address2"];
      address3.placeholder = data["sin"]["address3"];
      next.textContent = data["sin"]["next"];
    });
  
    en.addEventListener("click", () => {
      en.classList.add("active");
      sin.classList.remove("active");
  
      document.documentElement.setAttribute("lang", "en");
      sessionStorage.setItem("lang", "en");
  
      fh.textContent = data["en"]["fh"];
      fname.placeholder = data["en"]["fname"];
      lname.placeholder = data["en"]["lname"];
      email.placeholder = data["en"]["email"];
      password.placeholder = data["en"]["password"];
      phone.placeholder = data["en"]["phone"];
      address.textContent = data["en"]["address"];
      address1.placeholder = data["en"]["address1"];
      address2.placeholder = data["en"]["address2"];
      address3.placeholder = data["en"]["address3"];
      next.textContent = data["en"]["next"];
    });
  
    var data = {
      sin: {
        
        fh: "මූලික තොරතුරු",
        fname: "මුල් නම",
        lname: "අවසන් නම",
        email: "ඊතැපැල් ලිපිනය",
        password: "මුරපදය සාදන්න",
        phone: "දුරකථන අංකය",
        address: "පුද්ගලික ලිපිනය",
        address1: "ලිපින පේළි 1",
        address2: "වීදිය",
        address3: "නගරය",
        next: "ඊළඟ",
      },
      en: {
        fh: "Basic Information",
        fname: "First name",
        lname: "Last name",
        email: "Email Address",
        password: "Create Password",
        phone: "Phone Number",
        address: "Personal Address",
        address1: "Address Line 1",
        address2: "Street",
        address3: "City",
        next: "Next",
      },
    };
  
    checkLng();
  })();
  