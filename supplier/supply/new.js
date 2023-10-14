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
    sessionStorage.setItem("lang", "sin");

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
    sessionStorage.setItem("lang", "en");

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
      sTitle: "",
      sText: "",
      amount: "",
      cMethod: "",
      pLabel: "",
      dLabel: "",
      pMethod: "",
      cLabel: "",
      bLabel: "",
      btn: "",
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
    p = "";

  btn.addEventListener("click", () => {
    if (typeof amount.value === "string" && amount.value.trim().length === 0) {
      console.log("Estate name cannot be empty");
      amount.focus();
    } else {
      amountStatus = true;
    }

    if (pickup.checked) {
      if (cash.checked) {
        p = "./pickup-cash.html";
      } else if (bTransfer.checked) {
        p = "./pickup-bank.html";
      } else {
        console.log("Payment method cannot be empty");
      }
    } else if (delivered.checked) {
      if (cash.checked) {
        p = "./yard-cash.html";
      } else if (bTransfer.checked) {
        p = "./yard-bank.html";
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
      (cash.checked || bTransfer)
    ) {
      sessionStorage.setItem("amount", amount.value);
      window.location.href = p;
    }
  });
})();
