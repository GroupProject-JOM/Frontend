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
    totalCount = body.querySelector(".total-count"),
    remainingCount = body.querySelector(".remaining-count"),
    remainingError = body.querySelector(".remaining-error"),
    daysError = body.querySelector(".days-error"),
    toYardText = body.querySelectorAll(".to-yard-text"),
    cPhoneRow = body.querySelector(".cPhone-row"),
    cPhone = body.querySelector(".cPhone"),
    collected = body.querySelector(".collected"),
    cAmount = body.querySelector(".cAmount"),
    closeBtn1 = body.querySelector(".close-btn1"),
    closeBtn2 = body.querySelector(".close-btn2"),
    closeBtn3 = body.querySelector(".close-btn3"),
    overlay1 = body.querySelector(".overlay1"),
    overlay2 = body.querySelector(".overlay2"),
    dropdown = body.querySelector(".dropdown"),
    dropdownError = body.querySelector(".dropdown-error"),
    submit = body.querySelector(".submit"),
    other = body.querySelector(".other"),
    otherError = body.querySelector(".other-error"),
    otherLabel = body.querySelector(".reason-label"),
    yard = body.querySelector(".to-yard-button"),
    op0 = body.querySelector(".op0"),
    op1 = body.querySelector(".op1"),
    op2 = body.querySelector(".op2"),
    op3 = body.querySelector(".op3"),
    rNote = body.querySelector(".reject-note"),
    changeCollector = body.querySelector(".change-collector"),
    yardH = body.querySelector(".yard-h3"),
    tbody2 = body.querySelector(".tbody2"),
    addError = body.querySelector(".add-error"),
    totalError = body.querySelector(".total-error"),
    completeBtn = body.querySelector(".complete-button"),
    yardDataContainer = body.querySelector(".yard-data-container"),
    curTotal = body.querySelector(".current-total"),
    yard1Container = body.querySelector(".yard1"),
    yard2Container = body.querySelector(".yard2"),
    yard3Container = body.querySelector(".yard3"),
    yardTbody1 = body.querySelector(".yard-tbody1"),
    yardTbody2 = body.querySelector(".yard-tbody2"),
    yardTbody3 = body.querySelector(".yard-tbody3"),
    save = body.querySelector(".save");

  totalCount.textContent = 0;
  remainingCount.textContent = 0;

  var totalAmount = 0,
    remainingAmount = 0,
    previous = 0,
    collectionId = 0;

  var lang = getCookie("lang"); // current language

  yard.addEventListener("click", () => {
    overlay2.style.display = "flex";
    document.querySelector(".split1-window").style.display = "block";
  });

  overlay2.addEventListener("click", (e) => {
    if (e.target.id === "overlay2") {
      overlay2.style.display = "none";
      document.querySelector(".split1-window").style.right = "35%";
      document.querySelector(".split1-window").style.display = "none";
      document.querySelector(".split2-window").style.display = "none";
    }
  });

  closeBtn2.addEventListener("click", () => {
    overlay2.style.display = "none";
    document.querySelector(".split1-window").style.right = "35%";
    document.querySelector(".split1-window").style.display = "none";
    document.querySelector(".split2-window").style.display = "none";
  });

  closeBtn3.addEventListener("click", () => {
    document.querySelector(".split1-window").style.right = "35%";
    document.querySelector(".split2-window").style.display = "none";
  });

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
    yard.textContent = data["sin"]["yard"];
    rtext.textContent = data["sin"]["rtext"];
    op0.textContent = data["sin"]["op0"];
    op1.textContent = data["sin"]["op1"];
    op2.textContent = data["sin"]["op2"];
    op3.textContent = data["sin"]["op3"];
    otherLabel.textContent = data["sin"]["otherLabel"];
    other.placeholder = data["sin"]["other"];
    submit.textContent = data["sin"]["submit"];
    changeCollector.textContent = data["sin"]["changeCollector"];

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
    yard.textContent = data["en"]["yard"];
    rtext.textContent = data["en"]["rtext"];
    op0.textContent = data["en"]["op0"];
    op1.textContent = data["en"]["op1"];
    op2.textContent = data["en"]["op2"];
    op3.textContent = data["en"]["op3"];
    otherLabel.textContent = data["en"]["otherLabel"];
    other.placeholder = data["en"]["other"];
    submit.textContent = data["en"]["submit"];
    changeCollector.textContent = data["en"]["changeCollector"];

    setGreeting();
  });

  var data = {
    sin: {
      sTitle: "ඉල්ලීම බලන්න",
      accept: "පිළිගන්න",
      decline: "ප්රතික්ෂේප කරන්න",
      assign: "එකතුකරන්නා පවරන්න",
      yard: "අංගනයට එකතු කරන්න",
      rtext: "ඉල්ලීම ප්‍රතික්ෂේප කිරීමට හේතුව තෝරන්න",
      op0: "ප්රතික්ෂේප කිරීමට හේතුව තෝරන්න",
      op1: "පොල් ප්‍රමාණය මදි",
      op2: "රැගෙන යාමට බොහෝ දුරයි",
      op3: "වෙනත්",
      otherLabel: "වෙනත් හේතුවක් නම්",
      other: "ඔබේ හේතුව මෙහි ටයිප් කරන්න",
      submit: "ඉදිරිපත් කරන්න",
      changeCollector: "එකතුකරන්නා වෙනස් කරන්න",
    },
    en: {
      sTitle: "View Request",
      accept: "Accept",
      decline: "Decline",
      assign: "Assign Collector",
      yard: "Add To Yard",
      rtext: "Select the reason for declining the request",
      op0: "Select reason for declining",
      op1: "Not enough coconut amount",
      op2: "Too far to pickup",
      op3: "Other",
      otherLabel: "If other",
      other: "Type your reason here",
      submit: "Submit",
      changeCollector: "Change Collector",
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
          rId.textContent = `S/${capitalize(data.request.method)[0]}/${
            data.request.id
          }`;
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

            previous = data.request.final_amount;
            remainingCount.textContent = previous;
            collectionId = data.request.id;
          }
          date.textContent = data.request.date;
          time.textContent = timeString(data.request.time);
          amount.textContent = data.request.amount.toLocaleString("en-US");

          totalAmount = data.request.amount;
          totalCount.textContent = totalAmount;

          pMethod.textContent = capitalize(data.request.payment_method);
          if (data.request.status == 1) {
            if (lang == "sin") sText.textContent = "තත්ත්වය: පොරොත්තු අනුමැතිය";
            else sText.textContent = "Status: Pending Approval";
            cNameRow.style.display = "none";
            cPhoneRow.style.display = "none";
            collected.style.display = "none";
            completeBtn.style.display = "none";
            completeBtn.disabled = true;
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
            completeBtn.style.display = "none";
            completeBtn.disabled = true;
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
            yard.style.display = "";
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
            completeBtn.style.display = "none";
            completeBtn.disabled = true;
            cName.textContent =
              data.request.c_fName + " " + data.request.c_lName;
            cPhone.textContent = data.request.c_phone;
            collected.style.display = "none";
            changeCollector.style.display = "";
            document.cookie = "date=" + date.textContent + "; path=/";
          } else if (data.request.status == 4) {
            if (lang == "sin") sText.textContent = "තත්ත්වය: ප්‍රතික්ෂේප කළා";
            else sText.textContent = "Status: Rejected";

            accept.style.display = "none";
            accept.disabled = true;
            decline.style.display = "none";
            decline.disabled = true;
            assign.style.display = "none";
            assign.disabled = true;
            completeBtn.style.display = "none";
            completeBtn.disabled = true;
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
            completeBtn.style.display = "none";
            completeBtn.disabled = true;
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
            completeBtn.style.display = "none";
            completeBtn.disabled = true;
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
    overlay1.style.display = "flex";
    document.querySelector(".decline-container").style.display = "block";

    overlay1.addEventListener("click", (e) => {
      if (e.target.id === "overlay1") {
        overlay1.style.display = "none";
        document.querySelector(".decline-container").style.display = "none";
      }
    });

    closeBtn1.addEventListener("click", () => {
      overlay1.style.display = "none";
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

  // Get yards
  let yard1 = [],
    yard2 = [],
    yard3 = [],
    addStatus = false,
    totalStatus = false;

  getYards();
  function getYards() {
    fetch(backProxy + "/yards", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((response) => {
        if (response.status == 200) {
          response.json().then((data) => {
            yard1 = data.yard1;
            yard2 = data.yard2;
            yard3 = data.yard3;
          });
        } else if (response.status === 202) {
          response.json().then((data) => {
            console.log(data.message);
          });
          if (lang == "sin") Command: toastr["info"]("මොකක්හරි වැරැද්දක් වෙලා");
          else Command: toastr["info"]("Something went wrong");
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

  //view yard
  toYardText.forEach((elm, index) => {
    elm.addEventListener("click", () => {
      document.querySelector(".split1-window").style.right = "46%";

      remainingAmount = previous;
      remainingCount.textContent = remainingAmount;

      if (index === 0) {
        viewYard(yard1);
        yardH.textContent = "Yard " + 1;
      } else if (index === 1) {
        viewYard(yard2);
        yardH.textContent = "Yard " + 2;
      } else if (index === 2) {
        viewYard(yard3);
        yardH.textContent = "Yard " + 3;
      }

      addError.textContent = "";
      totalError.textContent = "";
      daysError.textContent = "";
      remainingError.textContent = "";

      const radio = document.querySelectorAll(".radio"),
        add = document.querySelectorAll(".add"),
        total = document.querySelectorAll(".total"),
        days = document.querySelectorAll(".days");

      radio.forEach((r) => {
        r.addEventListener("input", () => {
          var total =
              r.parentElement.nextSibling.nextSibling.nextSibling.nextSibling
                .firstChild,
            add =
              r.parentElement.nextSibling.nextSibling.nextSibling.firstChild,
            days = r.parentElement.nextSibling.firstChild;

          if (r.checked) {
            add.disabled = false;
            total.disabled = false;
            days.disabled = false;

            total.value =
              +add.value + +r.parentElement.nextSibling.nextSibling.textContent;
          } else {
            add.disabled = true;
            total.disabled = true;
            days.disabled = true;

            add.value = null;
            total.value = null;

            add.nextSibling.style.display = "none";
            total.nextSibling.style.display = "none";
            days.nextSibling.style.display = "none";
          }

          calculateRemainingAmount();
          r.parentElement.parentElement.classList.toggle("disable");
        });
      });

      total.forEach((elm) => {
        elm.addEventListener("input", () => {
          var amount =
              elm.parentElement.parentElement.children[2].firstChild
                .textContent,
            add = elm.parentElement.previousSibling.firstChild;

          add.value = +elm.value - +amount;
          calculateRemainingAmount();

          if (elm.value == 0 || elm.value == null || elm.value < +amount) {
            totalError.style.display = "";
            if (lang == "sin")
              totalError.innerHTML = `<i class="bx bx-error"></i> පොල් ප්‍රමාණය පවතින ප්‍රමාණයට වඩා අඩු විය නොහැක`;
            else
              totalError.innerHTML = `<i class="bx bx-error"></i> Coconut amount cannot subceed the available amount`;

            elm.nextSibling.style.display = "";

            totalStatus = false;

            //handle add error
            handleAdd(add);
          } else if (!checkInt(elm.value)) {
            totalError.style.display = "";
            if (lang == "sin")
              totalError.innerHTML = `<i class="bx bx-error"></i> පොල් ප්‍රමාණය ධන නිඛිල විය යුතුය`;
            else
              totalError.innerHTML = `<i class="bx bx-error"></i> Coconut amount must be positive integer`;
            elm.nextSibling.style.display = "";

            totalStatus = false;

            //handle add error
            handleAdd(add);
          } else if (elm.value > 10000) {
            totalError.style.display = "";
            if (lang == "sin")
              totalError.innerHTML = `<i class="bx bx-error"></i> පොල් ගෙඩි ගණන බ්ලොක් එකේ උපරිම ධාරිතාව ඉක්මවිය නොහැක`;
            else
              totalError.innerHTML = `<i class="bx bx-error"></i> Coconuts amount cannot exceed the maximum capacity of the block`;
            elm.nextSibling.style.display = "";

            totalStatus = false;

            //handle add error
            handleAdd(add);
          } else {
            totalError.innerHTML = null;
            elm.nextSibling.style.display = "none";

            totalStatus = true;

            //handle add error
            handleAdd(add);
          }
        });
      });

      add.forEach((elm) => {
        elm.addEventListener("input", () => {
          var amount =
              elm.parentElement.parentElement.children[2].firstChild
                .textContent,
            total = elm.parentElement.nextSibling.firstChild;

          total.value = +elm.value + +amount;
          calculateRemainingAmount();

          if (elm.value == 0 || elm.value == null) {
            addError.style.display = "";
            if (lang == "sin")
              addError.innerHTML = `<i class="bx bx-error-circle"></i> පොල් ප්‍රමාණය හිස් විය නොහැක`;
            else
              addError.innerHTML = `<i class="bx bx-error-circle"></i> Coconut amount cannot be empty`;
            elm.nextSibling.style.display = "";

            addStatus = false;
          } else if (!checkInt(elm.value)) {
            addError.style.display = "";
            if (lang == "sin")
              addError.innerHTML = `<i class="bx bx-error-circle"></i> පොල් ප්‍රමාණය ධන නිඛිල විය යුතුය`;
            else
              addError.innerHTML = `<i class="bx bx-error-circle"></i> Coconut amount must be positive integer`;
            elm.nextSibling.style.display = "";

            addStatus = false;

            //handle total error
            handleTotal(total, amount);
          } else {
            addError.innerHTML = null;
            elm.nextSibling.style.display = "none";

            addError.innerHTML = null;
            elm.nextSibling.style.display = "none";

            addStatus = true;

            //handle total error
            handleTotal(total, amount);
          }
        });
      });

      days.forEach((elm) => {
        elm.addEventListener("input", () => {
          if (elm.value == 0 || elm.value == null) {
            daysError.style.display = "";
            if (lang == "sin")
              daysError.innerHTML = `<i class="bx bx-message-rounded-error"></i> දින ගණන හිස් විය නොහැක`;
            else
              daysError.innerHTML = `<i class="bx bx-message-rounded-error"></i> Days count cannot be empty`;
            elm.nextSibling.style.display = "";
          } else if (!checkInt(elm.value)) {
            daysError.style.display = "";
            if (lang == "sin")
              daysError.innerHTML = `<i class="bx bx-message-rounded-error"></i> දින ගණන ධන නිඛිල විය යුතුය`;
            else
              daysError.innerHTML = `<i class="bx bx-message-rounded-error"></i> Days count must be positive integer`;
            elm.nextSibling.style.display = "";
          } else {
            daysError.style.display = "none";
            elm.nextSibling.style.display = "none";
          }
        });
      });

      document.querySelector(".split2-window").style.display = "block";
    });
  });

  function calculateRemainingAmount() {
    const addFileld = document.querySelectorAll(".add");

    var value = 0;
    addFileld.forEach((elm) => {
      if (!elm.parentElement.parentElement.classList.contains("disable")) {
        value += +elm.value;
      }
    });
    remainingAmount = value + previous;
    remainingCount.textContent = remainingAmount;
  }

  function handleAdd(add) {
    if (add.value == 0 || add.value == null) {
      addError.style.display = "";
      if (lang == "sin")
        addError.innerHTML = `<i class="bx bx-error-circle"></i> පොල් ප්‍රමාණය හිස් විය නොහැක`;
      else
        addError.innerHTML = `<i class="bx bx-error-circle"></i> Coconut amount cannot be empty`;
      add.nextSibling.style.display = "";
      addStatus = false;
    } else if (!checkInt(add.value)) {
      addError.style.display = "";
      if (lang == "sin")
        addError.innerHTML = `<i class="bx bx-error-circle"></i> පොල් ප්‍රමාණය ධන නිඛිල විය යුතුය`;
      else
        addError.innerHTML = `<i class="bx bx-error-circle"></i> Coconut amount must be positive integer`;
      add.nextSibling.style.display = "";
      addStatus = false;
    } else {
      addError.style.display = "none";
      add.nextSibling.style.display = "none";
      addStatus = true;
    }
  }

  function handleTotal(total, amount) {
    if (total.value == 0 || total.value == null || total.value < +amount) {
      totalError.style.display = "";
      if (lang == "sin")
        totalError.innerHTML = `<i class="bx bx-error"></i> පොල් ප්‍රමාණය පවතින ප්‍රමාණයට වඩා අඩු විය නොහැක`;
      else
        totalError.innerHTML = `<i class="bx bx-error"></i> Coconut amount cannot subceed the available amount`;
      total.nextSibling.style.display = "";
      totalStatus = false;
    } else if (!checkInt(total.value)) {
      totalError.style.display = "";
      if (lang == "sin")
        totalError.innerHTML = `<i class="bx bx-error"></i> පොල් ප්‍රමාණය ධන නිඛිල විය යුතුය`;
      else
        totalError.innerHTML = `<i class="bx bx-error"></i> Coconut amount must be positive integer`;
      total.nextSibling.style.display = "";
      totalStatus = false;
    } else if (total.value > 10000) {
      totalError.style.display = "";
      if (lang == "sin")
        totalError.innerHTML = `<i class="bx bx-error"></i> පොල් ගෙඩි ගණන බ්ලොක් එකේ උපරිම ධාරිතාව ඉක්මවිය නොහැක`;
      else
        totalError.innerHTML = `<i class="bx bx-error"></i> Coconuts amount cannot exceed the maximum capacity of the block`;
      total.nextSibling.style.display = "";
      totalStatus = false;
    } else {
      totalError.style.display = "none";
      total.nextSibling.style.display = "none";
      totalStatus = true;
    }
  }

  function viewYard(yard) {
    let row = "";

    yard.forEach((elm) => {
      var status = "";
      if (elm.days > 30) status = "stock-level4";
      else if (elm.days > 25) status = "stock-level3";
      else if (elm.days > 15) status = "stock-level2";
      else status = "stock-level1";

      row +=
        `<tr id=` +
        elm.id +
        ` class="` +
        status +
        ` disable">` +
        `<td>` +
        `<input class="radio" type="checkbox" />` +
        ` <label>` +
        elm.id +
        `</label>` +
        `</td>` +
        `<td>` +
        `<input` +
        ` type="number"` +
        ` class="` +
        status +
        ` days" value=${elm.days} disabled /><i class="bx bx-message-rounded-error" style="display:none"></i>` +
        `</td>` +
        `<td>` +
        elm.count +
        `</td>` +
        `<td>` +
        `<input` +
        ` type="number"` +
        ` class="` +
        status +
        ` add" disabled /><i class="bx bx-error-circle" style="display:none"></i>` +
        `</td>` +
        `<td><input` +
        ` type="number"` +
        ` class="` +
        status +
        ` total" disabled /><i class="bx bx-error" style="display:none"></i></td>` +
        `</tr>`;
    });
    tbody2.innerHTML = row;
  }

  function checkDays(day) {
    if (day.value == 0 || day.value == null) {
      daysError.style.display = "";
      if (lang == "sin")
        daysError.innerHTML = `<i class="bx bx-message-rounded-error"></i> දින ගණන හිස් විය නොහැක`;
      else
        daysError.innerHTML = `<i class="bx bx-message-rounded-error"></i> Days count cannot be empty`;
      day.nextSibling.style.display = "";
      return false;
    } else if (!checkInt(day.value)) {
      daysError.style.display = "";
      if (lang == "sin")
        daysError.innerHTML = `<i class="bx bx-message-rounded-error"></i> දින ගණන ධන නිඛිල විය යුතුය`;
      else
        daysError.innerHTML = `<i class="bx bx-message-rounded-error"></i> Days count must be positive integer`;
      day.nextSibling.style.display = "";
      return false;
    } else {
      daysError.style.display = "none";
      day.nextSibling.style.display = "none";

      return true;
    }
  }

  function checkAdd(add) {
    if (add.value == 0 || add.value == null) {
      addError.style.display = "";
      if (lang == "sin")
        addError.innerHTML = `<i class="bx bx-error-circle"></i> පොල් ප්‍රමාණය හිස් විය නොහැක`;
      else
        addError.innerHTML = `<i class="bx bx-error-circle"></i> Coconut amount cannot be empty`;
      add.nextSibling.style.display = "";

      return false;
    } else if (!checkInt(add.value)) {
      addError.style.display = "";
      if (lang == "sin")
        addError.innerHTML = `<i class="bx bx-error-circle"></i> පොල් ප්‍රමාණය ධන නිඛිල විය යුතුය`;
      else
        addError.innerHTML = `<i class="bx bx-error-circle"></i> Coconut amount must be positive integer`;
      add.nextSibling.style.display = "";
      return false;
    } else {
      addError.innerHTML = null;
      add.nextSibling.style.display = "none";

      var amount =
          add.parentElement.parentElement.children[2].firstChild.textContent,
        total = add.parentElement.nextSibling.firstChild;

      if (+amount + +add.value == +total.value) return true;
      else return false;
    }
  }

  function checkTotal(total) {
    if (total.value == 0 || total.value == null || total.value < +amount) {
      totalError.style.display = "";
      if (lang == "sin")
        totalError.innerHTML = `<i class="bx bx-error"></i> පොල් ප්‍රමාණය පවතින ප්‍රමාණයට වඩා අඩු විය නොහැක`;
      else
        totalError.innerHTML = `<i class="bx bx-error"></i> Coconut amount cannot subceed the available amount`;

      total.nextSibling.style.display = "";

      return false;
    } else if (!checkInt(total.value)) {
      totalError.style.display = "";
      if (lang == "sin")
        totalError.innerHTML = `<i class="bx bx-error"></i> පොල් ප්‍රමාණය ධන නිඛිල විය යුතුය`;
      else
        totalError.innerHTML = `<i class="bx bx-error"></i> Coconut amount must be positive integer`;
      total.nextSibling.style.display = "";

      return false;
    } else if (total.value > 10000) {
      totalError.style.display = "";
      if (lang == "sin")
        totalError.innerHTML = `<i class="bx bx-error"></i> පොල් ගෙඩි ගණන බ්ලොක් එකේ උපරිම ධාරිතාව ඉක්මවිය නොහැක`;
      else
        totalError.innerHTML = `<i class="bx bx-error"></i> Coconuts amount cannot exceed the maximum capacity of the block`;
      total.nextSibling.style.display = "";

      return false;
    } else {
      totalError.innerHTML = null;
      total.nextSibling.style.display = "none";

      var amount =
          total.parentElement.parentElement.children[2].firstChild.textContent,
        add = total.parentElement.previousSibling.firstChild;

      if (+amount + +add.value == +total.value) return true;
      else return false;
    }
  }

  save.addEventListener("click", () => {
    const radio = document.querySelectorAll(".radio"),
      add = document.querySelectorAll(".add"),
      total = document.querySelectorAll(".total"),
      days = document.querySelectorAll(".days");

    var blocks = [],
      day = [],
      amounts = [],
      addTotal = 0,
      countStatus = false,
      count = 0;

    radio.forEach((r, index) => {
      var day_status = false,
        add_status = false,
        total_status = false;

      if (r.checked) {
        day_status = checkDays(days[index]);
        add_status = checkAdd(add[index]);
        total_status = checkTotal(total[index]);

        if (day_status && add_status && total_status) {
          blocks.push(r.parentElement.parentElement.id);
          day.push(days[index].value);
          amounts.push(total[index].value);
        }

        addTotal += +add[index].value;
        count++;
      }
    });

    if (count == blocks.length) countStatus = true;
    else countStatus = false;

    log(countStatus);

    if (countStatus) {
      var formData = {
        yard: yardH.textContent.slice(5),
        blocks: blocks,
        days: day,
        amounts: amounts,
        collector: 0,
        final_amount: addTotal,
        id: collectionId,
      };

      if (lang == "sin") {
        var title = "ඔයාට විශ්වාස ද?",
          text = "ඔබට මෙය ප්‍රතිවර්තනය කිරීමට නොහැකි වනු ඇත!",
          confirmButtonText = "ඔව්, අංගනයට එක් කරන්න!",
          cancelButtonText = "අවලංගු කරන්න";
      } else {
        var title = "Are you sure?",
          text = "You won't be able to revert this!",
          confirmButtonText = "Yes, Add to yard!",
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
          log(formData);
          fetch(backProxy + "/yard-data", {
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
                if (lang == "sin") var title = "සාර්ථකව අංගනයට එක් කරන ලදී";
                else var title = "Successfully added to yard";
                Swal.fire({
                  title: title,
                  // text: "You clicked the button!",
                  icon: "success",
                  confirmButtonColor: confirmButtonColor,
                }).then((response) => {
                  previous += addTotal;

                  document.querySelector(".split1-window").style.right = "35%";
                  document.querySelector(".split2-window").style.display =
                    "none";

                  getYards();
                  yard.click();
                });
              } else if (response.status === 400) {
                response.json().then((data) => {
                  console.log(data.message);
                });
                if (lang == "sin")
                  Command: toastr["info"]("මොකක්හරි වැරැද්දක් වෙලා");
                else Command: toastr["info"]("Something went wrong");
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

  completeBtn.addEventListener("click", () => {
    if (lang == "sin") {
      var title = "ඔයාට විශ්වාස ද?",
        text = "ඔබට මෙය ප්‍රතිවර්තනය කිරීමට නොහැකි වනු ඇත!",
        confirmButtonText = "ඔව්, සම්පූර්ණ එකතුව",
        cancelButtonText = "අවලංගු කරන්න";
    } else {
      var title = "Are you sure?",
        text = "You won't be able to revert this!",
        confirmButtonText = "Yes, Complete collection!",
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
        fetch(backProxy + "/yard-data?id=" + collectionId, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        })
          .then((response) => {
            if (response.status == 200) {
              response.json().then((data) => {
                log(data.message);
              });
              if (lang == "sin") var title = "එකතුව සාර්ථකව නිම කරන ලදී";
              else var title = "Collection completed successfully";
              Swal.fire({
                title: title,
                // text: "You clicked the button!",
                icon: "success",
                confirmButtonColor: confirmButtonColor,
              }).then((response) => {
                window.location.reload();
              });
            } else if (response.status === 400) {
              response.json().then((data) => {
                console.error("Error:", data.message);
                Command: toastr["error"](data.message, "Error");
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
})();

function checkInt(num) {
  if (Number.isInteger(+num) && +num > 0) return true;
  return false;
}
