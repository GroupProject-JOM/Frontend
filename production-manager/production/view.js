(() => {
  const body = document.querySelector("body"),
    sin = body.querySelector(".sin"),
    en = body.querySelector(".en"),
    pTitle = body.querySelector(".productionmg-title"),
    pDataH = body.querySelector(".products-data-h3"),
    batchNo = body.querySelector(".batch-no"),
    status = body.querySelector(".batch-status"),
    start = body.querySelector(".start-date"),
    amount = body.querySelector(".amount"),
    tbody = body.querySelector(".tbody"),
    finalProducts = body.querySelector(".final-products"),
    btn = body.querySelector(".complete-btn"),
    complete = body.querySelector(".complete");

  var lang = getCookie("lang"); // current language

  sin.addEventListener("click", () => {
    sin.classList.add("active");
    en.classList.remove("active");

    document.documentElement.setAttribute("lang", "sin");
    document.cookie = "lang=sin; path=/";

    pTitle.textContent = data["sin"]["pTitle"];
    pDataH.textContent = data["sin"]["pDataH"];
    btn.textContent = data["sin"]["btn"];
    complete.textContent = data["sin"]["complete"];
    setGreeting();
  });

  en.addEventListener("click", () => {
    en.classList.add("active");
    sin.classList.remove("active");

    document.documentElement.setAttribute("lang", "en");
    document.cookie = "lang=en; path=/";

    pTitle.textContent = data["en"]["pTitle"];
    pDataH.textContent = data["en"]["pDataH"];
    btn.textContent = data["en"]["btn"];
    complete.textContent = data["en"]["complete"];
    setGreeting();
  });

  var data = {
    sin: {
      pTitle: "නිෂ්පාදන විස්තර",
      pDataH: "නිෂ්පාදන නිකුත් කිරීම",
      btn: "සම්පූර්ණ නිෂ්පාදනය",
      complete: "සම්පූර්ණ",
    },
    en: {
      pTitle: "Production Details",
      pDataH: "Releasing Products",
      btn: "Complete Production",
      complete: "Complete",
    },
  };

  var row1 = "",
    row2 = "",
    amountStatus = false;

  fetch(backProxy + "/batch?id=" + getCookie("id"), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  })
    .then((response) => {
      if (response.status == 200) {
        response.json().then((data) => {
          batchNo.textContent = data.batch.id;

          if (data.batch.status == 1) status.textContent = "Processing";
          else if (data.batch.status == 2) status.textContent = "Completed";
          else if (data.batch.status == 3) status.textContent = "Terminated";

          start.textContent = new Date(
            data.batch.create_date
          ).toLocaleDateString();
          amount.textContent = data.batch.amount.toLocaleString("en-US");

          var requests = data.batch.requests.split(",");
          var days = data.batch.days.split(",");
          var amounts = data.batch.amount_by.split(",");

          requests.forEach((item, index) => {
            row1 +=
              `<tr><td>` +
              item +
              `</td>` +
              `<td>` +
              days[index] +
              ` days</td>` +
              `<td>` +
              amounts[index] +
              `</td></tr>`;
          });

          tbody.innerHTML = row1;

          data.products.forEach((product) => {
            row2 +=
              `<label>` +
              product.type +
              ` - ` +
              product.category +
              `</label>` +
              `<input type="number" class="product-amount" style="display:none" disabled/>` +
              `<br /><span class="form-error amount-error"></span>` +
              `<br /><br />`;
          });

          finalProducts.innerHTML = row2;

          const pAmount = document.querySelectorAll(".product-amount"),
            amountError = document.querySelectorAll(".amount-error");

          pAmount.forEach((pA) => {
            pA.addEventListener("input", () => {
              if (
                typeof pA.value === "string" &&
                pA.value.trim().length === 0
              ) {
                if (lang == "sin")
                  pA.nextSibling.nextSibling.textContent =
                    "මුදල හිස් විය නොහැක!";
                else
                  pA.nextSibling.nextSibling.textContent =
                    "Amount cannot be empty";
                amountStatus = false;
              } else if (pA.value < 1) {
                if (lang == "sin")
                  pA.nextSibling.nextSibling.textContent =
                    "මුදල ධන නිඛිල විය යුතුය!";
                else
                  pA.nextSibling.nextSibling.textContent =
                    "Amount must be positive integer";
                amountStatus = false;
              } else {
                pA.nextSibling.nextSibling.textContent = "";
              }
            });
          });
        });
      } else if (response.status === 202) {
        response.json().then((data) => {
          console.log(data.message);
        });
        if (lang == "sin") Command: toastr["info"]("නිෂ්පාදන කණ්ඩායම නොමැත");
        else Command: toastr["info"]("No production batch");
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
    const pAmount = document.querySelectorAll(".product-amount");
    pAmount.forEach((pA) => {
      pA.disabled = false;
      pA.style.display = "";
    });
    btn.style.display = "none";
    btn.disabled = true;
    complete.style.display = "";
    complete.disabled = false;
  });

  complete.addEventListener("click", () => {
    var products_count = [];

    const pAmount = document.querySelectorAll(".product-amount");
    pAmount.forEach((pA) => {
      if (typeof pA.value === "string" && pA.value.trim().length === 0) {
        if (lang == "sin")
          pA.nextSibling.nextSibling.textContent = "මුදල හිස් විය නොහැක!";
        else pA.nextSibling.nextSibling.textContent = "Amount cannot be empty";
        amountStatus = false;
        pA.focus();
      } else if (pA.value < 1) {
        if (lang == "sin")
          pA.nextSibling.nextSibling.textContent = "මුදල ධන නිඛිල විය යුතුය!";
        else
          pA.nextSibling.nextSibling.textContent =
            "Amount must be positive integer";
        amountStatus = false;
        pA.focus();
      } else {
        pA.nextSibling.nextSibling.textContent = "";
        products_count.push(pA.value);
      }
    });

    if (products_count.length == pAmount.length) amountStatus = true;

    if (amountStatus) {
      var formData = {
        id:getCookie("id"),
        count: products_count,
      };

      if (lang == "sin") {
        var title = "ඔයාට විශ්වාස ද?",
          text = "ඔබට මෙය ප්‍රතිවර්තනය කිරීමට නොහැකි වනු ඇත!",
          confirmButtonText = "ඔව්, එය සම්පූර්ණ කරන්න!",
          cancelButtonText = "අවලංගු කරන්න";
      } else {
        var title = "Are you sure?",
          text = "You won't be able to revert this!",
          confirmButtonText = "Yes, complete it!",
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
          fetch(backProxy + "/batch", {
            method: "PUT",
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
                    text = "නිෂ්පාදන කණ්ඩායම සාර්ථකව නිම කරන ලදී.";
                } else {
                  var title = "Successful!",
                    text = "Production batch completed successfully.";
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
                  Command: toastr["error"]("නිෂ්පාදන කණ්ඩායම නිම කර නැත");
                else
                  Command: toastr["error"]("Production batch is not completed");
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
