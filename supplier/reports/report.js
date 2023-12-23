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
    btn = body.querySelector(".generate-button1");

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
    setGreeting();
  });

  var data = {
    sin: {
      w1Title: "අද පොල් මිල",
      w2Title: "සාමාන්‍ය පොල් මිල",
      w2Period: "මෙම මාසය සඳහා",
      btn: "වාර්තාව ජනනය කරන්න",
    },
    en: {
      w1Title: "Today's Coconut Rate",
      w2Title: "Average Coconut Rate",
      w2Period: "For this month",
      btn: "Generate Invoice",
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

    //pdf generate code
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
      src: "https://raw.githubusercontent.com/edisonneza/jspdf-invoice-template/demo/images/qr_code.jpg",
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
      website: "www.jom.com",
    },
    contact: {
      label: "Invoice issued for:",
      name: "Stock Manager",
      address: "NO 858, Pannala, Kuliyapitiya",
      phone: "(+94) 71 22 22 222",
      email: "kamal@gmail.com",
      otherInfo: "www.jom.com",
    },
    invoice: {
      label: "Invoice #: ",
      num: 19,
      invDate: "Payment Date: 25/10/2023 18:12",
      invGenDate: "Invoice Date: 26/10/2023 10:17",
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
          title: "Title",
          style: {
            width: 30,
          },
        },
        {
          title: "Description",
          style: {
            width: 80,
          },
        },
        { title: "Price" },
        { title: "Quantity" },
        { title: "Unit" },
        { title: "Total" },
      ],
      table: Array.from(Array(10), (item, index) => [
        index + 1,
        "There are many variations ",
        "Lorem Ipsum is simply dummy text dummy text ",
        200.5,
        4.5,
        "m2",
        400.5,
      ]),
      additionalRows: [
        {
          col1: "Total:",
          col2: "145,250.50",
          col3: "ALL",
          style: {
            fontSize: 14, //optional, default 12
          },
        },
        {
          col1: "VAT:",
          col2: "20",
          col3: "%",
          style: {
            fontSize: 10, //optional, default 12
          },
        },
        {
          col1: "SubTotal:",
          col2: "116,199.90",
          col3: "ALL",
          style: {
            fontSize: 10, //optional, default 12
          },
        },
      ],
      invDescLabel: "Invoice Note",
      invDesc:
        "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary.",
    },
    footer: {
      text: "The invoice is created on a computer and is valid without the signature and stamp.",
    },
    pageEnable: true,
    pageLabel: "Page ",
  };

  /* generate pdf */
  function generatePDF() {
    pdfObject = jsPDFInvoiceTemplate.default(props);
    console.log("Object generated: ", pdfObject);
    viewPDF();
  }

  /* view pdf */
  function viewPDF() {
    if (!pdfObject) {
      Command: toastr["error"]("No PDF Object");
      return console.log("No PDF Object");
    }

    var fileURL = URL.createObjectURL(pdfObject.blob);
    window.open(fileURL, "_blank");
  }

  const genBtn = document.querySelector(".form-button");
  genBtn.addEventListener("click", () => {
    generatePDF();
  });
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
