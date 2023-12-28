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
    end = body.querySelector(".end-date"),
    tbody2 = body.querySelector(".tbody2"),
    overlay = document.querySelector(".overlay"),
    distribute = document.querySelector(".distribute"),
    closeBtn1 = document.querySelector(".close-btn1"),
    closeBtn2 = document.querySelector(".close-btn2"),
    circularProgress1 = document.querySelector(".circular-progress-1"),
    circularProgress2 = document.querySelector(".circular-progress-2"),
    circularProgress3 = document.querySelector(".circular-progress-3"),
    progressValue1 = document.querySelector(".progress-value-1"),
    progressValue2 = document.querySelector(".progress-value-2"),
    progressValue3 = document.querySelector(".progress-value-3");

  var lang = getCookie("lang"); // current language

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
          batchNo.textContent = data.batch.id;

          if (data.batch.status == 1) {
            status.textContent = "Processing";

            release.style.display = "none";

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
          total_percentage /= data.products.length;

          let startValue1 = 0,
            endValue1 = total_percentage,
            speed = 50;

          let progress1 = setInterval(() => {
            progressValue1.textContent = `${startValue1}%`;
            circularProgress1.style.background = `conic-gradient(#bb9056 ${
              startValue1 * 3.6
            }deg, #ededed 0deg)`;
            if (startValue1 == endValue1) clearInterval(progress1);
            startValue1++;
          }, speed);

          batchProducts.textContent = data.products.length;
          start.textContent = new Date(
            data.batch.create_date
          ).toLocaleDateString();
          end.textContent = new Date(data.batch.end_date).toLocaleDateString();

          const rows = document.querySelectorAll(".row");

          rows.forEach((r) => {
            r.addEventListener("click", () => {
              overlay.style.display = "block";
              document.querySelector(".split1-window").style.display = "block";

              let startValue2 = 0,
                startValue3 = 0,
                endValue2 = 60,
                endValue3 = 75,
                speed = 50;

              let progress2 = setInterval(() => {
                progressValue2.innerHTML = `${startValue2}%`;
                circularProgress2.style.background = `conic-gradient(#bb9056 ${
                  startValue2 * 3.6
                }deg, #ededed 0deg)`;
                if (startValue2 == endValue2) clearInterval(progress2);
                startValue2++;
              }, speed);

              let progress3 = setInterval(() => {
                progressValue3.innerHTML = `${startValue3}%`;
                circularProgress3.style.background = `conic-gradient(#bb9056 ${
                  startValue3 * 3.6
                }deg, #ededed 0deg)`;
                if (startValue3 == endValue3) clearInterval(progress3);
                startValue3++;
              }, speed);
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
})();
