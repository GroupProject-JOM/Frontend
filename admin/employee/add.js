document.cookie = "id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
let gendr, bDay;
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
    phone = body.querySelector(".phone"),
    phoneError = body.querySelector(".phone-error"),
    address1 = body.querySelector(".address1"),
    address1Error = body.querySelector(".address1-error"),
    address2 = body.querySelector(".address2"),
    address2Error = body.querySelector(".address2-error"),
    address3 = body.querySelector(".address3"),
    address3Error = body.querySelector(".address3-error"),
    nic = body.querySelector(".nic"),
    nicError = body.querySelector(".nic-error"),
    dropdown = body.querySelector(".dropdown"),
    dropdownError = body.querySelector(".dropdown-error"),
    op0 = body.querySelector(".op0"),
    op1 = body.querySelector(".op1"),
    op2 = body.querySelector(".op2"),
    op3 = body.querySelector(".op3"),
    op4 = body.querySelector(".op4"),
    op5 = body.querySelector(".op5"),
    btn = body.querySelector(".form-button");

  var fnameStatus = false,
    lnameStatus = false,
    emailStatus = false,
    phoneStatus = false,
    address1Status = false,
    address2Status = false,
    address3Status = false,
    nicStatus = false,
    dropdownStatus = false,
    lang = getCookie("lang"); // current language

  sin.addEventListener("click", () => {
    sin.classList.add("active");
    en.classList.remove("active");

    document.documentElement.setAttribute("lang", "sin");
    document.cookie = "lang=sin; path=/";
    lang = "sin";

    fh.textContent = data["sin"]["fh"];
    fname.placeholder = data["sin"]["fname"];
    lname.placeholder = data["sin"]["lname"];
    email.placeholder = data["sin"]["email"];
    phone.placeholder = data["sin"]["phone"];
    address1.placeholder = data["sin"]["address1"];
    address2.placeholder = data["sin"]["address2"];
    address3.placeholder = data["sin"]["address3"];
    nic.placeholder = data["sin"]["nic"];
    op0.textContent = data["sin"]["op0"];
    op1.textContent = data["sin"]["op1"];
    op2.textContent = data["sin"]["op2"];
    op3.textContent = data["sin"]["op3"];
    op4.textContent = data["sin"]["op4"];
    op5.textContent = data["sin"]["op5"];
    btn.textContent = data["sin"]["btn"];
    setGreeting();
  });

  en.addEventListener("click", () => {
    en.classList.add("active");
    sin.classList.remove("active");

    document.documentElement.setAttribute("lang", "en");
    document.cookie = "lang=en; path=/";
    lang = "en";

    fh.textContent = data["en"]["fh"];
    fname.placeholder = data["en"]["fname"];
    lname.placeholder = data["en"]["lname"];
    email.placeholder = data["en"]["email"];
    phone.placeholder = data["en"]["phone"];
    address1.placeholder = data["en"]["address1"];
    address2.placeholder = data["en"]["address2"];
    address3.placeholder = data["en"]["address3"];
    nic.placeholder = data["en"]["nic"];
    op0.textContent = data["en"]["op0"];
    op1.textContent = data["en"]["op1"];
    op2.textContent = data["en"]["op2"];
    op3.textContent = data["en"]["op3"];
    op4.textContent = data["en"]["op4"];
    op5.textContent = data["en"]["op5"];
    btn.textContent = data["en"]["btn"];
    setGreeting();
  });

  var data = {
    sin: {
      fh: "සේවකයා ලියාපදිංචි කරන්න",
      fname: "මුල් නම",
      lname: "අවසන් නම",
      email: "ඊතැපැල් ලිපිනය",
      phone: "දුරකථන අංකය",
      address1: "ලිපින පේළි 1",
      address2: "වීදිය",
      address3: "නගරය",
      nic: "ජාතික හැඳුනුම්පත් අංකය",
      op0: "තනතුරු",
      op1: "එකතුකරන්නා",
      op2: "බෙදාහරින්නා",
      op3: "කොටස් කළමනාකරු",
      op4: "නිෂ්පාදන කළමනාකරු",
      op5: "අලෙවි කළමනාකරු",
      btn: "සේවකයා එකතු කරන්න",
    },
    en: {
      fh: "Register Employee",
      fname: "First Name",
      lname: "Last Name",
      email: "Email Address",
      phone: "Phone Number",
      address1: "Address Line-1",
      address2: "Street",
      address3: "City",
      nic: "NIC Number",
      op0: "Designation",
      op1: "Collector",
      op2: "Distributor",
      op3: "Stock Manager",
      op4: "Production Manager",
      op5: "Sales Manager",
      btn: "Add Employee",
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
  nic.addEventListener("input", () => {
    nic_status_func();
  });
  dropdown.addEventListener("input", () => {
    dropdown_status_func();
  });

  btn.addEventListener("click", () => {
    // submit form validation
    if (!dropdown_status_func()) {
      dropdown.focus();
    }
    if (!nic_status_func()) {
      nic.focus();
    }
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
    if (!lname_status_func()) {
      lname.focus();
    }
    if (!fname_status_func()) {
      fname.focus();
    }

    if (
      fnameStatus &&
      lnameStatus &&
      emailStatus &&
      phoneStatus &&
      address1Status &&
      address2Status &&
      address3Status &&
      nicStatus &&
      dropdownStatus
    ) {
      var formData = {
        first_name: fname.value,
        last_name: lname.value,
        email: email.value,
        phone: phone.value,
        add_line_1: address1.value,
        add_line_2: address2.value,
        add_line_3: address3.value,
        dob: bDay,
        gender: gendr,
        nic: nic.value,
        role: dropdown.value,
      };

      fetch(backProxy + "/employee", {
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
            window.location.href = "./view-all.html";
          } else if (response.status === 401) {
            if (lang == "sin")
              Command: toastr["warning"]("ලියාපදිංචිය අසාර්ථකයි");
            else Command: toastr["warning"]("Registration unsuccessful");
          } else if (response.status === 400) {
            // backend error handle
            response.json().then((data) => {
              if (lang == "sin") {
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
                } else if (data.message == "nic") {
                  nicError.textContent = "ජාතික හැඳුනුම්පත හිස් විය නොහැක!";
                  nic.focus();
                } else if (data.message == "NIC") {
                  nicError.textContent = "NIC දැනටමත් පවතී!";
                  nic.focus();
                } else if (data.message == "role") {
                  dropdownError.textContent = "තනතුර හිස් විය නොහැක!";
                  dropdown.focus();
                } else if (data.message == "roleV") {
                  dropdownError.textContent = "වලංගු තනතුරක් ඇතුළත් කරන්න!";
                  dropdown.focus();
                } else {
                  console.log(data.message);
                  Command: toastr["error"](data.message);
                }
              } else {
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
                } else if (data.message == "nic") {
                  nicError.textContent = "NIC cannot be empty!";
                  nic.focus();
                } else if (data.message == "NIC") {
                  nicError.textContent = "NIC already exists!";
                  nic.focus();
                } else if (data.message == "role") {
                  dropdownError.textContent = "Designation cannot be empty!";
                  dropdown.focus();
                } else if (data.message == "roleV") {
                  dropdownError.textContent = "Enter valid designation!";
                  dropdown.focus();
                } else {
                  console.log(data.message);
                  Command: toastr["error"](data.message);
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
      fnameStatus = false;
      return false;
    } else if (!ValidateName(fname.value)) {
      if (lang == "sin")
        fnameError.textContent = "නමේ අඩංගු විය යුත්තේ අකුරු සහ ' '";
      else fnameError.textContent = "Name must contain only letters and ' '";
      fnameStatus = false;
      return false;
    } else {
      fnameError.textContent = "";
      fnameStatus = true;
      return true;
    }
  }

  function lname_status_func() {
    if (typeof lname.value === "string" && lname.value.trim().length === 0) {
      if (lang == "sin") lnameError.textContent = "අවසාන නම හිස් විය නොහැක";
      else lnameError.textContent = "Last name cannot be empty";
      lnameStatus = false;
      return false;
    } else if (!ValidateName(lname.value)) {
      if (lang == "sin")
        lnameError.textContent = "නමේ අඩංගු විය යුත්තේ අකුරු සහ ' '";
      else lnameError.textContent = "Name must contain only letters and ' '";
      lnameStatus = false;
      return false;
    } else {
      lnameStatus = true;
      lnameError.textContent = "";
      return true;
    }
  }

  function email_status_func() {
    if (typeof email.value === "string" && email.value.trim().length === 0) {
      if (lang == "sin")
        emailError.textContent = "විද්‍යුත් තැපෑල හිස් විය නොහැක";
      else emailError.textContent = "Email cannot be empty";
      emailStatus = false;
      return false;
    } else if (!ValidateEmail(email.value)) {
      if (lang == "sin") emailError.textContent = "වලංගු නොවන ඊමේල් ලිපිනයක්!";
      else emailError.textContent = "Invalid email address!";
      emailStatus = false;
      return false;
    } else {
      emailError.textContent = "";
      emailStatus = true;
      return true;
    }
  }

  function phone_status_func() {
    if (typeof phone.value === "string" && phone.value.trim().length === 0) {
      if (lang == "sin") phoneError.textContent = "දුරකථන අංකය හිස් විය නොහැක";
      else phoneError.textContent = "Phone number cannot be empty";
      phoneStatus = false;
      return false;
    } else if (!ValidatePhone(phone.value)) {
      if (lang == "sin") phoneError.textContent = "අවලංගු දුරකථන අංකය!";
      else phoneError.textContent = "Invalid phone number!";
      phoneStatus = false;
      return false;
    } else {
      phoneStatus = true;
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
      address1Status = false;
      return false;
    } else {
      address1Status = true;
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
      address2Status = false;
      return false;
    } else {
      address2Status = true;
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
      address3Status = false;
      return false;
    } else {
      address3Status = true;
      address3Error.textContent = "";
      return true;
    }
  }

  function nic_status_func() {
    if (typeof nic.value === "string" && nic.value.trim().length === 0) {
      if (lang == "sin")
        nicError.textContent = "ජාතික හැඳුනුම්පත හිස් විය නොහැක";
      else nicError.textContent = "NIC cannot be empty";
      nicStatus = false;
      return false;
    } else if (!ValidateNIC(nic.value)) {
      if (lang == "sin")
        nicError.textContent = "ඔබ ඇතුළත් කළ ජාතික හැඳුනුම්පත් අංකය වැරදියි";
      else nicError.textContent = "You Entered NIC Number Is wrong";
      nicStatus = false;
      return false;
    } else {
      nicStatus = true;
      nicError.textContent = "";
      return true;
    }
  }
  function dropdown_status_func() {
    if (
      typeof dropdown.value === "string" &&
      dropdown.value.trim().length === 0
    ) {
      if (lang == "sin") dropdownError.textContent = "තනතුර හිස් විය නොහැක!";
      else dropdownError.textContent = "Designation cannot be empty";
      dropdownStatus = false;
      return false;
    } else {
      dropdownStatus = true;
      dropdownError.textContent = "";
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

var d_array = [
  { month: "January", days: 31 },
  { month: "February", days: 29 },
  { month: "March", days: 31 },
  { month: "April", days: 30 },
  { month: "May", days: 31 },
  { month: "June", days: 30 },
  { month: "July", days: 31 },
  { month: "August", days: 31 },
  { month: "Septhember", days: 30 },
  { month: "October", days: 31 },
  { month: "November", days: 30 },
  { month: "December", days: 31 },
];

function ValidateNIC(nicNumber) {
  if (validation(nicNumber)) {
    var extracttedData = extractData(nicNumber);
    var days = extracttedData.dayList;
    if (0 > days || days > 866) {
      return false;
    }
    if (500 > days && days > 366) {
      console.log("");
      return false;
    }
    var findedData = findDayANDGender(days, d_array);

    var month = findedData.month;
    var year = extracttedData.year;
    if (year < 1953 || year > 2005) {
      return false;
    }
    var day = findedData.day;
    gendr = findedData.gender;
    var bday = day + "-" + month + "-" + year;
    var birthday = new Date(
      bday.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3")
    );
    bDay = getFormattedDate(birthday);
    return true;
  } else return false;
}

function findDayANDGender(days, d_array) {
  var dayList = days;
  var month = "";
  var result = { day: "", month: "", gender: "" };

  if (dayList < 500) {
    result.gender = "Male";
  } else {
    result.gender = "Female";
    dayList = dayList - 500;
  }

  for (var i = 0; i < d_array.length; i++) {
    if (d_array[i]["days"] < dayList) {
      dayList = dayList - d_array[i]["days"];
    } else {
      month = d_array[i]["month"];
      break;
    }
  }
  result.day = dayList;
  result.month = month;
  return result;
}

function extractData(nicNumber) {
  var nicNumber = nicNumber;
  var result = { year: "", dayList: "", character: "" };

  if (nicNumber.length === 10) {
    result.year = nicNumber.substr(0, 2);
    result.dayList = nicNumber.substr(2, 3);
    result.character = nicNumber.substr(9, 10);
  } else if (nicNumber.length === 12) {
    result.year = nicNumber.substr(0, 4);
    result.dayList = nicNumber.substr(4, 3);
    result.character = "no";
  }
  return result;
}

function validation(nicNumber) {
  var result = false;
  if (
    nicNumber.length === 10 &&
    !isNaN(nicNumber.substr(0, 9)) &&
    isNaN(nicNumber.substr(9, 1).toLowerCase()) &&
    ["x", "v"].includes(nicNumber.substr(9, 1).toLowerCase())
  ) {
    result = true;
  } else if (nicNumber.length === 12 && !isNaN(nicNumber)) {
    result = true;
  } else {
    result = false;
  }
  return result;
}

function getFormattedDate(date) {
  var year = date.getFullYear();

  var month = (1 + date.getMonth()).toString();
  month = month.length > 1 ? month : "0" + month;

  var day = date.getDate().toString();
  day = day.length > 1 ? day : "0" + day;

  return month + "/" + day + "/" + year;
}
