document.cookie = "id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
(() => {
  const body = document.querySelector("body"),
    sin = body.querySelector(".sin"),
    en = body.querySelector(".en"),
    c1 = body.querySelector(".c1"),
    c2 = body.querySelector(".c2"),
    tbody = body.querySelector(".tbody"),
    btn = body.querySelector(".form-button");

  var lang = getCookie("lang"); // current language

  sin.addEventListener("click", () => {
    sin.classList.add("active");
    en.classList.remove("active");

    document.documentElement.setAttribute("lang", "sin");
    // sessionStorage.setItem("lang", "sin");
    document.cookie = "lang=sin; path=/";
    lang = "sin";

    c1.textContent = data["sin"]["c1"];
    c2.textContent = data["sin"]["c2"];
    btn.textContent = data["sin"]["btn"];
    setGreeting();
  });

  en.addEventListener("click", () => {
    en.classList.add("active");
    sin.classList.remove("active");

    document.documentElement.setAttribute("lang", "en");
    // sessionStorage.setItem("lang", "en");
    document.cookie = "lang=en; path=/";
    lang = "en";

    c1.textContent = data["en"]["c1"];
    c2.textContent = data["en"]["c2"];
    btn.textContent = data["en"]["btn"];
    setGreeting();
  });

  var data = {
    sin: {
      c1: "අලෙවිසැල්",
      c2: "අලෙවිසැල් තොරතුරු බලන්න සහ යාවත්කාලීන කරන්න",
      btn: "අලුතින් එකතු කරන්න",
    },
    en: {
      c1: "Outlets",
      c2: "View and update Outlet Information",
      btn: "Add New",
    },
  };

  getData();

  function getData() {
    var row = "";
    fetch(backProxy + "/outlets?user=" + getCookie("user"), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((response) => {
        if (response.status == 200) {
          response.json().then((data) => {
            let arr = data.list;
            arr.forEach(data_to_table);

            function data_to_table(item) {
              row +=
                "<tr id=" +
                item.id +
                ">" +
                "<td data-href='./view.html'>" +
                item.id +
                "</td>" +
                "<td data-href='./view.html'>" +
                item.name +
                "</td>" +
                "<td data-href='./view.html'>" +
                item.city +
                "</td>" +
                "<td data-href='./view.html'>" +
                item.phone +
                "</td>" +
                '<td class="edit"><i class="fa-solid fa-pen-to-square icon"></i></td>' +
                '<td class="delete"><i class="fa-solid fa-trash-can icon"></i></td>' +
                "</tr>";
            }
            tbody.innerHTML = row;

            const cols = document.querySelectorAll("td[data-href]"),
              edits = document.querySelectorAll(".edit"),
              deletes = document.querySelectorAll(".delete");

            edits.forEach((edit) => {
              edit.addEventListener("click", () => {
                console.log(edit.parentElement.id);
                document.cookie = "id=" + edit.parentElement.id + "; path=/";
                window.location.href = "./edit.html";
              });
            });

            deletes.forEach((del) => {
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
                        "/outlet?id=" +
                        del.parentElement.id +
                        "&emp=" +
                        getCookie("sId"),
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
                            getData();
                          });
                        } else if (response.status === 400) {
                          response.json().then((data) => {
                            console.log(data.message);
                          });
                          if (lang == "sin")
                            Command: toastr["error"]("Outlet මකා දැමිය නොහැක");
                          else
                            Command: toastr["error"]("Unable to Delete Outlet");
                        } else if (response.status === 401) {
                          response.json().then((data) => {
                            console.log(data.message);
                          });
                          if (lang == "sin")
                            Command: toastr["error"]("වලංගු නොවන පරිශීලක");
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
            });

            cols.forEach((col) => {
              col.addEventListener("click", () => {
                document.cookie = "id=" + col.parentElement.id + "; path=/";
                window.location.href = col.dataset.href;
              });
            });
          });
        } else if (response.status === 202) {
          response.json().then((data) => {
            console.log(data.size);
          });
          if (lang == "sin") Command: toastr["info"]("අලෙවිසැල් නැත");
          else Command: toastr["info"]("No outlets");
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
})();
