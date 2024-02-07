document.cookie = "id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";

(() => {
  const body = document.querySelector("body"),
    sin = body.querySelector(".sin"),
    en = body.querySelector(".en"),
    pTitle = body.querySelector(".productionmg-title"),
    pText = body.querySelector(".productionmg-text"),
    pLabel = body.querySelector(".product-label"),
    pList = body.querySelector(".product-list"),
    pRError = body.querySelector(".production-request-error"),
    dropdown = body.querySelector(".dropdown"),
    dropdownError = body.querySelector(".dropdown-error"),
    btn = body.querySelector(".form-button");

  var requests = [],
    requestStatus = false,
    productStatus = false;

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
          requests = data.accepted;
          data.accepted.forEach((item) => {
            row1 +=
              `<div class="row disable"><div class="add-label request-label"><label class="ename-label"><input class="radio" type="checkbox" />Request P/R/` +
              item.id +
              `</label></div>` +
              `<div class="add-input">` +
              `<input` +
              ` type="number"` +
              `class="coco-amount" ` +
              `value="` +
              item.actual +
              `" ` +
              `disabled ` +
              `placeholder="Enter Coconut Amount"` +
              `/><br /><span class="form-error coco-error"></span>` +
              `</div></div>`;
          });

          pList.innerHTML = row1;

          const row = document.querySelectorAll(".row"),
            radio = document.querySelectorAll(".radio"),
            cocoAmount = document.querySelectorAll(".coco-amount");

          radio.forEach((r) => {
            r.addEventListener("input", () => {
              if (r.checked) {
                // log(r.parentElement.parentElement.nextSibling.firstChild);
                r.parentElement.parentElement.nextSibling.firstChild.disabled = false;
                r.parentElement.parentElement.nextSibling.childNodes[2].style.display =
                  "";
              } else {
                r.parentElement.parentElement.nextSibling.firstChild.disabled = true;
                r.parentElement.parentElement.nextSibling.childNodes[2].style.display =
                  "none";
              }
              r.parentElement.parentElement.parentElement.classList.toggle(
                "disable"
              );
            });
          });

          cocoAmount.forEach((coco) => {
            coco.addEventListener("input", () => {
              var rId =
                coco.parentElement.previousSibling.childNodes[0].textContent.slice(
                  9
                );
              requests.forEach((request) => {
                if (request.id == rId) {
                  if (coco.value > request.actual) {
                    if (lang == "sin") {
                      Command: toastr["warning"](
                        "පොල් ප්‍රමාණය පවතින ප්‍රමාණය ඉක්මවිය නොහැක"
                      );
                      coco.nextSibling.nextSibling.textContent =
                        "පොල් ප්‍රමාණය පවතින ප්‍රමාණය ඉක්මවිය නොහැක";
                    } else {
                      Command: toastr["warning"](
                        "The amount of coconut cannot exceed the available amount"
                      );
                      coco.nextSibling.nextSibling.textContent =
                        "The amount of coconut cannot exceed the available amount";
                    }
                    requestStatus = false;
                  } else if (coco.value == 0 || coco.value == null) {
                    if (lang == "sin") {
                      coco.nextSibling.nextSibling.textContent =
                        "පොල් ප්‍රමාණය හිස් විය නොහැක";
                      Command: toastr["warning"](
                        "පොල් ප්‍රමාණය හිස් විය නොහැක"
                      );
                    } else {
                      coco.nextSibling.nextSibling.textContent =
                        "Coconut amount cannot be empty";
                      Command: toastr["warning"](
                        "Coconut amount cannot be empty"
                      );
                    }
                    requestStatus = false;
                  } else {
                    coco.nextSibling.nextSibling.textContent = "";
                    requestStatus = true;
                  }
                }
              });
            });
          });

          data.products.forEach((item) => {
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

  btn.addEventListener("click", () => {
    var arr2 = [],
      requestIds = [],
      requestAmounts = [],
      actual = [],
      days = [];

    arrList.forEach((el) => {
      arr2.push(el.value);
    });

    if (arr2.length < 1) {
      if (lang == "sin") {
        dropdownError.textContent = "නිෂ්පාදන හිස් විය නොහැක";
        Command: toastr["warning"]("නිෂ්පාදන හිස් විය නොහැක");
      } else {
        dropdownError.textContent = "Products cannot be empty";
        Command: toastr["warning"]("Products cannot be empty");
      }
      productStatus = false;
    } else {
      dropdownError.textContent = "";
      productStatus = true;
    }

    const row = document.querySelectorAll(".row");
    var count = 0;
    row.forEach((element) => {
      if (element.classList.contains("disable")) count++;
      else {
        var rId = element.childNodes[0].childNodes[0].textContent.slice(9);
        var coco = element.childNodes[1].childNodes[0];

        requests.forEach((request) => {
          if (request.id == rId) {
            if (coco.value > request.actual) {
              if (lang == "sin") {
                Command: toastr["warning"](
                  "පොල් ප්‍රමාණය පවතින ප්‍රමාණය ඉක්මවිය නොහැක"
                );
                coco.nextSibling.nextSibling.textContent =
                  "පොල් ප්‍රමාණය පවතින ප්‍රමාණය ඉක්මවිය නොහැක";
              } else {
                Command: toastr["warning"](
                  "The amount of coconut cannot exceed the available amount"
                );
                coco.nextSibling.nextSibling.textContent =
                  "The amount of coconut cannot exceed the available amount";
              }
              requestStatus = false;
            } else if (coco.value == 0 || coco.value == null) {
              if (lang == "sin") {
                coco.nextSibling.nextSibling.textContent =
                  "පොල් ප්‍රමාණය හිස් විය නොහැක";
                Command: toastr["warning"]("පොල් ප්‍රමාණය හිස් විය නොහැක");
              } else {
                coco.nextSibling.nextSibling.textContent =
                  "Coconut amount cannot be empty";
                Command: toastr["warning"]("Coconut amount cannot be empty");
              }
              requestStatus = false;
            } else {
              coco.nextSibling.nextSibling.textContent = "";
              requestStatus = true;
              requestIds.push(rId);
              requestAmounts.push(coco.value);
              actual.push(request.actual);
              days.push(request.days);
            }
          }
        });
      }
    });

    if (count == requests.length) {
      if (lang == "sin") {
        pRError.textContent = "නිෂ්පාදන ඉල්ලීමක් තෝරාගත යුතුය";
        Command: toastr["warning"]("නිෂ්පාදන ඉල්ලීමක් තෝරාගත යුතුය");
      } else {
        pRError.textContent = "Must be select a production request";
        Command: toastr["warning"]("Must be select a production request");
      }
      requestStatus = false;
    } else {
      pRError.textContent = "";
      requestStatus = true;
    }

    if (productStatus && requestStatus) {
      var formData = {
        requests: requestIds,
        amounts: requestAmounts,
        actual: actual,
        products: arr2,
        days: days,
      };

      if (lang == "sin") {
        var title = "ඔයාට විශ්වාස ද?",
          text = "ඔබට මෙය ප්‍රතිවර්තනය කිරීමට නොහැකි වනු ඇත!",
          confirmButtonText = "ඔව්, එය නිර්මාණය කරන්න!",
          cancelButtonText = "අවලංගු කරන්න";
      } else {
        var title = "Are you sure?",
          text = "You won't be able to revert this!",
          confirmButtonText = "Yes, create it!",
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
          fetch(backProxy + "/production-batch", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
            credentials: "include",
          })
            .then((response) => {
              console.log(response.status);
              if (response.status == 200) {
                response.json().then((data) => {
                  console.log(data.message);
                });
                if (lang == "sin") {
                  var title = "සාර්ථකයි!",
                    text = "නිෂ්පාදන කණ්ඩායම සාර්ථකව නිර්මාණය කරන ලදී.";
                } else {
                  var title = "Successful!",
                    text = "Production batch created successfully.";
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
              } else if (response.status === 400) {
                response.json().then((data) => {
                  console.log(data.message);
                });
                if (lang == "sin")
                  Command: toastr["error"]("නිෂ්පාදන කණ්ඩායම නිර්මාණය කර නැත");
                else
                  Command: toastr["error"]("Production batch is not created");
              } else if (response.status === 401) {
                response.json().then((data) => {
                  console.log(data.message);
                  if (lang == "sin")
                    Command: toastr["error"]("වලංගු නොවන පරිශීලක");
                  else Command: toastr["error"]("Invalid User");
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
    }
  });
})();
