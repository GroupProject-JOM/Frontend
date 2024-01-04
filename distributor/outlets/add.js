document.cookie = "id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
(() => {
  const body = document.querySelector("body"),
    sin = body.querySelector(".sin"),
    en = body.querySelector(".en"),
    oTitle = body.querySelector(".outlet-title"),
    oname = body.querySelector(".oname"),
    onameError = body.querySelector(".oname-error"),
    email = body.querySelector(".email"),
    emailError = document.querySelector(".email-error"),
    phone = body.querySelector(".phone"),
    phoneError = body.querySelector(".phone-error"),
    address1 = body.querySelector(".address1"),
    address1Error = body.querySelector(".address1-error"),
    address2 = body.querySelector(".address2"),
    address2Error = body.querySelector(".address2-error"),
    address3 = body.querySelector(".address3"),
    address3Error = body.querySelector(".address3-error"),
    btn = body.querySelector(".form-button");

  var oname_status = false,
    email_status = false,
    phone_status = false,
    address1_status = false,
    address2_status = false,
    address3_status = false,
    lang = getCookie("lang"); // current language

  sin.addEventListener("click", () => {
    sin.classList.add("active");
    en.classList.remove("active");

    document.documentElement.setAttribute("lang", "sin");
    // sessionStorage.setItem("lang", "sin");
    document.cookie = "lang=sin; path=/";
    lang = "sin";

    oTitle.textContent = data["sin"]["oTitle"];
    oname.placeholder = data["sin"]["oname"];
    email.placeholder = data["sin"]["email"];
    phone.placeholder = data["sin"]["phone"];
    address1.placeholder = data["sin"]["address1"];
    address2.placeholder = data["sin"]["address2"];
    address3.placeholder = data["sin"]["address3"];
    btn.textContent = data["sin"]["btn"];
    setGreeting();
  });

  en.addEventListener("click", () => {
    en.classList.add("active");
    sin.classList.remove("active");

    document.documentElement.setAttribute("lang", "en");
    // sessionStorage.setItem("lang", "en");
    document.cookie = "lang=en; path=/";
    lang = "en";

    oTitle.textContent = data["en"]["oTitle"];
    oname.placeholder = data["en"]["oname"];
    email.placeholder = data["en"]["email"];
    phone.placeholder = data["en"]["phone"];
    address1.placeholder = data["en"]["address1"];
    address2.placeholder = data["en"]["address2"];
    address3.placeholder = data["en"]["address3"];
    btn.textContent = data["en"]["btn"];
    setGreeting();
  });

  var data = {
    sin: {
      oTitle: "නව අලෙවිසැල එක් කරන්න",
      oname: "අලෙවිසැලේ නම",
      email: "Outlet විද්‍යුත් තැපෑල",
      phone: "අලෙවිසැල දුරකථන අංකය",
      address1: "ලිපින පේළි 1",
      address2: "වීදිය",
      address3: "නගරය",
      btn: "එකතු කරන්න",
    },
    en: {
      oTitle: "Add New Outlet",
      oname: "Outlet Name",
      email: "Outlet Email",
      phone: "Outlet Phone Number",
      address1: "Address Line 1",
      address2: "Street",
      address3: "City",
      btn: "Add",
    },
  };

  oname.addEventListener("input", () => {
    oname_status_func();
  });
  email.addEventListener("input", () => {
    email_status_func();
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

  btn.addEventListener("click", () => {
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
    if (!email_status_func()) {
      email.focus();
    }
    if (!oname_status_func()) {
      oname.focus();
    }

    if (
      oname_status &&
      email_status &&
      phone_status &&
      address1_status &&
      address2_status &&
      address3_status
    ) {
      var formData = {
        name: oname.value,
        email: email.value,
        phone: phone.value,
        address1: address1.value,
        street: address2.value,
        city: address3.value,
      };
      fetch(backProxy + "/outlet", {
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
              console.log(data.message);
            });
            if (lang == "sin") var title = "අලෙවිසැල සාර්ථකව එකතු කරන ලදී";
            else var title = "Outlet added successfully";

            Swal.fire({
              title: title,
              // text: "You clicked the button!",
              icon: "success",
              confirmButtonColor: confirmButtonColor,
            }).then((response) => {
              window.location.href = "./";
            });
          } else if (response.status === 400) {
            response.json().then((data) => {
              console.log(data.message);
            });
            if (lang == "sin") Command: toastr["error"]("අලෙවිසැල එකතු කර නැත");
            else Command: toastr["error"]("Outlet is not added");
          } else if (response.status === 401) {
            response.json().then((data) => {
              console.log(data.message);
            });
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

  function oname_status_func() {
    if (typeof oname.value === "string" && oname.value.trim().length === 0) {
      if (lang == "sin") onameError.textContent = "අලෙවිසැලේ නම හිස් විය නොහැක";
      else onameError.textContent = "Outlet name cannot be empty";
      oname_status = false;
      return false;
    } else if (!ValidateName(oname.value)) {
      if (lang == "sin")
        onameError.textContent = "නමේ අඩංගු විය යුත්තේ අකුරු සහ ' '";
      else
        onameError.textContent =
          "Name must contain only numbers, letters and ' '";
      oname_status = false;
      return false;
    } else {
      onameError.textContent = "";
      oname_status = true;
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
  var nameRegex = /^[a-zA-Z0-9 ]{2,30}$/;
  if (nameRegex.test(name)) return true;
  else return false;
}

function ValidatePhone(number) {
  var phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  if (number.match(phoneRegex)) return true;
  else return false;
}
