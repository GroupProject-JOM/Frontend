(() => {
  const body = document.querySelector("body"),
    sin = body.querySelector(".sin"),
    en = body.querySelector(".en"),
    fh = body.querySelector(".form-heading"),
    fname = body.querySelector(".fname"),
    fnameError = body.querySelector(".fname-error"),
    lname = body.querySelector(".lname"),
    lnameError = body.querySelector(".lname-error"),
    phone = body.querySelector(".phone"),
    phoneError = body.querySelector(".phone-error"),
    address = body.querySelector(".address"),
    address1 = body.querySelector(".address1"),
    address1Error = body.querySelector(".address1-error"),
    address2 = body.querySelector(".address2"),
    address2Error = body.querySelector(".address2-error"),
    address3 = body.querySelector(".address3"),
    address3Error = body.querySelector(".address3-error"),
    btn = body.querySelector(".form-button"),
    fnameLabel = body.querySelector(".fname-label"),
    lnameLabel = body.querySelector(".lname-label"),
    phoneLabel = body.querySelector(".phone-label"),
    address1Label = body.querySelector(".address1-label"),
    address2Label = body.querySelector(".address2-label"),
    address3Label = body.querySelector(".address3-label");

  sin.addEventListener("click", () => {
    sin.classList.add("active");
    en.classList.remove("active");

    document.documentElement.setAttribute("lang", "sin");
    document.cookie = "lang=sin; path=/";
    lang = "sin";

    fh.textContent = data["sin"]["fh"];
    fname.placeholder = data["sin"]["fname"]; // input field 'first name' placeholder
    lname.placeholder = data["sin"]["lname"];
    phone.placeholder = data["sin"]["phone"];
    address.textContent = data["sin"]["address"];
    address1.placeholder = data["sin"]["address1"];
    address2.placeholder = data["sin"]["address2"];
    address3.placeholder = data["sin"]["address3"];
    btn.textContent = data["sin"]["btn"];
    fnameLabel.textContent = data["sin"]["fnameLabel"];
    lnameLabel.textContent = data["sin"]["lnameLabel"];
    phoneLabel.textContent = data["sin"]["phoneLabel"];
    address1Label.textContent = data["sin"]["address1Label"];
    address2Label.textContent = data["sin"]["address2Label"];
    address3Label.textContent = data["sin"]["address3Label"];
    setGreeting();
  });

  en.addEventListener("click", () => {
    en.classList.add("active");
    sin.classList.remove("active");

    document.documentElement.setAttribute("lang", "en");
    document.cookie = "lang=en; path=/";
    lang = "en";

    fh.textContent = data["en"]["fh"];
    fname.placeholder = data["en"]["fname"]; // input field 'first name' placeholder
    lname.placeholder = data["en"]["lname"];
    phone.placeholder = data["en"]["phone"];
    address.textContent = data["en"]["address"];
    address1.placeholder = data["en"]["address1"];
    address2.placeholder = data["en"]["address2"];
    address3.placeholder = data["en"]["address3"];
    btn.textContent = data["en"]["btn"];
    fnameLabel.textContent = data["en"]["fnameLabel"];
    lnameLabel.textContent = data["en"]["lnameLabel"];
    phoneLabel.textContent = data["en"]["phoneLabel"];
    address1Label.textContent = data["en"]["address1Label"];
    address2Label.textContent = data["en"]["address2Label"];
    address3Label.textContent = data["en"]["address3Label"];
    setGreeting();
  });

  var data = {
    sin: {
      fh: "ඔබගේ විස්තර සංස්කරණය කරන්න",
      fname: "මුල් නම ඇතුලත් කරන්න",
      lname: "අවසන් නම ඇතුලත් කරන්න",
      phone: "දුරකථන අංකය ඇතුලත් කරන්න",
      address: "පුද්ගලික ලිපිනය",
      address1: "ලිපිනයේ පළමු පේළිය ඇතුලත් කරන්න",
      address2: "වීදිය ඇතුලත් කරන්න",
      address3: "නගරය ඇතුලත් කරන්න",
      btn: "වෙනස්කම් සුරකින්න",
      fnameLabel: "මුල් නම",
      lnameLabel: "අවසන් නම",
      phoneLabel: "දුරකථන අංකය",
      address1Label: "ලිපිනයේ පළමු පේළිය",
      address2Label: "වීදිය",
      address3Label: "නගරය",
    },
    en: {
      fh: "Edit Your Details",
      fname: "Enter First Name",
      lname: "Enter Last Name",
      phone: "Enter Phone Number",
      address: "Personal Address",
      address1: "Enter Address Line 1",
      address2: "Enter Street",
      address3: "Enter City",
      btn: "Save Changes",
      fnameLabel: "First Name",
      lnameLabel: "Last Name",
      phoneLabel: "Phone Number",
      address1Label: "Address Line 1",
      address2Label: "Street",
      address3Label: "City",
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
          fname.value = data.user.first_name;
          lname.value = data.user.last_name;
          phone.value = data.user.phone;
          address1.value = data.user.add_line_1;
          address2.value = data.user.add_line_2;
          address3.value = data.user.add_line_3;
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

  var fname_status = false,
    lname_status = false,
    phone_status = false,
    address1_status = false,
    address2_status = false,
    address3_status = false;

  // input chage validations
  fname.addEventListener("input", () => {
    fname_status_func();
  });
  lname.addEventListener("input", () => {
    lname_status_func();
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
      phone_status &&
      address1_status &&
      address2_status &&
      address3_status
    ) {
      // create form data object
      var formData = {
        first_name: fname.value,
        last_name: lname.value,
        phone: phone.value,
        add_line_1: address1.value,
        add_line_2: address2.value,
        add_line_3: address3.value,
      };

      // send form data object via fetch api
      fetch(backProxy + "/profile", {
        // endpoint
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
              var title = "යාවත්කාලීන කරන ලදී!",
                text = "ඔබගේ පැතිකඩ සාර්ථකව යාවත්කාලීන කර ඇත.";
            } else {
              var title = "Updated!",
                text = "Your profile has been successfully updated.";
            }
            // sweet alert
            Swal.fire({
              title: title,
              text: text,
              icon: "success",
              confirmButtonColor: confirmButtonColor,
            }).then((response) => {
              window.location.href = "./view.html";
            });
          } else if (response.status === 202) {
            response.json().then((data) => {
              console.log(data.message);
            });
            if (lang == "sin")
              Command: toastr["error"]("පැතිකඩ යාවත්කාලීන කළ නොහැක");
            else Command: toastr["error"]("Cannot update profile");
          } else if (response.status === 401) {
            response.json().then((data) => {
              console.log(data.message);
            });
            if (lang == "sin") Command: toastr["error"]("වලංගු නොවන පරිශීලක");
            else Command: toastr["error"]("Invalid User");
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
                } else if (data.message == "phone") {
                  phoneError.textContent = "දුරකථන අංකය හිස් විය නොහැක!";
                  phone.focus();
                } else if (data.message == "adddress1") {
                  address1Error.textContent = "ලිපිනයේ පළමු පේළිය හිස් විය නොහැක!";
                  address1.focus();
                } else if (data.message == "adddress2") {
                  address2Error.textContent = "වීදිය හිස් විය නොහැක!";
                  address2.focus();
                } else if (data.message == "adddress3") {
                  address3Error.textContent = "නගරය හිස් විය නොහැක!";
                  address3.focus();
                } else {
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
                  Command: toastr["error"]("Something went wrong");
                }
              }
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
        fnameError.textContent = "නමේ අඩංගු විය යුත්තේ අකුරු පමණයි";
      else fnameError.textContent = "Name must contain only letters";
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
        lnameError.textContent = "නමේ අඩංගු විය යුත්තේ අකුරු පමණයි";
      else lnameError.textContent = "Name must contain only letters";
      lname_status = false;
      return false;
    } else {
      lname_status = true;
      lnameError.textContent = "";
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
        address1Error.textContent = "ලිපිනයේ පළමු පේළිය හිස් විය නොහැක";
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
