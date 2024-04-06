if (getCookie("jwt-forgot") == null || getCookie("jwt-forgot").length == 0)
  window.location.href = frontProxy + "/signin.html";

(() => {
  const body = document.querySelector("body"),
    sin = body.querySelector(".sin"),
    en = body.querySelector(".en"),
    fh1 = body.querySelector(".heading1"),
    // fh2 = body.querySelector(".heading2"),
    // fh3 = body.querySelector(".heading3"),
    tx1 = body.querySelector(".text1"),
    tx2 = body.querySelector(".text2"),
    tx3 = body.querySelector(".text3"),
    btn = body.querySelector(".form-button"),
    confirmError = body.querySelector(".confirm-password-error"),
    passwordError = body.querySelector(".new-password-error"),
    confirm = body.querySelector(".confirm-password"),
    password = body.querySelector(".new-password");

  var lang = getCookie("lang"); // current language

  sin.addEventListener("click", () => {
    sin.classList.add("active");
    en.classList.remove("active");

    document.documentElement.setAttribute("lang", "sin"); // edit lang in html tag
    document.cookie = "lang=sin; path=/"; // save current language in the cookie
    lang = "sin";

    fh1.textContent = data["sin"]["fh1"];
    // fh2.textContent = data["sin"]["fh2"];
    // fh3.textContent = data["sin"]["fh3"];
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
    // fh2.textContent = data["en"]["fh2"];
    // fh3.textContent = data["en"]["fh3"];
    tx1.textContent = data["en"]["tx1"];
    tx2.textContent = data["en"]["tx2"];
    tx3.textContent = data["en"]["tx3"];
    btn.textContent = data["en"]["btn"];
    password.placeholder = data["en"]["password"];
    confirm.placeholder = data["en"]["confirm"];
  });

  var data = {
    sin: {
      fh1: "මුරපදය වෙනස් කරන්න",
      tx1: "නැවත සකස් කර මුරපද මුරපදයක් සාදන්න",
      tx2: "නව මුරපදය",
      tx3: "මුරපදය තහවුරු කරන්න",
      btn: "මුරපදය සුරකින්න",
      password: "නව මුරපදයක් සාදන්න",
      confirm: "මුරපදය තහවුරු කරන්න",
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

  var passwordStatus = false,
    confirmStatus = false,
    match = false;

  password.addEventListener("input", () => {
    password_status_func();
  });
  confirm.addEventListener("input", () => {
    confirm_status_func();
  });

  btn.addEventListener("click", () => {
    if (!password_status_func()) {
      password.focus();
    }
    if (!confirm_status_func()) {
      confirm.focus();
    }

    if (password.value === confirm.value) {
      match = true;
    } else {
      if (lang == "sin") {
        passwordError.textContent = "මුර පද ගැලපෙන්නේ නැත";
        confirmError.textContent = "මුර පද ගැලපෙන්නේ නැත";
      } else {
        passwordError.textContent = "Passwords do not match";
        confirmError.textContent = "Passwords do not match";
      }
      password.focus();
      match = false;
    }

    if (passwordStatus && confirmStatus && match) {
      fetch(backProxy + "/forgot-password?password=" + password.value, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
        .then((response) => {
          if (response.status == 200) {
            response.json().then((data) => {
              log(data.message);
            });
            if (lang == "sin") {
              var title = "සාර්ථකයි!",
                text = "ඔබගේ මුරපදය සාර්ථකව වෙනස් කර ඇත.";
            } else {
              var title = "Successful!",
                text = "Your password is changed successfully.";
            }
            // sweet alert
            Swal.fire({
              title: title,
              text: text,
              icon: "success",
              confirmButtonColor: confirmButtonColor,
            }).then((response) => {
              document.cookie =
                "jwt-forgot=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
              window.location.href = "../signin.html";
            });
          } else if (response.status === 401) {
            if (lang == "sin") Command: toastr["error"]("වලංගු නොවන පරිශීලක");
            else Command: toastr["error"]("Invalid User");
          } else {
            console.error("Error:", response.status);
            Command: toastr["error"](response.status, "Error");
          }
        })
        .catch((error) => {
          console.error("An error occurred:", error);
          Command: toastr["error"](error);
        });
    }
  });

  function password_status_func() {
    if (
      typeof password.value === "string" &&
      password.value.trim().length === 0
    ) {
      if (lang == "sin") passwordError.textContent = "නව මුරපදය හිස් විය නොහැක";
      else passwordError.textContent = "New password cannot be empty";
      passwordStatus = false;
      return false;
    } else if (
      typeof password.value === "string" &&
      password.value.trim().length < 6
    ) {
      if (lang == "sin")
        passwordError.textContent =
          "මුරපදයේ දිග 6 ට වඩා වැඩි හෝ සමාන විය යුතුය";
      else
        passwordError.textContent =
          "Password length must be greater than or equal to 6";
      passwordStatus = false;
      return false;
    } else if (!hasNumber(password.value)) {
      if (lang == "sin")
        passwordError.textContent =
          "මුරපදයේ අවම වශයෙන් ඉලක්කම් එකක්වත් අඩංගු විය යුතුය";
      else
        passwordError.textContent = "Password must contain at least one digit";
      passwordStatus = false;
      return false;
    } else if (!hasLetter(password.value)) {
      if (lang == "sin")
        passwordError.textContent =
          "මුරපදයේ අවම වශයෙන් එක් අකුරක්වත් අඩංගු විය යුතුය";
      else
        passwordError.textContent = "Password must contain at least one letter";
      passwordStatus = false;
      return false;
    } else {
      passwordStatus = true;
      passwordError.textContent = "";
      return true;
    }
  }

  function confirm_status_func() {
    if (
      typeof confirm.value === "string" &&
      confirm.value.trim().length === 0
    ) {
      if (lang == "sin") confirmError.textContent = "නව මුරපදය හිස් විය නොහැක";
      else confirmError.textContent = "New password cannot be empty";
      confirmStatus = false;
      return false;
    } else if (
      typeof confirm.value === "string" &&
      confirm.value.trim().length < 6
    ) {
      if (lang == "sin")
        confirmError.textContent = "මුරපදයේ දිග 6 ට වඩා වැඩි හෝ සමාන විය යුතුය";
      else
        confirmError.textContent =
          "Password length must be greater than or equal to 6";
      confirmStatus = false;
      return false;
    } else if (!hasNumber(confirm.value)) {
      if (lang == "sin")
        confirmError.textContent =
          "මුරපදයේ අවම වශයෙන් ඉලක්කම් එකක්වත් අඩංගු විය යුතුය";
      else
        confirmError.textContent = "Password must contain at least one digit";
      confirmStatus = false;
      return false;
    } else if (!hasLetter(confirm.value)) {
      if (lang == "sin")
        confirmError.textContent =
          "මුරපදයේ අවම වශයෙන් එක් අකුරක්වත් අඩංගු විය යුතුය";
      else
        confirmError.textContent = "Password must contain at least one letter";
      confirmStatus = false;
      return false;
    } else {
      confirmStatus = true;
      confirmError.textContent = "";
      return true;
    }
  }
})();

function hasNumber(str) {
  return /\d/.test(str);
}

function hasLetter(str) {
  return /[a-zA-Z]/.test(str);
}
