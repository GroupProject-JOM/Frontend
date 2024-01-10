(() => {
  const body = document.querySelector("body"),
    sin = body.querySelector(".sin"),
    en = body.querySelector(".en"),
    dTitle = body.querySelector(".distributor-title"),
    oArea = body.querySelector(".outlet-area"),
    viewData = body.querySelector(".view-data"),
    tbody = body.querySelector(".tbody"),
    btn = body.querySelector(".next");

  sin.addEventListener("click", () => {
    sin.classList.add("active");
    en.classList.remove("active");

    document.documentElement.setAttribute("lang", "sin");
    document.cookie = "lang=sin; path=/";
    lang = "sin";

    btn.textContent = data["sin"]["btn"];
    viewData.textContent = data["sin"]["viewData"];
    setGreeting();
  });

  en.addEventListener("click", () => {
    en.classList.add("active");
    sin.classList.remove("active");

    document.documentElement.setAttribute("lang", "en");
    document.cookie = "lang=en; path=/";
    lang = "en";

    btn.textContent = data["en"]["btn"];
    viewData.textContent = data["en"]["viewData"];
    setGreeting();
  });

  var data = {
    sin: {
      btn: "ඉදිරිපත් කරන්න",
      viewData: "අලෙවිසැලේ විස්තර බලන්න",
    },
    en: {
      btn: "Submit",
      viewData: "View Outlet Details",
    },
  };

  //Get outlet data
  fetch(backProxy + "/outlet?id=" + getCookie("id"), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  })
    .then((response) => {
      if (response.status == 200) {
        response.json().then((data) => {
          dTitle.textContent = data.outlet.name;
          oArea.textContent = data.outlet.city;

          // email.value = data.outlet.email;
          // phone.value = data.outlet.phone;
          // address1.value = data.outlet.address1;
          // address2.value = data.outlet.street;
        });
      } else if (response.status === 400) {
        response.json().then((data) => {
          console.log(data.outlet);
        });
        if (lang == "sin") Command: toastr["error"]("අලෙවිසැලක් නැත");
        else Command: toastr["error"]("No outlet");
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

  //Get remainig products data
  var row = "",
    onHand = [];
  fetch(backProxy + "/product-list", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  })
    .then((response) => {
      if (response.status == 200) {
        response.json().then((data) => {
          data.list.forEach((item) => {
            onHand.push(item.remaining);
            row +=
              `<tr class="disable">` +
              `<td>` +
              `<label>` +
              `<input type="checkbox" class="radio" />${item.category}</label>` +
              `</td>` +
              `<td>${item.type}</td>` +
              `<td>${(+item.price).toLocaleString("en-US")} LKR</td>` +
              `<td>${item.remaining}</td>` +
              `<td>` +
              `<input type="number" min="1" max=${item.remaining} oninput="validity.valid||(value='');" class="add" disabled /><br /><span class="form-error add-error"></span>` +
              `</td>` +
              `<td class="total">0 LKR</td>` +
              `</tr>`;
          });
          tbody.innerHTML = row;

          const radio = document.querySelectorAll(".radio"),
            add = document.querySelectorAll(".add");

          radio.forEach((r, index) => {
            r.addEventListener("input", () => {
              var total =
                  r.parentElement.parentElement.nextSibling.nextSibling
                    .nextSibling.nextSibling.nextSibling.firstChild,
                add =
                  r.parentElement.parentElement.nextSibling.nextSibling
                    .nextSibling.nextSibling.firstChild,
                unitPrice =
                  r.parentElement.parentElement.nextSibling.nextSibling.nextSibling.textContent.slice(
                    0,
                    -4
                  ),
                amount =
                  r.parentElement.parentElement.nextSibling.nextSibling
                    .nextSibling;

              if (r.checked) {
                add.disabled = false;

                total.textContent = +add.value * +unitPrice + " LKR";
              } else {
                add.disabled = true;

                add.value = null;
                total.textContent = "0 LKR";
                amount.textContent = onHand[index];

                add.nextSibling.nextSibling.style.display = "none";
              }

              r.parentElement.parentElement.parentElement.classList.toggle(
                "disable"
              );
            });
          });

          add.forEach((elm, index) => {
            elm.addEventListener("input", () => {
              var amount = elm.parentElement.previousSibling,
                total = elm.parentElement.nextSibling,
                unitPrice =
                  elm.parentElement.previousSibling.previousSibling.textContent.slice(
                    0,
                    -4
                  ),
                addError = elm.nextSibling.nextSibling;

              total.textContent =
                (+elm.value * +unitPrice).toLocaleString("en-US") + " LKR";

              amount.textContent = onHand[index] - +elm.value;

              if (elm.value == 0 || elm.value == null) {
                addError.style.display = "";
                if (lang == "sin")
                  addError.textContent = `නිෂ්පාදන ගණන හිස් විය නොහැක`;
                else addError.textContent = `Product count cannot be empty`;
                addStatus = false;
              } else if (!checkInt(+elm.value)) {
                addError.style.display = "";
                if (lang == "sin")
                  addError.textContent = `නිෂ්පාදන ගණන ධන නිඛිල විය යුතුය`;
                else
                  addError.textContent = `Product count must be positive integer`;

                if (+amount.textContent < 0)
                  if (lang == "sin")
                    addError.textContent = `ඉතිරි මුදල බිංදුවට වඩා අඩු විය නොහැක`;
                  else
                    addError.textContent = `Remaining amount cannot be less than zero`;
              } else {
                if (+amount.textContent < 0) {
                  addError.style.display = "";

                  if (lang == "sin") {
                    addError.textContent = `ඉතිරි මුදල බිංදුවට වඩා අඩු විය නොහැක`;
                  } else {
                    addError.textContent = `Remaining amount cannot be less than zero`;
                  }
                } else {
                  addError.textContent = "";
                  addError.style.display = "none";
                }
              }
            });
          });
        });
      } else if (response.status === 202) {
        response.json().then((data) => {
          console.log(data.size);
        });
        if (lang == "sin") Command: toastr["error"]("ඉතිරි නිෂ්පාදන නොමැත");
        else Command: toastr["error"]("No remaining products");
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

function checkInt(num) {
  if (Number.isInteger(+num) && +num > 0) return true;
  return false;
}
