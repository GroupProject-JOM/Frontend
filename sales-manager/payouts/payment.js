(() => {
  const body = document.querySelector("body"),
    sin = body.querySelector(".sin"),
    en = body.querySelector(".en"),
    sTitle = body.querySelector(".salesmg-title"),
    sName = body.querySelector(".sName"),
    sMethod = body.querySelector(".sMethod"),
    dText = body.querySelector(".date-text"),
    date = body.querySelector(".date"),
    amount = body.querySelector(".amount"),
    payment = body.querySelector(".payment"),
    pMethod = body.querySelector(".pMethod"),
    hNameRow = body.querySelector(".hName-row"),
    hName = body.querySelector(".hName"),
    accountRow = body.querySelector(".account-row"),
    account = body.querySelector(".account"),
    bankRow = body.querySelector(".bank-row"),
    bank = body.querySelector(".bank"),
    btn = body.querySelector(".form-button");

  var lang = getCookie("lang"); // current language

  sin.addEventListener("click", () => {
    sin.classList.add("active");
    en.classList.remove("active");

    document.documentElement.setAttribute("lang", "sin");
    document.cookie = "lang=sin; path=/";
    lang = "sin";

    sTitle.textContent = data["sin"]["sTitle"];
    btn.textContent = data["sin"]["btn"];
    setGreeting();
  });

  en.addEventListener("click", () => {
    en.classList.add("active");
    sin.classList.remove("active");

    document.documentElement.setAttribute("lang", "en");
    document.cookie = "lang=en; path=/";
    lang = "en";

    sTitle.textContent = data["en"]["sTitle"];
    btn.textContent = data["en"]["btn"];
    setGreeting();
  });

  var data = {
    sin: {
      sTitle: "ගෙවීම් තොරතුරු",
      btn: "ගෙවීම අවසන්",
    },
    en: {
      sTitle: "Payment Details",
      btn: "Payment Completed",
    },
  };

  fetch(
    backProxy + "/payout?id=" + getCookie("id") + "&user=" + getCookie("user"),
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
          sName.textContent = data.payout.name + " " + data.payout.last_name;
          sMethod.textContent = capitalize(data.payout.method);
          if (data.payout.method == "yard")
            dText.textContent = "Delivered Date";
          else dText.textContent = "Picked Date";

          var selectedDate = new Date(data.payout.date);
          date.textContent = selectedDate.toLocaleDateString();
          amount.textContent = data.payout.final_amount.toLocaleString("en-US");
          payment.textContent =
            data.payout.value.toLocaleString("en-US") + " LKR";
          pMethod.textContent = capitalize(data.payout.payment_method);

          if (data.payout.payment_method == "bank") {
            hName.textContent = data.payout.h_name;
            account.textContent = data.payout.account;
            bank.textContent = data.payout.bank;
          } else {
            hNameRow.style.display = "none";
            accountRow.style.display = "none";
            bankRow.style.display = "none";
          }
          if (data.payout.status == 6) {
            btn.style.display = "none";
            btn.disabled = true;
          }
        });
      } else if (response.status === 202) {
        response.json().then((data) => {
          log(data.payout);
        });
      } else if (response.status === 401) {
        response.json().then((data) => {
          log(data.message);
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

  btn.addEventListener("click", () => {
    if (lang == "sin") {
      var title = "ඔයාට විශ්වාස ද?",
        text = "ඔබට මෙය ප්‍රතිවර්තනය කිරීමට නොහැකි වනු ඇත!",
        confirmButtonText = "ඔව්, එය සම්පූර්ණ කරන්න!",
        cancelButtonText = "අවලංගු කරන්න";
    } else {
      var title = "Are you sure?",
        text = "You won't be able to revert this!",
        confirmButtonText = "Yes, Complete it!",
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
        var formData = {
          user: getCookie("user"),
          id: getCookie("id"),
        };
        fetch(backProxy + "/payout", {
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
                  var title = "සම්පූර්ණයි!",
                    text = "ගෙවීම අවසන්.";
                } else {
                  var title = "Completed!",
                    text = "Payment completed.";
                }
                // sweet alert
                Swal.fire({
                  title: title,
                  text: text,
                  icon: "success",
                  confirmButtonColor: confirmButtonColor,
                }).then((response) => {
                  window.location.href = "./view-all.html";
                });
              });
            } else if (response.status === 401) {
              response.json().then((data) => {
                log(data.message);
              });
              if (lang == "sin") Command: toastr["error"]("වලංගු නොවන පරිශීලක");
              else Command: toastr["error"]("Invalid User");
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
