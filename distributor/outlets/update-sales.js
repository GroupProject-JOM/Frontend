(() => {
  const body = document.querySelector("body"),
    sin = body.querySelector(".sin"),
    en = body.querySelector(".en"),
    dTitle = body.querySelector(".distributor-title"),
    oArea = body.querySelector(".outlet-area"),
    viewData = body.querySelector(".view-data"),
    tbody = body.querySelector(".tbody"),
    subTotal = body.querySelector(".sub-total-value"),
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
  getRemainig();
  var row = "",
    onHand = [],
    prices = [];

  function getRemainig() {
    (row = ""), (onHand = []), (prices = []);
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
              prices.push(item.price);
              row +=
                `<tr class="disable" id=${item.product}>` +
                `<td>` +
                `<label>` +
                `<input type="checkbox" class="radio" />${item.category}</label>` +
                `</td>` +
                `<td>${item.type}</td>` +
                `<td class="price">${(+item.price).toLocaleString(
                  "en-US"
                )} LKR</td>` +
                `<td class="on-hand">${item.remaining}</td>` +
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
                  amount =
                    r.parentElement.parentElement.nextSibling.nextSibling
                      .nextSibling;

                calculateSubTotal();

                if (r.checked) {
                  add.disabled = false;

                  total.textContent = +add.value * +prices[index] + " LKR";
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
                  addError = elm.nextSibling.nextSibling;

                total.textContent =
                  (+elm.value * +prices[index]).toLocaleString("en-US") +
                  " LKR";

                calculateSubTotal();
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
                      addError.textContent = `නිෂ්පාදන ගණන බිංදුවට වඩා අඩු විය නොහැක`;
                    else
                      addError.textContent = `Product count cannot be less than zero`;
                } else {
                  if (+amount.textContent < 0) {
                    addError.style.display = "";

                    if (lang == "sin") {
                      addError.textContent = `නිෂ්පාදන ගණන බිංදුවට වඩා අඩු විය නොහැක`;
                    } else {
                      addError.textContent = `Product count cannot be less than zero`;
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
  }

  function calculateSubTotal() {
    const radio = document.querySelectorAll(".radio"),
      add = document.querySelectorAll(".add");

    var sub_total = 0;

    radio.forEach((r, index) => {
      if (r.checked) {
        sub_total = prices[index] * +add[index].value;
      }
    });

    subTotal.textContent = sub_total.toLocaleString("en-US") + " LKR";
  }

  //send distribution data to backend
  btn.addEventListener("click", () => {
    const radio = document.querySelectorAll(".radio"),
      add = document.querySelectorAll(".add"),
      remaining = document.querySelectorAll(".on-hand"),
      price = document.querySelectorAll(".price"),
      total = document.querySelectorAll(".total");

    var amounts = [],
      products = [],
      productPrices = [],
      countStatus = false,
      count = 0;

    radio.forEach((r, index) => {
      var add_status = false,
        price_status = false,
        remainingStatus = false,
        total_status = false;

      if (r.checked) {
        add_status = checkAdd(add[index], onHand[index]);
        total_status = checkTotal(total[index], index);
        price_status = checkPrice(price[index], index);

        if (+remaining[index].textContent >= 0) remainingStatus = true;
        else false;

        if (add_status && total_status && price_status && remainingStatus) {
          products.push(r.parentElement.parentElement.parentElement.id);
          amounts.push(add[index].value);
          productPrices.push(prices[index]);
        }

        count++;
      }
    });

    if (count == products.length && count != 0) countStatus = true;
    else false;

    if (countStatus) {
      var formData = {
        amounts: amounts,
        products: products,
        prices: productPrices,
        id: getCookie("id"),
      };

      log(JSON.stringify(formData));

      if (lang == "sin") {
        var title = "ඔයාට විශ්වාස ද?",
          text = "ඔබට මෙය ප්‍රතිවර්තනය කිරීමට නොහැකි වනු ඇත!",
          confirmButtonText = "ඔව්, අලෙවිසැලට බෙදාහරින්න!",
          cancelButtonText = "අවලංගු කරන්න";
      } else {
        var title = "Are you sure?",
          text = "You won't be able to revert this!",
          confirmButtonText = "Yes, Distribute to outlet!",
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
          fetch(backProxy + "/product-list", {
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
                if (lang == "sin") var title = "අලෙවිසැලට සාර්ථකව බෙදා හැර ඇත";
                else var title = "Successfully distributed to outlet";
                Swal.fire({
                  title: title,
                  // text: "You clicked the button!",
                  icon: "success",
                  confirmButtonColor: confirmButtonColor,
                }).then((response) => {
                  getRemainig();
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

  function checkAdd(add, onhand) {
    var addError = add.nextSibling.nextSibling;
    if (add.value == 0 || add.value == null) {
      addError.style.display = "";
      if (lang == "sin") addError.textContent = `පොල් ප්‍රමාණය හිස් විය නොහැක`;
      else addError.textContent = `Coconut amount cannot be empty`;

      return false;
    } else if (!checkInt(add.value)) {
      addError.style.display = "";
      if (lang == "sin")
        addError.textContent = `පොල් ප්‍රමාණය ධන නිඛිල විය යුතුය`;
      else addError.textContent = `Coconut amount must be positive integer`;

      return false;
    } else {
      addError.textContent = "";
      addError.style.display = "none";

      var amount = add.parentElement.previousSibling.textContent;

      if (+amount + +add.value == +onhand) return true;
      else return false;
    }
  }

  function checkTotal(total, index) {
    const totalValue = (numberValue = parseInt(
        total.textContent.replace(/[^\d]/g, "")
      )),
      totalError = total.previousSibling.children[2];

    if (+totalValue == 0 || +totalValue == null) {
      totalError.style.display = "";
      if (lang == "sin")
        totalError.textContent = `පොල් ප්‍රමාණය පවතින ප්‍රමාණයට වඩා අඩු විය නොහැක`;
      else
        totalError.textContent = `Coconut amount cannot subceed the available amount`;

      return false;
    } else if (!checkInt(totalValue)) {
      totalError.style.display = "";
      if (lang == "sin")
        totalError.textContent = `පොල් ප්‍රමාණය ධන නිඛිල විය යුතුය`;
      else totalError.textContent = `Coconut amount must be positive integer`;

      return false;
    } else {
      totalError.textContent = "";
      totalError.style.display = "none";

      var add = total.previousSibling.firstChild.value;

      if (+add * +prices[index] == +totalValue) return true;
      else return false;
    }
  }

  function checkPrice(price, index) {
    var pagePrice = price.textContent.slice(0, -4),
      actualPrice = (+prices[index]).toLocaleString("en-US");

    if (pagePrice == actualPrice) return true;
    else return false;
  }
})();

function checkInt(num) {
  if (Number.isInteger(+num) && +num > 0) return true;
  return false;
}
