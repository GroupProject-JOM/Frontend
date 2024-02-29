(() => {
  const body = document.querySelector("body"),
    sin = body.querySelector(".sin"),
    en = body.querySelector(".en"),
    dTitle = body.querySelector(".distibutor-title"),
    dText = body.querySelector(".distibutor-text"),
    oId = body.querySelector(".oId"),
    oName = body.querySelector(".oName"),
    oEmail = body.querySelector(".oEmail"),
    oPhone = body.querySelector(".oPhone"),
    oAddress = body.querySelector(".oAddress"),
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

    dTitle.textContent = data["sin"]["dTitle"];
    dText.textContent = data["sin"]["dText"];
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

    dTitle.textContent = data["en"]["dTitle"];
    dText.textContent = data["en"]["dText"];
    edit.textContent = data["en"]["edit"];
    del.textContent = data["en"]["del"];
    setGreeting();
  });

  var data = {
    sin: {
      dTitle: "අලෙවිසැලේ නම",
      dText: "අලෙවිසැලේ විස්තර පහත දැක්වේ.",
      edit: "සංස්කරණය කරන්න",
      del: "මකන්න",
    },
    en: {
      dTitle: "Outlet Name",
      dText: "Outlet details are displayed below.",
      edit: "Edit",
      del: "Delete",
    },
  };

  fetch(backProxy + "/outlet?id=" + getCookie("id"), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  })
    .then((response) => {
      if (response.status == 200) {
        response.json().then((data) => {
          oId.textContent = "O/D/" + data.outlet.id;
          oName.textContent = data.outlet.name;
          oEmail.textContent = data.outlet.email;
          oPhone.textContent = data.outlet.phone;
          oAddress.textContent =
            data.outlet.address1 +
            ", " +
            data.outlet.street +
            ", " +
            data.outlet.city;
        });
      } else if (response.status === 400) {
        response.json().then((data) => {
          console.log(data.outlet);
        });
        if (lang == "sin") Command: toastr["error"]("අලෙවිසැලක් නැත");
        else Command: toastr["error"]("No outlet");
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
        fetch(backProxy + "/outlet?id=" + getCookie("id"), {
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
              });
              if (lang == "sin") {
                var title = "මකා දමන ලදී!",
                  text = "අලෙවිසැල මකා ඇත.";
              } else {
                var title = "Deleted!",
                  text = "Outlet has been deleted.";
              }
              // sweet alert
              Swal.fire({
                title: title,
                text: text,
                icon: "success",
                confirmButtonColor: confirmButtonColor,
              }).then((response) => {
                window.location.href = "./";
              });
            } else if (response.status === 400) {
              response.json().then((data) => {
                console.log(data.message);
              });
              if (lang == "sin")
                Command: toastr["error"]("Outlet මකා දැමිය නොහැක");
              else Command: toastr["error"]("Unable to Delete Outlet");
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
      }
    });
  });
})();
