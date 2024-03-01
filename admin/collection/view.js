document.cookie = "amount=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
document.cookie = "final=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";

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
    address = body.querySelector(".address"),
    date = body.querySelector(".date"),
    time = body.querySelector(".time"),
    amount = body.querySelector(".amount"),
    pMethod = body.querySelector(".pMethod"),
    cName = body.querySelector(".cName"),
    cPhone = body.querySelector(".cPhone"),
    btn = body.querySelector(".form-button");

  var lang = getCookie("lang"); // current language

  sin.addEventListener("click", () => {
    sin.classList.add("active");
    en.classList.remove("active");

    document.documentElement.setAttribute("lang", "sin");
    document.cookie = "lang=sin; path=/";
    lang = "sin";

    sTitle.textContent = data["sin"]["sTitle"];
    sText.textContent = data["sin"]["sText"];
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
    sText.textContent = data["en"]["sText"];
    btn.textContent = data["en"]["btn"];

    setGreeting();
  });

  var data = {
    sin: {
      sTitle: "ඉල්ලීම බලන්න",
      sText: "තත්ත්වය: ලබා ගැනීමට සූදානම්",
      btn: "සම්පූර්ණ කරන්න",
    },
    en: {
      sTitle: "View Request",
      sText: "Status: Ready to pickup",
      btn: "Complete Collection",
    },
  };

  let area = "";

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
          address.textContent = data.request.address;

          var arr = data.request.location.split(" ");
          map.innerHTML =
            `<iframe src='https://www.google.com/maps?q=` +
            arr[0] +
            `,` +
            arr[1] +
            `&hl=es;z=14&output=embed' frameborder='0'></iframe>`;

          area = data.request.area;

          date.textContent = data.request.date;
          time.textContent = timeString(data.request.time);
          amount.textContent = data.request.amount.toLocaleString("en-US");
          pMethod.textContent = capitalize(data.request.payment_method);

          cName.textContent = data.request.c_fName + " " + data.request.c_lName;
          cPhone.textContent = data.request.c_phone;
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

  btn.addEventListener("click", () => {
    document.cookie = "amount=" + amount.textContent + "; path=/";
    document.cookie = "area=" + area + "; path=/";
    window.location.href = "./enter-amount.html";
  });
})();
