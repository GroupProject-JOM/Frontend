(() => {
  const body = document.querySelector("body"),
    sin = body.querySelector(".sin"),
    en = body.querySelector(".en"),
    fh1 = body.querySelector(".form-heading1"),
    fh2 = body.querySelector(".form-heading2"),
    fht1 = body.querySelector(".form-heading-text1"),
    fht2 = body.querySelector(".form-heading-text2"),
    fht3 = body.querySelector(".form-heading-text3"),
    fht4 = body.querySelector(".form-heading-text4"),
    eotp = body.querySelector(".email-otp"),
    potp = body.querySelector(".phone-otp"),
    // next = body.querySelector(".next"),
    vbt1 = body.querySelector(".vb1"),
    vbt2 = body.querySelector(".vb2");

  var email = sessionStorage.getItem("email"),
    phone = sessionStorage.getItem("phone");

  sin.addEventListener("click", () => {
    sin.classList.add("active");
    en.classList.remove("active");

    document.documentElement.setAttribute("lang", "sin");
    sessionStorage.setItem("lang", "sin");

    fh1.textContent = data["sin"]["fh1"];
    fh2.textContent = data["sin"]["fh2"];
    fht1.textContent = data["sin"]["fht1"];
    fht2.textContent = data["sin"]["fht2"];
    fht3.textContent = data["sin"]["fht3"];
    fht4.textContent = data["sin"]["fht4"];
    eotp.placeholder = data["sin"]["eotp"];
    potp.placeholder = data["sin"]["potp"];

    // next.textContent = data["sin"]["next"];
    vbt1.textContent = data["sin"]["vbt1"];
    vbt2.textContent = data["sin"]["vbt2"];
  });

  en.addEventListener("click", () => {
    en.classList.add("active");
    sin.classList.remove("active");

    document.documentElement.setAttribute("lang", "en");
    sessionStorage.setItem("lang", "en");

    fh1.textContent = data["en"]["fh1"];
    fh2.textContent = data["en"]["fh2"];
    fht1.textContent = data["en"]["fht1"];
    fht2.textContent = data["en"]["fht2"];
    fht3.textContent = data["en"]["fht3"];
    fht4.textContent = data["en"]["fht4"];
    eotp.placeholder = data["en"]["eotp"];
    potp.placeholder = data["en"]["potp"];
    // next.textContent = data["en"]["next"];
    vbt1.textContent = data["en"]["vbt1"];
    vbt2.textContent = data["en"]["vbt2"];
  });

  var data = {
    sin: {
      fh1: "ඔබගේ විද්‍යුත් තැපෑල තහවුරු කරන්න",
      fh2: "ඔබගේ දුරකථනය තහවුරු කරන්න",
      fht1: email+ " වෙත යැවූ OTP ඇතුලත් කරන්න",
      fht2: "වැරදි විද්‍යුත් තැපැල් ලිපිනයක්ද?",
      fht3: phone +" වෙත යැවූ OTP ඇතුලත් කරන්න",
      fht4: "වැරදි දුරකථන අංකයක්ද?",
      eotp: "කේතය ඇතුලත් කරන්න",
      potp: "කේතය ඇතුලත් කරන්න",
      next: "ඊළඟ",
      vbt1: "තහවුරු කරන්න",
      vbt2: "තහවුරු කරන්න",
    },
    en: {
      fh1: "Verify your email",
      fh2: "Verify your mobile",
      fht1: "Send OTP to "+ email,
      fht2: "Wrong Email Address?",
      fht3: "Send OTP to "+ phone,
      fht4: "Wrong Phone Number?",
      eotp: "Enter Code",
      potp: "Enter Code",
      next: "Next",
      vbt1: "Verify",
      vbt2: "Verify",
    },
  };

  checkLng();
})();
