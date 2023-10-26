(() => {
  const body = document.querySelector("body"),
    sin = body.querySelector(".sin"),
    en = body.querySelector(".en"),
    sTitle = body.querySelector(".supply-title"),
    sText = body.querySelector(".supply-text"),
    amount = body.querySelector(".coco-amount"),
    cMethod = body.querySelector(".c-method"),
    pickup = body.querySelector(".pickup"),
    pLabel = body.querySelector(".pickup-label"),
    delivered = body.querySelector(".delivered"),
    dLabel = body.querySelector(".delivered-label"),
    pMethod = body.querySelector(".p-method"),
    cash = body.querySelector(".cash"),
    cLabel = body.querySelector(".cash-label"),
    bTransfer = body.querySelector(".bank-transfer"),
    bLabel = body.querySelector(".bank-label"),
    btn = body.querySelector(".form-button");

  sin.addEventListener("click", () => {
    sin.classList.add("active");
    en.classList.remove("active");

    document.documentElement.setAttribute("lang", "sin");
    // sessionStorage.setItem("lang", "sin");
    document.cookie = "lang=sin; path=/";

    sTitle.textContent = data["sin"]["sTitle"];
    sText.innerHTML = data["sin"]["sText"];
    amount.placeholder = data["sin"]["amount"];
    cMethod.textContent = data["sin"]["cMethod"];
    pLabel.textContent = data["sin"]["pLabel"];
    dLabel.textContent = data["sin"]["dLabel"];
    pMethod.textContent = data["sin"]["pMethod"];
    cLabel.textContent = data["sin"]["cLabel"];
    bLabel.textContent = data["sin"]["bLabel"];
    btn.textContent = data["sin"]["btn"];
  });

  en.addEventListener("click", () => {
    en.classList.add("active");
    sin.classList.remove("active");

    document.documentElement.setAttribute("lang", "en");
    // sessionStorage.setItem("lang", "en");
    document.cookie = "lang=en; path=/";

    sTitle.textContent = data["en"]["sTitle"];
    sText.innerHTML = data["en"]["sText"];
    amount.placeholder = data["en"]["amount"];
    cMethod.textContent = data["en"]["cMethod"];
    pLabel.textContent = data["en"]["pLabel"];
    dLabel.textContent = data["en"]["dLabel"];
    pMethod.textContent = data["en"]["pMethod"];
    cLabel.textContent = data["en"]["cLabel"];
    bLabel.textContent = data["en"]["bLabel"];
    btn.textContent = data["en"]["btn"];
  });

  var data = {
    sin: {
      sTitle: "නව සැපයුම",
      sText:
        "ඔබගේ නව සැපයුම් ඉල්ලීම සඳහා විස්තර නිවැරදිව පුරවන්න. <br /> ඉල්ලීම් පැය 24ක් ඇතුළත සමාලෝචනය කෙරේ. ඔබට ඒවා ඔබේ උපකරණ පුවරුව තුළ පරීක්ෂා කළ හැකිය.",
      amount: "පොල් ප්‍රමාණය",
      cMethod: "එකතු කිරීමේ ක්රමය",
      pLabel: "වත්තේ පිකප්",
      dLabel: "අංගනයට භාර දෙන ලදී",
      pMethod: "ගෙවීම් ක්රමය",
      cLabel: "පිකප් මත මුදල්",
      bLabel: "බැංකු හුවමාරුව",
      btn: "ඊළඟ",
    },
    en: {
      sTitle: "New Supply",
      sText:
        "Fill up the details correctly for your new supply request. <br /> Requests will be reviewed within 24 hours. You can check them inside your dashboard.",
      amount: "Coconut Amount",
      cMethod: "Collection Method",
      pLabel: "Pickup at Estate",
      dLabel: "Delivered to Yard",
      pMethod: "Payment Method",
      cLabel: "Cash on Pickup",
      bLabel: "Bank Transfer",
      btn: "Next",
    },
  };

  var amountStatus = false,
    page = "",
    collection = "",
    money = "";

  btn.addEventListener("click", () => {
    if (typeof amount.value === "string" && amount.value.trim().length === 0) {
      console.log("Estate name cannot be empty");
      amount.focus();
    } else {
      amountStatus = true;
    }

    if (pickup.checked) {
      collection = "pickup";
      if (cash.checked) {
        money = "cash";
        page = "./pickup-cash.html";
      } else if (bTransfer.checked) {
        money = "bank";
        page = "./pickup-bank.html";
      } else {
        console.log("Payment method cannot be empty");
      }
    } else if (delivered.checked) {
      collection = "yard";
      if (cash.checked) {
        money = "cash";
        page = "./yard-cash.html";
      } else if (bTransfer.checked) {
        money = "bank";
        page = "./yard-bank.html";
      } else {
        console.log("Payment method cannot be empty");
      }
    } else {
      console.log("Collection method cannot be empty");
      if (!(cash.checked || bTransfer.checked)) {
        console.log("Payment method cannot be empty");
      }
    }

    if (
      amountStatus &&
      (pickup.checked || delivered.checked) &&
      (cash.checked || bTransfer.checked)
    ) {
      // sessionStorage.setItem("amount", amount.value);
      document.cookie = "amount="+amount.value;
      var formData = {
        // supplier_id: sessionStorage.getItem("sId"),
        supplier_id: getCookie('sId'),
        initial_amount: amount.value,
        payment_method: money,
        supply_method: collection,
      };
      fetch(backProxy + "/collection", {
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
              // sessionStorage.setItem("id",data.id);
              document.cookie = "id="+data.id;
            });
            window.location.href = page;
          } else if (response.status === 400) {
            response.json().then((data) => {
              console.log(data.message);
            });
          } else if (response.status === 401) {
            response.json().then((data) => {
              console.log(data.message);
            });
          } else {
            console.error("Error:", response.status);
          }
        })
        .catch((error) => {
          console.error("An error occurred:", error);
        });
    }
  });
})();
