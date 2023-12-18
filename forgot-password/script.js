(() => {
  const body = document.querySelector("body"),
    sin = body.querySelector(".sin"),
    en = body.querySelector(".en"),
    fh1 = body.querySelector(".heading1"),
    fh2 = body.querySelector(".heading2"),
    fh3 = body.querySelector(".heading3"),
    tx1 = body.querySelector(".text1"),
    tx2 = body.querySelector(".text2"),
    tx3 = body.querySelector(".text3"),
    email = body.querySelector(".email"),
    emailError = document.querySelector(".email-error"),
    sendOTP = body.querySelector(".send-otp"),
    counter = body.querySelector("#counter"),
    emailRing = body.querySelector(".lds-ring"),
    error = body.querySelector(".error"),
    otp = body.querySelector(".otp"),
    verify = body.querySelector(".verify-otp");

  var lang = getCookie("lang"); // current language

  sin.addEventListener("click", () => {
    sin.classList.add("active");
    en.classList.remove("active");

    document.documentElement.setAttribute("lang", "sin"); // edit lang in html tag
    document.cookie = "lang=sin; path=/"; // save current language in the cookie
    lang = "sin";

    fh1.textContent = data["sin"]["fh1"];
    fh2.textContent = data["sin"]["fh2"];
    fh3.textContent = data["sin"]["fh3"];
    tx1.textContent = data["sin"]["tx1"];
    tx2.textContent = data["sin"]["tx2"];
    tx3.textContent = data["sin"]["tx3"];
    sendOTP.textContent = data["sin"]["sendOTP"];
    verify.textContent = data["sin"]["verify"];
    email.placeholder = data["sin"]["email"];
    otp.placeholder = data["sin"]["otp"];
  });

  en.addEventListener("click", () => {
    // when en is clicked
    en.classList.add("active");
    sin.classList.remove("active");

    document.documentElement.setAttribute("lang", "en"); // edit lang in html tag
    document.cookie = "lang=en; path=/"; // save current language in the cookie
    lang = "en";

    fh1.textContent = data["en"]["fh1"];
    fh2.textContent = data["en"]["fh2"];
    fh3.textContent = data["en"]["fh3"];
    tx1.textContent = data["en"]["tx1"];
    tx2.textContent = data["en"]["tx2"];
    tx3.textContent = data["en"]["tx3"];
    sendOTP.textContent = data["en"]["sendOTP"];
    verify.textContent = data["en"]["verify"];
    email.placeholder = data["en"]["email"];
    otp.placeholder = data["en"]["otp"];
  });

  var data = {
    sin: {
      fh1: "මුරපදය අමතක වුණා ද?",
      fh2: "ඔබගේ විද්‍යුත් තැපෑල තහවුරු කරන්න",
      fh3: "කේතය ඇතුලත් කරන්න",
      tx1: "මුරපදය වෙනස් කිරීමෙන් ගිණුම නැවත ලබා ගන්න",
      tx2: "කේතයක් ලබා ගැනීමට ඔබගේ ඊමේල් ලිපිනය ඇතුලත් කරන්න",
      tx3: "ඔබගේ විද්‍යුත් තැපැල් ලිපිනයට එවන ලද කේතය ඇතුලත් කරන්න",
      sendOTP: "කේතය යවන්න",
      verify: "කේතය තහවුරු කරන්න",
      email: "ඊතැපැල් ලිපිනය",
      otp: "කේතය ඇතුලත් කරන්න",
    },

    en: {
      fh1: "Forgot Password?",
      fh2: "Verify your email",
      fh3: "Enter OTP",
      tx1: "Reset and create a new password",
      tx2: "Enter your email address to get an recovery code",
      tx3: "Enter the OTP sent to your email address",
      sendOTP: "Send OTP",
      verify: "Verify OTP",
      email: "Email Address",
      otp: "Enter Code",
    },
  };

  email.value = getCookie("email");

  var email_status = false,
    oId;

  email.addEventListener("input", () => {
    email_status_func();
  });

  sendOTP.addEventListener("click", () => {
    if (!email_status_func()) {
      email.focus();
    }

    if (email_status) {
      emailRing.style.display = "block";
      sendOTP.style.display = "none";

      var formData = {
        email: email.value,
      };
      fetch(backProxy + "/forgot-password", {
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

              if (lang == "sin") {
                error.textContent = "OTP යවන ලදී";
                Command: toastr["info"]("OTP යවන ලදී");
              } else {
                error.textContent = "OTP sent";
                Command: toastr["info"]("OTP sent");
              }
              oId = data.oId;
              log(data)
            });
            emailRing.style.display = "none";
            sendOTP.textContent = "Resend";
            sendOTP.style.display = "block";
            sendOTP.disabled = true;
            counter.style.display = "block";

            var count = 59,
              timer = setInterval(() => {
                counter.innerHTML = "00:" + count--;
                if (count == 0) {
                  clearInterval(timer);
                  sendOTP.disabled = false;
                  counter.style.display = "none";
                }
              }, 1000);
          } else if (response.status === 409) {
            if (lang == "sin") {
              error.textContent =
                "OTP යැවීමට අසමත් විය, කරුණාකර පසුව නැවත උත්සාහ කරන්න";
              Command: toastr["error"](
                "OTP යැවීමට අසමත් විය, කරුණාකර පසුව නැවත උත්සාහ කරන්න"
              );
            } else {
              error.textContent = "Failed to send OTP, please try again later";
              Command: toastr["error"](
                "Failed to send OTP, please try again later"
              );
            }
          } else if (response.status === 401) {
            if (lang == "sin") {
              error.textContent = "වලංගු නොවන පරිශීලක";
              Command: toastr["error"]("වලංගු නොවන පරිශීලක");
            } else {
              error.textContent = "Invalid user";
              Command: toastr["error"]("Invalid user");
            }
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

  function email_status_func() {
    if (
      typeof email.value === "string" &&
      email.value.trim().length === 0
    ) {
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
})();

function ValidateEmail(email) {
  var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (email.match(emailRegex)) return true;
  else return false;
}
