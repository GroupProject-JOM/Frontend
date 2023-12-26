document.cookie = "id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";

(() => {
  const body = document.querySelector("body"),
    sin = body.querySelector(".sin"),
    en = body.querySelector(".en"),
    sTitle = body.querySelector(".stockmg-title"),
    sText1 = body.querySelector(".stockmg-text1"),
    tbody = body.querySelector(".tbody"),
    yText = body.querySelector(".yard-text"),
    yValue = body.querySelector(".yard-value"),
    btn = body.querySelector(".yard-button"),
    mapBtn = body.querySelector(".map-button"),
    closeBtn1 = body.querySelector(".close-btn1"),
    closeBtn2 = body.querySelector(".close-btn2"),
    closeBtn3 = body.querySelector(".close-btn3"),
    yard = body.querySelector(".yard-button"),
    overlay1 = body.querySelector(".overlay1"),
    overlay2 = body.querySelector(".overlay2"),
    searchBar = body.querySelector(".search"),
    addressTable = body.querySelector(".addresses-table"),
    datePicker = body.querySelector("#datePicker"),
    toYardText = body.querySelectorAll(".to-yard-text"),
    circularProgress = body.querySelector(".circular-progress"),
    progressValue = body.querySelector(".progress-value"),
    yardH = body.querySelector(".yard-h3"),
    tbody2 = body.querySelector(".tbody2"),
    addError = body.querySelector(".add-error"),
    totalError = body.querySelector(".total-error"),
    cName = body.querySelector(".collector-name"),
    cCount = body.querySelector(".collection-count"),
    totalCount = body.querySelector(".total-count"),
    remainingCount = body.querySelector(".remaining-count"),
    remainingError = body.querySelector(".remaining-error"),
    daysError = body.querySelector(".days-error"),
    save = body.querySelector(".save");

  cName.textContent = getCookie("cName");
  cCount.textContent = getCookie("collections");
  totalCount.textContent = getCookie("total");
  remainingCount.textContent = getCookie("total");

  var totalAmount = +getCookie("total"),
    remainigAmount = +getCookie("total"),
    previous = remainigAmount;

  datePicker.value = new Date().toJSON().slice(0, 10);

  datePicker.addEventListener("input", () => {
    fetchData(datePicker.value);
  });

  yard.addEventListener("click", () => {
    overlay2.style.display = "flex";
    document.querySelector(".split1-window").style.display = "block";

    let startValue = 0,
      endValue = Math.floor((remainigAmount * 100) / totalAmount),
      speed = 50;

    if (totalAmount == 0 || endValue == 0) {
      progressValue.textContent = `${0}%`;
      circularProgress.style.background = `conic-gradient(#bb9056 ${
        0 * 3.6
      }deg, #ededed 0deg)`;
      return
    }

    let progress = setInterval(() => {
      progressValue.textContent = `${startValue}%`;
      circularProgress.style.background = `conic-gradient(#bb9056 ${
        startValue * 3.6
      }deg, #ededed 0deg)`;
      if (startValue == endValue) clearInterval(progress);
      startValue++;
    }, speed);
  });

  overlay2.addEventListener("click", (e) => {
    if (e.target.id === "overlay2") {
      overlay2.style.display = "none";
      document.querySelector(".split1-window").style.right = "35%";
      document.querySelector(".split1-window").style.display = "none";
      document.querySelector(".split2-window").style.display = "none";

      remainigAmount = +totalAmount;
      previous = remainigAmount;
      remainingCount.textContent = remainigAmount;
    }
  });

  closeBtn2.addEventListener("click", () => {
    overlay2.style.display = "none";
    document.querySelector(".split1-window").style.right = "35%";
    document.querySelector(".split1-window").style.display = "none";
    document.querySelector(".split2-window").style.display = "none";

    remainigAmount = +totalAmount;
    previous = remainigAmount;
    remainingCount.textContent = remainigAmount;
  });

  closeBtn3.addEventListener("click", () => {
    document.querySelector(".split1-window").style.right = "35%";
    document.querySelector(".split2-window").style.display = "none";

    remainigAmount = +totalAmount;
    donut();
    previous = remainigAmount;
    remainingCount.textContent = remainigAmount;
  });

  var lang = getCookie("lang"); // current language
  sTitle.textContent = getCookie("cName");
  yValue.textContent = getCookie("total");

  var searchBa = document.querySelectorAll(
    '.search-box input[type="text"] + span'
  );

  searchBa.forEach((elm) => {
    elm.addEventListener("click", () => {
      elm.previousElementSibling.value = "";
      search(searchBar.value.toUpperCase(), addressTable);
    });
  });

  searchBar.addEventListener("keyup", () => {
    search(searchBar.value.toUpperCase(), addressTable);
  });

  const searchBox = document.getElementById("searchBox"),
    googleIcon = document.getElementById("filter-icon");

  googleIcon.onclick = function () {
    searchBox.classList.toggle("active");
  };

  mapBtn.addEventListener("click", () => {
    overlay1.style.display = "flex";
    document.querySelector(".collections-map").style.display = "block";
  });

  overlay1.addEventListener("click", (e) => {
    if (e.target.id === "overlay1") {
      overlay1.style.display = "none";
      document.querySelector(".collections-map").style.display = "none";
    }
  });

  closeBtn1.addEventListener("click", () => {
    overlay1.style.display = "none";
    document.querySelector(".collections-map").style.display = "none";
  });

  sin.addEventListener("click", () => {
    sin.classList.add("active");
    en.classList.remove("active");

    document.documentElement.setAttribute("lang", "sin");
    document.cookie = "lang=sin; path=/";
    lang = "sin";

    sText1.textContent = data["sin"]["sText1"];
    yText.textContent = data["sin"]["yText"];
    btn.textContent = data["sin"]["btn"];
    mapBtn.textContent = data["sin"]["mapBtn"];
    setGreeting();
  });

  en.addEventListener("click", () => {
    en.classList.add("active");
    sin.classList.remove("active");

    document.documentElement.setAttribute("lang", "en");
    document.cookie = "lang=en; path=/";
    lang = "en";

    sText1.innerHTML = data["en"]["sText1"];
    yText.innerHTML = data["en"]["yText"];
    btn.innerHTML = data["en"]["btn"];
    mapBtn.innerHTML = data["en"]["mapBtn"];
    setGreeting();
  });

  var data = {
    sin: {
      sText1: "එක් එක් දිනයේ පොල් එකතු කිරීමේ විස්තර බලන්න",
      yText: "දැනට එකතුකරන්නා විසින් එකතු කරන ලද පොල් ප්‍රමාණය:",
      btn: "යාරවලට පවරන්න",
      mapBtn: "සිතියමෙන් බලන්න",
    },
    en: {
      sText1: "View coconut collection details for each day",
      yText: "Currently collected coconut amount by the collector:",
      btn: "Assign To Yards",
      mapBtn: "View on map",
    },
  };

  fetchData(new Date().toJSON().slice(0, 10));
  function fetchData(date) {
    let row = "";
    tbody.innerHTML = "";

    fetch(
      backProxy +
        "/pickup-collections?id=" +
        getCookie("cId") +
        "&date=" +
        date,
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
            makeChart(data.calender);
            let arr = data.collections;
            arr.forEach(data_to_table);

            function data_to_table(item) {
              var status = "",
                amount = "";

              if (item.status < 4) status = "pending";
              else {
                status = "completed";
                amount = item.amount.toLocaleString("en-US");
              }

              row +=
                `<tr data-href="../supply-requests/view-request.html" id=` +
                item.id +
                `>` +
                `<td>` +
                item.id +
                `</td>` +
                `<td>` +
                item.name +
                ` ` +
                item.last_name +
                `</td>` +
                `<td>` +
                item.phone +
                `</td>` +
                `<td>` +
                item.area +
                `</td>` +
                `<td>` +
                amount +
                `</td>` +
                `<td><button class="` +
                status +
                ` status">` +
                capitalize(status) +
                `</button></td>` +
                `</tr>`;
            }

            tbody.innerHTML = row;

            const rows = document.querySelectorAll("tr[data-href]");
            rows.forEach((r) => {
              r.addEventListener("click", () => {
                document.cookie = "id=" + r.id + "; path=/";
                window.location.href = r.dataset.href;
              });
            });
          });
        } else if (response.status === 202) {
          response.json().then((data) => {
            makeChart(data.calender);
            console.log(data.collections);
          });
          if (lang == "sin") Command: toastr["info"]("එකතු කිරීම් නැත");
          else Command: toastr["info"]("No collections");
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

  // Get yards
  let yard1 = [],
    yard2 = [],
    yard3 = [],
    addStatus = false,
    totalStatus = false,
    dayStatus = false;

  getYards();
  function getYards() {
    fetch(backProxy + "/yards", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((response) => {
        if (response.status == 200) {
          response.json().then((data) => {
            yard1 = data.yard1;
            yard2 = data.yard2;
            yard3 = data.yard3;
          });
        } else if (response.status === 202) {
          response.json().then((data) => {
            console.log(data.message);
          });
          if (lang == "sin") Command: toastr["info"]("මොකක්හරි වැරැද්දක් වෙලා");
          else Command: toastr["info"]("Something went wrong");
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

  //view yard
  toYardText.forEach((elm, index) => {
    elm.addEventListener("click", () => {
      document.querySelector(".split1-window").style.right = "46%";

      remainigAmount = +totalAmount;
      donut();
      previous = remainigAmount;
      remainingCount.textContent = remainigAmount;

      if (index === 0) {
        viewYard(yard1);
        yardH.textContent = "Yard " + 1;
      } else if (index === 1) {
        viewYard(yard2);
        yardH.textContent = "Yard " + 2;
      } else if (index === 2) {
        viewYard(yard3);
        yardH.textContent = "Yard " + 3;
      }

      addError.textContent = "";
      totalError.textContent = "";
      daysError.textContent = "";
      remainingError.textContent = "";

      const radio = document.querySelectorAll(".radio"),
        add = document.querySelectorAll(".add"),
        total = document.querySelectorAll(".total"),
        days = document.querySelectorAll(".days");

      radio.forEach((r) => {
        r.addEventListener("input", () => {
          var total =
              r.parentElement.nextSibling.nextSibling.nextSibling.nextSibling
                .firstChild,
            add =
              r.parentElement.nextSibling.nextSibling.nextSibling.firstChild,
            days = r.parentElement.nextSibling.firstChild;

          if (r.checked) {
            add.disabled = false;
            total.disabled = false;
            days.disabled = false;

            total.value =
              +add.value + +r.parentElement.nextSibling.nextSibling.textContent;
          } else {
            add.disabled = true;
            total.disabled = true;
            days.disabled = true;

            add.value = null;
            total.value = null;

            add.nextSibling.style.display = "none";
            total.nextSibling.style.display = "none";
            days.nextSibling.style.display = "none";
          }

          calculateRemainingAmount();
          donut();
          r.parentElement.parentElement.classList.toggle("disable");
        });
      });

      total.forEach((elm) => {
        elm.addEventListener("input", () => {
          var amount =
              elm.parentElement.parentElement.children[2].firstChild
                .textContent,
            add = elm.parentElement.previousSibling.firstChild;

          add.value = +elm.value - +amount;
          calculateRemainingAmount();

          // handle remaing error
          if (remainigAmount > totalAmount)
            if (lang == "sin")
              remainingError.textContent = `ඉතිරි මුදල පවතින මුදල ඉක්මවිය නොහැක`;
            else
              remainingError.textContent = `Remaining amount cannot exceed the available amount`;
          else remainingError.textContent = null;

          if (elm.value == 0 || elm.value == null || elm.value < +amount) {
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

            //handle remaining error
            if (remainigAmount < 0)
              if (lang == "sin")
                remainingError.textContent = `ඉතිරි මුදල බිංදුවට වඩා අඩු විය නොහැක`;
              else
                remainingError.textContent = `Remaining amount cannot be less than zero`;
            else remainingError.textContent = "";

            totalStatus = false;

            //handle add error
            handleAdd(add);
          } else if (elm.value > 10000) {
            totalError.style.display = "";
            if (lang == "sin")
              totalError.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> පොල් ගෙඩි ගණන බ්ලොක් එකේ උපරිම ධාරිතාව ඉක්මවිය නොහැක`;
            else
              totalError.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> Coconuts amount cannot exceed the maximum capacity of the block`;
            elm.nextSibling.style.display = "";

            //handle remaining error
            if (remainigAmount < 0)
              if (lang == "sin")
                remainingError.textContent = `ඉතිරි මුදල බිංදුවට වඩා අඩු විය නොහැක`;
              else
                remainingError.textContent = `Remaining amount cannot be less than zero`;
            else remainingError.textContent = "";

            totalStatus = false;

            //handle add error
            handleAdd(add);
          } else {
            totalError.innerHTML = null;
            elm.nextSibling.style.display = "none";

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
            } else {
              remainingError.textContent = "";

              totalError.innerHTML = null;
              elm.nextSibling.style.display = "none";

              totalStatus = true;

              //handle add error
              handleAdd(add);

              if (totalStatus && addStatus) donut();
            }
          }
        });
      });

      add.forEach((elm) => {
        elm.addEventListener("input", () => {
          var amount =
              elm.parentElement.parentElement.children[2].firstChild
                .textContent,
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

            //handle remaining error
            if (remainigAmount < 0)
              if (lang == "sin")
                remainingError.textContent = `ඉතිරි මුදල බිංදුවට වඩා අඩු විය නොහැක`;
              else
                remainingError.textContent = `Remaining amount cannot be less than zero`;
            else remainingError.textContent = "";

            addStatus = false;

            //handle total error
            handleTotal(total, amount);
          } else {
            addError.innerHTML = null;
            elm.nextSibling.style.display = "none";

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
            } else {
              remainingError.textContent = "";

              addError.innerHTML = null;
              elm.nextSibling.style.display = "none";

              addStatus = true;

              //handle total error
              handleTotal(total, amount);

              if (totalStatus && addStatus) donut();
            }
          }
        });
      });

      days.forEach((elm) => {
        elm.addEventListener("input", () => {
          if (elm.value == 0 || elm.value == null) {
            daysError.style.display = "";
            if (lang == "sin")
              daysError.innerHTML = `<i class="fa-solid fa-exclamation"></i> දින ගණන හිස් විය නොහැක`;
            else
              daysError.innerHTML = `<i class="fa-solid fa-exclamation"></i> Days count cannot be empty`;
            elm.nextSibling.style.display = "";
          } else if (!checkInt(elm.value)) {
            daysError.style.display = "";
            if (lang == "sin")
              daysError.innerHTML = `<i class="fa-solid fa-exclamation"></i> දින ගණන ධන නිඛිල විය යුතුය`;
            else
              daysError.innerHTML = `<i class="fa-solid fa-exclamation"></i> Days count must be positive integer`;
            elm.nextSibling.style.display = "";
          } else {
            daysError.style.display = "none";
            elm.nextSibling.style.display = "none";
          }
        });
      });

      document.querySelector(".split2-window").style.display = "block";
    });
  });

  function calculateRemainingAmount() {
    const addFileld = document.querySelectorAll(".add");

    var value = 0;
    addFileld.forEach((elm) => {
      if (!elm.parentElement.parentElement.classList.contains("disable")) {
        value += +elm.value;
      }
    });
    remainigAmount = +totalAmount - value;
    remainingCount.textContent = remainigAmount;
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
    } else if (total.value > 10000) {
      totalError.style.display = "";
      if (lang == "sin")
        totalError.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> පොල් ගෙඩි ගණන බ්ලොක් එකේ උපරිම ධාරිතාව ඉක්මවිය නොහැක`;
      else
        totalError.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> Coconuts amount cannot exceed the maximum capacity of the block`;
      total.nextSibling.style.display = "";
      totalStatus = false;
    } else {
      totalError.style.display = "none";
      total.nextSibling.style.display = "none";
      totalStatus = true;
    }
  }

  function donut() {
    let top = Math.floor((previous * 100) / totalAmount),
      bottom = Math.floor((remainigAmount * 100) / totalAmount);

    if (top < bottom) clockwise(top, bottom);
    else antiClockwise(top, bottom);

    previous = remainigAmount;
  }

  function clockwise(start, end) {
    // start < end
    let startValue = start,
      endValue = end,
      speed = 50;

      if (totalAmount == 0 || endValue == 0 || remainigAmount == 0) {
        progressValue.textContent = `${0}%`;
        circularProgress.style.background = `conic-gradient(#bb9056 ${
          0 * 3.6
        }deg, #ededed 0deg)`;
        return
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

  function antiClockwise(start, end) {
    // start > end
    let startValue = start,
      endValue = end,
      speed = 50;

      if (totalAmount == 0 || endValue == 0 || remainigAmount == 0) {
        progressValue.textContent = `${0}%`;
        circularProgress.style.background = `conic-gradient(#bb9056 ${
          0 * 3.6
        }deg, #ededed 0deg)`;
        return
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

  function viewYard(yard) {
    let row = "";

    yard.forEach((elm) => {
      var status = "";
      if (elm.days > 30) status = "stock-level4";
      else if (elm.days > 25) status = "stock-level3";
      else if (elm.days > 15) status = "stock-level2";
      else status = "stock-level1";

      row +=
        `<tr id=` +
        elm.id +
        ` class="` +
        status +
        ` disable">` +
        `<td>` +
        `<input class="radio" type="checkbox" />` +
        ` <label>` +
        elm.id +
        `</label>` +
        `</td>` +
        `<td>` +
        `<input` +
        ` type="number"` +
        ` class="` +
        status +
        ` days" value=${elm.days} disabled /><i class="fa-solid fa-exclamation" style="display:none"></i>` +
        `</td>` +
        `<td>` +
        elm.count +
        `</td>` +
        `<td>` +
        `<input` +
        ` type="number"` +
        ` class="` +
        status +
        ` add" disabled /><i class="fa-solid fa-circle-exclamation" style="display:none"></i>` +
        `</td>` +
        `<td><input` +
        ` type="number"` +
        ` class="` +
        status +
        ` total" disabled /><i class="fa-solid fa-triangle-exclamation" style="display:none"></i></td>` +
        `</tr>`;
    });
    tbody2.innerHTML = row;
  }

  function checkDays(day) {
    if (day.value == 0 || day.value == null) {
      daysError.style.display = "";
      if (lang == "sin")
        daysError.innerHTML = `<i class="fa-solid fa-exclamation"></i> දින ගණන හිස් විය නොහැක`;
      else
        daysError.innerHTML = `<i class="fa-solid fa-exclamation"></i> Days count cannot be empty`;
      day.nextSibling.style.display = "";
      return false;
    } else if (!checkInt(day.value)) {
      daysError.style.display = "";
      if (lang == "sin")
        daysError.innerHTML = `<i class="fa-solid fa-exclamation"></i> දින ගණන ධන නිඛිල විය යුතුය`;
      else
        daysError.innerHTML = `<i class="fa-solid fa-exclamation"></i> Days count must be positive integer`;
      day.nextSibling.style.display = "";
      return false;
    } else {
      daysError.style.display = "none";
      day.nextSibling.style.display = "none";

      return true;
    }
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

      var amount =
          add.parentElement.parentElement.children[2].firstChild.textContent,
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
    } else if (total.value > 10000) {
      totalError.style.display = "";
      if (lang == "sin")
        totalError.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> පොල් ගෙඩි ගණන බ්ලොක් එකේ උපරිම ධාරිතාව ඉක්මවිය නොහැක`;
      else
        totalError.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> Coconuts amount cannot exceed the maximum capacity of the block`;
      total.nextSibling.style.display = "";

      return false;
    } else {
      totalError.innerHTML = null;
      total.nextSibling.style.display = "none";

      var amount =
          total.parentElement.parentElement.children[2].firstChild.textContent,
        add = total.parentElement.previousSibling.firstChild;

      if (+amount + +add.value == +total.value) return true;
      else return false;
    }
  }

  save.addEventListener("click", () => {
    const radio = document.querySelectorAll(".radio"),
      add = document.querySelectorAll(".add"),
      total = document.querySelectorAll(".total"),
      days = document.querySelectorAll(".days");

    var blocks = [],
      day = [],
      amounts = [],
      addTotal = 0,
      remainigStatus = false,
      countStatus = false,
      count = 0;

    radio.forEach((r, index) => {
      var day_status = false,
        add_status = false,
        total_status = false;

      if (r.checked) {
        day_status = checkDays(days[index]);
        add_status = checkAdd(add[index]);
        total_status = checkTotal(total[index]);

        if (day_status && add_status && total_status) {
          blocks.push(r.parentElement.parentElement.id);
          day.push(days[index].value);
          amounts.push(total[index].value);
        }

        addTotal += +add[index].value;
        count++;
      }
    });

    // handle remaing
    if (remainigAmount > totalAmount) {
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
    } else if (totalAmount - remainigAmount != addTotal) {
      if (lang == "sin") remainingError.textContent = `මොකක්හරි වැරැද්දක් වෙලා`;
      else remainingError.textContent = `Something went wrong`;
      remainigStatus = false;
    } else {
      remainingError.textContent = "";
      remainigStatus = true;
    }

    if (count == blocks.length) countStatus = true;
    else countStatus = false;

    if (countStatus && remainigStatus) {
      var formData = {
        yard: yardH.textContent.slice(5),
        blocks: blocks,
        days: day,
        amounts: amounts,
        collector: getCookie("cId"),
        final_amount: addTotal,
      };

      if (lang == "sin") {
        var title = "ඔයාට විශ්වාස ද?",
          text = "ඔබට මෙය ප්‍රතිවර්තනය කිරීමට නොහැකි වනු ඇත!",
          confirmButtonText = "ඔව්, අංගනයට එක් කරන්න!",
          cancelButtonText = "අවලංගු කරන්න";
      } else {
        var title = "Are you sure?",
          text = "You won't be able to revert this!",
          confirmButtonText = "Yes, Add to yard!",
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
          fetch(backProxy + "/yard-data", {
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
                  document.cookie = "total=" + remainigAmount + "; path=/";

                  yValue.textContent = remainigAmount;

                  totalCount.textContent = remainigAmount;
                  remainingCount.textContent = remainigAmount;

                  totalAmount = remainigAmount;
                  remainigAmount = remainigAmount;
                  previous = remainigAmount;

                  document.querySelector(".split1-window").style.right = "35%";
                  document.querySelector(".split2-window").style.display =
                    "none";

                  getYards();
                  yard.click();
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
})();

var chart,
  chartConfig = {
    debug: true,
    //Without data, a view must be specified.
    type: "calendar month solid",
    title_label_text: "This month collections",
    yAxis_visible: false,
    legend: {
      //Add custom entries
      template: "%icon %name",
      position: "bottom",
      customEntries: [
        {
          name: "Available",
          icon_color: "#d6a360",
        },
        {
          name: "Free",
          // icon: {
          //   hatch: {
          //     // style: "light-upward-diagonal",
          //     // color: "#a2a2a2",
          //   },
          // },
        },
      ],
    },
    calendar: {
      // range: ["12/1/2023", "12/31/2023"],
      defaultEdgePoint: {
        mouseTracking: false,
        label_visible: true,
      },
    },
    defaultSeries: {
      opacity: 0.6,
      legendEntry_visible: true,
      defaultPoint: {
        outline_width: 0,
        label_text: "<b>%name</b>",
      },
    },
    toolbar_visible: true,
  };

// loadData(makeChart);

// function loadData(cb) {
//   JSC.fetch("./bookingData.csv")
//     .then(function (response) {
//       return response.text();
//     })
//     .then(function (csv) {
//       cb(JSC.parseCsv(csv).data);
//     })
//     .catch(function (ex) {
//       console.error(ex);
//     });
// }

// makeChart(arrr)

function makeChart(data) {
  // console.log(data);
  chartConfig.series = [
    {
      points: data.map(function (row) {
        var isAvailable = row.count != 0;
        return isAvailable
          ? {
              date: row.date,
              color: "#d6a360",
              // tooltip: "{%date:date d}<hr><b>"+row.count+" Available</b>",
              tooltip: false,
            }
          : {
              date: row.date,
              // tooltip: "{%date:date d}<hr><b>Free</b>",
              tooltip: false,
              // hatch: {
              //   style: "light-upward-diagonal",
              //   color: "#a2a2a2",
              // },
            };
      }),
    },
  ];
  chart = JSC.chart("chartDiv", chartConfig);
}

function checkInt(num) {
  if (Number.isInteger(+num) && +num > 0) return true;
  return false;
}
