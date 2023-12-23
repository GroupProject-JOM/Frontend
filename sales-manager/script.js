(() => {
  const body = document.querySelector("body"),
    sin = body.querySelector(".sin"),
    en = body.querySelector(".en"),
    modeSwitch = body.querySelector(".toggle-switch"),
    w1 = body.querySelector(".w1"),
    w2 = body.querySelector(".w2"),
    w2Value = body.querySelector(".w2-value"),
    c1 = body.querySelector(".c1"),
    c2 = body.querySelector(".c2"),
    c4 = body.querySelector(".c4"),
    c5 = body.querySelector(".c5");

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
    setGreeting();
  });

  var data = {
    sin: {
      w1: "මුළු විකුණුම් පරිමාව",
      w2: "පොරොත්තු ගෙවීම්",
      c1: "විකුණුම් දත්ත",
      c2: "මාසික විකුණුම් දත්ත සාරාංශය",
      c4: "බෙදාහරින්නාගේ විකුණුම්",
      c5: "එක් එක් බෙදාහරින්නා සඳහා විකුණුම් දත්ත සාරාංශය",
    },
    en: {
      w1: "Total Sales Volume",
      w2: "Pending Payments",
      c1: "Sales Data",
      c2: "Monthly Sales Data Visualisation",
      c4: "Disributor Sales",
      c5: "Sales Data Visualisation for each distributor",
    },
  };

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
          w2Value.textContent = data.payouts;
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

  let labels1 = [
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
  let labels2 = ["Saman", "Kamal", "Amal", "Chamal", "Piyal", "Sunil", "Kasun"];

  let itemData1 = [
    7000, 5000, 5000, 3000, 7000, 1100, 1500, 1000, 2100, 3000, 4500, 1200,
  ];
  let itemData2 = [7000, 5000, 5000, 3000, 7000, 1100, 1500];

  const dataLine1 = {
    labels: labels1,
    datasets: [
      {
        data: itemData1,
        fill: true,
        borderColor: "#909090",
        // hoverBorderColor: '#000000',
        // backgroundColor:'#ffe0b6'
        tension: 0.1,
      },
    ],
  };
  const dataBar = {
    labels: labels2,
    datasets: [
      {
        data: itemData2,
        // backgroundColor: [
        //   "rgb(24, 0, 201)",
        //   "rgb(0, 201, 64)",
        //   "rgb(201, 178, 0)",
        //   "rgb(201, 77, 0)",
        //   "rgb(201, 0, 147)",
        //   "rgb(9, 8, 10)",
        //   "rgb(48, 230, 121)",
        // ],
      },
    ],
  };

  const configLine1 = {
    type: "line",
    data: dataLine1,
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
        title: {
          // display: true,
          // text: 'Monthly Sales'
        },
      },
    },
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
        title: {
          // display: true,
          // text: 'Monthly Sales'
        },
      },
    },
  };

  const chartLine1 = new Chart(
    document.getElementById("sales-data"),
    configLine1
  );
  const chartLine2 = new Chart(
    document.getElementById("distributor-sales"),
    configBar
  );

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
      src: "../common/JOM logo 1.png",
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
      src: "../common/home.png",
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
      // otherInfo: "www.jom.com",
    },
    invoice: {
      // label: "Invoice #: ",
      num: 19,
      invDate: "Start Date: 25/10/2023 18:12",
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
        // { title: "Quantity" },
        { title: "Unit" },
        { title: "Total" },
      ],
      table: Array.from(Array(15), (item, index) => [
        index + 1,
        "2023-12-13",
        "Pickup from estate",
        "Transfer to Bank\n",
        200,
        "50.00",
        // "m2",
        "10000.00",
      ]),
      additionalRows: [
        {
          col1: "Total:",
          col2: "145,250.50",
          col3: "LKR",
          style: {
            fontSize: 14, //optional, default 12
          },
        },
        // {
        //   col1: "VAT:",
        //   col2: "20",
        //   col3: "%",
        //   style: {
        //     fontSize: 10, //optional, default 12
        //   },
        // },
        // {
        //   col1: "SubTotal:",
        //   col2: "116,199.90",
        //   col3: "ALL",
        //   style: {
        //     fontSize: 10, //optional, default 12
        //   },
        // },
      ],
      invDescLabel: "Invoice Note",
      invDesc:
        "Thank you for your recent supply of materials to Jayasinghe Oil Mills Pvt. Ltd. Enclosed, please find the attached invoice providing a comprehensive overview of all supplied items during the specified time period. We sincerely appreciate your consistent reliability, which is paramount to our operations. For any further assistance or inquiries, please do not hesitate to contact us either via email or telephone. Your satisfaction is our priority, and we look forward to continuing our mutually beneficial partnership.",
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
      return console.log("No PDF Object");
    }

    var fileURL = URL.createObjectURL(pdfObject.blob);
    window.open(fileURL, "_blank");
  }

  const rep1 = document.querySelector(".rep1");
  rep1.addEventListener("click", () => {
    generatePDF();
  });
})();
