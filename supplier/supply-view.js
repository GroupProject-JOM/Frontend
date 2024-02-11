(() => {
  const body = document.querySelector("body"),
    sin = body.querySelector(".sin"),
    en = body.querySelector(".en"),
    sMessage = body.querySelector(".socket-messages"),
    cMessage = body.querySelector(".collecter-messages"),
    accept = body.querySelector(".accept"),
    deny = body.querySelector(".deny"),
    sTitle = body.querySelector(".supply-title"),
    sText = body.querySelector(".supply-text"),
    sMethod = body.querySelector(".sMethod"),
    eNameText = body.querySelector(".eName-text"),
    eName = body.querySelector(".eName"),
    eAddressText = body.querySelector(".eAddress-text"),
    eAddress = body.querySelector(".eAddress"),
    eAreaText = body.querySelector(".eArea-text"),
    eArea = body.querySelector(".eArea"),
    dateText = body.querySelector(".date-text"),
    date = body.querySelector(".date"),
    timeText = body.querySelector(".time-text"),
    time = body.querySelector(".time"),
    pMethod = body.querySelector(".pMethod"),
    aNameText = body.querySelector(".aName-text"),
    aName = body.querySelector(".aName"),
    aNumText = body.querySelector(".aNum-text"),
    aNum = body.querySelector(".aNum"),
    bankText = body.querySelector(".bank-text"),
    bank = body.querySelector(".bank"),
    ccount = body.querySelector(".ccount"),
    sstatus = body.querySelector(".sstatus"),
    val = body.querySelector(".val"),
    value = body.querySelector(".value"),
    edit = body.querySelector(".edit"),
    del = body.querySelector(".delete"),
    error = body.querySelector(".error"),
    cName = body.querySelector(".cName"),
    cNameBlock = body.querySelector(".cName-block"),
    cPhone = body.querySelector(".cPhone"),
    cPhoneBlock = body.querySelector(".cPhone-block"),
    map = body.querySelector(".map"),
    rNote = body.querySelector(".reject-note");

  var lang = getCookie("lang"); // current language

  sin.addEventListener("click", () => {
    sin.classList.add("active");
    en.classList.remove("active");

    document.documentElement.setAttribute("lang", "sin");
    document.cookie = "lang=sin; path=/";
    lang = "sin";

    sTitle.textContent = data["sin"]["sTitle"];
    sText.textContent = data["sin"]["sText"];
    edit.textContent = data["sin"]["edit"];
    del.textContent = data["sin"]["del"];
    setGreeting();
  });

  en.addEventListener("click", () => {
    en.classList.add("active");
    sin.classList.remove("active");

    document.documentElement.setAttribute("lang", "en");
    document.cookie = "lang=en; path=/";
    lang = "en";

    sTitle.textContent = data["en"]["sTitle"];
    sText.textContent = data["en"]["sText"];
    edit.textContent = data["en"]["edit"];
    del.textContent = data["en"]["del"];
    setGreeting();
  });

  var data = {
    sin: {
      sTitle: "සැපයුම් ඉල්ලීම",
      sText: "ඔබගේ සැපයුම් ඉල්ලීම් විස්තර පහත ප්‍රදර්ශනය කෙරේ",
      edit: "සංස්කරණය කරන්න",
      del: "මකන්න",
    },
    en: {
      sTitle: "Supply Request",
      sText: "Your supply request details are displayed below",
      edit: "Edit",
      del: "Delete",
    },
  };

  fetch(backProxy + "/supply-request?id=" + getCookie("id"), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  })
    .then((response) => {
      if (response.status == 200) {
        response.json().then((data) => {
          if (data.request.method == "pickup") {
            sMethod.textContent = "Pickup from estate";
            dateText.textContent = "Pickup Date";
            timeText.textContent = "Pickup Time";
            eName.textContent = data.request.ename;
            eAddress.textContent = data.request.address;
            eArea.textContent = data.request.area;
            cName.textContent =
              data.request.c_fName + " " + data.request.c_lName;
            cPhone.textContent = data.request.c_phone;

            var arr = data.request.location.split(" ");
            map.innerHTML =
              `<iframe src='https://www.google.com/maps?q=` +
              arr[0] +
              `,` +
              arr[1] +
              `&hl=es;z=14&output=embed' frameborder='0'></iframe>`;
          } else if (data.request.method == "yard") {
            sMethod.textContent = "Delivered to Yard";
            dateText.textContent = "Delivery Date";
            timeText.textContent = "Delivery Time";
            eNameText.style.display = "none";
            eAddressText.style.display = "none";
            eAreaText.style.display = "none";
            map.style.display = "none";
            cNameBlock.style.display = "none";
            cPhoneBlock.style.display = "none";
          }
          date.textContent = data.request.date;
          time.textContent = timeString(data.request.time);

          if (data.request.payment_method == "cash") {
            pMethod.textContent = "Cash on Pickup";
            aNameText.style.display = "none";
            aNumText.style.display = "none";
            bankText.style.display = "none";
          } else if (data.request.payment_method == "bank") {
            pMethod.textContent = "Bank Transfer";
            aName.textContent = data.request.h_name;
            aNum.textContent = data.request.account;
            bank.textContent = data.request.bank;
          }

          if (0 < data.request.status && data.request.status < 5) {
            if (data.request.status == 1) {
              sstatus.textContent = "Pending Approval";
              cNameBlock.style.display = "none";
              cPhoneBlock.style.display = "none";
            } else if (data.request.status == 2) {
              sstatus.textContent = "Accepted";
              cNameBlock.style.display = "none";
              cPhoneBlock.style.display = "none";
            } else if (data.request.status == 3)
              sstatus.textContent = "Ready to Pickup";
            else if (data.request.status == 4) {
              sstatus.textContent = "Rejected";
              cNameBlock.style.display = "none";
              cPhoneBlock.style.display = "none";
              rNote.style.display = "block";
              rNote.textContent = "Reason: " + data.request.reason;

              edit.style.display = "none";
              edit.disabled = true;
              del.style.display = "none";
              del.disabled = true;
            }

            ccount.textContent = data.request.amount.toLocaleString("en-US");
            val.style.display = "none";

            var selectedDate = new Date(
              data.request.date + " " + data.request.time
            );
            var now = new Date();
            now.setDate(now.getDate() + 1);
            var week = new Date();
            week.setDate(week.getDate() - 7);
            var dDate = new Date();
            dDate.setDate(selectedDate.getDate() + 7);

            if (selectedDate <= now || data.request.final_amount != 0) {
              edit.style.display = "none";
              edit.disabled = true;
              del.style.display = "none";
              del.disabled = true;
              if (lang == "sin")
                error.textContent =
                  "ඔබට මෙය මකා දැමීමට අවශ්‍ය නම්, " +
                  dDate.toLocaleDateString() +
                  " න් පසු ඔබට එය කළ හැක";
              else
                error.textContent =
                  "If you want to delete this, you can do so after  " +
                  dDate.toLocaleDateString();
            }

            if (selectedDate < week) {
              error.style.display = "none";
              
              if (data.request.status != 4) {
                del.style.display = "block";
                del.disabled = false;
              }
            }
          } else if (4 < data.request.status && data.request.status < 7) {
            if (data.request.status == 5)
              sstatus.textContent = "Pending Paymant";
            else if (data.request.status == 6) sstatus.textContent = "Paid";

            ccount.textContent =
              data.request.final_amount.toLocaleString("en-US");
            value.textContent =
              data.request.value.toLocaleString("en-US") + " LKR";

            edit.style.display = "none";
            edit.disabled = true;
            del.style.display = "none";
            del.disabled = true;
          }
        });
      } else if (response.status === 202) {
        response.json().then((data) => {
          console.log(data.request);
          Command: toastr["error"](data.collection);
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

  del.addEventListener("click", () => {
    if (lang == "sin") {
      var title = "ඔයාට විශ්වාස ද?",
        text = "ඔබට මෙය ප්‍රතිවර්තනය කිරීමට නොහැකි වනු ඇත!",
        confirmButtonText = "ඔව්, එය මකන්න!",
        cancelButtonText = "අවලංගු කරන්න";
    } else {
      var title = "Are you sure?",
        text = "You won't be able to revert this!",
        confirmButtonText = "Yes, delete it!",
        cancelButtonText = "Cancel";
    }
    Swal.fire({
      title: title,
      text: text,
      confirmButtonText: confirmButtonText,
      cancelButtonText: cancelButtonText,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: confirmButtonColor,
      cancelButtonColor: cancelButtonColor,
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(backProxy + "/collection?id=" + getCookie("id"), {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        })
          .then((response) => {
            if (response.status == 200) {
              response.json().then((data) => {
                console.log(data.message);
                if (lang == "sin") {
                  var title = "මකා දමන ලදී!",
                    text = "ඔබගේ සැපයුම මකා ඇත.";
                } else {
                  var title = "Deleted!",
                    text = "Your supply has been deleted.";
                }
                // sweet alert
                Swal.fire({
                  title: title,
                  text: text,
                  icon: "success",
                  confirmButtonColor: confirmButtonColor,
                }).then((response) => {
                  window.location.href = "./";
                });
              });
            } else if (response.status === 202) {
              response.json().then((data) => {
                console.log(data.collection);
                Command: toastr["error"](data.collection);
              });
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
    });
  });

  // web socket
  const socket = new WebSocket(
    "ws://127.0.0.1:8090/JOM_war_exploded/verify-amount/" +
      getPayload(getCookie("jwt")).user
  );

  socket.onmessage = function (event) {
    // Handle messages received from the server
    const message = event.data;
    if (message.length != 0) {
      var arr = message.split(":");
      sessionStorage.setItem("amount", arr[0]);
      sessionStorage.setItem("id", arr[1]);

      actionVerifyDecline();
    }
  };

  actionVerifyDecline();
  function actionVerifyDecline() {
    if (getCookie("id") == sessionStorage.getItem("id")) {
      cMessage.textContent =
        "Collecter entered amount is " + sessionStorage.getItem("amount");
      sMessage.style.display = "block";
    }
  }

  accept.addEventListener("click", () => {
    if (lang == "sin") {
      var title = "ඔයාට විශ්වාස ද?",
        text = "ඔබට මෙය ප්‍රතිවර්තනය කිරීමට නොහැකි වනු ඇත!",
        confirmButtonText = "ඔව්, එය පිළිගන්න!",
        cancelButtonText = "අවලංගු කරන්න";
    } else {
      var title = "Are you sure?",
        text = "You won't be able to revert this!",
        confirmButtonText = "Yes, Accept it!",
        cancelButtonText = "Cancel";
    }
    Swal.fire({
      title: title,
      text: text,
      confirmButtonText: confirmButtonText,
      cancelButtonText: cancelButtonText,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: confirmButtonColor,
      cancelButtonColor: cancelButtonColor,
    }).then((result) => {
      if (result.isConfirmed) {
        if (lang == "sin") {
          var title = "සම්පූර්ණයි!",
            text =
              "එකතු කරන්නා විසින් ඇතුළත් කළ පොල් ප්‍රමාණය නිවැරදි බව ඔබ තහවුරු කර ඇත.",
            confirmButtonText = "හරි";
        } else {
          var title = "Accepted!",
            text =
              "You have verified that the amount of coconut entered by the collector is correct.",
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
          sessionStorage.removeItem("id");
          sessionStorage.removeItem("amount");

          const senderId = getPayload(getCookie("jwt")).user;
          const notification = "OK";
          const collection = getCookie("id");

          socket.send(`${senderId}:${notification}:${collection}`);
          window.location.href = "./";
        });
      }
    });
  });

  deny.addEventListener("click", () => {
    if (lang == "sin") {
      var title = "ඔයාට විශ්වාස ද?",
        text = "ඔබට මෙය ප්‍රතිවර්තනය කිරීමට නොහැකි වනු ඇත!",
        confirmButtonText = "ඔව්, එය ප්‍රතික්ෂේප කරන්න!",
        cancelButtonText = "අවලංගු කරන්න";
    } else {
      var title = "Are you sure?",
        text = "You won't be able to revert this!",
        confirmButtonText = "Yes, Deny it!",
        cancelButtonText = "Cancel";
    }
    Swal.fire({
      title: title,
      text: text,
      confirmButtonText: confirmButtonText,
      cancelButtonText: cancelButtonText,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: confirmButtonColor,
      cancelButtonColor: cancelButtonColor,
    }).then((result) => {
      if (result.isConfirmed) {
        if (lang == "sin") {
          var title = "සම්පූර්ණයි!",
            text =
              "එකතුකරන්නා ඇතුළු කළ පොල් ප්‍රමාණය නිවැරදි බව ඔබ ප්‍රතික්ෂේප කර ඇත.",
            confirmButtonText = "හරි";
        } else {
          var title = "Denied!",
            text =
              "You have denied that the amount of coconut entered by the collector.",
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
          sessionStorage.removeItem("id");
          sessionStorage.removeItem("amount");

          const senderId = getPayload(getCookie("jwt")).user;
          const notification = "Denied";
          const collection = getCookie("id");

          socket.send(`${senderId}:${notification}:${collection}`);
          window.location.reload();
        });
      }
    });
  });

  socket.onclose = function (event) {
    console.log("WebSocket closed:", event);
    Command: toastr["error"]("WebSocket closed");
  };

  socket.onerror = function (error) {
    console.error("WebSocket error:", error);
    Command: toastr["error"]("WebSocket error");
  };
})();
