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
    btn = body.querySelector(".form-button"),
    confirm = body.querySelector(".confirm-password"),
    password = body.querySelector(".new-password");

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
    password.placeholder = data["sin"]["password"];
    confirm.placeholder = data["sin"]["confirm"];
    btn.textContent = data["sin"]["btn"];
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
    btn.textContent = data["en"]["btn"];
    password.placeholder = data["en"]["password"];
    confirm.placeholder = data["en"]["confirm"];
  });

  var data = {
    sin: {
      fh1: "මුරපදය අමතක වුණා ද?",
      fh2: "ඔබගේ විද්‍යුත් තැපෑල තහවුරු කරන්න",
      fh3: "කේතය ඇතුලත් කරන්න",
      tx1: "මුරපදය වෙනස් කිරීමෙන් ගිණුම නැවත ලබා ගන්න",
      tx2: "කේතයක් ලබා ගැනීමට ඔබගේ ඊමේල් ලිපිනය ඇතුලත් කරන්න",
      tx3: "ඔබගේ විද්‍යුත් තැපැල් ලිපිනයට එවන ලද කේතය ඇතුලත් කරන්න",
      btn: "මුරපදය සුරකින්න",
      password: "ඊතැපැල් ලිපිනය",
      confirm: "කේතය ඇතුලත් කරන්න",
    },

    en: {
      fh1: "Change Password",

      tx1: "Reset and create a password password",
      tx2: "New Password",
      tx3: "Confirm Password",
      btn: "Save Password",
      password: "Create new password",
      confirm: "Confirm password",
    },
  };
})();
