document.cookie = "amount=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
document.cookie = "final=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";

(() => {
  const body = document.querySelector("body"),
    sin = body.querySelector(".sin"),
    en = body.querySelector(".en"),
    cTitle = body.querySelector(".collection-title"),
    cText = body.querySelector(".collection-text"),
    sName = body.querySelector(".sName"),
    sPhone = body.querySelector(".sPhone"),
    address = body.querySelector(".address"),
    date = body.querySelector(".date"),
    time = body.querySelector(".time"),
    amount = body.querySelector(".amount"),
    pMethod = body.querySelector(".pMethod"),
    pDate = body.querySelector(".pDate"),
    pTime = body.querySelector(".pTime"),
    collected = body.querySelector(".collected"),
    Camount = body.querySelector(".Camount"),
    btn = body.querySelector(".form-button"),
    map = body.querySelector(".map");

  var lang = getCookie("lang"); // current language

  sin.addEventListener("click", () => {
    sin.classList.add("active");
    en.classList.remove("active");

    document.documentElement.setAttribute("lang", "sin");
    document.cookie = "lang=sin; path=/";
    lang = "sin";

    cTitle.textContent = data["sin"]["cTitle"];
    cText.innerHTML = data["sin"]["cText"];
    btn.textContent = data["sin"]["btn"];
    setGreeting();
  });

  en.addEventListener("click", () => {
    en.classList.add("active");
    sin.classList.remove("active");

    document.documentElement.setAttribute("lang", "en");
    document.cookie = "lang=en; path=/";
    lang = "en";

    cTitle.textContent = data["en"]["cTitle"];
    cText.innerHTML = data["en"]["cText"];
    btn.textContent = data["en"]["btn"];
    setGreeting();
  });

  var data = {
    sin: {
      cTitle: "එකතුව බලන්න",
      cText:
        "ඔබට ඔබේ එකතුවට අදාළ සියලුම තොරතුරු මෙතැනින් නැරඹිය හැක. <br /><br /> එකතුවක් සම්පූර්ණ කළ ලෙස සලකුණු කිරීමට, පහත බොත්තම ක්ලික් කරන්න",
      btn: "සම්පූර්ණ එකතුව",
    },
    en: {
      cTitle: "View Collection",
      cText:
        "You can view all the information related to your collections here. <br /><br /> To mark a collection as completed, click the button below",
      btn: "Complete Collection",
    },
  };

  let area = "";

  fetch(backProxy + "/pickup-collection?id=" + getCookie("id"), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  })
    .then((response) => {
      if (response.status == 200) {
        response.json().then((data) => {
          sName.textContent =
            data.collection.name + " " + data.collection.last_name;
          sPhone.textContent = data.collection.phone;
          address.textContent = data.collection.address;
          date.textContent = data.collection.date;
          time.textContent = timeString(data.collection.time);
          amount.textContent = data.collection.amount.toLocaleString("en-US");
          pMethod.textContent = capitalize(data.collection.payment_method);

          var arr = data.collection.location.split(" ");
          map.innerHTML =
            `<iframe src='https://www.google.com/maps?q=` +
            arr[0] +
            `,` +
            arr[1] +
            `&hl=es;z=14&output=embed' frameborder='0'></iframe>`;

          area = data.collection.area;

          if (data.collection.status != 3) {
            pDate.textContent = "Collected Date";
            pTime.textContent = "Collected Time";
            date.textContent = data.collection.collected_date;
            time.textContent = timeString(data.collection.collected_time);
            Camount.textContent =
              data.collection.final_amount.toLocaleString("en-US");

            btn.disabled = true;
            btn.style.display = "none";
            cText.style.display = "none";
            collected.style.display = "";
          }
        });
      } else if (response.status === 202) {
        response.json().then((data) => {
          console.log(data.collection);
        });
        if (lang == "sin") Command: toastr["error"]("එකතුවක් නැත");
        else Command: toastr["error"]("No collection");
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
