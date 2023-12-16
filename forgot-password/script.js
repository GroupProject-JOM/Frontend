(() => {
  const body = document.querySelector("body"),
    sin = body.querySelector(".sin"),
    en = body.querySelector(".en"),
    fh1 = body.querySelector(".heading1"),
    fh2 = body.querySelector(".heading2"),
    fh3 = body.querySelector(".heading3"),
    tx1 = body.querySelector(".text1"),
    tx2 = body.querySelector(".text2"),
    tx3 = body.querySelector(".text3"),
    email = body.querySelector(".email"),
    otp = body.querySelector(".otp"),
    send = body.querySelector(".send-otp"),
    verify = body.querySelector(".verify-otp");

  sin.addEventListener("click", () => {
    sin.classList.add("active");
    en.classList.remove("active");

    document.documentElement.setAttribute("lang", "sin"); // edit lang in html tag
    document.cookie = "lang=sin; path=/"; // save current language in the cookie
    lang = "sin";

    fh1.textContent = data["sin"]["fh1"];
    fh2.textContent = data["sin"]["fh2"];
    fh3.textContent = data["sin"]["fh3"];
    tx1.textContent = data["sin"]["tx1"];
    tx2.textContent = data["sin"]["tx2"];
    tx3.textContent = data["sin"]["tx3"];
    send.textContent = data["sin"]["send"];
    verify.textContent = data["sin"]["verify"];
    email.placeholder = data["sin"]["email"];
    otp.placeholder = data["sin"]["otp"];
  });

  en.addEventListener("click", () => {
    // when en is clicked
    en.classList.add("active");
    sin.classList.remove("active");

    document.documentElement.setAttribute("lang", "en"); // edit lang in html tag
    document.cookie = "lang=en; path=/"; // save current language in the cookie
    lang = "en";

    fh1.textContent = data["en"]["fh1"];
    fh2.textContent = data["en"]["fh2"];
    fh3.textContent = data["en"]["fh3"];
    tx1.textContent = data["en"]["tx1"];
    tx2.textContent = data["en"]["tx2"];
    tx3.textContent = data["en"]["tx3"];
    send.textContent = data["en"]["send"];
    verify.textContent = data["en"]["verify"];
    email.placeholder = data["en"]["email"];
    otp.placeholder = data["en"]["otp"];
  });

  var data = {
    sin: {
        fh1: "මුරපදය අමතක වුණා ද?",
        fh2: "ඔබගේ විද්‍යුත් තැපෑල තහවුරු කරන්න",
        fh3: "කේතය ඇතුලත් කරන්න",
        tx1: "මුරපදය වෙනස් කිරීමෙන් ගිණුම නැවත ලබා ගන්න",
        tx2: "කේතයක් ලබා ගැනීමට ඔබගේ ඊමේල් ලිපිනය ඇතුලත් කරන්න",
        tx3: "ඔබගේ විද්‍යුත් තැපැල් ලිපිනයට එවන ලද කේතය ඇතුලත් කරන්න",
        send: "කේතය යවන්න",
        verify: "කේතය තහවුරු කරන්න",
        email: "ඊතැපැල් ලිපිනය",
        otp: "කේතය ඇතුලත් කරන්න",
    },

    en:{
        fh1: "Forgot Password?",
        fh2: "Verify your email",
        fh3: "Enter OTP",
        tx1: "Reset and create a new password",
        tx2: "Enter your email address to get an recovery code",
        tx3: "Enter the OTP sent to your email address",
        send: "Send OTP",
        verify: "Verify OTP",
        email: "Email Address",
        otp: "Enter Code",

    },
  }
})();
