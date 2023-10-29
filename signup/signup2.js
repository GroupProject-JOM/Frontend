(() => {
  const body = document.querySelector("body"),
    sin = body.querySelector(".sin"),
    en = body.querySelector(".en"),
    fh1 = body.querySelector(".form-heading1"),
    fh2 = body.querySelector(".form-heading2"),
    fht1 = body.querySelector(".form-heading-text1"),
    fht2 = body.querySelector(".form-heading-text2"),
    fht3 = body.querySelector(".form-heading-text3"),
    fht4 = body.querySelector(".form-heading-text4"),
    eotp = body.querySelector(".email-otp"),
    potp = body.querySelector(".phone-otp"),
    sendEmail = body.querySelector(".send-email"),
    reEmail = body.querySelector(".renter-email"),
    emailOtp = body.querySelector(".email-otp"),
    shPhone = body.querySelector(".signup-heading-phone"),
    sendPhone = body.querySelector(".send-phone"),
    rePhone = body.querySelector(".renter-phone"),
    phoneOtp = body.querySelector(".phone-otp"),
    vPhone = body.querySelector(".vPhone"),
    next = body.querySelector(".next"),
    vbt1 = body.querySelector(".vb1"),
    vbt2 = body.querySelector(".vb2"),
    emailRing = body.querySelector(".lds-ring"),
    counter = body.querySelector("#counter");

  // var email = sessionStorage.getItem("email"),
  //   phone = sessionStorage.getItem("phone"),
  //   oId;
  var email = getCookie("email"),
    phone = getCookie("phone"),
    oId;

    // if(email == null){
    //   window.location.href = "./"
    // }

    if(phone == null){
      shPhone.style.display = "none";
      vPhone.style.display = "none";
    }

    if(getCookie("id") == null){
      fetch(backProxy + "/validateE?email="+email, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }).then((response) => {
        if (response.status == 200) {
          response.json().then((data) => {
            console.log(data.id);
            document.cookie = "id=" + data.id;
            document.cookie = "sId=" + data.sId;
          });
        } else if (response.status === 202) {
          console.log("No user in this email");
        } else {
          console.error("Error:", response.status);
        }
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
    }

  sin.addEventListener("click", () => {
    sin.classList.add("active");
    en.classList.remove("active");

    document.documentElement.setAttribute("lang", "sin");
    // sessionStorage.setItem("lang", "sin");
    document.cookie = "lang=sin; path=/";

    fh1.textContent = data["sin"]["fh1"];
    fh2.textContent = data["sin"]["fh2"];
    fht1.textContent = data["sin"]["fht1"];
    fht2.textContent = data["sin"]["fht2"];
    fht3.textContent = data["sin"]["fht3"];
    fht4.textContent = data["sin"]["fht4"];
    eotp.placeholder = data["sin"]["eotp"];
    potp.placeholder = data["sin"]["potp"];
    next.textContent = data["sin"]["next"];
    vbt1.textContent = data["sin"]["vbt1"];
    vbt2.textContent = data["sin"]["vbt2"];
  });

  en.addEventListener("click", () => {
    en.classList.add("active");
    sin.classList.remove("active");

    document.documentElement.setAttribute("lang", "en");
    // sessionStorage.setItem("lang", "en");
    document.cookie = "lang=en; path=/";

    fh1.textContent = data["en"]["fh1"];
    fh2.textContent = data["en"]["fh2"];
    fht1.textContent = data["en"]["fht1"];
    fht2.textContent = data["en"]["fht2"];
    fht3.textContent = data["en"]["fht3"];
    fht4.textContent = data["en"]["fht4"];
    eotp.placeholder = data["en"]["eotp"];
    potp.placeholder = data["en"]["potp"];
    next.textContent = data["en"]["next"];
    vbt1.textContent = data["en"]["vbt1"];
    vbt2.textContent = data["en"]["vbt2"];
  });

  var data = {
    sin: {
      fh1: "ඔබගේ විද්‍යුත් තැපෑල තහවුරු කරන්න",
      fh2: "ඔබගේ දුරකථනය තහවුරු කරන්න",
      fht1: email + " වෙත යැවූ OTP ඇතුලත් කරන්න",
      fht2: "වැරදි විද්‍යුත් තැපැල් ලිපිනයක්ද?",
      fht3: phone + " වෙත යැවූ OTP ඇතුලත් කරන්න",
      fht4: "වැරදි දුරකථන අංකයක්ද?",
      eotp: "කේතය ඇතුලත් කරන්න",
      potp: "කේතය ඇතුලත් කරන්න",
      next: "ඊළඟ",
      vbt1: "තහවුරු කරන්න",
      vbt2: "තහවුරු කරන්න",
    },
    en: {
      fh1: "Verify your email",
      fh2: "Verify your mobile",
      fht1: "Send OTP to " + email,
      fht2: "Wrong Email Address?",
      fht3: "Send OTP to " + phone,
      fht4: "Wrong Phone Number?",
      eotp: "Enter Code",
      potp: "Enter Code",
      next: "Next",
      vbt1: "Verify",
      vbt2: "Verify",
    },
  };

  checkLng();

  fht2.addEventListener("click", () => {
    reEmail.style.display = "block";
    sendEmail.style.display = "none";
    fht1.style.display = "none";
    emailOtp.style.display = "none";
    vbt1.style.display = "none";
  });

  fht4.addEventListener("click", () => {
    rePhone.style.display = "block";
    sendPhone.style.display = "none";
    fht3.style.display = "none";
    phoneOtp.style.display = "none";
    vbt2.style.display = "none";
  });

  sendEmail.addEventListener("click", () => {
    emailRing.style.display = "block";
    sendEmail.style.display = "none";

    var formData = {
      email: email,
      // id: sessionStorage.getItem("id"),
      id: getCookie("id"),
    };
    fetch(backProxy + "/email", {
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
            oId = data.oId;
          });
          emailRing.style.display = "none";
          sendEmail.textContent = "Resend";
          sendEmail.style.display = "block";
          sendEmail.disabled = true;
          counter.style.display = "block";

          var count = 59,
            timer = setInterval(() => {
              counter.innerHTML = "00:" + count--;
              if (count == 0) {
                clearInterval(timer);
                sendEmail.disabled = false;
                counter.style.display = "none";
              }
            }, 1000);
        } else if (response.status === 401) {
          console.log("Registration unsuccessful");
        } else {
          console.error("Error:", response.status);
        }
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  });

  const isValidate = false;
  // TODO input chage must be handle in emailOTP
  vbt1.addEventListener("click", () => {
    if (
      typeof emailOtp.value === "string" &&
      emailOtp.value.trim().length === 0
    ) {
      console.log("OTP cannot be empty");
      emailOtp.focus();
    } else {
      var formData = {
        otp: emailOtp.value,
        // id: sessionStorage.getItem("id"),
        id: getCookie("id"),
        oId: oId,
      };
      fetch(backProxy + "/validateE", {
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
            // sessionStorage.removeItem("id");
            // sessionStorage.removeItem("phone");
            // sessionStorage.removeItem("email");
            isValidate = true;
          } else if (response.status === 401) {
            console.log("Invalid OTP");
            emailOtp.focus();
          } else {
            console.error("Error:", response.status);
          }
        })
        .catch((error) => {
          console.error("An error occurred:", error);
        });
    }
  });

  next.addEventListener("click", () => {
    if (isValidate) {
      document.cookie =
        "id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/signup";
      document.cookie =
        "phone=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/signup";
      document.cookie =
        "email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/signup";
      window.location.href = frontProxy + "/signup/signup3.html";
    } else console.log("Please validate your Email address");
  });
})();
