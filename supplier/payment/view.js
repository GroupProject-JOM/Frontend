(() => {
  const body = document.querySelector("body"),
    sin = body.querySelector(".sin"),
    en = body.querySelector(".en"),
    sTitle = body.querySelector(".supply-title"),
    sText = body.querySelector(".supply-text"),
    hName = body.querySelector(".hName"),
    aNumber = body.querySelector(".aNumber"),
    Bank = body.querySelector(".Bank"),
    edit = body.querySelector(".edit"),
    del = body.querySelector(".delete");

  var lang = getCookie("lang"); // current language

  sin.addEventListener("click", () => {
    sin.classList.add("active");
    en.classList.remove("active");

    document.documentElement.setAttribute("lang", "sin");
    // sessionStorage.setItem("lang", "sin");
    document.cookie = "lang=sin; path=/";
    lang = "sin";

    sTitle.textContent = data["sin"]["sTitle"];
    sText.textContent = data["sin"]["sText"];
    edit.textContent = data["sin"]["edit"];
    del.textContent = data["sin"]["del"];
  });

  en.addEventListener("click", () => {
    en.classList.add("active");
    sin.classList.remove("active");

    document.documentElement.setAttribute("lang", "en");
    // sessionStorage.setItem("lang", "en");
    document.cookie = "lang=en; path=/";
    lang = "en";

    sTitle.textContent = data["en"]["sTitle"];
    sText.textContent = data["en"]["sText"];
    edit.textContent = data["en"]["edit"];
    del.textContent = data["en"]["del"];
  });

  var data = {
    sin: {
      sTitle: "ඔබගේ බැංකු ගිණුම්",
      sText: "ඔබගේ කලින් සුරකින ලද බැංකු විස්තර පහත දැක්වේ",
      edit: "සංස්කරණය කරන්න",
      del: "මකන්න",
    },
    en: {
      sTitle: "Your Bank Accounts",
      sText: "Your previously saved bank details are displayed below",
      edit: "Edit",
      del: "Delete",
    },
  };

  fetch(
    backProxy + "/account?sId=" + getCookie("sId") + "&id=" + getCookie("id"),
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
          console.log(data.account);
          hName.textContent = data.account.name;
          aNumber.textContent = data.account.account_number;
          Bank.textContent = data.account.bank;
        });
      } else if (response.status === 202) {
        response.json().then((data) => {
          console.log(data.account);
          Command: toastr["error"](data.account);
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

  del.addEventListener("click", () => {
    if (lang == "sin") {
      var title = "ඔයාට විශ්වාස ද?",
        text = "ඔබට මෙය ප්‍රතිවර්තනය කිරීමට නොහැකි වනු ඇත!",
        confirmButtonText = "ඔව්, එය මකන්න!",
        cancelButtonText = "අවලංගු කරන්න";
    } else {
      var title = "Are you sure?",
        text = "You won't be able to revert this!",
        confirmButtonText = "Yes, delete it!",
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
        fetch(
          backProxy +
            "/account?sId=" +
            getCookie("sId") +
            "&id=" +
            getCookie("id"),
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        )
          .then((response) => {
            if (response.status == 200) {
              response.json().then((data) => {
                console.log(data.message);
                if (lang == "sin") {
                  var title = "මකා දමන ලදී!",
                    text = "ඔබගේ ගිණුම මකා ඇත.";
                } else {
                  var title = "Deleted!",
                    text = "Your account has been deleted.";
                }
                // sweet alert
                Swal.fire({
                  title: title,
                  text: text,
                  icon: "success",
                }).then((response) => {
                  window.location.href = "./view-all.html";
                });
              });
            } else if (response.status === 400) {
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
  });
})();
