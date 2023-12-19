document.cookie = "id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";

(() => {
  const body = document.querySelector("body"),
    sin = body.querySelector(".sin"),
    en = body.querySelector(".en"),
    pTitle = body.querySelector(".productionmg-title"),
    pText = body.querySelector(".productionmg-text"),
    pLabel = body.querySelector(".product-label"),
    pList = body.querySelector(".product-list"),
    dropdown = body.querySelector(".dropdown"),
    btn = body.querySelector(".form-button");

  var lang = getCookie("lang"); // current language

  sin.addEventListener("click", () => {
    sin.classList.add("active");
    en.classList.remove("active");

    document.documentElement.setAttribute("lang", "sin");
    document.cookie = "lang=sin; path=/";

    pTitle.textContent = data["sin"]["pTitle"];
    pText.textContent = data["sin"]["pText"];
    pLabel.textContent = data["sin"]["pLabel"];
    btn.textContent = data["sin"]["btn"];
    setGreeting();
  });

  en.addEventListener("click", () => {
    en.classList.add("active");
    sin.classList.remove("active");

    document.documentElement.setAttribute("lang", "en");
    document.cookie = "lang=en; path=/";

    pTitle.textContent = data["en"]["pTitle"];
    pText.textContent = data["en"]["pText"];
    pLabel.textContent = data["en"]["pLabel"];
    btn.textContent = data["en"]["btn"];
    setGreeting();
  });

  var data = {
    sin: {
      pTitle: "නව නිෂ්පාදනය",
      pText:
        "නිෂ්පාදන ඉල්ලීම් තෝරා එක් එක් ඉල්ලීමෙන් භාවිත කළ පොල් ප්‍රමාණය ඇතුළත් කරන්න",
      pLabel: "අපේක්ෂිත නිෂ්පාදන",
      btn: "සුරකින්න",
    },
    en: {
      pTitle: "New Production",
      pText:
        "Select production requests and enter used coconut amounts from each request",
      pLabel: "Expected Products",
      btn: "Save",
    },
  };

  let row1 = "",
    row2 = "";

  fetch(backProxy + "/production-batch", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  })
    .then((response) => {
      if (response.status == 200) {
        response.json().then((data) => {
          data.accepted.forEach((item) => {
            row1 +=
              `<div class="add-label request-label"><input type="checkbox" /><label class="ename-label">Request R` +
              item.id +
              `</label></div>` +
              `<div class="add-input">` +
              `<input` +
              ` type="number"` +
              `class="coco-amount" ` +
              `value="` +
              item.amount +
              `" ` +
              `placeholder="Enter Coconut Amount"` +
              `/><br /><span class="form-error ename-error"></span>` +
              `</div>`;
          });

          pList.innerHTML = row1;

          data.products.forEach((item) => {
            log(item);
            row2 +=
              `<option value="` +
              item.id +
              `">` +
              item.type +
              ` - ` +
              item.category +
              `</option>`;
          });
          dropdown.innerHTML = row2;
        });
      } else if (response.status === 400) {
        response.json().then((data) => {
          data.products.forEach((item) => {
            log(item);
          });
        });
        if (lang == "sin") Command: toastr["info"]("පිළිගත් ඉල්ලීම් නැත");
        else Command: toastr["info"]("No accepted requests");
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
})();
