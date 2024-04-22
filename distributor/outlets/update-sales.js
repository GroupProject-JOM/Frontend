(() => {
  const body = document.querySelector("body"),
    sin = body.querySelector(".sin"),
    en = body.querySelector(".en"),
    dTitle = body.querySelector(".distributor-title"),
    oArea = body.querySelector(".outlet-area"),
    viewData = body.querySelector(".view-data"),
    tbody = body.querySelector(".tbody"),
    tbody2 = body.querySelector(".tbody2"),
    subTotal = body.querySelector(".sub-total-value"),
    closeBtn1 = body.querySelector(".close-btn1"),
    closeBtn2 = body.querySelector(".close-btn2"),
    overlay1 = body.querySelector(".overlay1"),
    overlay2 = body.querySelector(".overlay2"),
    oId = body.querySelector(".oId"),
    oName = body.querySelector(".oName"),
    oEmail = body.querySelector(".oEmail"),
    oPhone = body.querySelector(".oPhone"),
    oAddress = body.querySelector(".oAddress"),
    btn = body.querySelector(".next"),
    confirm = body.querySelector(".confirm"),
    billTotal = body.querySelector(".bill-total-value");

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

  viewData.addEventListener("click", () => {
    overlay1.style.display = "flex";
    document.querySelector(".view-outlet-container").style.display = "block";
  });

  overlay1.addEventListener("click", (e) => {
    if (e.target.id === "overlay1") {
      overlay1.style.display = "none";
      document.querySelector(".view-outlet-container").style.display = "none";
    }
  });

  closeBtn1.addEventListener("click", () => {
    overlay1.style.display = "none";
    document.querySelector(".view-outlet-container").style.display = "none";
  });

  overlay2.addEventListener("click", (e) => {
    if (e.target.id === "overlay2") {
      overlay2.style.display = "none";
      document.querySelector(".bill-container").style.display = "none";
    }
  });

  closeBtn2.addEventListener("click", () => {
    overlay2.style.display = "none";
    document.querySelector(".bill-container").style.display = "none";
  });

  var data = {
    sin: {
      btn: "සුරකින්න",
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

          oId.textContent = data.outlet.id;
          oName.textContent = data.outlet.name;
          oEmail.textContent = data.outlet.email;
          oPhone.textContent = data.outlet.phone;
          oAddress.textContent =
            data.outlet.address1 +
            ", " +
            data.outlet.street +
            ", " +
            data.outlet.city;
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
    pNames = [],
    pTypes = [],
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
              pNames.push(item.category);
              pTypes.push(item.type);
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
                    addError.textContent = `නිෂ්පාදන ගණන 0 ට වඩා වැඩි විය යුතුය`;
                  else
                    addError.textContent = `Product count must be greater than 0`;

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
        sub_total += prices[index] * add[index].value;
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
      pList = [],
      typeList = [],
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
          pList.push(pNames[index]);
          typeList.push(pTypes[index]);
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

      overlay2.style.display = "flex";
      document.querySelector(".bill-container").style.display = "block";

      var row3 = "";
      products.forEach((item, index) => {
        row3 +=
          `<tr>` +
          `<td class="tc1">${index + 1}</td>` +
          `<td>${pList[index]}</td>` +
          `<td>${typeList[index]}</td>` +
          `<td>${amounts[index].toLocaleString("en-US")}</td>` +
          `<td>${(+productPrices[index]).toLocaleString("en-US")} LKR</td>` +
          `<td>${(productPrices[index] * amounts[index]).toLocaleString(
            "en-US"
          )} LKR</td>` +
          `</tr>`;
      });
      tbody2.innerHTML = row3;

      billTotal.textContent = subTotal.textContent;

      confirm.addEventListener("click", () => {
        if (lang == "sin") {
          var title = "ඔබට විශ්වාස ද?",
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
                  if (lang == "sin")
                    var title = "අලෙවිසැලට සාර්ථකව බෙදා හැර ඇත";
                  else var title = "Successfully distributed to outlet";
                  Swal.fire({
                    title: title,
                    // text: "You clicked the button!",
                    icon: "success",
                    confirmButtonColor: confirmButtonColor,
                  }).then((response) => {
                    getRemainig();
                    subTotal.textContent = "0 LKR";
                    overlay2.click();
                  });
                } else if (response.status === 400) {
                  response.json().then((data) => {
                    console.log(data.message);
                  });
                  if (lang == "sin")
                    Command: toastr["info"]("යමක් වැරදී ඇත. නැවත උත්සාහ කරන්න");
                  else
                    Command: toastr["info"]("Something went wrong. Try again");
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
      });
    } else {
      if (lang == "sin") {
        Command: toastr["error"](
          "පරීක්ෂා කළ පේළි ආදාන ක්ෂේත්‍රය හිස් විය නොහැක!"
        );
      } else {
        Command: toastr["error"]("Checked rows input field cannot be empty!");
      }
    }
  });

  function checkAdd(add, onhand) {
    var addError = add.nextSibling.nextSibling;
    if (add.value == 0 || add.value == null) {
      addError.style.display = "";
      if (lang == "sin") addError.textContent = `නිෂ්පාදන ගණන හිස් විය නොහැක`;
      else addError.textContent = `Product count cannot be empty`;

      return false;
    } else if (!checkInt(add.value)) {
      addError.style.display = "";
      if (lang == "sin")
        addError.textContent = `නිෂ්පාදන ගණන 0 ට වඩා වැඩි විය යුතුය`;
      else addError.textContent = `Product count must be greater than 0`;

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
        totalError.textContent = `පරීක්ෂා කළ පේළි ආදාන ක්ෂේත්‍රය හිස් විය නොහැක!`;
      else totalError.textContent = `Checked rows input field cannot be empty!`;

      return false;
    } else if (!checkInt(totalValue)) {
      totalError.style.display = "";
      if (lang == "sin")
        totalError.textContent = `නිෂ්පාදන ගණන 0 ට වඩා වැඩි විය යුතුය`;
      else totalError.textContent = `Product count must be greater than 0`;

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
