document.cookie = "date=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
(() => {
  const body = document.querySelector("body"),
    sin = body.querySelector(".sin"),
    en = body.querySelector(".en"),
    sTitle = body.querySelector(".stockmg-title"),
    sText = body.querySelector(".stockmg-subtitle"),
    map = body.querySelector(".map"),
    rId = body.querySelector(".rId"),
    sName = body.querySelector(".sName"),
    sPhone = body.querySelector(".sPhone"),
    sMethod = body.querySelector(".sMethod"),
    estate = body.querySelector(".estate"),
    address = body.querySelector(".address"),
    dText = body.querySelector(".date-text"),
    date = body.querySelector(".date"),
    tText = body.querySelector(".time-text"),
    time = body.querySelector(".time"),
    amount = body.querySelector(".amount"),
    pMethod = body.querySelector(".pMethod"),
    accept = body.querySelector(".accept"),
    decline = body.querySelector(".decline"),
    assign = body.querySelector(".assign"),
    rtext = body.querySelector(".reason-text"),
    cNameRow = body.querySelector(".cName-row"),
    cName = body.querySelector(".cName"),
    cPhoneRow = body.querySelector(".cPhone-row"),
    cPhone = body.querySelector(".cPhone"),
    collected = body.querySelector(".collected"),
    cAmount = body.querySelector(".cAmount"),
    closeBtn = body.querySelector(".close-btn"),
    overlay = body.querySelector(".overlay"),
    dropdown = body.querySelector(".dropdown"),
    dropdownError = body.querySelector(".dropdown-error"),
    submit = body.querySelector(".submit"),
    other = body.querySelector(".other"),
    otherError = body.querySelector(".other-error"),
    otherLabel = body.querySelector(".reason-label"),
    op0 = body.querySelector(".op0"),
    op1 = body.querySelector(".op1"),
    op2 = body.querySelector(".op2"),
    op3 = body.querySelector(".op3"),
    rNote = body.querySelector(".reject-note");

  var lang = getCookie("lang"); // current language

  sin.addEventListener("click", () => {
    sin.classList.add("active");
    en.classList.remove("active");

    document.documentElement.setAttribute("lang", "sin");
    document.cookie = "lang=sin; path=/";
    lang = "sin";

    sTitle.textContent = data["sin"]["sTitle"];
    accept.textContent = data["sin"]["accept"];
    decline.textContent = data["sin"]["decline"];
    assign.textContent = data["sin"]["assign"];
    rtext.textContent = data["sin"]["rtext"];
    op0.textContent = data["sin"]["op0"];
    op1.textContent = data["sin"]["op1"];
    op2.textContent = data["sin"]["op2"];
    op3.textContent = data["sin"]["op3"];
    otherLabel.textContent = data["sin"]["otherLabel"];
    other.placeholder = data["sin"]["other"];
    submit.textContent = data["sin"]["submit"];

    setGreeting();
  });

  en.addEventListener("click", () => {
    en.classList.add("active");
    sin.classList.remove("active");

    document.documentElement.setAttribute("lang", "en");
    document.cookie = "lang=en; path=/";
    lang = "en";

    sTitle.textContent = data["en"]["sTitle"];
    accept.textContent = data["en"]["accept"];
    decline.textContent = data["en"]["decline"];
    assign.textContent = data["en"]["assign"];
    rtext.textContent = data["en"]["rtext"];
    op0.textContent = data["en"]["op0"];
    op1.textContent = data["en"]["op1"];
    op2.textContent = data["en"]["op2"];
    op3.textContent = data["en"]["op3"];
    otherLabel.textContent = data["en"]["otherLabel"];
    other.placeholder = data["en"]["other"];
    submit.textContent = data["en"]["submit"];

    setGreeting();
  });

  var data = {
    sin: {
      sTitle: "ඉල්ලීම බලන්න",
      accept: "පිළිගන්න",
      decline: "ප්රතික්ෂේප කරන්න",
      assign: "එකතුකරන්නා පවරන්න",
      rtext: "ඉල්ලීම ප්‍රතික්ෂේප කිරීමට හේතුව තෝරන්න",
      op0: "ප්රතික්ෂේප කිරීමට හේතුව තෝරන්න",
      op1: "පොල් ප්‍රමාණය මදි",
      op2: "රැගෙන යාමට බොහෝ දුරයි",
      op3: "වෙනත්",
      otherLabel: "වෙනත් හේතුවක් නම්",
      other: "ඔබේ හේතුව මෙහි ටයිප් කරන්න",
      submit: "ඉදිරිපත් කරන්න",
    },
    en: {
      sTitle: "View Request",
      accept: "Accept",
      decline: "Decline",
      assign: "Assign Collector",
      rtext: "Select the reason for declining the request",
      op0: "Select reason for declining",
      op1: "Not enough coconut amount",
      op2: "Too far to pickup",
      op3: "Other",
      otherLabel: "If other",
      other: "Type your reason here",
      submit: "Submit",
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
          rId.textContent = data.request.id;
          sName.textContent = data.request.name + " " + data.request.last_name;
          sPhone.textContent = data.request.phone;
          sMethod.textContent = capitalize(data.request.method);
          address.textContent = data.request.address;
          dText.textContent = "Pickup Date";
          tText.textContent = "Pickup Time";

          if (data.request.method == "pickup") {
            var arr = data.request.location.split(" ");
            map.innerHTML =
              `<iframe src='https://www.google.com/maps?q=` +
              arr[0] +
              `,` +
              arr[1] +
              `&hl=es;z=14&output=embed' frameborder='0'></iframe>`;
          }

          if (data.request.method != "pickup") {
            estate.style.display = "none";
            map.style.display = "none";
            cNameRow.style.display = "none";
            cPhoneRow.style.display = "none";
            dText.textContent = "Delivery Date";
            tText.textContent = "Delivery Time";
          }
          date.textContent = data.request.date;
          time.textContent = timeString(data.request.time);
          amount.textContent = data.request.amount.toLocaleString("en-US");
          pMethod.textContent = capitalize(data.request.payment_method);
          if (data.request.status == 1) {
            if (lang == "sin") sText.textContent = "තත්ත්වය: පොරොත්තු අනුමැතිය";
            else sText.textContent = "Status: Pending Approval";
            cNameRow.style.display = "none";
            cPhoneRow.style.display = "none";
            collected.style.display = "none";
          } else if (
            data.request.status == 2 &&
            data.request.method == "pickup"
          ) {
            if (lang == "sin")
              sText.textContent = "තත්ත්වය: එකතු කරන්නා පවරන්න";
            else sText.textContent = "Status: Assign collector";
            accept.style.display = "none";
            accept.disabled = true;
            decline.style.display = "none";
            decline.disabled = true;
            assign.style.display = "block";
            document.cookie = "date=" + date.textContent + "; path=/";
            cNameRow.style.display = "none";
            cPhoneRow.style.display = "none";
            collected.style.display = "none";
          } else if (
            data.request.status == 2 &&
            data.request.method == "yard"
          ) {
            if (lang == "sin") sText.textContent = "තත්ත්වය: පිළිගත්තා";
            else sText.textContent = "Status: Accepted";

            accept.style.display = "none";
            accept.disabled = true;
            decline.style.display = "none";
            decline.disabled = true;
            assign.style.display = "none";
            assign.disabled = true;
            cNameRow.style.display = "none";
            cPhoneRow.style.display = "none";
            collected.style.display = "none";
          } else if (data.request.status == 3) {
            if (lang == "sin")
              sText.textContent = "තත්ත්වය: ලබා ගැනීමට සූදානම්";
            else sText.textContent = "Status: Ready to pickup";

            accept.style.display = "none";
            accept.disabled = true;
            decline.style.display = "none";
            decline.disabled = true;
            assign.style.display = "none";
            assign.disabled = true;
            cName.textContent =
              data.request.c_fName + " " + data.request.c_lName;
            cPhone.textContent = data.request.c_phone;
            collected.style.display = "none";
          } else if (data.request.status == 4) {
            if (lang == "sin") sText.textContent = "තත්ත්වය: ප්‍රතික්ෂේප කළා";
            else sText.textContent = "Status: Rejected";

            accept.style.display = "none";
            accept.disabled = true;
            decline.style.display = "none";
            decline.disabled = true;
            assign.style.display = "none";
            assign.disabled = true;
            cNameRow.style.display = "none";
            cPhoneRow.style.display = "none";
            collected.style.display = "none";
            rNote.style.display = "block";
            rNote.textContent = "Reason: " + data.request.reason;
          } else if (data.request.status == 5) {
            if (lang == "sin") sText.textContent = "තත්ත්වය: පොරොත්තු ගෙවීම";
            else sText.textContent = "Status: Pending payment";

            accept.style.display = "none";
            accept.disabled = true;
            decline.style.display = "none";
            decline.disabled = true;
            assign.style.display = "none";
            assign.disabled = true;
            cAmount.textContent = data.request.final_amount;

            if (data.request.method == "pickup") {
              cName.textContent =
                data.request.c_fName + " " + data.request.c_lName;
              cPhone.textContent = data.request.c_phone;
            } else {
              cNameRow.style.display = "none";
              cPhoneRow.style.display = "none";
            }
          } else if (data.request.status == 6) {
            if (lang == "sin") sText.textContent = "තත්ත්වය: ගෙවා ඇත";
            else sText.textContent = "Status: Paid";

            accept.style.display = "none";
            accept.disabled = true;
            decline.style.display = "none";
            decline.disabled = true;
            assign.style.display = "none";
            assign.disabled = true;
            cAmount.textContent = data.request.final_amount;

            if (data.request.method == "pickup") {
              cName.textContent =
                data.request.c_fName + " " + data.request.c_lName;
              cPhone.textContent = data.request.c_phone;
            } else {
              cNameRow.style.display = "none";
              cPhoneRow.style.display = "none";
            }
          }
        });
      } else if (response.status === 202) {
        response.json().then((data) => {
          console.log(data.request);
        });
        if (lang == "sin") Command: toastr["error"]("සැපයුම් ඉල්ලීම් නොමැත");
        else Command: toastr["error"]("No Supply requests");
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

  accept.addEventListener("click", () => {
    if (lang == "sin") {
      var title = "ඔයාට විශ්වාස ද?",
        text = "ඔබට මෙය ප්‍රතිවර්තනය කිරීමට නොහැකි වනු ඇත!",
        confirmButtonText = "ඔව්, පිළිගන්න!",
        cancelButtonText = "අවලංගු කරන්න";
    } else {
      var title = "Are you sure?",
        text = "You won't be able to revert this!",
        confirmButtonText = "Yes, accept it!",
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
        fetch(backProxy + "/accept-request?id=" + getCookie("id"), {
          method: "GET",
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
                  var title = "පිළිගත්තා!",
                    text = "සැපයුම් ඉල්ලීම පිළිගනු ලැබේ.";
                } else {
                  var title = "Accepted!",
                    text = "Supply request accepted.";
                }
                // sweet alert
                Swal.fire({
                  title: title,
                  text: text,
                  icon: "success",
                  confirmButtonColor: confirmButtonColor,
                }).then((response) => {
                  if (sMethod.textContent == "Pickup") {
                    document.cookie = "date=" + date.textContent + "; path=/";
                    window.location.href = "./assign-collector.html";
                  } else window.location.href = "./";
                });
              });
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
  });

  var dropdownStatus = false,
    otherStatus = false;

  dropdown.addEventListener("input", () => {
    dropdown_status_func();
  });

  other.addEventListener("input", () => {
    other_status_func();
  });

  decline.addEventListener("click", () => {
    overlay.style.display = "flex";
    document.querySelector(".decline-container").style.display = "block";

    overlay.addEventListener("click", (e) => {
      if (e.target.id === "overlay") {
        overlay.style.display = "none";
        document.querySelector(".decline-container").style.display = "none";
      }
    });

    closeBtn.addEventListener("click", () => {
      overlay.style.display = "none";
      document.querySelector(".decline-container").style.display = "none";
    });

    submit.addEventListener("click", () => {
      if (!dropdown_status_func()) dropdown.focus();

      if (dropdown.value == "Other") {
        if (!other_status_func()) other.focus();

        if (dropdown && otherStatus) submit_decline();
      } else if (dropdownStatus) submit_decline();

      function submit_decline() {
        if (lang == "sin") {
          var title = "ඔයාට විශ්වාස ද?",
            text = "ඔබට මෙය ප්‍රතිවර්තනය කිරීමට නොහැකි වනු ඇත!",
            confirmButtonText = "ඔව්, එය ප්රතික්ෂේප කරන්න!",
            cancelButtonText = "අවලංගු කරන්න";
        } else {
          var title = "Are you sure?",
            text = "You won't be able to revert this!",
            confirmButtonText = "Yes, decline it!",
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
          var reason = "";

          if (dropdown.value == "Other") reason = other.value;
          else reason = dropdown.value;

          if (result.isConfirmed) {
            var formData = {
              id: getCookie("id"),
              reason: reason,
            };

            fetch(backProxy + "/accept-request", {
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
                    console.log(data.message);
                    if (lang == "sin") {
                      var title = "ප්‍රතික්ෂේප කළා!",
                        text = "සැපයුම් ඉල්ලීම ප්‍රතික්ෂේප විය.";
                    } else {
                      var title = "Declined!",
                        text = "Supply request declined.";
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
                } else if (response.status === 401) {
                  response.json().then((data) => {
                    console.log(data.message);
                  });
                  if (lang == "sin")
                    Command: toastr["error"]("වලංගු නොවන පරිශීලක");
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
      }
    });
  });

  function dropdown_status_func() {
    if (
      typeof dropdown.value === "string" &&
      dropdown.value.trim().length === 0
    ) {
      if (lang == "sin") {
        dropdownError.textContent = "හේතුව හිස් විය නොහැක";
        Command: toastr["warning"]("හේතුව හිස් විය නොහැක");
      } else {
        dropdownError.textContent = "Reason cannot be empty";
        Command: toastr["warning"]("Reason cannot be empty");
      }
      dropdownStatus = false;
      return false;
    } else {
      if (dropdown.value == "Other") {
        other.style.display = "";
        otherLabel.style.display = "";
      }

      dropdownError.textContent = "";
      dropdownStatus = true;
      return true;
    }
  }

  function other_status_func() {
    if (typeof other.value === "string" && other.value.trim().length === 0) {
      if (lang == "sin") {
        otherError.textContent = "හේතුව හිස් විය නොහැක";
        Command: toastr["warning"]("හේතුව හිස් විය නොහැක");
      } else {
        otherError.textContent = "Reason cannot be empty";
        Command: toastr["warning"]("Reason cannot be empty");
      }
      otherStatus = false;
      return false;
    } else {
      otherError.textContent = "";
      otherStatus = true;
      return true;
    }
  }
})();
