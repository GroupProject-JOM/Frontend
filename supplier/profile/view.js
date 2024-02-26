(() => {
  const body = document.querySelector("body"),
    sin = body.querySelector(".sin"),
    en = body.querySelector(".en"),
    sTitle = body.querySelector(".supply-title"),
    tx1 = body.querySelector(".personal-info"),
    tx2 = body.querySelector(".profile-address"),
    name = body.querySelector(".name"),
    email = body.querySelector(".email"),
    phone = body.querySelector(".phone"),
    address1 = body.querySelector(".address1"),
    street = body.querySelector(".street"),
    city = body.querySelector(".city"),
    edit = body.querySelector(".edit-button"),
    closeBtn = body.querySelector(".close-btn"),
    overlay = body.querySelector(".overlay"),
    change = body.querySelector(".change-password"),
    cLabel = body.querySelector(".current-label"),
    cPassword = body.querySelector(".current-password"),
    cPasswordError = body.querySelector(".current-password-error"),
    forgot = body.querySelector(".forgot"),
    n1Label = body.querySelector(".new1-label"),
    n1 = body.querySelector(".new1"),
    n1Error = body.querySelector(".new1-password-error"),
    n2Label = body.querySelector(".new2-label"),
    n2 = body.querySelector(".new2"),
    n2Error = body.querySelector(".new2-password-error"),
    save = body.querySelector(".save");

  var lang = getCookie("lang"); // current language

  change.addEventListener("click", () => {
    overlay.style.display = "flex";
    document.querySelector(".password-window").style.display = "block";
  });

  overlay.addEventListener("click", (e) => {
    if (e.target.id === "overlay") {
      overlay.style.display = "none";
      document.querySelector(".password-window").style.display = "none";
    }
  });

  closeBtn.addEventListener("click", () => {
    overlay.style.display = "none";
    document.querySelector(".password-window").style.display = "none";
  });

  sin.addEventListener("click", () => {
    sin.classList.add("active");
    en.classList.remove("active");

    document.documentElement.setAttribute("lang", "sin");
    document.cookie = "lang=sin; path=/";
    lang = "sin";

    sTitle.textContent = data["sin"]["sTitle"];
    tx1.innerHTML = data["sin"]["tx1"];
    tx2.innerHTML = data["sin"]["tx2"];
    change.textContent = data["sin"]["change"];
    edit.textContent = data["sin"]["edit"];
    cLabel.textContent = data["sin"]["cLabel"];
    cPassword.placeholder = data["sin"]["cPassword"];
    forgot.textContent = data["sin"]["forgot"];
    n1Label.textContent = data["sin"]["n1Label"];
    n1.placeholder = data["sin"]["n1"];
    n2Label.textContent = data["sin"]["n2Label"];
    n2.placeholder = data["sin"]["n2"];
    save.textContent = data["sin"]["save"];

    setGreeting();
  });

  en.addEventListener("click", () => {
    en.classList.add("active");
    sin.classList.remove("active");

    document.documentElement.setAttribute("lang", "en");
    document.cookie = "lang=en; path=/";
    lang = "en";

    sTitle.textContent = data["en"]["sTitle"];
    tx1.innerHTML = data["en"]["tx1"];
    tx2.innerHTML = data["en"]["tx2"];
    change.textContent = data["en"]["change"];
    edit.textContent = data["en"]["edit"];
    cLabel.textContent = data["en"]["cLabel"];
    cPassword.placeholder = data["en"]["cPassword"];
    forgot.textContent = data["en"]["forgot"];
    n1Label.textContent = data["en"]["n1Label"];
    n1.placeholder = data["en"]["n1"];
    n2Label.textContent = data["en"]["n2Label"];
    n2.placeholder = data["en"]["n2"];
    save.textContent = data["en"]["save"];

    setGreeting();
  });

  var data = {
    sin: {
      sTitle: "ගිණුම් තොරතුරු බලන්න",
      tx1: "පුද්ගලික තොරතුරු",
      tx2: "ලිපිනය",
      change: "මුරපදය වෙනස් කරන්න",
      edit: "ගිණුම් තොරතුරු වෙනස් කරන්න",
      cLabel: "වත්මන් මුර පදය",
      cPassword: "වත්මන් මුරපදය ඇතුළත් කරන්න",
      forgot: "මුරපදය අමතක වුණා ද?",
      n1Label: "නව මුරපදය",
      n1: "අවම වශයෙන් අක්ෂර 6 ක්",
      n2Label: "මුරපදය තහවුරු කරන්න",
      n2: "අවම වශයෙන් අක්ෂර 6 ක්",
      save: "සුරකින්න",
    },
    en: {
      sTitle: "Your Profile",
      tx1: "Personal Information",
      tx2: "Address",
      change: "Change Password",
      edit: "Edit Profile",
      cLabel: "Current Password",
      cPassword: "Enter current password",
      forgot: "Forgot password?",
      n1Label: "New Password",
      n1: "At least 6 characters",
      n2Label: "Confirm Password",
      n2: "At least 6 characters",
      save: "Save",
    },
  };

  fetch(backProxy + "/profile", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  })
    .then((response) => {
      if (response.status == 200) {
        response.json().then((data) => {
          name.textContent = data.user.first_name + " " + data.user.last_name;
          email.textContent = data.user.email;
          phone.textContent = data.user.phone;
          address1.textContent = data.user.add_line_1;
          street.textContent = data.user.add_line_2;
          city.textContent = data.user.add_line_3;
        });
      } else if (response.status === 400) {
        response.json().then((data) => {
          console.log(data.user);
          Command: toastr["error"](data.user);
        });
      } else {
        console.error("Error:", response.status);
        Command: toastr["error"](response.status, "Error");
      }
    })
    .catch((error) => {
      console.error("An error occurred:", error);
      Command: toastr["error"](error);
    });

  var currentStatus = false,
    new1Status = false,
    new2Status = false,
    match = false;

  cPassword.addEventListener("input", () => {
    cPassword_status_func();
  });
  n1.addEventListener("input", () => {
    n1_status_func();
  });
  n2.addEventListener("input", () => {
    n2_status_func();
  });

  save.addEventListener("click", () => {
    if (!cPassword_status_func()) {
      cPassword.focus();
    }
    if (!n1_status_func()) {
      n1.focus();
    }
    if (!n2_status_func()) {
      n2.focus();
    }

    if (n1.value === n2.value) {
      match = true;
    } else {
      if (lang == "sin") {
        n1Error.textContent = "මුර පද ගැලපෙන්නේ නැත";
        n2Error.textContent = "මුර පද ගැලපෙන්නේ නැත";
      } else {
        n1Error.textContent = "Passwords do not match";
        n2Error.textContent = "Passwords do not match";
      }
      n1.focus();
      match = false;
    }

    if (currentStatus && new1Status && new2Status && match) {
      // create form data object
      var formData = {
        password: cPassword.value,
        new: n1.value,
      };

      fetch(backProxy + "/change-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
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
              closeBtn.click();
            });
          } else if (response.status === 401) {
            if (lang == "sin") Command: toastr["error"]("වලංගු නොවන පරිශීලක");
            else Command: toastr["error"]("Invalid User");
          } else if (response.status === 400) {
            // backend error catch
            response.json().then((data) => {
              log(data.message);
            });
            if (lang == "sin") cPasswordError.textContent = "වැරදි මුරපදයක්";
            else cPasswordError.textContent = "Incorrect Password";
            currentStatus = false;
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

  function cPassword_status_func() {
    if (
      typeof cPassword.value === "string" &&
      cPassword.value.trim().length === 0
    ) {
      if (lang == "sin")
        cPasswordError.textContent = "වත්මන් මුරපදය හිස් විය නොහැක";
      else cPasswordError.textContent = "Current password cannot be empty";
      currentStatus = false;
      return false;
    } else {
      currentStatus = true;
      cPasswordError.textContent = "";
      return true;
    }
  }

  function n1_status_func() {
    if (typeof n1.value === "string" && n1.value.trim().length === 0) {
      if (lang == "sin") n1Error.textContent = "නව මුරපදය හිස් විය නොහැක";
      else n1Error.textContent = "New password cannot be empty";
      new1Status = false;
      return false;
    } else if (typeof n1.value === "string" && n1.value.trim().length < 6) {
      if (lang == "sin")
        n1Error.textContent = "මුරපදයේ දිග 6 ට වඩා වැඩි හෝ සමාන විය යුතුය";
      else
        n1Error.textContent =
          "Password length must be greater than or equal to 6";
      new1Status = false;
      return false;
    } else if (!hasNumber(n1.value)) {
      if (lang == "sin")
        n1Error.textContent =
          "මුරපදයේ අවම වශයෙන් ඉලක්කම් එකක්වත් අඩංගු විය යුතුය";
      else n1Error.textContent = "Password must contain at least one digit";
      new1Status = false;
      return false;
    } else if (!hasLetter(n1.value)) {
      if (lang == "sin")
        n1Error.textContent =
          "මුරපදයේ අවම වශයෙන් එක් අකුරක්වත් අඩංගු විය යුතුය";
      else n1Error.textContent = "Password must contain at least one letter";
      new1Status = false;
      return false;
    } else {
      new1Status = true;
      n1Error.textContent = "";
      return true;
    }
  }

  function n2_status_func() {
    if (typeof n2.value === "string" && n2.value.trim().length === 0) {
      if (lang == "sin") n2Error.textContent = "තහවුරු මුරපදය හිස් විය නොහැක";
      else n2Error.textContent = "Confirm password cannot be empty";
      new2Status = false;
      return false;
    } else if (typeof n2.value === "string" && n2.value.trim().length < 6) {
      if (lang == "sin")
        n2Error.textContent = "මුරපදයේ දිග 6 ට වඩා වැඩි හෝ සමාන විය යුතුය";
      else
        n2Error.textContent =
          "Password length must be greater than or equal to 6";
      new2Status = false;
      return false;
    } else if (!hasNumber(n2.value)) {
      if (lang == "sin")
        n2Error.textContent =
          "මුරපදයේ අවම වශයෙන් ඉලක්කම් එකක්වත් අඩංගු විය යුතුය";
      else n2Error.textContent = "Password must contain at least one digit";
      new2Status = false;
      return false;
    } else if (!hasLetter(n2.value)) {
      if (lang == "sin")
        n2Error.textContent =
          "මුරපදයේ අවම වශයෙන් එක් අකුරක්වත් අඩංගු විය යුතුය";
      else n2Error.textContent = "Password must contain at least one letter";
      new2Status = false;
      return false;
    } else {
      new2Status = true;
      n2Error.textContent = "";
      return true;
    }
  }

  forgot.addEventListener("click", () => {
    document.cookie =
      "email=" + getPayload(getCookie("jwt")).email + "; path=/";
    window.location.href = "../../forgot-password/index.html";
  });
})();

function hasNumber(str) {
  return /\d/.test(str);
}

function hasLetter(str) {
  return /[a-zA-Z]/.test(str);
}
