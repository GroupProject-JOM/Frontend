(() => {
  const body = document.querySelector("body"),
    sin = body.querySelector(".sin"),
    en = body.querySelector(".en"),
    w1 = body.querySelector(".w1"),
    w2 = body.querySelector(".w2"),
    w1Value = body.querySelector(".w1-value"),
    w2Value = body.querySelector(".w2-value"),
    c1 = body.querySelector(".c1"),
    c2 = body.querySelector(".c2"),
    c4 = body.querySelector(".c4"),
    c5 = body.querySelector(".c5"),
    aBar = body.querySelector(".action-bar"),
    aText = body.querySelector(".action-text"),
    aBtn = body.querySelector(".action-button");

  sin.addEventListener("click", () => {
    sin.classList.add("active");
    en.classList.remove("active");

    document.documentElement.setAttribute("lang", "sin");
    document.cookie = "lang=sin; path=/";

    w1.textContent = data["sin"]["w1"];
    w2.textContent = data["sin"]["w2"];
    c1.textContent = data["sin"]["c1"];
    c2.textContent = data["sin"]["c2"];
    c4.textContent = data["sin"]["c4"];
    c5.textContent = data["sin"]["c5"];
    aText.textContent = data["sin"]["aText"];
    aBtn.textContent = data["sin"]["aBtn"];
    setGreeting();
  });

  en.addEventListener("click", () => {
    en.classList.add("active");
    sin.classList.remove("active");

    document.documentElement.setAttribute("lang", "en");
    document.cookie = "lang=en; path=/";

    w1.textContent = data["en"]["w1"];
    w2.textContent = data["en"]["w2"];
    c1.textContent = data["en"]["c1"];
    c2.textContent = data["en"]["c2"];
    c4.textContent = data["en"]["c4"];
    c5.textContent = data["en"]["c5"];
    aText.textContent = data["en"]["aText"];
    aBtn.textContent = data["en"]["aBtn"];
    setGreeting();
  });

  var data = {
    sin: {
      w1: "මාසික ආදායම",
      w2: "පොරොත්තු ගෙවීම්",
      c1: "විකුණුම් දත්ත",
      c2: "මාසික විකුණුම් දත්ත සාරාංශය",
      c4: "බෙදාහරින්නාගේ විකුණුම්",
      c5: "එක් එක් නිෂ්පාදනය සඳහා විකුණුම් දත්ත සාරාංශය",
      aText:
        "නිෂ්පාදන දෙපාර්තමේන්තුව නව සමාගම් නිෂ්පාදන එකතු කර ඇත. ඒවායේ ඒකක මිල යාවත්කාලීන කරන්න.",
      aBtn: "මිල ඇතුල් කරන්න",
    },
    en: {
      w1: "Monthly Revenue",
      w2: "Pending Payments",
      c1: "Sales Data",
      c2: "Monthly Sales Data Visualization",
      c4: "Distributor Sales",
      c5: "Sales Data Visualization for each product",
      aText:
        "Production department has added new company products. Update the unit price of them.",
      aBtn: "Update Unit Price",
    },
  };

  let this_year_sales = [],
    last_year_sales = [],
    productNames = [],
    quantities = [];

  fetch(backProxy + "/sales-manager", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  })
    .then((response) => {
      if (response.status == 200) {
        response.json().then((data) => {
          w1Value.textContent = data.revenue.toLocaleString("en-US") + " LKR";
          w2Value.textContent = data.payouts;

          data.monthly.forEach((item) => {
            this_year_sales.push(item.thisYear);
            last_year_sales.push(item.lastYear);
          });

          data.products.forEach((item) => {
            productNames.push(item.category);
            quantities.push(item.quantity);
          });

          salesChart(this_year_sales, last_year_sales);
          productsChart(productNames, quantities);

          if (data.unverified == true) aBar.style.display = "";
        });
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

  function productsChart(names, quantity) {
    const dataBar = {
      labels: names,
      datasets: [
        {
          data: quantity,
          backgroundColor: [
            "rgb(245, 233, 219)",
            // "rgb(0, 201, 64)",
            // "rgb(201, 178, 0)",
            // "rgb(201, 77, 0)",
            // "rgb(201, 0, 147)",
            // "rgb(9, 8, 10)",
            // "rgb(48, 230, 121)",
          ],
          hoverColor: 'rgb(201, 178, 0)',
        },
      ],
    };

    const configBar = {
      type: "bar",
      data: dataBar,
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
          // title: {
          //   display: true,
          //   text: "Products Sales",
          // },
        },
      },
    };

    const chartLine2 = new Chart(
      document.getElementById("distributor-sales"),
      configBar
    );
  }

  let labels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  function salesChart(this_year, last_year) {
    //sales chart design
    const dataLine1 = {
      labels: labels,
      datasets: [
        {
          label: "This year",
          data: this_year,
          // fill: true,
          borderColor: "#BB9056",
          borderWidth: 2,
          // hoverBorderColor: '#000000',
          // backgroundColor:'#ffe0b6'
          tension: 0.1,
          pointRadius: 0,
          hoverPointRadius: 0,
        },
        {
          label: "Last year",
          data: last_year,
          // fill: true,
          borderColor: "#949494",
          borderWidth: 2,
          // hoverBorderColor: '#000000',
          // backgroundColor:'#ffe0b6'
          tension: 0.1,
          pointRadius: 0,
          hoverPointRadius: 0,
        },
      ],
    };

    //sales chart configuration
    const configLine1 = {
      type: "line",
      data: dataLine1,
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: "top",
            labels: {
              boxWidth: 30,
              boxHeight: 2,
            },
          },
          title: {
            display: true,
            text: "Monthly Sales",
          },
        },
      },
    };

    // sales chart visualizing
    const chartLine1 = new Chart(
      document.getElementById("sales-data"),
      configLine1
    );
  }
})();
