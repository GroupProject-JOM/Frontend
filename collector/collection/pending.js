(() => {
  const body = document.querySelector("body"),
    sin = body.querySelector(".sin"),
    en = body.querySelector(".en"),
    cTitle = body.querySelector(".collection-title"),
    cSubTitle = body.querySelector(".collection-subtitle"),
    t1 = body.querySelector(".t1"),
    initAmount = body.querySelector(".initial-amount"),
    t2 = body.querySelector(".t2"),
    amount = body.querySelector(".collected-amount"),
    pVerification = body.querySelector(".pending-verification"),
    pHead = body.querySelector(".pending-heading"),
    pText = body.querySelector(".pending-text"),
    verification = body.querySelector(".verification"),
    vHead = body.querySelector(".verification-heading"),
    vText = body.querySelector(".verification-text"),
    sendEmail = body.querySelector(".send-email"),
    emailOTP = body.querySelector(".email-otp"),
    emailRing = body.querySelector(".lds-ring"),
    counter = body.querySelector("#counter"),
    error = body.querySelector(".error"),
    vBtn1 = body.querySelector(".verify-button"),
    vBtn2 = body.querySelector(".verification-button"),
    oVerification = body.querySelector(".optional-verification"),
    oHead = body.querySelector(".optional-heading"),
    oText = body.querySelector(".optional-text"),
    oBtn = body.querySelector(".optional-button");

  cSubTitle.textContent = getCookie("area");
  initAmount.textContent = getCookie("amount");
  amount.textContent = getCookie("final");

  var lang = getCookie("lang"); // current language

  sin.addEventListener("click", () => {
    sin.classList.add("active");
    en.classList.remove("active");

    document.documentElement.setAttribute("lang", "sin");
    document.cookie = "lang=sin; path=/";
    lang = "sin";

    cTitle.textContent = data["sin"]["cTitle"];
    t1.textContent = data["sin"]["t1"];
    t2.textContent = data["sin"]["t2"];
    pHead.textContent = data["sin"]["pHead"];
    pText.textContent = data["sin"]["pText"];
    vHead.textContent = data["sin"]["vHead"];
    vText.textContent = data["sin"]["vText"];
    vBtn1.textContent = data["sin"]["vBtn1"];
    vBtn2.textContent = data["sin"]["vBtn2"];
    oHead.textContent = data["sin"]["oHead"];
    vText.textContent = data["sin"]["vText"];
    oText.textContent = data["sin"]["oText"];
    oBtn.textContent = data["sin"]["oBtn"];
    sendEmail.textContent = data["sin"]["sendEmail"];
    emailOTP.placeholder = data["sin"]["emailOTP"];
    setGreeting();
  });

  en.addEventListener("click", () => {
    en.classList.add("active");
    sin.classList.remove("active");

    document.documentElement.setAttribute("lang", "en");
    document.cookie = "lang=en; path=/";
    lang = "en";

    cTitle.textContent = data["en"]["cTitle"];
    t1.textContent = data["en"]["t1"];
    t2.textContent = data["en"]["t2"];
    pHead.textContent = data["en"]["pHead"];
    pText.textContent = data["en"]["pText"];
    vHead.textContent = data["en"]["vHead"];
    vText.textContent = data["en"]["vText"];
    vBtn1.textContent = data["en"]["vBtn1"];
    vBtn2.textContent = data["en"]["vBtn2"];
    oHead.textContent = data["en"]["oHead"];
    oText.textContent = data["en"]["oText"];
    oBtn.textContent = data["en"]["oBtn"];
    sendEmail.textContent = data["en"]["sendEmail"];
    emailOTP.placeholder = data["en"]["sendEmail"];
    setGreeting();
  });

  var data = {
    sin: {
      cTitle: "එකතු කිරීමේ හැඳුනුම්පත " + getCookie("id"),
      t1: "ආරම්භක පොල් ප්‍රමාණය",
      t2: "අවසාන පොල් ප්‍රමාණය",
      pHead: "සැපයුම්කරුගෙන් පොරොත්තු සත්‍යාපනය",
      pText: "සැපයුම්කරු මුදල සත්‍යාපනය කළ පසු එකතුව සම්පූර්ණ ලෙස සලකුණු කෙරේ",
      vHead: "පොල් ප්‍රමාණය තහවුරු කරන්න",
      vText: "සැපයුම්කරුගේ විද්‍යුත් තැපෑලට යැවූ OTP ඇතුලත් කරන්න",
      vBtn1: "තහවුරු කරන්න",
      vBtn2: "සම්පූර්ණ එකතුව",
      oHead: "විකල්ප සත්‍යාපන ක්‍රම",
      oText:
        "සැපයුම්කරුට පද්ධතිය වෙත ළඟා විය නොහැකි නම් විකල්ප සත්‍යාපන ක්‍රමයක් සපයන්න",
      oBtn: "විකල්ප සත්‍යාපනය",
      sendEmail: "OTP යවන්න",
      emailOTP: "OTP ඇතුලත් කරන්න",
    },
    en: {
      cTitle: "Collection ID " + getCookie("id"),
      t1: "Initial Coconut Amount",
      t2: "Final Coconut Amount",
      pHead: "Pending Verification from Supplier",
      pText:
        "The collection will be marked as complete once the supplier verifies the amount",
      vHead: "Verify Coconut Amount",
      vText: "Enter the OTP Sent to supplier's email",
      vBtn1: "Verify",
      vBtn2: "Complete Collection",
      oHead: "Optional Verification Methods",
      oText:
        "Provide alternative verification method to the supplier if he can't reach the system",
      oBtn: "Optional Verification",
      sendEmail: "Send OTP",
      emailOTP: "Enter OTP",
    },
  };

  oBtn.addEventListener("click", () => {
    oVerification.style.display = "none";
    pVerification.style.display = "none";
    vBtn2.style.display = "none";
    verification.style.display = "block";
  });

  const socket = new WebSocket(
    "ws://127.0.0.1:8090/JOM_war_exploded/verify-amount/" + getCookie("user")
  );

  const senderId = getCookie("user");
  const notification = "Collector Entered Amount is " + getCookie("final");
  const collection = getCookie("id");

  socket.onopen = function (event) {
    socket.send(`${senderId}:${notification}:${collection}`);
    log("Sent");
  };

  socket.onmessage = function (event) {
    const message = event.data;
    log(event.data);
    if (message === "OK") {
      if (lang == "sin") {
        var title = "සම්පූර්ණයි!",
          text = "ඇතුළු කළ පොල් ප්‍රමාණය නිවැරදි බව සැපයුම්කරු තහවුරු කළේය.",
          confirmButtonText = "හරි";
      } else {
        var title = "Completed!",
          text =
            "The supplier confirmed that the amount of coconut entered was correct.",
          confirmButtonText = "Ok";
      }
      // sweet alert
      Swal.fire({
        title: title,
        text: text,
        icon: "success",
        confirmButtonText: confirmButtonText,
        confirmButtonColor: confirmButtonColor,
      }).then((response) => {
        completeCollection();
      });
    }

    if (message === "Denied") {
      if (lang == "sin") {
        var title = "වැරදියි!",
          text =
            "ඇතුළු කළ පොල් ප්‍රමාණය නිවැරදි බව සැපයුම්කරු ප්‍රතික්ෂේප කළේය.",
          confirmButtonText = "නැවත ඇතුල් කරන්න";
      } else {
        var title = "Incorrect!",
          text =
            "The supplier denied that the quantity of coconut inserted was correct.",
          confirmButtonText = "Enter again";
      }
      // sweet alert
      Swal.fire({
        title: title,
        text: text,
        icon: "error",
        confirmButtonText: confirmButtonText,
        confirmButtonColor: confirmButtonColor,
      }).then((response) => {
        window.location.href = "./enter-amount.html";
      });
    }
  };

  socket.onclose = function (event) {
    console.log("WebSocket closed:", event);
  };

  socket.onerror = function (error) {
    console.error("WebSocket error:", error);
  };

  // Optional verification methods
  sendEmail.addEventListener("click", () => {
    emailRing.style.display = "block";
    sendEmail.style.display = "none";

    var formData = {
      amount: getCookie("final"),
      id: getCookie("id"),
      user: getCookie("user"),
    };

    fetch(backProxy + "/optional-verification", {
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
  });

  vBtn1.addEventListener("click", () => {
    if (
      typeof emailOTP.value === "string" &&
      emailOTP.value.trim().length === 0
    ) {
      if (lang == "sin") {
        error.textContent = "OTP හිස් විය නොහැක";
        Command: toastr["warning"]("OTP හිස් විය නොහැක");
      } else {
        error.textContent = "OTP cannot be empty";
        Command: toastr["warning"]("OTP cannot be empty");
      }
      emailOTP.focus();
    } else {
      error.textContent = "";
      var formData = {
        otp: emailOTP.value,
        id: getCookie("user"),
        oId: oId,
      };
      fetch(backProxy + "/verify-amount", {
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
              error.textContent = data.message;
            });
            vBtn1.disabled = true;
            if (lang == "sin") {
              var title = "සම්පූර්ණයි!",
                text =
                  "ඇතුළු කළ පොල් ප්‍රමාණය නිවැරදි බව සැපයුම්කරු තහවුරු කළේය.",
                confirmButtonText = "හරි";
            } else {
              var title = "Completed!",
                text =
                  "The supplier confirmed that the amount of coconut entered was correct.",
                confirmButtonText = "Ok";
            }
            // sweet alert
            Swal.fire({
              title: title,
              text: text,
              icon: "success",
              confirmButtonText: confirmButtonText,
              confirmButtonColor: confirmButtonColor,
            }).then((response) => {
              completeCollection();
            });
          } else if (response.status === 401) {
            console.log("Invalid OTP");
            if (lang == "sin") {
              error.textContent = "වලංගු නොවන OTP";
              Command: toastr["warning"]("වලංගු නොවන OTP");
            } else {
              error.textContent = "Invalid OTP";
              Command: toastr["warning"]("Invalid OTP");
            }
            emailOTP.focus();
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

  function completeCollection(){
    var formData = {
      user: getCookie("user"),
      id: getCookie("id"),
      amount: getCookie("final"),
    };

    fetch(backProxy + "/pickup-collection", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
      credentials: "include",
    }).then((response) => {
      if (response.status == 200) {
        response.json().then((data) => {
          console.log(data.message);
          window.location.href = "./complete.html";
        });
        window.location.href = "../";
      } else if (response.status === 400) {
        response.json().then((data) => {
          console.log(data.message);
          Command: toastr["error"](data.message);
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
})();
