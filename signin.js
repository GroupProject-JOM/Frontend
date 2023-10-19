// if (
//   sessionStorage.getItem("page") != null &&
//   sessionStorage.getItem("page").length != 0
// ) {
//   window.location.href = frontProxy + "/" + sessionStorage.getItem("page");
// }

var username_status = false,
  password_status = false;

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
    ll4 = body.querySelector(".login-line4");

  sin.addEventListener("click", () => {
    sin.classList.add("active");
    en.classList.remove("active");

    document.documentElement.setAttribute("lang", "sin");
    // sessionStorage.setItem("lang", "sin");
    document.cookie="lang=sin";

    ll1.textContent = data["sin"]["ll1"];
    ll2.textContent = data["sin"]["ll2"];
    ll3.textContent = data["sin"]["ll3"];
    ll4.innerHTML = data["sin"]["ll4"];
    username.placeholder = data["sin"]["username"];
    password.placeholder = data["sin"]["password"];
    button.textContent = data["sin"]["button"];
  });

  en.addEventListener("click", () => {
    en.classList.add("active");
    sin.classList.remove("active");

    document.documentElement.setAttribute("lang", "en");
    // sessionStorage.setItem("lang", "en");
    document.cookie="lang=en";

    ll1.textContent = data["en"]["ll1"];
    ll2.textContent = data["en"]["ll2"];
    ll3.textContent = data["en"]["ll3"];
    ll4.innerHTML = data["en"]["ll4"];
    username.placeholder = data["en"]["username"];
    password.placeholder = data["en"]["password"];
    button.textContent = data["en"]["button"];
  });

  var data = {
    sin: {
      ll1: "ජයසිංහ ඔයිල් මිල්ස් වෙත",
      ll2: "සාදරයෙන් පිළිගනිමු",
      ll3: "මුරපදය අමතක වුණා ද?",
      ll4: "JOM වෙත අලුත්ද ? <a href='./signup'>ගිණුමක් තනන්න</a>",
      username: "පරිශීලක නාමය",
      password: "මුරපදය",
      button: "පිවිසෙන්න",
    },
    en: {
      ll1: "Welcome to",
      ll2: "Jayasinghe Oil Mills",
      ll3: "Forgot Password?",
      ll4: "New to JOM ? <a href='./signup'>Create an Account</a>",
      username: "Username",
      password: "Password",
      button: "Login",
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
          if (response.status === 200) {
            response.json().then((data) => {
              console.log(data.message);
              if (data.message == "Login successfully") {
                // sessionStorage.setItem("name", data.name);
                // sessionStorage.setItem("page", data.page);
                document.cookie="name="+data.name;
                document.cookie="page="+data.page;
                window.location.href = frontProxy + "/" + data.page;
              }
            });
          } else if (response.status === 400) {
            // backend error handle
            response.json().then((data) => {
              console(data.message);
              if (data.message == "username") {
                usernameError.textContent = "Username cannot be empty!";
                username.focus();
              } else if (data.message == "password") {
                passwordError.textContent = "Password cannot be empty!";
                password.focus();
              }
            });
          } else if (response.status === 202) {
            response.json().then((data) => {
              if (data.message == "password") {
                passwordError.textContent = "Invalid Password!";
                password.focus();
              }
            });
          } else if (response.status === 401) {
            response.json().then((data) => {
              if (data.message == "username") {
                usernameError.textContent = "Invalid Username!";
                username.focus();
              } else if (data.message == "validate") {
                usernameError.textContent = "User is not validated!";
                username.focus();
              }
            });
          } else {
            console.error("Error:", response.status);
          }
        })
        .catch((error) => {
          console.error("An error occurred:", error);
        });
    }
  });
  function username_status_func() {
    if (
      typeof username.value === "string" &&
      username.value.trim().length === 0
    ) {
      usernameError.textContent = "Username cannot be empty";
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
      passwordError.textContent = "Password cannot be empty";
      password_status = false;
      return false;
    } else {
      passwordError.textContent = "";
      password_status = true;
      return true;
    }
  }
})();
