(() => {
  const body = document.querySelector("body"),
    sin = body.querySelector(".sin"),
    en = body.querySelector(".en"),
    sTitle = body.querySelector(".supply-title"),
    sText = body.querySelector(".supply-text"),
    aText = body.querySelector(".amount-text"),
    amount = body.querySelector(".collected-amount"),
    mText = body.querySelector(".method-text"),
    op0 = body.querySelector(".op0"),
    op1 = body.querySelector(".op1"),
    op2 = body.querySelector(".op2"),
    pText = body.querySelector(".payment-text"),
    op3 = body.querySelector(".op3"),
    op4 = body.querySelector(".op4"),
    op5 = body.querySelector(".op5"),
    dText = body.querySelector(".date-text"),
    date = body.querySelector(".date"),
    tText = body.querySelector(".time-text"),
    time = body.querySelector(".time"),
    method = body.querySelector(".method"),
    payment = body.querySelector(".payment");

  var lang = getCookie("lang"); // current language

  sin.addEventListener("click", () => {
    sin.classList.add("active");
    en.classList.remove("active");

    document.documentElement.setAttribute("lang", "sin");
    document.cookie = "lang=sin; path=/";
    lang = "sin";

    sTitle.textContent = data["sin"]["sTitle"];
    sText.textContent = data["sin"]["sText"];
    aText.textContent = data["sin"]["aText"];
    amount.placeholder = data["sin"]["amount"];
    mText.textContent = data["sin"]["mText"];
    op0.textContent = data["sin"]["op0"];
    op1.textContent = data["sin"]["op1"];
    op2.textContent = data["sin"]["op2"];
    pText.textContent = data["sin"]["pText"];
    op3.textContent = data["sin"]["op3"];
    op4.textContent = data["sin"]["op4"];
    op5.textContent = data["sin"]["op5"];
    setGreeting();
  });

  en.addEventListener("click", () => {
    en.classList.add("active");
    sin.classList.remove("active");

    document.documentElement.setAttribute("lang", "en");
    document.cookie = "lang=en; path=/";
    lang = "en";

    sTitle.textContent = data["en"]["sTitle"];
    sText.textContent = data["en"]["sText"];
    aText.textContent = data["en"]["aText"];
    amount.placeholder = data["en"]["amount"];
    mText.textContent = data["en"]["mText"];
    op0.textContent = data["en"]["op0"];
    op1.textContent = data["en"]["op1"];
    op2.textContent = data["en"]["op2"];
    pText.textContent = data["en"]["pText"];
    op3.textContent = data["en"]["op3"];
    op4.textContent = data["en"]["op4"];
    op5.textContent = data["en"]["op5"];
    setGreeting();
  });

  var data = {
    sin: {
      sTitle: "සැපයුම සංස්කරණය කරන්න",
      sText: "ඔබගේ සැපයුම් ඉල්ලීම් විස්තර සංස්කරණය කරන්න",
      aText: "පොල් ප්‍රමාණය",
      amount: "පොල් ප්‍රමාණය ඇතුළත් කරන්න",
      mText: "සැපයුම් ක්රමය",
      op0: "සැපයුම් ක්‍රමය තෝරන්න",
      op1: "වත්තෙන් පිකප්",
      op2: "අංගනයට භාර දෙනු ලැබේ",
      pText: "ගෙවීම්",
      op3: "ගෙවීම් ක්‍රමය තෝරන්න",
      op4: "පිකප් මත මුදල්",
      op5: "බැංකුවට මාරු කරන්න",
    },
    en: {
      sTitle: "Edit Supply",
      sText: "Edit your supply request details",
      aText: "Coconut Amount",
      amount: "Enter coconut amount",
      mText: "Supply Method",
      op0: "Select supply method",
      op1: "Pickup from estate",
      op2: "Delivered to yard",
      pText: "Payment method",
      op3: "Select payment method",
      op4: "Cash on pickup",
      op5: "Transfer to bank",
    },
  };

  fetch(
    backProxy +
      "/collection?sId=" +
      getCookie("sId") +
      "&id=" +
      getCookie("id"),
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
          log(data);
          amount.value = data.collection.init_amount;
          method.value = data.collection.sMethod;
          payment.value = data.collection.pMethod;
          date.value = data.collection.date;
          time.value = data.collection.time;

          if (data.collection.sMethod == "pickup") {
            if (lang == "sin") {
              dText.textContent = "රැගෙන යන දිනය";
              tText.textContent = "රැගෙන යන කාලය";
            } else {
              dText.textContent = "Pickup Date";
              tText.textContent = "Pickup Time";
            }
          } else {
            if (lang == "sin") {
              dText.textContent = "බෙදාහැරීමේ දිනය";
              tText.textContent = "බෙදාහැරීමේ කාලය";
            } else {
              dText.textContent = "Delivery Date";
              tText.textContent = "Delivery Time";
            }
          }
        });
      } else if (response.status === 202) {
        response.json().then((data) => {
          console.log(data.collection);
          Command: toastr["error"](data.collection);
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
})();
