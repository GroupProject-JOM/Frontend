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
    next = body.querySelector(".next");

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

  checkLng();

  // input chage validations
  fname.addEventListener("input", () => {
    if (typeof fname.value === "string" && fname.value.trim().length === 0) {
      fnameError.textContent = "First name cannot be empty";
      fname_status = false;
    } else {
      fname_status = true;
      fnameError.textContent = "";
    }
  });
  lname.addEventListener("input", () => {
    if (typeof lname.value === "string" && lname.value.trim().length === 0) {
      lnameError.textContent = "Last name cannot be empty";
      lname_status = false;
    } else {
      lname_status = true;
      lnameError.textContent = "";
    }
  });
  email.addEventListener("input", () => {
    if (typeof email.value === "string" && email.value.trim().length === 0) {
      emailError.textContent = "Email cannot be empty";
      email_status = false;
    } else if (!ValidateEmail(email)) {
      emailError.textContent = "Invalid email address!";
      email_status = false;
    } else {
      emailError.textContent = "";
      email_status = true;
    }
  });
  password.addEventListener("input", () => {
    if (
      typeof password.value === "string" &&
      password.value.trim().length === 0
    ) {
      passwordError.textContent = "Password cannot be empty";
      password_status = false;
    } else {
      password_status = true;
      passwordError.textContent = "";
    }
  });
  phone.addEventListener("input", () => {
    if (typeof phone.value === "string" && phone.value.trim().length === 0) {
      phoneError.textContent = "Phone number cannot be empty";
      phone_status = false;
    } else {
      phone_status = true;
      phoneError.textContent = "";
    }
  });
  address1.addEventListener("input", () => {
    if (
      typeof address1.value === "string" &&
      address1.value.trim().length === 0
    ) {
      address1Error.textContent = "Address Line 1 cannot be empty";
      address1_status = false;
    } else {
      address1_status = true;
      address1Error.textContent = "";
    }
  });
  address2.addEventListener("input", () => {
    if (
      typeof address2.value === "string" &&
      address2.value.trim().length === 0
    ) {
      address2Error.textContent = "Street cannot be empty";
      address2_status = false;
    } else {
      address2_status = true;
      address2Error.textContent = "";
    }
  });
  address3.addEventListener("input", () => {
    if (
      typeof address3.value === "string" &&
      address3.value.trim().length === 0
    ) {
      address3Error.textContent = "City cannot be empty";
      address3_status = false;
    } else {
      address3_status = true;
      address3Error.textContent = "";
    }
  });

  next.addEventListener("click", () => {
    // submit form validation
    if (
      typeof address3.value === "string" &&
      address3.value.trim().length === 0
    ) {
      address3Error.textContent = "City cannot be empty";
      address3.focus();
    }
    if (
      typeof address2.value === "string" &&
      address2.value.trim().length === 0
    ) {
      address2Error.textContent = "Street cannot be empty";
      address2.focus();
    }
    if (
      typeof address1.value === "string" &&
      address1.value.trim().length === 0
    ) {
      address1Error.textContent = "Address Line 1 cannot be empty";
      address1.focus();
    }
    if (typeof phone.value === "string" && phone.value.trim().length === 0) {
      phoneError.textContent = "Phone number cannot be empty";
      phone.focus();
    }
    if (
      typeof password.value === "string" &&
      password.value.trim().length === 0
    ) {
      passwordError.textContent = "Password cannot be empty";
      password.focus();
    }
    if (typeof email.value === "string" && email.value.trim().length === 0) {
      emailError.textContent = "Email cannot be empty";
      email.focus();
    } else if (!ValidateEmail(email)) {
      emailError.textContent = "Invalid email address!";
      email.focus();
    }
    if (typeof lname.value === "string" && lname.value.trim().length === 0) {
      lnameError.textContent = "Last name cannot be empty";
      lname.focus();
    }
    if (typeof fname.value === "string" && fname.value.trim().length === 0) {
      fnameError.textContent = "First name cannot be empty";
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
        first_name: document.querySelector(".fname").value,
        last_name: document.querySelector(".lname").value,
        email: document.querySelector(".email").value,
        password: document.querySelector(".password").value,
        phone: document.querySelector(".phone").value,
        add_line_1: document.querySelector(".address1").value,
        add_line_2: document.querySelector(".address2").value,
        add_line_3: document.querySelector(".address3").value,
      };

      fetch("http://localhost:8090/JOM_war_exploded/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      })
        .then((response) => {
          if (response.ok) {
            response.text().then((data) => {
              console.log(data);
            });
            window.location.href = "http://127.0.0.1:5501/signup/signup2.html";
          } else if (response.status === 401) {
            console.log("Registration unsuccessful");
          } else if (response.status === 406) {
            response.text().then((data) => {
              console.log(data);
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
