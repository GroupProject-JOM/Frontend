(() => {
  const body = document.querySelector("body"),
    sin = body.querySelector(".sin"),
    en = body.querySelector(".en"),
    username = body.querySelector(".username"),
    password = body.querySelector(".password"),
    button = body.querySelector(".login-button"),
    ll1 = body.querySelector(".login-line1"),
    ll2 = body.querySelector(".login-line2"),
    ll3 = body.querySelector(".login-line3"),
    ll4 = body.querySelector(".login-line4");

  sin.addEventListener("click", () => {
    sin.classList.add("active");
    en.classList.remove("active");

    document.documentElement.setAttribute("lang", "sin");
    sessionStorage.setItem("lang", "sin");

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
    sessionStorage.setItem("lang", "en");

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
      ll4: "JOM වෙත අලුත්ද ? <a href='./signup/signup1.html'>ගිණුමක් තනන්න</a>",
      username: "පරිශීලක නාමය",
      password: "මුරපදය",
      button:"පිවිසෙන්න",
    },
    en: {
      ll1: "Welcome to",
      ll2: "Jayasinghe Oil Mills",
      ll3: "Forgot Password?",
      ll4: "New to JOM ? <a href='./signup/signup1.html'>Create an Account</a>",
      username: "Username",
      password: "Password",
      button:"Login",
    },
  };

  checkLng();

  button.addEventListener("click", () => {
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
      if (response.ok) {
        response.json().then(data => {
          console.log(data.message);
          if(data.message == "Login successfully"){
            window.location.href = frontProxy + "/" + data.page;
          }
      });
      } else if (response.status === 401) {
        console.log("Registration unsuccessful");
      } else if (response.status === 400) {
        // backend error handle
        response.json().then((data) => {
          console(data.message);
        });
      } else {
        console.error("Error:", response.status);
      }
    })
    .catch((error) => {
      console.error("An error occurred:", error);
    });
  });
})();
