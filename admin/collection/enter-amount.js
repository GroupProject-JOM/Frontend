(() => {
  const body = document.querySelector("body"),
    sin = body.querySelector(".sin"),
    en = body.querySelector(".en"),
    cTitle = body.querySelector(".collection-title"),
    cSubTitle = body.querySelector(".collection-subtitle"),
    t1 = body.querySelector(".t1"),
    initAmount = body.querySelector(".initial-amount"),
    t2 = body.querySelector(".t2"),
    t3 = body.querySelector(".t3"),
    amount = body.querySelector(".collected-amount"),
    amountError = body.querySelector(".amount-error"),
    btn = body.querySelector(".form-button");

  cSubTitle.textContent = getCookie("area");
  initAmount.textContent = getCookie("amount");

  var lang = getCookie("lang"); // current language

  sin.addEventListener("click", () => {
    sin.classList.add("active");
    en.classList.remove("active");

    document.documentElement.setAttribute("lang", "sin");
    document.cookie = "lang=sin; path=/";
    lang = "sin";

    cTitle.textContent = data["sin"]["cTitle"];
    t1.textContent = data["sin"]["t1"];
    t2.textContent = data["sin"]["t2"];
    t3.textContent = data["sin"]["t3"];
    btn.textContent = data["sin"]["btn"];
    setGreeting();
  });

  en.addEventListener("click", () => {
    en.classList.add("active");
    sin.classList.remove("active");

    document.documentElement.setAttribute("lang", "en");
    document.cookie = "lang=en; path=/";
    lang = "en";

    cTitle.textContent = data["en"]["cTitle"];
    t1.textContent = data["en"]["t1"];
    t2.textContent = data["en"]["t2"];
    t3.textContent = data["en"]["t3"];
    btn.textContent = data["en"]["btn"];
    setGreeting();
  });

  var data = {
    sin: {
      cTitle: "එකතු කිරීමේ හැඳුනුම්පත " + getCookie("id"),
      t1: "ආරම්භක පොල් ප්‍රමාණය",
      t2: "අවසාන පොල් ප්‍රමාණය",
      t3: "ඉදිරිපත් කිරීමෙන් පසු, සැපයුම්කරු ඔහුගේ අයදුම්පත භාවිතා කර පොල් ප්‍රමාණය සත්‍යාපනය කරයි.",
      btn: "සම්පූර්ණ එකතුව",
    },
    en: {
      cTitle: "Collection ID " + getCookie("id"),
      t1: "Initial Coconut Amount",
      t2: "Final Coconut Amount",
      t3: "Upon Submission, Supplier will verify the coconut amount using his application.",
      btn: "Complete Collection",
    },
  };

  var amountStatus = false;

  amount.addEventListener("input", () => {
    amount_status_func();
  });

  btn.addEventListener("click", () => {
    if (!amount_status_func()) {
      amount.focus();
    }

    if (amountStatus) {
      if (lang == "sin") {
        var title = "ඔයාට විශ්වාස ද?",
          text = "ඔබට මෙය ප්‍රතිවර්තනය කිරීමට නොහැකි වනු ඇත!",
          confirmButtonText = "ඔව්, එය සම්පූර්ණ කරන්න!",
          cancelButtonText = "අවලංගු කරන්න";
      } else {
        var title = "Are you sure?",
          text = "You won't be able to revert this!",
          confirmButtonText = "Yes, Complete it!",
          cancelButtonText = "Cancel";
      }
      Swal.fire({
        title: title,
        text: text,
        confirmButtonText: confirmButtonText,
        cancelButtonText: cancelButtonText,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: confirmButtonColor,
        cancelButtonColor: cancelButtonColor,
      }).then((result) => {
        if (result.isConfirmed) {
          if (lang == "sin") {
            var title = "සම්පූර්ණයි!",
              text =
                "එකතුව සම්පූර්ණ ලෙස සලකුණු කර මුදල සත්‍යාපනය කිරීමට සැපයුම්කරුට දන්වන්න.",
              confirmButtonText = "හරි";
          } else {
            var title = "Completed!",
              text =
                "Collection marked as complete and notify to supplier to verify amount.",
              confirmButtonText = "Ok";
          }
          // sweet alert
          Swal.fire({
            title: title,
            text: text,
            icon: "success",
            confirmButtonText: confirmButtonText,
            confirmButtonColor: confirmButtonColor,
          }).then((response) => {
            document.cookie = "final=" + amount.value + "; path=/";
            window.location.href = "./pending.html";
          });
        }
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
