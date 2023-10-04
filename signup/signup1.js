var fname_status = false,
  lname_status = false,
  email_status = false,
  password_status = false,
  phone_status = false,
  address1_status = false,
  address2_status = false,
  address3_status = false;

(() => {
  const body = document.querySelector("body"),
    sin = body.querySelector(".sin"),
    en = body.querySelector(".en"),
    fh = body.querySelector(".form-heading"),
    fname = body.querySelector(".fname"),
    fnameError = body.querySelector(".fname-error"),
    lname = body.querySelector(".lname"),
    lnameError = body.querySelector(".lname-error"),
    email = body.querySelector(".email"),
    emailError = document.querySelector(".email-error"),
    password = body.querySelector(".password"),
    passwordError = body.querySelector(".password-error"),
    phone = body.querySelector(".phone"),
    phoneError = body.querySelector(".phone-error"),
    address = body.querySelector(".address"),
    address1 = body.querySelector(".address1"),
    address1Error = body.querySelector(".address1-error"),
    address2 = body.querySelector(".address2"),
    address2Error = body.querySelector(".address2-error"),
    address3 = body.querySelector(".address3"),
    address3Error = body.querySelector(".address3-error"),
    mainError = body.querySelector(".main-error"),
    next = body.querySelector(".next");

  checkLng();

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

  // input chage validations
  fname.addEventListener("input", () => {
    fname_status_func();
  });
  lname.addEventListener("input", () => {
    lname_status_func();
  });
  email.addEventListener("input", () => {
    email_status_func();
  });
  password.addEventListener("input", () => {
    password_status_func();
  });
  phone.addEventListener("input", () => {
    phone_status_func();
  });
  address1.addEventListener("input", () => {
    address1_status_func();
  });
  address2.addEventListener("input", () => {
    address2_status_func();
  });
  address3.addEventListener("input", () => {
    address3_status_func();
  });

  next.addEventListener("click", () => {
    // submit form validation
    if (!address3_status_func()) {
      address3.focus();
    }
    if (!address2_status_func()) {
      address2.focus();
    }
    if (!address1_status_func()) {
      address1.focus();
    }
    if (!phone_status_func()) {
      phone.focus();
    }
    if (!password_status_func()) {
      password.focus();
    }
    if (!email_status_func()) {
      email.focus();
    }
    if (!lname_status_func()) {
      lname.focus();
    }
    if (!fname_status_func()) {
      fname.focus();
    }
    if (
      fname_status &&
      lname_status &&
      email_status &&
      password_status &&
      phone_status &&
      address1_status &&
      address2_status &&
      address3_status
    ) {
      // create form data object
      var formData = {
        first_name: fname.value,
        last_name: lname.value,
        email: email.value,
        password: password.value,
        phone: phone.value,
        add_line_1: address1.value,
        add_line_2: address2.value,
        add_line_3: address3.value,
      };

      // send form data object via fetch api
      fetch(backProxy + "/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      })
        .then((response) => {
          if (response.ok) {
            response.json().then((data) => {
              console.log(data.message);
              sessionStorage.setItem("email", data.email);
              sessionStorage.setItem("phone", data.phone);
            });
            window.location.href = frontProxy + "/signup/signup2.html";
          } else if (response.status === 401) {
            console.log("Registration unsuccessful");
          } else if (response.status === 400) {
            // backend error handle
            response.json().then((data) => {
              if (data.message == "fname") {
                fnameError.textContent = "First name cannot be empty!";
                fname.focus();
              } else if (data.message == "lname") {
                lnameError.textContent = "Last name cannot be empty!";
                lname.focus();
              } else if (data.message == "email1") {
                emailError.textContent = "Email cannot be empty!";
                email.focus();
              } else if (data.message == "email2") {
                emailError.textContent = "Enter a valid email!";
                email.focus();
              } else if (data.message == "password") {
                passwordError.textContent = "Password cannot be empty!";
                password.focus();
              } else if (data.message == "phone") {
                phoneError.textContent = "Contact number cannot be empty!";
                phone.focus();
              } else if (data.message == "adddress1") {
                address1Error.textContent = "Address line 1 cannot be empty!";
                address1.focus();
              } else if (data.message == "adddress2") {
                address2Error.textContent = "Street cannot be empty!";
                address2.focus();
              } else if (data.message == "adddress3") {
                address3Error.textContent = "City cannot be empty!";
                address3.focus();
              } else {
                mainError.textContent = "Something went wrong";
                mainError.style.display = "block";
              }
            });
          } else if (response.status === 409) {
            response.json().then((data) => {
              if (data.message == "email3") {
                emailError.textContent = "This email is already used";
                email.focus();
              }
            });
          } else {
            mainError.textContent = "CORS ERROR";
            mainError.style.display = "block";
            console.error("Error:", response.status);
          }
        })
        .catch((error) => {
          mainError.textContent = "CONNECTION REFUSED";
          mainError.style.display = "block";
          console.error("An error occurred:", error);
        });
    }
  });

  function fname_status_func() {
    if (typeof fname.value === "string" && fname.value.trim().length === 0) {
      fnameError.textContent = "First name cannot be empty";
      fname_status = false;
      return false;
    } else {
      fnameError.textContent = "";
      fname_status = true;
      return true;
    }
  }

  function lname_status_func() {
    if (typeof lname.value === "string" && lname.value.trim().length === 0) {
      lnameError.textContent = "Last name cannot be empty";
      lname_status = false;
      return false;
    } else {
      lname_status = true;
      lnameError.textContent = "";
      return true;
    }
  }

  function email_status_func() {
    if (typeof email.value === "string" && email.value.trim().length === 0) {
      emailError.textContent = "Email cannot be empty";
      email_status = false;
      return false;
    } else if (!ValidateEmail(email)) {
      emailError.textContent = "Invalid email address!";
      email_status = false;
      return false;
    } else {
      emailError.textContent = "";
      email_status = true;
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
      password_status = true;
      passwordError.textContent = "";
      return true;
    }
  }

  function phone_status_func() {
    if (typeof phone.value === "string" && phone.value.trim().length === 0) {
      phoneError.textContent = "Phone number cannot be empty";
      phone_status = false;
      return false;
    } else {
      phone_status = true;
      phoneError.textContent = "";
      return true;
    }
  }

  function address1_status_func() {
    if (
      typeof address1.value === "string" &&
      address1.value.trim().length === 0
    ) {
      address1Error.textContent = "Address Line 1 cannot be empty";
      address1_status = false;
      return false;
    } else {
      address1_status = true;
      address1Error.textContent = "";
      return true;
    }
  }

  function address2_status_func() {
    if (
      typeof address2.value === "string" &&
      address2.value.trim().length === 0
    ) {
      address2Error.textContent = "Street cannot be empty";
      address2_status = false;
      return false;
    } else {
      address2_status = true;
      address2Error.textContent = "";
      return true;
    }
  }

  function address3_status_func() {
    if (
      typeof address3.value === "string" &&
      address3.value.trim().length === 0
    ) {
      address3Error.textContent = "City cannot be empty";
      address3_status = false;
      return false;
    } else {
      address3_status = true;
      address3Error.textContent = "";
      return true;
    }
  }
})();

function ValidateEmail(email) {
  var validRegex =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,6}))$/;

  if (email.value.match(validRegex)) {
    return true;
  } else {
    return false;
  }
}

// TODO fname lname etc. have to validate
