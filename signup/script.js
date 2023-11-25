// remove previous data
document.cookie = "email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/signup";
document.cookie = "phone=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/signup";
document.cookie = "id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/signup";
document.cookie = "sId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/signup";
document.cookie = "id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
document.cookie = "sId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";

// Input fields status indicators
var fname_status = false,
  lname_status = false,
  email_status = false,
  password_status = false,
  phone_status = false,
  address1_status = false,
  address2_status = false,
  address3_status = false,
  lang = getCookie("lang"); // current language

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
    m7 = body.querySelector(".menu-line7"),
    next = body.querySelector(".next"),
    fnameLabel = body.querySelector(".fname-label"),
    lnameLabel = body.querySelector(".lname-label"),
    emailLabel = body.querySelector(".email-label"),
    passwordLabel = body.querySelector(".password-label"),
    phoneLabel = body.querySelector(".phone-label"),
    address1Label = body.querySelector(".address1-label"),
    address2Label = body.querySelector(".address2-label"),
    address3Label = body.querySelector(".address3-label");

  sin.addEventListener("click", () => {
    // when sin is clicked
    sin.classList.add("active");
    en.classList.remove("active");

    document.documentElement.setAttribute("lang", "sin"); // edit lang in html tag
    document.cookie = "lang=sin; path=/"; // save current language in the cookie
    lang = "sin";

    fh.textContent = data["sin"]["fh"];
    fname.placeholder = data["sin"]["fname"]; // input field 'first name' placeholder
    lname.placeholder = data["sin"]["lname"];
    email.placeholder = data["sin"]["email"];
    password.placeholder = data["sin"]["password"];
    phone.placeholder = data["sin"]["phone"];
    address.textContent = data["sin"]["address"];
    address1.placeholder = data["sin"]["address1"];
    address2.placeholder = data["sin"]["address2"];
    address3.placeholder = data["sin"]["address3"];
    next.textContent = data["sin"]["next"];
    m7.innerHTML = data["sin"]["m7"];
    fnameLabel.textContent = data["sin"]["fnameLabel"];
    lnameLabel.textContent = data["sin"]["lnameLabel"];
    emailLabel.textContent = data["sin"]["emailLabel"];
    passwordLabel.textContent = data["sin"]["passwordLabel"];
    phoneLabel.textContent = data["sin"]["phoneLabel"];
    address1Label.textContent = data["sin"]["address1Label"];
    address2Label.textContent = data["sin"]["address2Label"];
    address3Label.textContent = data["sin"]["address3Label"];


  });

  en.addEventListener("click", () => {
    // when en is clicked
    en.classList.add("active");
    sin.classList.remove("active");

    document.documentElement.setAttribute("lang", "en"); // edit lang in html tag
    document.cookie = "lang=en; path=/"; // save current language in the cookie
    lang = "en";

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
    m7.innerHTML = data["en"]["m7"];
    fnameLabel.textContent = data["en"]["fnameLabel"];
    lnameLabel.textContent = data["en"]["lnameLabel"];
    emailLabel.textContent = data["en"]["emailLabel"];
    passwordLabel.textContent = data["en"]["passwordLabel"];
    phoneLabel.textContent = data["en"]["phoneLabel"];
    address1Label.textContent = data["en"]["address1Label"];
    address2Label.textContent = data["en"]["address2Label"];
    address3Label.textContent = data["en"]["address3Label"];
  });

  var data = {
    // language translations array
    sin: {
      fh: "මූලික තොරතුරු",
      fname: "මුල් නම ඇතුලත් කරන්න",
      lname: "අවසන් නම ඇතුලත් කරන්න",
      email: "ඊතැපැල් ලිපිනය ඇතුලත් කරන්න",
      password: "මුරපදය සාදන්න",
      phone: "දුරකථන අංකය ඇතුලත් කරන්න",
      address: "පුද්ගලික ලිපිනය",
      address1: "ලිපින පේළි 1 ඇතුලත් කරන්න",
      address2: "වීදිය ඇතුලත් කරන්න",
      address3: "නගරය ඇතුලත් කරන්න",
      m7: "දැනටමත් ගිණුමක් ඇත? <a href='../signin.html'>මෙතනින් පුරන්න.</a>",
      next: "ඊළඟ",
      fnameLabel: "මුල් නම",
      lnameLabel: "අවසන් නම",
      emailLabel: "ඊතැපැල් ලිපිනය",
      passwordLabel: "මුරපදය",
      phoneLabel: "දුරකථන අංකය",
      address1Label: "ලිපින පේළි 1",
      address2Label: "වීදිය",
      address3Label: "නගරය",
    },
    en: {
      fh: "Basic Information",
      fname: "Enter First Name",
      lname: "Enter Last Name",
      email: "Enter Email Address",
      password: "Create Password",
      phone: "Enter Phone Number",
      address: "Personal Address",
      address1: "Enter Address Line 1",
      address2: "Enter Street",
      address3: "Enter City",
      m7: "Already have an account? <a href='../signin.html'>Sign in here.</a>",
      next: "Save",
      fnameLabel: "First Name",
      lnameLabel: "Last Name",
      emailLabel: "Email Address",
      passwordLabel: "Password",
      phoneLabel: "Phone Number",
      address1Label: "Address Line 1",
      address2Label: "Street",
      address3Label: "City",

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
    // when submit button is clicked
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
      // check input data are ready to submit
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
        // endpoint
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      })
        .then((response) => {
          if (response.status == 200) {
            response.json().then((data) => {
              // set needed data in cookie
              document.cookie = "id=" + data.id;
              document.cookie = "sId=" + data.sId;
              document.cookie = "email=" + data.email;
              document.cookie = "phone=" + data.phone;
            });
            window.location.href = frontProxy + "/signup/signup2.html"; // redirect path
          } else if (response.status === 401) {
            if (lang == "sin")
              Command: toastr["warning"]("ලියාපදිංචිය අසාර්ථකයි");
            else Command: toastr["warning"]("Registration unsuccessful");
          } else if (response.status === 400) {
            // backend error catch
            response.json().then((data) => {
              if (lang == "sin") {
                // check current language and visualize error
                if (data.message == "fname") {
                  fnameError.textContent = "මුල් නම හිස් විය නොහැක!";
                  fname.focus();
                } else if (data.message == "lname") {
                  lnameError.textContent = "අවසාන නම හිස් විය නොහැක!";
                  lname.focus();
                } else if (data.message == "email1") {
                  emailError.textContent = "විද්‍යුත් තැපෑල හිස් විය නොහැක!";
                  email.focus();
                } else if (data.message == "email2") {
                  emailError.textContent =
                    "වලංගු විද්‍යුත් තැපෑලක් ඇතුළු කරන්න!";
                  email.focus();
                } else if (data.message == "password") {
                  passwordError.textContent = "මුරපදය හිස් විය නොහැක!";
                  password.focus();
                } else if (data.message == "phone") {
                  phoneError.textContent = "සම්බන්ධතා අංකය හිස් විය නොහැක!";
                  phone.focus();
                } else if (data.message == "adddress1") {
                  address1Error.textContent = "ලිපින පේළිය 1 හිස් විය නොහැක!";
                  address1.focus();
                } else if (data.message == "adddress2") {
                  address2Error.textContent = "වීදිය හිස් විය නොහැක!";
                  address2.focus();
                } else if (data.message == "adddress3") {
                  address3Error.textContent = "නගරය හිස් විය නොහැක!";
                  address3.focus();
                } else {
                  mainError.textContent = "මොකක්හරි වැරැද්දක් වෙලා"; // main error content top of the page
                  mainError.style.display = "block";
                  Command: toastr["error"]("මොකක්හරි වැරැද්දක් වෙලා");
                }
              } else {
                // check current language and visualize error
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
                  Command: toastr["error"]("Something went wrong");
                }
              }
            });
          } else if (response.status === 409) {
            response.json().then((data) => {
              if (data.message == "email3") {
                if (lang == "sin")
                  emailError.textContent =
                    "මෙම විද්‍යුත් තැපෑල දැනටමත් භාවිතා කර ඇත";
                else emailError.textContent = "This email is already used";
                email.focus();
              }
            });
          } else {
            mainError.textContent = "CORS ERROR";
            mainError.style.display = "block";
            console.error("Error:", response.status);
            Command: toastr["error"](response.status, "Error");
          }
        })
        .catch((error) => {
          if (lang == "sin")
            mainError.textContent = "සම්බන්ධතාවය ප්රතික්ෂේප විය";
          else mainError.textContent = "CONNECTION REFUSED";
          mainError.style.display = "block";
          console.error("An error occurred:", error);
          Command: toastr["error"](error);
        });
    }
  });

  function fname_status_func() {
    if (typeof fname.value === "string" && fname.value.trim().length === 0) {
      if (lang == "sin") fnameError.textContent = "මුල් නම හිස් විය නොහැක";
      else fnameError.textContent = "First name cannot be empty";
      fname_status = false;
      return false;
    } else if (!ValidateName(fname.value)) {
      if (lang == "sin")
        fnameError.textContent = "නමේ අඩංගු විය යුත්තේ අකුරු සහ ' '";
      else fnameError.textContent = "Name must contain only letters and ' '";
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
      if (lang == "sin") lnameError.textContent = "අවසාන නම හිස් විය නොහැක";
      else lnameError.textContent = "Last name cannot be empty";
      lname_status = false;
      return false;
    } else if (!ValidateName(lname.value)) {
      if (lang == "sin")
        lnameError.textContent = "නමේ අඩංගු විය යුත්තේ අකුරු සහ ' '";
      else lnameError.textContent = "Name must contain only letters and ' '";
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
      if (lang == "sin")
        emailError.textContent = "විද්‍යුත් තැපෑල හිස් විය නොහැක";
      else emailError.textContent = "Email cannot be empty";
      email_status = false;
      return false;
    } else if (!ValidateEmail(email.value)) {
      if (lang == "sin") emailError.textContent = "වලංගු නොවන ඊමේල් ලිපිනයක්!";
      else emailError.textContent = "Invalid email address!";
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
      if (lang == "sin") passwordError.textContent = "මුරපදය හිස් විය නොහැක";
      else passwordError.textContent = "Password cannot be empty";
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
      if (lang == "sin") phoneError.textContent = "දුරකථන අංකය හිස් විය නොහැක";
      else phoneError.textContent = "Phone number cannot be empty";
      phone_status = false;
      return false;
    } else if (!ValidatePhone(phone.value)) {
      if (lang == "sin") phoneError.textContent = "අවලංගු දුරකථන අංකය!";
      else phoneError.textContent = "Invalid phone number!";
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
      if (lang == "sin")
        address1Error.textContent = "ලිපින පේළිය 1 හිස් විය නොහැක";
      else address1Error.textContent = "Address Line 1 cannot be empty";
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
      if (lang == "sin") address2Error.textContent = "වීදිය හිස් විය නොහැක";
      else address2Error.textContent = "Street cannot be empty";
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
      if (lang == "sin") address3Error.textContent = "නගරය හිස් විය නොහැක";
      else address3Error.textContent = "City cannot be empty";
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
  var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (email.match(emailRegex)) return true;
  else return false;
}

function ValidateName(name) {
  var nameRegex = /^[a-zA-Z ]{2,30}$/;
  if (nameRegex.test(name)) return true;
  else return false;
}

function ValidatePhone(number) {
  var phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  if (number.match(phoneRegex)) return true;
  else return false;
}

// TODO address validations
