document.cookie = "id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";

(() => {
  const body = document.querySelector("body"),
    sin = body.querySelector(".sin"),
    en = body.querySelector(".en"),
    sTitle = body.querySelector(".supply-title"),
    sText = body.querySelector(".supply-text"),
    amount = body.querySelector(".coco-amount"),
    amountError = body.querySelector(".coco-error"),
    cMethod = body.querySelector(".c-method"),
    collectionError = body.querySelector(".collection-error"),
    pickup = body.querySelector(".pickup"),
    pLabel = body.querySelector(".pickup-label"),
    delivered = body.querySelector(".delivered"),
    dLabel = body.querySelector(".delivered-label"),
    pMethod = body.querySelector(".p-method"),
    paymentError = body.querySelector(".payment-error"),
    cash = body.querySelector(".cash"),
    cLabel = body.querySelector(".cash-label"),
    bTransfer = body.querySelector(".bank-transfer"),
    bLabel = body.querySelector(".bank-label"),
    btn = body.querySelector(".form-button"),
    amountLabel = body.querySelector(".coco-amount-label");
   

  var lang = getCookie("lang"); // current language

  sin.addEventListener("click", () => {
    sin.classList.add("active");
    en.classList.remove("active");

    document.documentElement.setAttribute("lang", "sin");
    document.cookie = "lang=sin; path=/";
    lang = "sin";

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
    amountLabel.textContent = data["sin"]["amountLabel"];
    setGreeting();
  });

  en.addEventListener("click", () => {
    en.classList.add("active");
    sin.classList.remove("active");

    document.documentElement.setAttribute("lang", "en");
    document.cookie = "lang=en; path=/";
    lang = "en";

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
    amountLabel.textContent = data["en"]["amountLabel"];

    setGreeting();
  });

  var data = {
    sin: {
      sTitle: "නව සැපයුම",
      sText:
        "ඔබගේ නව සැපයුම් ඉල්ලීම සඳහා විස්තර නිවැරදිව පුරවන්න. <br /> ඉල්ලීම් පැය 24ක් ඇතුළත සමාලෝචනය කෙරේ. ඔබට ඒවා ඔබේ උපකරණ පුවරුව තුළ පරීක්ෂා කළ හැකිය.",
      amount: "පොල් ප්‍රමාණය",
      cMethod: "එකතු කිරීමේ ක්රමය",
      pLabel: "වත්තෙන් එකතු කිරීම",
      dLabel: "අංගනයට භාර දීම",
      pMethod: "ගෙවීම් ක්රමය",
      cLabel: "එකතු කිරීම් සඳහා මුදල්",
      bLabel: "බැංකු හුවමාරුව",
      btn: "ඊළඟ",
    },
    en: {
      sTitle: "New Supply",
      sText:
        "Fill up the details correctly for your new supply request. <br /> Requests will be reviewed within 24 hours. You can check them inside your dashboard.",
      amount: "Enter Coconut Amount",
      cMethod: "Collection Method",
      pLabel: "Pickup at Estate",
      dLabel: "Delivered to Yard",
      pMethod: "Payment Method",
      cLabel: "Cash on Pickup",
      bLabel: "Bank Transfer",
      amountLabel: "Coconut Amount",
      btn: "Next",
    },
  };

  var amountStatus = false,
    page = "",
    collection = "",
    money = "";

  amount.addEventListener("input", () => {
    amount_status_func();
  });

  btn.addEventListener("click", () => {
    if (!amount_status_func()) {
      amount.focus();
    }

    if (pickup.checked) {
      collection = "pickup";
      collectionError.textContent = "";
      if (cash.checked) {
        money = "cash";
        page = "./pickup-cash.html";
        paymentError.textContent = "";
      } else if (bTransfer.checked) {
        money = "bank";
        page = "./pickup-bank.html";
        paymentError.textContent = "";
      } else {
        if (lang == "sin") {
          paymentError.textContent = "ගෙවීමේ ක්‍රමය හිස් විය නොහැක";
          Command: toastr["warning"]("ගෙවීමේ ක්‍රමය හිස් විය නොහැක");
        } else {
          paymentError.textContent = "Payment method cannot be empty";
          Command: toastr["warning"]("Payment method cannot be empty");
        }
      }
    } else if (delivered.checked) {
      collection = "yard";
      collectionError.textContent = "";
      if (cash.checked) {
        money = "cash";
        page = "./yard-cash.html";
        paymentError.textContent = "";
      } else if (bTransfer.checked) {
        money = "bank";
        page = "./yard-bank.html";
        paymentError.textContent = "";
      } else {
        if (lang == "sin") {
          paymentError.textContent = "ගෙවීමේ ක්‍රමය හිස් විය නොහැක";
          Command: toastr["warning"]("ගෙවීමේ ක්‍රමය හිස් විය නොහැක");
        } else {
          paymentError.textContent = "Payment method cannot be empty";
          Command: toastr["warning"]("Payment method cannot be empty");
        }
      }
    } else {
      if (lang == "sin") {
        collectionError.textContent = "එකතු කිරීමේ ක්‍රමය හිස් විය නොහැක";
        Command: toastr["warning"]("එකතු කිරීමේ ක්‍රමය හිස් විය නොහැක");
      } else {
        collectionError.textContent = "Collection method cannot be empty";
        Command: toastr["warning"]("Collection method cannot be empty");
      }
      if (!(cash.checked || bTransfer.checked)) {
        if (lang == "sin") {
          paymentError.textContent = "ගෙවීමේ ක්‍රමය හිස් විය නොහැක";
          Command: toastr["warning"]("ගෙවීමේ ක්‍රමය හිස් විය නොහැක");
        } else {
          paymentError.textContent = "Payment method cannot be empty";
          Command: toastr["warning"]("Payment method cannot be empty");
        }
      }
    }

    if (
      amountStatus &&
      (pickup.checked || delivered.checked) &&
      (cash.checked || bTransfer.checked)
    ) {
      document.cookie = "amount=" + amount.value;
      var formData = {
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
              document.cookie = "id=" + data.id;
            });
            window.location.href = page;
          } else if (response.status === 400) {
            response.json().then((data) => {
              console.log(data.message);
              Command: toastr["error"](data.message);
            });
          } else if (response.status === 401) {
            response.json().then((data) => {
              console.log(data.message);
              Command: toastr["error"](data.message);
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
    }
  });

  function amount_status_func() {
    if (typeof amount.value === "string" && amount.value.trim().length === 0) {
      if (lang == "sin") {
        amountError.textContent = "පොල් ප්‍රමාණය හිස් විය නොහැක";
        Command: toastr["warning"]("පොල් ප්‍රමාණය හිස් විය නොහැක");
      } else {
        amountError.textContent = "Coconut amount cannot be empty";
        Command: toastr["warning"]("Coconut amount cannot be empty");
      }
      amountStatus = false;
      return false;
    } else if (!checkInt(amount.value)) {
      if (lang == "sin") {
        amountError.textContent = "පොල් ප්‍රමාණය ධන නිඛිල විය යුතුය";
        Command: toastr["warning"]("පොල් ප්‍රමාණය ධන නිඛිල විය යුතුය");
      } else {
        amountError.textContent = "Coconut amount must be positive integer";
        Command: toastr["warning"]("Coconut amount must be positive integer");
      }
      amountStatus = false;
      return false;
    } else {
      amountError.textContent = "";
      amountStatus = true;
      return true;
    }
  }
})();

function checkInt(num) {
  if (Number.isInteger(+num) && +num > 0) return true;
  return false;
}
