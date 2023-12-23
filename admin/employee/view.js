(() => {
  const body = document.querySelector("body"),
    sin = body.querySelector(".sin"),
    en = body.querySelector(".en"),
    aTitle = body.querySelector(".admin-title"),
    efname = body.querySelector(".efname"),
    elname = body.querySelector(".elname"),
    eEmail = body.querySelector(".eEmail"),
    ePhone = body.querySelector(".ePhone"),
    eAddress = body.querySelector(".eAddress"),
    eDob = body.querySelector(".eDob"),
    eNic = body.querySelector(".eNic"),
    eRole = body.querySelector(".eRole"),
    eGender = body.querySelector(".eGender"),
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

    aTitle.textContent = data["sin"]["aTitle"];
    edit.textContent = data["sin"]["edit"];
    del.textContent = data["sin"]["del"];
    setGreeting();
  });

  en.addEventListener("click", () => {
    en.classList.add("active");
    sin.classList.remove("active");

    document.documentElement.setAttribute("lang", "en");
    // sessionStorage.setItem("lang", "en");
    document.cookie = "lang=en; path=/";
    lang = "en";

    aTitle.textContent = data["en"]["aTitle"];
    edit.textContent = data["en"]["edit"];
    del.textContent = data["en"]["del"];
    setGreeting();
  });

  var data = {
    sin: {
      aTitle: "සේවක විස්තර",
      edit: "සංස්කරණය කරන්න",
      del: "ඉවත් කරන්න",
    },
    en: {
      aTitle: "Employee Details",
      edit: "Edit",
      del: "Remove",
    },
  };

  fetch(backProxy + "/employee?id=" + getCookie("id"), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  })
    .then((response) => {
      if (response.status == 200) {
        response.json().then((data) => {
          efname.textContent = data.employee.first_name;
          elname.textContent = data.employee.last_name;
          eEmail.textContent = data.employee.email;
          ePhone.textContent = data.employee.phone;
          eAddress.textContent =
            data.employee.add_line_1 +
            ", " +
            data.employee.add_line_2 +
            ", " +
            data.employee.add_line_3;
          eDob.textContent = data.employee.dob;
          eNic.textContent = data.employee.nic;
          eRole.textContent =
            data.employee.role.charAt(0).toUpperCase() +
            data.employee.role.slice(1);
          eGender.textContent = data.employee.gender;

          if (data.employee.delete == 1) {
            edit.disabled = true;
            edit.style.display = "none";
            del.disabled = true;
            del.style.display = "none";
          }
        });
      } else if (response.status === 202) {
        response.json().then((data) => {
          console.log(data.employee);
          Command: toastr["error"](data.employee);
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

  //delete outlet
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
        fetch(backProxy + "/employee?id=" + getCookie("id"), {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        })
          .then((response) => {
            if (response.status == 200) {
              response.json().then((data) => {
                console.log(data.message);
                if (lang == "sin") {
                  var title = "මකා දමන ලදී!",
                    text = "ඔබගේ ලිපිනය මකා ඇත.";
                } else {
                  var title = "Deleted!",
                    text = "Your address has been deleted.";
                }
                // sweet alert
                Swal.fire({
                  title: title,
                  text: text,
                  icon: "success",
                  confirmButtonColor: confirmButtonColor,
                }).then((response) => {
                  window.location.href = "./view-all.html";
                });
              });
            } else if (response.status === 202) {
              response.json().then((data) => {
                if (lang == "sin")
                  Command: toastr["error"]("සේවකයා මකා දැමිය නොහැක");
                else Command: toastr["error"]("Unable to Delete employee");
              });
            } else if (response.status === 401) {
              response.json().then((data) => {
                if (lang == "sin")
                  Command: toastr["error"]("වලංගු නොවන පරිශීලක");
                else Command: toastr["error"]("Invalid User");
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
