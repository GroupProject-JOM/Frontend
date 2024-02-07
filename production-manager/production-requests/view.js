(() => {
  const body = document.querySelector("body"),
    sin = body.querySelector(".sin"),
    en = body.querySelector(".en"),
    pTitle = body.querySelector(".productionmg-title"),
    pText = body.querySelector(".productionmg-subtitle"),
    yardH = body.querySelector(".yard-h3"),
    tbody = body.querySelector(".tbody"),
    sYard = body.querySelector(".sYard"),
    yBlock = body.querySelector(".yBlock"),
    yAmount = body.querySelector(".yAmount"),
    yDays = body.querySelector(".yDays"),
    ystatus = body.querySelector(".ystatus"),
    edit = body.querySelector(".edit"),
    del = body.querySelector(".delete"),
    rNote = body.querySelector(".reject-note");

  var lang = getCookie("lang"); // current language

  sin.addEventListener("click", () => {
    sin.classList.add("active");
    en.classList.remove("active");

    document.documentElement.setAttribute("lang", "sin");
    document.cookie = "lang=sin; path=/";
    lang = "sin";

    pTitle.textContent = data["sin"]["pTitle"];
    pText.textContent = data["sin"]["pText"];
    edit.textContent = data["sin"]["edit"];
    del.textContent = data["sin"]["del"];
    setGreeting();
  });

  en.addEventListener("click", () => {
    en.classList.add("active");
    sin.classList.remove("active");

    document.documentElement.setAttribute("lang", "en");
    document.cookie = "lang=en; path=/";
    lang = "en";

    pTitle.textContent = data["en"]["pTitle"];
    pText.textContent = data["en"]["pText"];
    edit.textContent = data["en"]["edit"];
    del.textContent = data["en"]["del"];
    setGreeting();
  });

  var data = {
    sin: {
      pTitle: "ඉල්ලීම බලන්න",
      pText: "නිෂ්පාදනය සඳහා කොටස් ඉල්ලීම් විස්තර බලන්න",
      edit: "සංස්කරණය කරන්න",
      del: "මකන්න",
    },
    en: {
      pTitle: "View Request",
      pText: "View stock request details for Production",
      edit: "Edit",
      del: "Delete",
    },
  };

  fetch(backProxy + "/production?id=" + getCookie("id"), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  })
    .then((response) => {
      if (response.status == 200) {
        response.json().then((data) => {
          getYard(data.request.block, data.request.yard);

          var stat = "";

          if (data.request.status == 1) stat = "Pending Approval";
          else if (data.request.status == 2) {
            stat = "Accepted";
            edit.style.display = "none";
            edit.disabled = true;
            del.style.display = "none";
            del.disabled = true;
            tbody.parentElement.style.display = "none";
            yardH.parentElement.style.display = "none";
            yDays.textContent = data.request.days + " days";
          } else if (data.request.status == 3) {
            stat = "Rejected";
            rNote.textContent = data.request.reason;
            rNote.style.display = "";
            tbody.parentElement.style.display = "none";
            yardH.parentElement.style.display = "none";
            yDays.textContent = data.request.days + " days";
          } else if (data.request.status == 4) {
            stat = "Completed";
            edit.style.display = "none";
            edit.disabled = true;
            del.style.display = "none";
            del.disabled = true;
            tbody.parentElement.style.display = "none";
            yardH.parentElement.style.display = "none";
            yDays.textContent = data.request.days + " days";
          }

          sYard.textContent = "Yard " + data.request.yard;
          yBlock.textContent = "B/" + data.request.block;
          yAmount.textContent = data.request.amount.toLocaleString("en-US");
          ystatus.textContent = stat;

          if (lang == "sin") yardH.textContent = "අංගනය " + data.request.yard;
          else yardH.textContent = "Yard " + data.request.yard;
        });
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

  function getYard(id, yard) {
    let row = "";

    var formData = {
      id: id,
      yard: yard,
    };

    fetch(backProxy + "/yards", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
      credentials: "include",
    })
      .then((response) => {
        if (response.status == 200) {
          response.json().then((data) => {
            data.yard.forEach((item) => {
              var status = "";
              if (item.days > 30) status = "stock-level4";
              else if (item.days > 25) status = "stock-level3";
              else if (item.days > 15) status = "stock-level2";
              else status = "stock-level1";

              row +=
                `<tr id=` +
                item.id +
                ` class="` +
                status +
                `">` +
                `<td> B/` +
                item.id +
                `</td>` +
                `<td>` +
                item.days +
                `</td>` +
                `<td>` +
                item.count +
                `</td>` +
                `</tr>`;
            });

            tbody.innerHTML = row;
            if (yDays.textContent == null || yDays.textContent.length == 0)
              yDays.textContent = data.block.days + " days";
          });
        } else if (response.status === 202) {
          response.json().then((data) => {
            console.log(data.message);
          });
          if (lang == "sin") Command: toastr["info"]("මොකක්හරි වැරැද්දක් වෙලා");
          else Command: toastr["info"]("Something went wrong");
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
        fetch(backProxy + "/production?id=" + getCookie("id"), {
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
                    text = "ඔබගේ නිෂ්පාදන ඉල්ලීම මකා ඇත.";
                } else {
                  var title = "Deleted!",
                    text = "Your production request has been deleted.";
                }
                // sweet alert
                Swal.fire({
                  title: title,
                  text: text,
                  icon: "success",
                  confirmButtonColor: confirmButtonColor,
                }).then((response) => {
                  window.location.href = "../";
                });
              });
            } else if (response.status === 401) {
              response.json().then((data) => {
                console.log(data.message);
              });
              if (lang == "sin") Command: toastr["error"]("වලංගු නොවන පරිශීලක");
              else Command: toastr["error"]("Invalid User");
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
