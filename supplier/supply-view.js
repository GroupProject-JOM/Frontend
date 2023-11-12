(() => {
  const body = document.querySelector("body"),
    sin = body.querySelector(".sin"),
    en = body.querySelector(".en"),
    sTitle = body.querySelector(".supply-title"),
    sText = body.querySelector(".supply-text"),
    sMethod = body.querySelector(".sMethod"),
    dateText = body.querySelector(".date-text"),
    date = body.querySelector(".date"),
    timeText = body.querySelector(".time-text"),
    time = body.querySelector(".time"),
    pMethod = body.querySelector(".pMethod"),
    ccount = body.querySelector(".ccount"),
    sstatus = body.querySelector(".sstatus"),
    val = body.querySelector(".val"),
    value = body.querySelector(".value"),
    edit = body.querySelector(".edit"),
    del = body.querySelector(".delete");

  var lang = getCookie("lang"); // current language

  sin.addEventListener("click", () => {
    sin.classList.add("active");
    en.classList.remove("active");

    document.documentElement.setAttribute("lang", "sin");
    // sessionStorage.setItem("lang", "sin");
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
    // sessionStorage.setItem("lang", "en");
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

  fetch(
    backProxy +
      "/collection?sId=" +
      getCookie("sId") +
      "&id=" +
      getCookie("id"),
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  )
    .then((response) => {
      if (response.status == 200) {
        response.json().then((data) => {
          if (data.collection.sMethod == "pickup") {
            sMethod.textContent = "Pickup from estate";
            dateText.textContent = "Pickup Date";
            timeText.textContent = "Pickup Time";
          } else if (data.collection.sMethod == "yard") {
            sMethod.textContent = "Delivered to Yard";
            dateText.textContent = "Delivery Date";
            timeText.textContent = "Delivery Time";
          }
          date.textContent = data.collection.date;

          var T = data.collection.time.split(":"),
            timeString = "";

          if (T[0] > 12) {
            T[0] -= 12;
            if (T[0] >= 12) {
              timeString = String(T[0]).padStart(2, "0") + ":" + T[1] + " AM";
            } else {
              timeString = String(T[0]).padStart(2, "0") + ":" + T[1] + " PM";
            }
          } else {
            timeString = String(T[0]).padStart(2, "0") + ":" + T[1] + " AM";
          }

          time.textContent = timeString;

          if (data.collection.pMethod == "cash") {
            pMethod.textContent = "Cash on Pickup";
          } else if (data.collection.pMethod == "bank") {
            pMethod.textContent = "Bank Transfer";
          }

          if (0 < data.collection.status && data.collection.status < 4) {
            if (data.collection.status == 1)
              sstatus.textContent = "Pending Approval";
            else if (data.collection.status == 2)
              sstatus.textContent = "Ready to pick-up";
            else if (data.collection.status == 3)
              sstatus.textContent = "Rejected";

            ccount.textContent =
              data.collection.init_amount.toLocaleString("en-US");
            val.style.display = "none";

            var selectedDate = new Date(
              data.collection.date + " " + data.collection.time
            );
            var now = new Date();
            now.setDate(now.getDate() + 1);
            if (selectedDate <= now) {
              edit.style.display = "none";
              edit.disabled = true;
              del.style.display = "none";
              del.disabled = true;
            }
          } else if (3 < data.collection.status && data.collection.status < 6) {
            if (data.collection.status == 4)
              sstatus.textContent = "Pending Paymant";
            else if (data.collection.status == 5) sstatus.textContent = "Paid";

            ccount.textContent =
              data.collection.final_amount.toLocaleString("en-US");
            value.textContent = data.collection.value.toLocaleString("en-US");
            edit.style.display = "none";
            edit.disabled = true;
          }
        });
      } else if (response.status === 202) {
        response.json().then((data) => {
          console.log(data.collection);
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
          fetch(
            backProxy +
              "/collection?sId=" +
              getCookie("sId") +
              "&id=" +
              getCookie("id"),
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
            }
          )
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
                  }).then((response) => {
                    window.location.href = "./";
                  });
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
})();
