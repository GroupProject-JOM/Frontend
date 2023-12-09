if (getCookie("jwt") != null && getCookie("jwt").length != 0)
  window.location.href = frontProxy + "/" + getPayload(getCookie("jwt")).page;

var username_status = false,
  password_status = false,
  lang = getCookie("lang"); // current language

(() => {
  const body = document.querySelector("body"),
    sin = body.querySelector(".sin"),
    en = body.querySelector(".en"),
    username = body.querySelector(".username"),
    usernameError = body.querySelector(".username-error"),
    password = body.querySelector(".password"),
    passwordError = body.querySelector(".password-error"),
    button = body.querySelector(".login-button"),
    ll1 = body.querySelector(".login-line1"),
    ll2 = body.querySelector(".login-line2"),
    ll3 = body.querySelector(".login-line3"),
    ll4 = body.querySelector(".login-line4"),
    validate = body.querySelector(".validate");

  sin.addEventListener("click", () => {
    sin.classList.add("active");
    en.classList.remove("active");

    document.documentElement.setAttribute("lang", "sin");
    document.cookie = "lang=sin; path=/";
    lang = "sin";

    ll1.textContent = data["sin"]["ll1"];
    ll2.textContent = data["sin"]["ll2"];
    ll3.textContent = data["sin"]["ll3"];
    ll4.innerHTML = data["sin"]["ll4"];
    username.placeholder = data["sin"]["username"];
    password.placeholder = data["sin"]["password"];
    button.textContent = data["sin"]["button"];
    validate.innerHTML = data["sin"]["validate"];
  });

  en.addEventListener("click", () => {
    en.classList.add("active");
    sin.classList.remove("active");

    document.documentElement.setAttribute("lang", "en");
    document.cookie = "lang=en; path=/";
    lang = "en";

    ll1.textContent = data["en"]["ll1"];
    ll2.textContent = data["en"]["ll2"];
    ll3.textContent = data["en"]["ll3"];
    ll4.innerHTML = data["en"]["ll4"];
    username.placeholder = data["en"]["username"];
    password.placeholder = data["en"]["password"];
    button.textContent = data["en"]["button"];
    validate.innerHTML = data["en"]["validate"];
  });

  var data = {
    sin: {
      ll1: "ජයසිංහ ඔයිල් මිල්ස් වෙත",
      ll2: "සාදරයෙන් පිළිගනිමු",
      ll3: "මුරපදය අමතක වුණා ද?",
      ll4: "JOM වෙත අලුත්ද ? <a href='./signup'>නව ගිණුමක් තනන්න</a>",
      username: "පරිශීලක නාමය",
      password: "මුරපදය",
      button: "පිවිසෙන්න",
      validate: "ඔබගේ විද්‍යුත් තැපෑල වලංගු කිරීමට <a>මෙහි ක්ලික් කරන්න </a>",
    },
    en: {
      ll1: "Welcome to",
      ll2: "Jayasinghe Oil Mills",
      ll3: "Forgot Password?",
      ll4: "New to JOM ? <a href='./signup'>Create an Account</a>",
      username: "Username",
      password: "Password",
      button: "Login",
      validate: "<a>Click here </a>to Validate your Email",
    },
  };

  checkLng();

  username.addEventListener("input", () => {
    username_status_func();
  });
  password.addEventListener("input", () => {
    password_status_func();
  });

  button.addEventListener("click", () => {
    if (!password_status_func()) {
      password.focus();
    }
    if (!username_status_func()) {
      username.focus();
    }
    if (username_status && password_status) {
      var formData = {
        username: username.value,
        password: password.value,
      };

      if (lang == "sin") {
        var title = "සම්බන්ධ වෙමින්...",
          text = "කරුණාකර රැඳී සිටින්න...";
      } else {
        var title = "Connecting...",
          text = "Please wait...";
      }

      Swal.fire({
        title: title,
        html: text,
        allowEscapeKey: false,
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      // send form data object via fetch api
      fetch(backProxy + "/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      })
        .then((response) => {
          Swal.close();
          if (response.status === 200) {
            response.json().then((data) => {
              console.log(data.message);
              if (data.message == "Login successfully") {
                if (lang == "sin")
                  Command: toastr["success"]("සාර්ථකව පුරනය වන්න");
                else Command: toastr["success"]("Login successfully");

                var payload = getPayload(getCookie("jwt"));

                document.cookie = "name=" + payload.name + "; path=/";
                window.location.href = frontProxy + "/" + payload.page;
              }
            });
          } else if (response.status === 400) {
            // backend error handle
            response.json().then((data) => {
              console(data.message);
              if (data.message == "username") {
                if (lang == "sin")
                  usernameError.textContent = "පරිශීලක නාමය හිස් විය නොහැක!";
                else usernameError.textContent = "Username cannot be empty!";
                username.focus();
              } else if (data.message == "password") {
                if (lang == "sin")
                  passwordError.textContent = "මුරපදය හිස් විය නොහැක!";
                else passwordError.textContent = "Password cannot be empty!";
                password.focus();
              }
            });
          } else if (response.status === 202) {
            response.json().then((data) => {
              if (data.message == "password") {
                if (lang == "sin") {
                  passwordError.textContent = "වලංගු නොවන මුරපදයක්!";
                  Command: toastr["warning"]("වලංගු නොවන මුරපදයක්!");
                } else {
                  passwordError.textContent = "Invalid Password!";
                  Command: toastr["warning"]("Invalid Password!");
                }
                password.focus();
              }
            });
          } else if (response.status === 401) {
            response.json().then((data) => {
              if (data.message == "username") {
                if (lang == "sin") {
                  usernameError.textContent = "වලංගු නොවන පරිශීලක නාමයක්!";
                  Command: toastr["warning"]("වලංගු නොවන පරිශීලක නාමයක්!");
                } else {
                  usernameError.textContent = "Invalid Username!";
                  Command: toastr["warning"]("Invalid Username!");
                }
                username.focus();
              } else if (data.message == "validate") {
                if (lang == "sin") {
                  usernameError.textContent = "පරිශීලක වලංගු නොවේ!";
                  Command: toastr["warning"]("පරිශීලක වලංගු නොවේ!");
                } else {
                  usernameError.textContent = "User is not validated!";
                  Command: toastr["warning"]("User is not validated!");
                }
                username.focus();
                validate.style.display = "block";
              }
            });
          } else {
            console.error("Error:", response.status);
            Command: toastr["error"](response.status, "Error");
          }
        })
        .catch((error) => {
          Swal.close();
          // console.error("An error occurred:", error);
          Command: toastr["error"](error);
        });
    }
  });

  validate.addEventListener("click", () => {
    document.cookie = "email=" + username.value + "; path=/signup";
    window.location.href = "./signup/signup2.html";
  });

  function username_status_func() {
    if (
      typeof username.value === "string" &&
      username.value.trim().length === 0
    ) {
      if (lang == "sin") {
        usernameError.textContent = "පරිශීලක නාමය හිස් විය නොහැක";
        Command: toastr["warning"]("පරිශීලක නාමය හිස් විය නොහැක");
      } else {
        usernameError.textContent = "Username cannot be empty";
        Command: toastr["warning"]("Username cannot be empty");
      }
      username_status = false;
      return false;
    } else {
      usernameError.textContent = "";
      username_status = true;
      return true;
    }
  }
  function password_status_func() {
    if (
      typeof password.value === "string" &&
      password.value.trim().length === 0
    ) {
      if (lang == "sin") {
        passwordError.textContent = "මුරපදය හිස් විය නොහැක";
        Command: toastr["warning"]("මුරපදය හිස් විය නොහැක");
      } else {
        passwordError.textContent = "Password cannot be empty";
        Command: toastr["warning"]("Password cannot be empty");
      }
      password_status = false;
      return false;
    } else {
      passwordError.textContent = "";
      password_status = true;
      return true;
    }
  }
})();
