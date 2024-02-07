document.cookie = "product=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";

(() => {
  const body = document.querySelector("body"),
    sin = body.querySelector(".sin"),
    en = body.querySelector(".en"),
    sTitle = body.querySelector(".salesmg-title"),
    sText = body.querySelector(".salesmg-text"),
    pTitle1 = body.querySelector(".progress-title-1"),
    pDataH = body.querySelector(".products-data-h3"),
    batchNo = body.querySelector(".batch-no"),
    status = body.querySelector(".batch-status"),
    batchProducts = body.querySelector(".batch-products"),
    start = body.querySelector(".start-date"),
    release = body.querySelector(".release"),
    releasedAmountText = body.querySelector(".released-amount-value"),
    remainingAmountText = body.querySelector(".remaining-amount-value"),
    remainingError = body.querySelector(".remaining-error"),
    end = body.querySelector(".end-date"),
    tbody2 = body.querySelector(".tbody2"),
    tbody3 = body.querySelector(".tbody3"),
    addError = body.querySelector(".add-error"),
    totalError = body.querySelector(".total-error"),
    overlay = document.querySelector(".overlay"),
    distribute = document.querySelector(".distribute"),
    closeBtn1 = document.querySelector(".close-btn1"),
    closeBtn2 = document.querySelector(".close-btn2"),
    circularProgress1 = document.querySelector(".circular-progress-1"),
    circularProgress2 = document.querySelector(".circular-progress-2"),
    progressValue1 = document.querySelector(".progress-value-1"),
    progressValue2 = document.querySelector(".progress-value-2"),
    releaseDate = document.querySelector(".release-date"),
    releaseDateValue = document.querySelector(".release-date-value"),
    type = document.querySelector(".type"),
    batch = document.querySelector(".batch"),
    distributorsTable = body.querySelector(".distributors-table"),
    searchBar = body.querySelector(".search"),
    save = body.querySelector(".save");

  var lang = getCookie("lang"); // current language

  var searchBa = document.querySelectorAll(
    '.search-box input[type="text"] + span'
  );

  searchBa.forEach((elm) => {
    elm.addEventListener("click", () => {
      elm.previousElementSibling.value = "";
      search(searchBar.value.toUpperCase(), distributorsTable);
    });
  });

  searchBar.addEventListener("keyup", () => {
    search(searchBar.value.toUpperCase(), distributorsTable);
  });

  overlay.addEventListener("click", (e) => {
    if (e.target.id === "overlay") {
      overlay.style.display = "none";
      document.querySelector(".split1-window").style.right = "28%";
      document.querySelector(".split1-window").style.display = "none";
      document.querySelector(".split2-window").style.display = "none";
    }
  });

  closeBtn1.addEventListener("click", () => {
    overlay.style.display = "none";
    document.querySelector(".split1-window").style.right = "28%";
    document.querySelector(".split1-window").style.display = "none";
    document.querySelector(".split2-window").style.display = "none";
  });

  distribute.addEventListener("click", () => {
    document.querySelector(".split1-window").style.right = "46%";
    document.querySelector(".split2-window").style.display = "block";
  });

  closeBtn2.addEventListener("click", () => {
    document.querySelector(".split1-window").style.right = "28%";
    document.querySelector(".split2-window").style.display = "none";
  });

  sin.addEventListener("click", () => {
    sin.classList.add("active");
    en.classList.remove("active");

    document.documentElement.setAttribute("lang", "sin");
    document.cookie = "lang=sin; path=/";

    sTitle.textContent = data["sin"]["sTitle"];
    sText.textContent = data["sin"]["sText"];
    pTitle1.textContent = data["sin"]["pTitle1"];
    pDataH.textContent = data["sin"]["pDataH"];
    setGreeting();
  });

  en.addEventListener("click", () => {
    en.classList.add("active");
    sin.classList.remove("active");

    document.documentElement.setAttribute("lang", "en");
    document.cookie = "lang=en; path=/";

    sTitle.textContent = data["en"]["sTitle"];
    sText.textContent = data["en"]["sText"];
    pTitle1.textContent = data["en"]["pTitle1"];
    pDataH.textContent = data["en"]["pDataH"];
    setGreeting();
  });

  var data = {
    sin: {
      sTitle: "කාණ්ඩ " + getCookie("id"),
      sText: "නිෂ්පාදන කණ්ඩායම් විස්තර බලන්න",
      pTitle1: "බෙදාහරින ලදී",
      pDataH: "නිෂ්පාදනයක් තෝරන්න",
    },
    en: {
      sTitle: "Batch " + getCookie("id"),
      sText: "View production batch details",
      pTitle1: "Distributed",
      pDataH: "Select a Product",
    },
  };

  var arrayOfArrays = [],
    totalAmount = 0,
    remainigAmount = 0,
    ActualAmount = 0,
    previousAmount = 0,
    addStatus = false,
    totalStatus = false;

  getDistibutionData();
  getProductionData();

  // load page data
  function getProductionData() {
    var row2 = "",
      total_percentage = 0;

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
            batchNo.textContent ="P/B/" + data.batch.id;

            if (data.batch.status == 1) {
              status.textContent = "Processing";

              release.style.display = "none";
              releaseDate.style.display = "none";

              data.products.forEach((product, index) => {
                row2 +=
                  `<tr id=${product.id} class="row">` +
                  `<td>${product.category}</td>` +
                  `<td>${product.type}</td>` +
                  `<td>0</td>` +
                  `<td>` +
                  `<div class="skill-box">` +
                  `<div class="skill-bar">` +
                  `<span class="skill-per" style="width: 0;">` +
                  `<span class="tooltip">0%</span>` +
                  `</span>` +
                  `</div>` +
                  `</div>` +
                  `</td>` +
                  `<td><button class="pending status">Processing</button></td>` +
                  `</tr>`;
              });
            } else if (data.batch.status == 3) {
              status.textContent = "Terminated";

              release.style.display = "none";
              releaseDate.style.display = "none";

              data.products.forEach((product, index) => {
                row2 +=
                  `<tr id=${product.id} class="row">` +
                  `<td>${product.category}</td>` +
                  `<td>${product.type}</td>` +
                  `<td>0</td>` +
                  `<td>` +
                  `<div class="skill-box">` +
                  `<div class="skill-bar">` +
                  `<span class="skill-per" style="width: 0;">` +
                  `<span class="tooltip">0%</span>` +
                  `</span>` +
                  `</div>` +
                  `</div>` +
                  `</td>` +
                  `<td><button class="reject status">Terminated</button></td>` +
                  `</tr>`;
              });
            } else {
              status.textContent = "Completed";
              var p_count_arr = data.batch.products_count.split(",");
              var d_count_arr = data.batch.distribution.split(",");

              data.products.forEach((product, index) => {
                var percentage = Math.floor(
                    (d_count_arr[index] * 100) / p_count_arr[index]
                  ),
                  stat = "completed",
                  st = "Completed";

                if (percentage < 100) {
                  stat = "pending";
                  st = "Pending";
                }

                total_percentage += percentage;

                row2 +=
                  `<tr id=${product.id} class="row">` +
                  `<td>${product.category}</td>` +
                  `<td>${product.type}</td>` +
                  `<td>${p_count_arr[index]}</td>` +
                  `<td>` +
                  `<div class="skill-box">` +
                  `<div class="skill-bar">` +
                  `<span class="skill-per" style="width: ${percentage}%;animation-delay: ${
                    0.2 * index
                  }s;">` +
                  `<span class="tooltip">${percentage}%</span>` +
                  `</span>` +
                  `</div>` +
                  `</div>` +
                  `</td>` +
                  `<td><button class="${stat} status">${st}</button></td>` +
                  `</tr>`;
              });
            }

            tbody2.innerHTML = row2;

            //for main distribution
            donut(
              circularProgress1,
              progressValue1,
              0,
              total_percentage,
              data.products.length * 100
            );

            batchProducts.textContent = data.products.length;
            start.textContent = new Date(
              data.batch.create_date
            ).toLocaleDateString();
            end.textContent = new Date(
              data.batch.end_date
            ).toLocaleDateString();
            releaseDateValue.textContent = end.textContent;

            const rows = document.querySelectorAll(".row");

            rows.forEach((r, index) => {
              r.addEventListener("click", () => {
                document.cookie = "product=" + r.id + "; path=/";
                type.textContent = r.children[1].textContent;
                batch.textContent = "B" + data.batch.id;

                totalAmount = p_count_arr[index];
                ActualAmount = p_count_arr[index] - d_count_arr[index];
                remainigAmount = ActualAmount;

                releasedAmountText.textContent = totalAmount;
                remainingAmountText.textContent = remainigAmount;

                addError.textContent = "";
                totalError.textContent = "";
                remainingError.textContent = "";

                let row3 = "";
                arrayOfArrays[index].forEach((dist) => {
                  row3 +=
                    `<tr class="disable" id=${dist.id}>` +
                    `<td class="distributor-name">` +
                    `<label>` +
                    `<input type="checkbox" class="radio" />` +
                    `${dist.first_name} ${dist.last_name}` +
                    `</label>` +
                    `</td>` +
                    `<td>` +
                    `${dist.remaining}` +
                    `</td>` +
                    `<td>` +
                    `<input type="number" class="add" disabled /><i class="fa-solid fa-circle-exclamation" style="display:none"></i>` +
                    `</td>` +
                    `<td>` +
                    `<input type="number" class="total" disabled /><i class="fa-solid fa-triangle-exclamation" style="display:none"></i>` +
                    `</td>` +
                    `</tr>` +
                    `<tr>`;
                });
                tbody3.innerHTML = row3;

                const radio = document.querySelectorAll(".radio"),
                  add = document.querySelectorAll(".add"),
                  total = document.querySelectorAll(".total");

                radio.forEach((r) => {
                  r.addEventListener("input", () => {
                    var total =
                        r.parentElement.parentElement.nextSibling.nextSibling
                          .nextSibling.firstChild,
                      add =
                        r.parentElement.parentElement.nextSibling.nextSibling
                          .firstChild;

                    if (r.checked) {
                      add.disabled = false;
                      total.disabled = false;

                      total.value =
                        +add.value +
                        +r.parentElement.parentElement.nextSibling.textContent;
                    } else {
                      add.disabled = true;
                      total.disabled = true;

                      add.value = null;
                      total.value = null;

                      add.nextSibling.style.display = "none";
                      total.nextSibling.style.display = "none";
                    }

                    calculateRemainingAmount();

                    //for distribution
                    donut(
                      circularProgress2,
                      progressValue2,
                      previousAmount,
                      totalAmount - remainigAmount,
                      totalAmount
                    );
                    previousAmount = totalAmount - remainigAmount;

                    r.parentElement.parentElement.parentElement.classList.toggle(
                      "disable"
                    );
                  });
                });

                total.forEach((elm) => {
                  elm.addEventListener("input", () => {
                    var amount =
                        elm.parentElement.parentElement.children[1].textContent,
                      add = elm.parentElement.previousSibling.firstChild;

                    add.value = +elm.value - +amount;
                    calculateRemainingAmount();

                    // handle remaing error
                    if (remainigAmount > ActualAmount)
                      if (lang == "sin")
                        remainingError.textContent = `ඉතිරි මුදල පවතින මුදල ඉක්මවිය නොහැක`;
                      else
                        remainingError.textContent = `Remaining amount cannot exceed the available amount`;
                    else remainingError.textContent = null;

                    if (
                      elm.value == 0 ||
                      elm.value == null ||
                      elm.value < +amount
                    ) {
                      totalError.style.display = "";
                      if (lang == "sin")
                        totalError.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> පොල් ප්‍රමාණය පවතින ප්‍රමාණයට වඩා අඩු විය නොහැක`;
                      else
                        totalError.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> Coconut amount cannot subceed the available amount`;

                      elm.nextSibling.style.display = "";
                      totalStatus = false;

                      //handle add error
                      handleAdd(add);
                    } else if (!checkInt(elm.value)) {
                      totalError.style.display = "";
                      if (lang == "sin")
                        totalError.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> පොල් ප්‍රමාණය ධන නිඛිල විය යුතුය`;
                      else
                        totalError.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> Coconut amount must be positive integer`;
                      elm.nextSibling.style.display = "";
                      totalStatus = false;

                      //handle remaining error
                      if (remainigAmount < 0)
                        if (lang == "sin")
                          remainingError.textContent = `ඉතිරි මුදල බිංදුවට වඩා අඩු විය නොහැක`;
                        else
                          remainingError.textContent = `Remaining amount cannot be less than zero`;
                      else remainingError.textContent = "";

                      //handle add error
                      handleAdd(add);
                    } else {
                      if (remainigAmount < 0) {
                        elm.nextSibling.style.display = "";
                        totalError.style.display = "";

                        if (lang == "sin") {
                          remainingError.textContent = `ඉතිරි මුදල බිංදුවට වඩා අඩු විය නොහැක`;
                          totalError.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> ඉතිරි මුදල බිංදුවට වඩා අඩු විය නොහැක`;
                        } else {
                          remainingError.textContent = `Remaining amount cannot be less than zero`;
                          totalError.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> Remaining amount cannot be less than zero`;
                        }
                        totalStatus = false;
                      } else {
                        remainingError.textContent = "";

                        totalError.innerHTML = null;
                        elm.nextSibling.style.display = "none";

                        totalStatus = true;

                        //handle add error
                        handleAdd(add);

                        if (totalStatus && addStatus) {
                          //for reaming
                          donut(
                            circularProgress2,
                            progressValue2,
                            previousAmount,
                            totalAmount - remainigAmount,
                            totalAmount
                          );
                          previousAmount = totalAmount - remainigAmount;
                        }
                      }
                    }
                  });
                });

                add.forEach((elm) => {
                  elm.addEventListener("input", () => {
                    var amount =
                        elm.parentElement.parentElement.children[1].textContent,
                      total = elm.parentElement.nextSibling.firstChild;

                    total.value = +elm.value + +amount;
                    calculateRemainingAmount();

                    // handle remaing error
                    if (remainigAmount > totalAmount)
                      if (lang == "sin")
                        remainingError.textContent = `ඉතිරි මුදල පවතින මුදල ඉක්මවිය නොහැක`;
                      else
                        remainingError.textContent = `Remaining amount cannot exceed the available amount`;
                    else remainingError.textContent = null;

                    if (elm.value == 0 || elm.value == null) {
                      addError.style.display = "";
                      if (lang == "sin")
                        addError.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> පොල් ප්‍රමාණය හිස් විය නොහැක`;
                      else
                        addError.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> Coconut amount cannot be empty`;
                      elm.nextSibling.style.display = "";
                      addStatus = false;
                    } else if (!checkInt(elm.value)) {
                      addError.style.display = "";
                      if (lang == "sin")
                        addError.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> පොල් ප්‍රමාණය ධන නිඛිල විය යුතුය`;
                      else
                        addError.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> Coconut amount must be positive integer`;
                      elm.nextSibling.style.display = "";
                      addStatus = false;

                      //handle remaining error
                      if (remainigAmount < 0)
                        if (lang == "sin")
                          remainingError.textContent = `ඉතිරි මුදල බිංදුවට වඩා අඩු විය නොහැක`;
                        else
                          remainingError.textContent = `Remaining amount cannot be less than zero`;
                      else remainingError.textContent = "";

                      //handle total error
                      handleTotal(total, amount);
                    } else {
                      if (remainigAmount < 0) {
                        elm.nextSibling.style.display = "";
                        addError.style.display = "";

                        if (lang == "sin") {
                          remainingError.textContent = `ඉතිරි මුදල බිංදුවට වඩා අඩු විය නොහැක`;
                          addError.innerHTML = `<i class="fa-solid fa-circle-exclamation""></i> ඉතිරි මුදල බිංදුවට වඩා අඩු විය නොහැක`;
                        } else {
                          remainingError.textContent = `Remaining amount cannot be less than zero`;
                          addError.innerHTML = `<i class="fa-solid fa-circle-exclamation""></i> Remaining amount cannot be less than zero`;
                        }
                        addStatus = false;
                      } else {
                        remainingError.textContent = "";

                        addError.innerHTML = null;
                        elm.nextSibling.style.display = "none";

                        addStatus = true;

                        //handle total error
                        handleTotal(total, amount);

                        if (totalStatus && addStatus) {
                          //for reaming
                          donut(
                            circularProgress2,
                            progressValue2,
                            previousAmount,
                            totalAmount - remainigAmount,
                            totalAmount
                          );
                          previousAmount = totalAmount - remainigAmount;
                        }
                      }
                    }
                  });
                });

                overlay.style.display = "block";
                document.querySelector(".split1-window").style.display =
                  "block";

                //for reaming
                donut(
                  circularProgress2,
                  progressValue2,
                  previousAmount,
                  totalAmount - remainigAmount,
                  totalAmount
                );
                previousAmount = totalAmount - remainigAmount;
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
  }

  function calculateRemainingAmount() {
    const addFileld = document.querySelectorAll(".add");

    var value = 0;
    addFileld.forEach((elm) => {
      if (!elm.parentElement.parentElement.classList.contains("disable")) {
        value += +elm.value;
      }
    });

    remainigAmount = ActualAmount - value;
    remainingAmountText.textContent = remainigAmount;
  }

  function handleAdd(add) {
    if (add.value == 0 || add.value == null) {
      addError.style.display = "";
      if (lang == "sin")
        addError.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> පොල් ප්‍රමාණය හිස් විය නොහැක`;
      else
        addError.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> Coconut amount cannot be empty`;
      add.nextSibling.style.display = "";
      addStatus = false;
    } else if (!checkInt(add.value)) {
      addError.style.display = "";
      if (lang == "sin")
        addError.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> පොල් ප්‍රමාණය ධන නිඛිල විය යුතුය`;
      else
        addError.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> Coconut amount must be positive integer`;
      add.nextSibling.style.display = "";
      addStatus = false;
    } else {
      addError.style.display = "none";
      add.nextSibling.style.display = "none";
      addStatus = true;
    }
  }

  function handleTotal(total, amount) {
    if (total.value == 0 || total.value == null || total.value < +amount) {
      totalError.style.display = "";
      if (lang == "sin")
        totalError.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> පොල් ප්‍රමාණය පවතින ප්‍රමාණයට වඩා අඩු විය නොහැක`;
      else
        totalError.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> Coconut amount cannot subceed the available amount`;
      total.nextSibling.style.display = "";
      totalStatus = false;
    } else if (!checkInt(total.value)) {
      totalError.style.display = "";
      if (lang == "sin")
        totalError.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> පොල් ප්‍රමාණය ධන නිඛිල විය යුතුය`;
      else
        totalError.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> Coconut amount must be positive integer`;
      total.nextSibling.style.display = "";
      totalStatus = false;
    } else {
      totalError.style.display = "none";
      total.nextSibling.style.display = "none";
      totalStatus = true;
    }
  }

  function donut(circularProgress, progressValue, previous, remainig, total) {
    if (previousAmount == remainig && remainig != 0) return;

    let start = Math.floor((previous * 100) / total),
      end = Math.floor((remainig * 100) / total);

    if (start < end) clockwise(start, end, circularProgress, progressValue);
    else antiClockwise(start, end, circularProgress, progressValue);
  }

  function clockwise(start, end, circularProgress, progressValue) {
    // start < end
    let startValue = start,
      endValue = end,
      speed = 25;

    if (end == 0) {
      progressValue.textContent = `${0}%`;
      circularProgress.style.background = `conic-gradient(#bb9056 ${
        0 * 3.6
      }deg, #ededed 0deg)`;
      return;
    }

    let progress = setInterval(() => {
      progressValue.textContent = `${startValue}%`;
      circularProgress.style.background = `conic-gradient(#bb9056 ${
        startValue * 3.6
      }deg, #ededed 0deg)`;
      if (startValue == endValue) clearInterval(progress);
      startValue++;
    }, speed);
  }

  function antiClockwise(start, end, circularProgress, progressValue) {
    // start > end
    let startValue = start,
      endValue = end,
      speed = 25;

    if (end == 0) {
      progressValue.textContent = `${0}%`;
      circularProgress.style.background = `conic-gradient(#bb9056 ${
        0 * 3.6
      }deg, #ededed 0deg)`;
      return;
    }

    let progress = setInterval(() => {
      progressValue.textContent = `${startValue}%`;
      circularProgress.style.background = `conic-gradient(#bb9056 ${
        startValue * 3.6
      }deg, #ededed 0deg)`;
      if (startValue == endValue) clearInterval(progress);
      startValue--;
    }, speed);
  }

  function checkAdd(add) {
    if (add.value == 0 || add.value == null) {
      addError.style.display = "";
      if (lang == "sin")
        addError.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> පොල් ප්‍රමාණය හිස් විය නොහැක`;
      else
        addError.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> Coconut amount cannot be empty`;
      add.nextSibling.style.display = "";

      return false;
    } else if (!checkInt(add.value)) {
      addError.style.display = "";
      if (lang == "sin")
        addError.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> පොල් ප්‍රමාණය ධන නිඛිල විය යුතුය`;
      else
        addError.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> Coconut amount must be positive integer`;
      add.nextSibling.style.display = "";
      return false;
    } else {
      addError.innerHTML = null;
      add.nextSibling.style.display = "none";

      var amount = add.parentElement.parentElement.children[1].textContent,
        total = add.parentElement.nextSibling.firstChild;

      if (+amount + +add.value == +total.value) return true;
      else return false;
    }
  }

  function checkTotal(total) {
    if (total.value == 0 || total.value == null || total.value < +amount) {
      totalError.style.display = "";
      if (lang == "sin")
        totalError.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> පොල් ප්‍රමාණය පවතින ප්‍රමාණයට වඩා අඩු විය නොහැක`;
      else
        totalError.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> Coconut amount cannot subceed the available amount`;

      total.nextSibling.style.display = "";

      return false;
    } else if (!checkInt(total.value)) {
      totalError.style.display = "";
      if (lang == "sin")
        totalError.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> පොල් ප්‍රමාණය ධන නිඛිල විය යුතුය`;
      else
        totalError.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> Coconut amount must be positive integer`;
      total.nextSibling.style.display = "";

      return false;
    } else {
      totalError.innerHTML = null;
      total.nextSibling.style.display = "none";

      var amount = total.parentElement.parentElement.children[1].textContent,
        add = total.parentElement.previousSibling.firstChild;

      if (+amount + +add.value == +total.value) return true;
      else return false;
    }
  }

  save.addEventListener("click", () => {
    const radio = document.querySelectorAll(".radio"),
      add = document.querySelectorAll(".add"),
      total = document.querySelectorAll(".total");

    var amounts = [],
      distributors = [],
      addTotal = 0,
      remainigStatus = false,
      countStatus = false,
      count = 0;

    radio.forEach((r, index) => {
      var add_status = false,
        total_status = false;

      if (r.checked) {
        add_status = checkAdd(add[index]);
        total_status = checkTotal(total[index]);

        if (add_status && total_status) {
          distributors.push(r.parentElement.parentElement.parentElement.id);
          amounts.push(add[index].value);
        }

        addTotal += +add[index].value;
        count++;
      }
    });

    // handle remaing
    if (remainigAmount > ActualAmount) {
      if (lang == "sin")
        remainingError.textContent = `ඉතිරි මුදල පවතින මුදල ඉක්මවිය නොහැක`;
      else
        remainingError.textContent = `Remaining amount cannot exceed the available amount`;
      remainigStatus = false;
    } else if (remainigAmount < 0) {
      if (lang == "sin")
        remainingError.textContent = `ඉතිරි මුදල බිංදුවට වඩා අඩු විය නොහැක`;
      else
        remainingError.textContent = `Remaining amount cannot be less than zero`;
      remainigStatus = false;
    } else if (ActualAmount - remainigAmount != addTotal) {
      if (lang == "sin") remainingError.textContent = `මොකක්හරි වැරැද්දක් වෙලා`;
      else remainingError.textContent = `Something went wrong`;
      remainigStatus = false;
    } else {
      remainingError.textContent = "";
      remainigStatus = true;
    }

    if (count == distributors.length) countStatus = true;
    else countStatus = false;

    if (countStatus && remainigStatus) {
      var formData = {
        distributors: distributors,
        amounts: amounts,
        product: getCookie("product"),
        id: getCookie("id"),
      };

      if (lang == "sin") {
        var title = "ඔයාට විශ්වාස ද?",
          text = "ඔබට මෙය ප්‍රතිවර්තනය කිරීමට නොහැකි වනු ඇත!",
          confirmButtonText = "ඔව්, බෙදාහරින්නන්ට වෙන් කරන්න!",
          cancelButtonText = "අවලංගු කරන්න";
      } else {
        var title = "Are you sure?",
          text = "You won't be able to revert this!",
          confirmButtonText = "Yes, Allocate to distributors!",
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
          fetch(backProxy + "/distribution", {
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
                if (lang == "sin") var title = "සාර්ථකව අංගනයට එක් කරන ලදී";
                else var title = "Successfully added to yard";
                Swal.fire({
                  title: title,
                  // text: "You clicked the button!",
                  icon: "success",
                  confirmButtonColor: confirmButtonColor,
                }).then((response) => {
                  document.querySelector(".split1-window").style.right = "28%";
                  document.querySelector(".split2-window").style.display =
                    "none";

                  getDistibutionData();
                  getProductionData();
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

  // get distibution data
  function getDistibutionData() {
    fetch(backProxy + "/distribution?id=" + getCookie("id"), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((response) => {
        if (response.status == 200) {
          response.json().then((data) => {
            data.distributions.forEach((distribution) => {
              arrayOfArrays.push(distribution);
            });
          });
        } else if (response.status === 202) {
          response.json().then((data) => {
            console.log(data.message);
          });
          if (lang == "sin") Command: toastr["info"]("බෙදාහැරීම් නැත");
          else Command: toastr["info"]("No distributions");
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
})();

function checkInt(num) {
  if (Number.isInteger(+num) && +num > 0) return true;
  return false;
}
