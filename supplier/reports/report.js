(() => {
  const body = document.querySelector("body"),
    sin = body.querySelector(".sin"),
    en = body.querySelector(".en"),
    w1Title = body.querySelector(".w1-title"),
    w1Value = body.querySelector(".w1-value"),
    w1Period = body.querySelector(".w1-period"),
    w2Title = body.querySelector(".w2-title"),
    w2Value = body.querySelector(".w2-value"),
    w2Period = body.querySelector(".w2-period"),
    closeBtn = body.querySelector(".close-btn-bank"),
    overlay = body.querySelector(".overlay"),
    pwHeading = body.querySelector(".report-window-heading"),
    fromLabel = body.querySelector(".from-label"),
    toLabel = body.querySelector(".to-label"),
    sDate = body.querySelector(".starting-date"),
    sDateError = body.querySelector(".starting-date-error"),
    eDate = body.querySelector(".ending-date"),
    eDateError = body.querySelector(".ending-date-error"),
    btn = body.querySelector(".generate-button1"),
    btn2 = body.querySelector(".generate-button2");

  var lang = getCookie("lang"); // current language

  btn.addEventListener("click", () => {
    overlay.style.display = "flex";
    document.querySelector(".report-window").style.display = "block";
  });

  overlay.addEventListener("click", (e) => {
    if (e.target.id === "overlay") {
      overlay.style.display = "none";
      document.querySelector(".report-window").style.display = "none";
    }
  });

  closeBtn.addEventListener("click", () => {
    overlay.style.display = "none";
    document.querySelector(".report-window").style.display = "none";
  });

  sin.addEventListener("click", () => {
    sin.classList.add("active");
    en.classList.remove("active");

    document.documentElement.setAttribute("lang", "sin");
    document.cookie = "lang=sin; path=/";
    lang = "sin";

    w1Title.textContent = data["sin"]["w1Title"];
    w2Title.textContent = data["sin"]["w2Title"];
    w2Period.textContent = data["sin"]["w2Period"];
    btn.textContent = data["sin"]["btn"];
    btn2.textContent = data["sin"]["btn2"];
    pwHeading.textContent = data["sin"]["pwHeading"];
    fromLabel.textContent = data["sin"]["fromLabel"];
    toLabel.textContent = data["sin"]["toLabel"];
    setGreeting();
  });

  en.addEventListener("click", () => {
    en.classList.add("active");
    sin.classList.remove("active");

    document.documentElement.setAttribute("lang", "en");
    document.cookie = "lang=en; path=/";
    lang = "en";

    w1Title.textContent = data["en"]["w1Title"];
    w2Title.textContent = data["en"]["w2Title"];
    w2Period.textContent = data["en"]["w2Period"];
    btn.textContent = data["en"]["btn"];
    btn2.textContent = data["en"]["btn2"];
    pwHeading.textContent = data["en"]["pwHeading"];
    fromLabel.textContent = data["en"]["fromLabel"];
    toLabel.textContent = data["en"]["toLabel"];
    setGreeting();
  });

  var data = {
    sin: {
      w1Title: "අද පොල් මිල",
      w2Title: "සාමාන්‍ය පොල් මිල",
      w2Period: "මෙම මාසය සඳහා",
      btn: "වාර්තාව ජනනය කරන්න",
      btn2: "වාර්තාව ජනනය කරන්න",
      pwHeading: "ඔබේ ඉන්වොයිසිය ජනනය කිරීමට කාල සීමාව තෝරන්න",
      fromLabel: "සිට",
      toLabel: "දක්වා",
    },
    en: {
      w1Title: "Today's Coconut Rate",
      w2Title: "Average Coconut Rate",
      w2Period: "For this month",
      btn: "Generate Invoice",
      btn2: "Generate Invoice",
      pwHeading: "Select time duration to generate your invoice",
      fromLabel: "From",
      toLabel: "To",
    },
  };

  let coco = [],
    this_year_value = [],
    this_year_sales = [],
    last_year_value = [],
    last_year_sales = [];

  fetch(backProxy + "/report", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  })
    .then((response) => {
      if (response.status == 200) {
        response.json().then((data) => {
          if (lang == "sin") {
            w1Value.textContent = "රු. " + data.rate.price;
            w1Period.textContent = data.rate.date + " වන විට";
          } else {
            w1Value.textContent = "Rs. " + data.rate.price;
            w1Period.textContent = "As of " + data.rate.date;
          }

          data.last_six.forEach((item) => {
            coco.push(parseFloat(item.price));
          });
          rateChart(coco.reverse());

          if (lang == "sin")
            w2Value.textContent = "රු. " + data.avg.reverse()[0].toFixed(2);
          else w2Value.textContent = "Rs. " + data.avg.reverse()[0].toFixed(2);

          avgChart(data.avg.reverse());

          data.this.forEach((item) => {
            this_year_value.push(parseFloat(item.date));
            this_year_sales.push(parseFloat(item.price));
          });

          data.last.forEach((item) => {
            last_year_value.push(parseFloat(item.date));
            last_year_sales.push(parseFloat(item.price));
          });

          salesChart(this_year_value, last_year_value);
          earningsChart(this_year_sales, last_year_sales);
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

  var sDateStatus = false,
    eDateStatus = false;

  sDate.addEventListener("input", () => {
    sDate_status_func();
  });
  eDate.addEventListener("input", () => {
    eDate_status_func();
  });

  btn2.addEventListener("click", () => {
    if (!sDate_status_func()) {
      sDate.focus();
    }
    if (!eDate_status_func()) {
      eDate.focus();
    }
    if (sDateStatus && eDateStatus) {
      var dateStatus = false;
      var start = new Date(sDate.value);
      var end = new Date(eDate.value);

      if (end >= start) {
        end.setDate(end.getDate() + 1);
        dateStatus = true;
      } else {
        if (lang == "sin") {
          sDateError.textContent =
            "ආරම්භක දිනය අවසන් දිනයට වඩා කලින් හෝ සමාන විය යුතුය";
          Command: toastr["error"](
            "ආරම්භක දිනය අවසන් දිනයට වඩා කලින් හෝ සමාන විය යුතුය"
          );
        } else {
          sDateError.textContent =
            "The start date must be earlier than or equal to the end date";
          Command: toastr["error"](
            "The start date must be earlier than or equal to the end date"
          );
        }
      }

      if (dateStatus) {
        if (lang == "sin") {
          var title = "උත්පාදනය කරනවා...",
            text = "කරුණාකර රැඳී සිටින්න...";
        } else {
          var title = "Generating...",
            text = "Please wait...";
        }

        Swal.fire({
          title: title,
          html: text,
          allowEscapeKey: false,
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        var formData = {
          start: start,
          end: end,
        };

        fetch(backProxy + "/report", {
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
                var total = 0;
                data.collections.forEach((item) => {
                  total += item.value;
                });
                generateInvoice(data.user_data, data.collections, start, total);
              });
            } else if (response.status === 202) {
              Swal.close();
              response.json().then((data) => {
                console.log(data.message);
              });
              if (lang == "sin")
                Command: toastr["info"](
                  "සඳහන් කළ දිනයන් අතර එකතු කිරීම් නොමැත"
                );
              else
                Command: toastr["info"](
                  "There are no collections between the mentioned dates"
                );
            } else if (response.status === 401) {
              Swal.close();
              response.json().then((data) => {
                console.log(data.message);
              });
              if (lang == "sin") Command: toastr["error"]("වලංගු නොවන පරිශීලක");
              else Command: toastr["error"]("Invalid User");
            } else {
              Swal.close();
              console.error("Error:", response.status);
              Command: toastr["error"](response.status, "Error");
            }
          })
          .catch((error) => {
            Swal.close();
            console.error("An error occurred:", error);
            Command: toastr["error"](error);
          });

        sDate.value = "";
        eDate.value = "";
      }
    }
  });

  function sDate_status_func() {
    if (typeof sDate.value === "string" && sDate.value.trim().length === 0) {
      if (lang == "sin") {
        sDateError.textContent = "දිනය හිස් විය නොහැක";
        Command: toastr["warning"]("දිනය හිස් විය නොහැක");
      } else {
        sDateError.textContent = "Date cannot be empty";
        Command: toastr["warning"]("Date cannot be empty");
      }
      sDateStatus = false;
      return false;
    } else if (!checkDate(sDate.value)) {
      if (lang == "sin") {
        sDateError.textContent = "දිනය අතීතයේ විය යුතුය";
        Command: toastr["warning"]("දිනය අතීතයේ විය යුතුය");
      } else {
        sDateError.textContent = "Date must be in the past";
        Command: toastr["warning"]("Date must be in the past");
      }
    } else {
      sDateError.textContent = "";
      sDateStatus = true;
      return true;
    }
  }

  function eDate_status_func() {
    if (typeof eDate.value === "string" && eDate.value.trim().length === 0) {
      if (lang == "sin") {
        eDateError.textContent = "දිනය හිස් විය නොහැක";
        Command: toastr["warning"]("දිනය හිස් විය නොහැක");
      } else {
        eDateError.textContent = "Date cannot be empty";
        Command: toastr["warning"]("Date cannot be empty");
      }
      eDateStatus = false;
      return false;
    } else if (!checkDate(eDate.value)) {
      if (lang == "sin") {
        eDateError.textContent = "දිනය අතීතයේ විය යුතුය";
        Command: toastr["warning"]("දිනය අතීතයේ විය යුතුය");
      } else {
        eDateError.textContent = "Date must be in the past";
        Command: toastr["warning"]("Date must be in the past");
      }
    } else {
      eDateError.textContent = "";
      eDateStatus = true;
      return true;
    }
  }
})();

function rateChart(coco) {
  //coco rate chart design
  const dataLine3 = {
    labels: coco,
    datasets: [
      {
        data: coco,
        //   fill: true,
        borderColor: "#22C55E",
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
  const configLine3 = {
    type: "line",
    data: dataLine3,
    options: {
      scales: {
        x: {
          ticks: {
            display: false,
          },
          grid: {
            display: false,
            borderWidth: 0,
          },
        },
        y: {
          ticks: {
            display: false,
          },
          grid: {
            display: false,
            borderWidth: 0,
          },
        },
      },
      responsive: true,
      plugins: {
        legend: {
          display: false,
          position: "top",
        },
        title: {
          display: false,
        },
      },
    },
  };

  // coco rate chart visualizing
  const chartLine3 = new Chart(
    document.getElementById("coco-rate"),
    configLine3
  );
}

function avgChart(avg) {
  //avg rate chart design
  const dataLine4 = {
    labels: avg,
    datasets: [
      {
        data: avg,
        //   fill: true,
        borderColor: "#22C55E",
        borderWidth: 2,
        // hoverBorderColor: '#000000',
        // backgroundColor:'#ffe0b6',
        tension: 0.4,
        pointRadius: 0,
        hoverPointRadius: 0,
      },
    ],
  };

  //avg rate chart configuration
  const configLine4 = {
    type: "line",
    data: dataLine4,
    options: {
      scales: {
        x: {
          ticks: {
            display: false,
          },
          grid: {
            display: false,
            borderWidth: 0,
          },
        },
        y: {
          ticks: {
            display: false,
          },
          grid: {
            display: false,
            borderWidth: 0,
          },
        },
      },
      responsive: true,
      plugins: {
        legend: {
          display: false,
          position: "top",
        },
        title: {
          display: false,
        },
      },
    },
  };

  // average rate chart visualizing
  const chartLine4 = new Chart(
    document.getElementById("avg-rate"),
    configLine4
  );
}

//for all charts
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
    document.getElementById("sales-graph"),
    configLine1
  );
}

function earningsChart(this_year, last_year) {
  //earnings chart design
  const dataLine2 = {
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

  //earnings chart configuration
  const configLine2 = {
    type: "line",
    data: dataLine2,
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
          text: "Monthly Earnings",
        },
      },
    },
  };

  // earning chart visualizing
  const chartLine2 = new Chart(
    document.getElementById("earnings-graph"),
    configLine2
  );
}

function generateInvoice(user_data, collections, start, total) {
  //Generate pdf
  var pdfObject; //outputType: jsPDFInvoiceTemplate.OutputType.Blob,

  var props = {
    outputType: jsPDFInvoiceTemplate.OutputType.Blob,
    returnJsPDFDocObject: true,
    fileName: "Invoice 2023",
    orientationLandscape: false,
    compress: true,
    logo: {
      src: "../../common/JOM logo 1.png",
      type: "PNG", //optional, when src= data:uri (nodejs case)
      width: 53.33, //aspect ratio = width/height
      height: 26.66,
      margin: {
        top: 0, //negative or positive num, from the current position
        left: 0, //negative or positive num, from the current position
      },
    },
    stamp: {
      inAllPages: true, //by default = false, just in the last page
      src: "../../common/home.png",
      type: "JPG", //optional, when src= data:uri (nodejs case)
      width: 20, //aspect ratio = width/height
      height: 20,
      margin: {
        top: 0, //negative or positive num, from the current position
        left: 0, //negative or positive num, from the current position
      },
    },
    business: {
      name: "Jayasinghe Oil Mills",
      address: "No 105, Ravita Road, Welpalla, Sri Lanka.",
      phone: "(+94) 76 924 0963",
      email: "jom@jom.com",
      email_1: "jmyasiru@gmail.com",
      website: "https://jom-dev.duckdns.org",
    },
    contact: {
      label: "Invoice issued for:",
      name: user_data.first_name + " " + user_data.last_name,
      address:
        user_data.add_line_1 +
        "," +
        user_data.add_line_2 +
        "," +
        user_data.add_line_3,
      phone: user_data.phone,
      email: user_data.email,
    },
    invoice: {
      // label: "Invoice #: ",
      num: 19,
      invDate: "Start Date: " + start.toLocaleDateString(),
      invGenDate: "Invoice Date: " + new Date().toLocaleDateString(),
      headerBorder: false,
      tableBodyBorder: false,
      header: [
        {
          title: "#",
          style: {
            width: 10,
          },
        },
        {
          title: "Date",
          style: {
            width: 30,
          },
        },
        {
          title: "Supply Method",
          style: {
            width: 40,
          },
        },
        {
          title: "Payment Method",
          style: {
            width: 50,
          },
        },
        { title: "Quantity" },
        { title: "Unit" },
        { title: "Total" },
      ],
      table: Array.from(collections, (item, index) => [
        index + 1,
        new Date(item.date).toLocaleDateString(),
        item.supply_method,
        item.payment_method + "\n",
        item.final_amount.toLocaleString("en-US"),
        Math.floor(item.value / item.final_amount).toString() + ".00",
        item.value.toLocaleString("en-US") + ".00",
      ]),
      additionalRows: [
        {
          col1: "Total:",
          col2: total.toLocaleString("en-US") + ".00",
          col3: "LKR",
          style: {
            fontSize: 14, //optional, default 12
          },
        },
      ],
      invDescLabel: "Invoice Note",
      invDesc:
        "Thank you for your recent supply of materials to Jayasinghe Oil Mills Pvt. Ltd. Enclosed, please find the attached invoice providing a comprehensive overview of all supplied items during the specified time period. We sincerely appreciate your consistent reliability, which is paramount to our operations. For any further assistance or inquiries, please do not hesitate to contact us either via email or telephone. Your satisfaction is our priority, and we look forward to continuing our mutually beneficial partnership.",
    },
    footer: {
      text: "The invoice is created on a computer and is not valid without the signature and stamp.",
    },
    pageEnable: true,
    pageLabel: "Page ",
  };

  /* generate pdf */
  function generatePDF() {
    pdfObject = jsPDFInvoiceTemplate.default(props);
    viewPDF();
  }

  /* view pdf */
  function viewPDF() {
    if (!pdfObject) {
      return console.log("No PDF Object");
    }

    var fileURL = URL.createObjectURL(pdfObject.blob);
    window.open(fileURL, "_blank");
    Swal.close();
  }

  generatePDF();
}

function checkDate(date) {
  var selectedDate = new Date(date);
  var now = new Date();
  now.setDate(now.getDate());
  if (selectedDate <= now) return true;
  else return false;
}
