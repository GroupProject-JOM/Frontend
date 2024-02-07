(() => {
  const body = document.querySelector("body"),
    sin = body.querySelector(".sin"),
    en = body.querySelector(".en"),
    w1 = body.querySelector(".w1"),
    w1Value = body.querySelector(".w1-value"),
    w2 = body.querySelector(".w2"),
    w2Value = body.querySelector(".w2-value"),
    c1 = body.querySelector(".c1"),
    c2 = body.querySelector(".c2"),
    searchBar = body.querySelector(".search"),
    productTable = body.querySelector(".products-table"),
    closeBtn = body.querySelector(".close-btn-product"),
    overlay = body.querySelector(".overlay"),
    type = body.querySelector(".type"),
    category = body.querySelector(".category"),
    price = body.querySelector(".price"),
    remaining = body.querySelector(".remaining"),
    tbody = body.querySelector(".tbody");

  var lang = getCookie("lang"); // current language

  var massive = [];

  var searchBa = document.querySelectorAll(
    '.search-box input[type="text"] + span'
  );

  searchBa.forEach((elm) => {
    elm.addEventListener("click", () => {
      elm.previousElementSibling.value = "";
      search(searchBar.value.toUpperCase(), productTable);
    });
  });

  overlay.addEventListener("click", (e) => {
    if (e.target.id === "overlay") {
      overlay.style.display = "none";
      document.querySelector(".product-container").style.display = "none";
    }
  });

  closeBtn.addEventListener("click", () => {
    overlay.style.display = "none";
    document.querySelector(".product-container").style.display = "none";
  });

  searchBar.addEventListener("keyup", () => {
    search(searchBar.value.toUpperCase(), productTable);
  });

  sin.addEventListener("click", () => {
    sin.classList.add("active");
    en.classList.remove("active");

    document.documentElement.setAttribute("lang", "sin");
    document.cookie = "lang=sin; path=/";
    lang = "sin";

    w1.textContent = data["sin"]["w1"];
    w2.textContent = data["sin"]["w2"];
    c1.textContent = data["sin"]["c1"];
    c2.textContent = data["sin"]["c2"];
    setGreeting();
  });

  en.addEventListener("click", () => {
    en.classList.add("active");
    sin.classList.remove("active");

    document.documentElement.setAttribute("lang", "en");
    document.cookie = "lang=en; path=/";
    lang = "en";

    w1.textContent = data["en"]["w1"];
    w2.textContent = data["en"]["w2"];
    c1.textContent = data["en"]["c1"];
    c2.textContent = data["en"]["c2"];
    setGreeting();
  });

  var data = {
    sin: {
      w1: "වෙන් කළ නිෂ්පාදන",
      w2: "අද සංචාරයන්",
      c1: "අලෙවිසැල්",
      c2: "අලෙවිසැල් තොරතුරු බලන්න සහ යාවත්කාලීන කරන්න",
    },
    en: {
      w1: "Allocated Products",
      w2: "Today's Visits",
      c1: "Products Overview",
      c2: "Currently available company products",
    },
  };

  var row = "";
  fetch(backProxy + "/distributor", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  })
    .then((response) => {
      if (response.status == 200) {
        response.json().then((data) => {
          let arr = data.list;
          arr.forEach(data_to_table);

          massive = data.distributions;
          massive.forEach((item) => {
            item.date = formatDateString(item.date);
          });

          setDistribution();

          function data_to_table(item) {
            var price = "--"
            if((item.price > 0)){
              price = (+item.price).toLocaleString("en-US") + " LKR"
            }
            row +=
              `<tr class="rem-row">` +
              `<td>P/I/${item.product}</td>` +
              `<td>${item.category}</td>` +
              `<td>${item.type}</td>` +
              `<td>${item.remaining.toLocaleString("en-US")}</td>` +
              `<td>${price}</td>` +
              `</tr>`;
          }
          tbody.innerHTML = row;

          w1Value.innerHTML = `${data.allocated}<span>/${data.accepted}</span>`;
          w2Value.innerHTML = `${data.visits}<span>/${data.outlets}</span>`;

          const rows = document.querySelectorAll(".rem-row");

          rows.forEach((r) => {
            r.addEventListener("click", () => {
              type.textContent = r.children[1].textContent;
              category.textContent = r.children[2].textContent;
              remaining.textContent = r.children[3].textContent;
              price.textContent = r.children[4].textContent;

              overlay.style.display = "block";
              document.querySelector(".product-container").style.display =
                "block";
            });
          });

          let visits = [];
            data.last_seven.forEach((item) => {
              visits.push(parseFloat(item.visits));
            });
            visitsChart(getLastSevenDays().reverse(), visits);
        });
      } else if (response.status === 202) {
        response.json().then((data) => {
          console.log(data.size);
          w1Value.innerHTML = `${data.allocated}<span>/${data.accepted}</span>`;
          w2Value.innerHTML = `${data.visits}<span>/${data.outlets}</span>`;

          massive = data.distributions;
          massive.forEach((item) => {
            item.date = formatDateString(item.date);
          });

          setDistribution();
        });
        if (lang == "sin") Command: toastr["info"]("ඉතිරි නිෂ්පාදන නොමැත");
        else Command: toastr["info"]("No remaining products");
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

  function setDistribution() {
    $(function () {
      $("#js-glanceyear")
        .empty()
        .glanceyear(massive, {
          eventClick: function (e) {
            $("#debug").html("Date: " + e.date + ", Count: " + e.count);
          },
          showToday: false,
        });
    });
  }
})();

function formatDateString(inputDateString) {
  const dateObject = new Date(inputDateString);

  const year = dateObject.getFullYear();
  const month = dateObject.getMonth() + 1;
  const day = dateObject.getDate();

  const formattedDateString = `${year}-${month}-${day}`;

  return formattedDateString;
}

function visitsChart(days, visits) {
  const dataLine = {
    labels: days,
    datasets: [
      {
        data: visits,
        //   fill: true,
        borderColor: "#bb9056",
        borderWidth: 2,
        // hoverBorderColor: '#000000',
        // backgroundColor:'#ffe0b6',
        tension: 0.4,
        pointRadius: 0,
        hoverPointRadius: 0,
      },
    ],
  };

  //coco rate chart configuration
  const configLine = {
    type: "line",
    data: dataLine,
    options: {
      maintainAspectRatio: false,
      responsive: true,
      plugins: {
        legend: {
          display: false,
          position: "top",
        },
        title: {
          display: true,
          text: "Daily Distributions",
        },
      },
    },
  };

  const chartLine = new Chart(
    document.getElementById("monthly-visit-chart"),
    configLine
  );
}

function getLastSevenDays() {
  const daysOfWeek = [
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sun",
  ];

  const currentDate = new Date();
  const lastSevenDays = [];

  for (let i = 1; i <= 7; i++) {
    const day = new Date(currentDate);
    day.setDate(currentDate.getDate() - i);
    const dayOfWeek = daysOfWeek[day.getDay()];
    lastSevenDays.push(`${dayOfWeek}`);
  }

  return lastSevenDays;
}