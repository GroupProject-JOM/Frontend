(() => {
  const body = document.querySelector("body"),
    sin = body.querySelector(".sin"),
    en = body.querySelector(".en"),
    ml1 = body.querySelector(".menu-line1"),
    ml2 = body.querySelector(".menu-line2"),
    ml3 = body.querySelector(".menu-line3"),
    ml4 = body.querySelector(".menu-line4"),
    ml5 = body.querySelector(".menu-line5"),
    ml6 = body.querySelector(".menu-line6"),
    fh1 = body.querySelector(".form-heading1"),
    fh2 = body.querySelector(".form-heading2"),
    fht1 = body.querySelector(".form-heading-text1"),
    fht2 = body.querySelector(".form-heading-text2"),
    eotp = body.querySelector(".email-otp"),
    potp = body.querySelector(".phone-otp"),
    next = body.querySelector(".next"),
    vbt1 = body.querySelector(".vb1"),
    vbt2 = body.querySelector(".vb2");


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
    ml6.innerHTML = data["sin"]["ml6"];
    fh1.textContent = data["sin"]["fh1"];
    fh2.textContent = data["sin"]["fh2"];
    fht1.innerHTML = data["sin"]["fht1"];
    fht2.innerHTML = data["sin"]["fht2"];
    eotp.placeholder = data["sin"]["eotp"];
    potp.placeholder = data["sin"]["potp"];

    next.textContent = data["sin"]["next"];
    vbt1.textContent = data["sin"]["vbt1"];
    vbt2.textContent = data["sin"]["vbt2"];

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
    ml6.innerHTML = data["en"]["ml6"];
    fh1.textContent = data["en"]["fh1"];
    fh2.textContent = data["en"]["fh2"];
    fht1.innerHTML = data["en"]["fht1"];
    fht2.innerHTML = data["en"]["fht2"];
    eotp.placeholder = data["en"]["eotp"];
    potp.placeholder = data["en"]["potp"];
    next.textContent = data["en"]["next"];
    vbt1.textContent = data["en"]["vbt1"];
    vbt2.textContent = data["en"]["vbt2"];

  });

  var data = {
    sin: {
      ml1: "ජයසිංහ ඔයිල් මිල්ස්",
      ml2: "පොල්තෙල් නිෂ්පාදකයින්",
      ml3: "මූලික තොරතුරු",
      ml4: "වතු ස්ථාන",
      ml5: "ගෙවීම් තොරතුරු",
      ml6: "දැනටමත් ගිණුමක් ඇත? <span>මෙතනින් පුරන්න.</span>",
      fh1: "ඔබගේ විද්‍යුත් තැපෑල තහවුරු කරන්න",
      fh2: "ඔබගේ දුරකථනය තහවුරු කරන්න",
      fht1: "[සැපයුම්කරු-ඊමේල්] වෙත යැවූ OTP ඇතුලත් කරන්න <br /> වැරදි විද්‍යුත් තැපැල් ලිපිනයක්ද?",
      fht2: "[සැපයුම්කරු-දුරකථනය] වෙත යැවූ OTP ඇතුලත් කරන්න <br /> වැරදි විද්‍යුත් තැපැල් ලිපිනයක්ද?",
      eotp: "කේතය ඇතුලත් කරන්න",
      potp: "කේතය ඇතුලත් කරන්න",
      next: "ඊළඟ",
      vbt1: "තහවුරු කරන්න",
      vbt2: "තහවුරු කරන්න",
    },
    en: {
      ml1: "Jayasinghe Oil Mills",
      ml2: "Coconut Oil Manufacturers",
      ml3: "Basic Information",
      ml4: "Estate Locations",
      ml5: "Payment Details",
      ml6: "Already have an account? <span>Sign in here.</span>",
      fh1: "Verify your email",
      fh2: "Verify your mobile",
      fht1: "Enter the OTP Sent to [supplier-email] <br /> Wrong Email Address?",
      fht2: "Enter the OTP Sent to [supplier-phone] <br /> Wrong Phone Number?",
      eotp: "Enter Code",
      potp: "Enter Code",
      next: "Next",
      vbt1: "Verify",
      vbt2: "Verify",

    },
  };

  checkLng();
})();
