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
    decline = body.querySelector(".decline");

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
    accept.textContent = data["sin"]["accept"];
    decline.textContent = data["sin"]["decline"];
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
    accept.textContent = data["en"]["accept"];
    decline.textContent = data["en"]["decline"];
    setGreeting();
  });

  var data = {
    sin: {
      sTitle: "ඉල්ලීම බලන්න",
      sText: "තත්ත්වය: පොරොත්තුවෙන්",
      accept: "පිළිගන්න",
      decline: "ප්රතික්ෂේප කරන්න",
    },
    en: {
      sTitle: "View Request",
      sText: "Status: Pending",
      accept: "Accept",
      decline: "Decline",
    },
  };

  fetch(
    backProxy +
      "/supply-request?id=" +
      getCookie("id") +
      "&sId=" +
      getCookie("sId"),
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
          rId.textContent = data.request.id;
          sName.textContent = data.request.name + " " + data.request.last_name;
          sPhone.textContent = data.request.phone;
          sMethod.textContent = capitalize(data.request.method);
          address.textContent = data.request.location + "," + data.request.area;
          dText.textContent = "Pickup Date";
          tText.textContent = "Pickup Time";
          if (data.request.method != "pickup") {
            estate.style.display = "none";
            map.style.display = "none";
            dText.textContent = "Delivery Date";
            tText.textContent = "Delivery Time";
          }
          date.textContent = data.request.date;
          time.textContent = timeString(data.request.time);
          amount.textContent = data.request.amount.toLocaleString("en-US");
          pMethod.textContent = capitalize(data.request.payment_method);
        });
      } else if (response.status === 202) {
        response.json().then((data) => {
          console.log(data.request);
        });
        if (lang == "sin") Command: toastr["error"]("සැපයුම් ඉල්ලීම් නොමැත");
        else Command: toastr["error"]("No Supply requests");
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
        fetch(
          backProxy +
            "/accept-request?id=" +
            getCookie("id") +
            "&sId=" +
            getCookie("sId"),
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
                  if(sMethod.textContent == "Pickup") window.location.href = "./view-request2.html";
                  else window.location.href = "./";
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
