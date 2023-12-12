// sessionStorage.setItem("id", 0);
document.cookie = "id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
(() => {
  const body = document.querySelector("body"),
    sin = body.querySelector(".sin"),
    en = body.querySelector(".en"),
    pTitle = body.querySelector(".productionmg-title"),
    pText = body.querySelector(".productionmg-text"),
    productsTable = body.querySelector(".products-table"),
    tbody = body.querySelector(".tbody"),
    searchBar = body.querySelector(".search"),
    btn = body.querySelector(".form-button");

  var lang = getCookie("lang"); // current language

  var searchBa = document.querySelectorAll(
    '.search-box input[type="text"] + span'
  );

  searchBa.forEach((elm) => {
    elm.addEventListener("click", () => {
      elm.previousElementSibling.value = "";
      search(searchBar.value.toUpperCase(), productsTable);
    });
  });

  searchBar.addEventListener("keyup", () => {
    search(searchBar.value.toUpperCase(), productsTable);
  });

  sin.addEventListener("click", () => {
    sin.classList.add("active");
    en.classList.remove("active");

    document.documentElement.setAttribute("lang", "sin");
    document.cookie = "lang=sin; path=/";
    lang = "sin";

    pTitle.textContent = data["sin"]["pTitle"];
    pText.innerHTML = data["sin"]["pText"];
    btn.textContent = data["sin"]["btn"];
    setGreeting();
  });

  en.addEventListener("click", () => {
    en.classList.add("active");
    sin.classList.remove("active");

    document.documentElement.setAttribute("lang", "en");
    document.cookie = "lang=en; path=/";
    lang = "en";

    pTitle.textContent = data["en"]["pTitle"];
    pText.innerHTML = data["en"]["pText"];
    btn.textContent = data["en"]["btn"];
    setGreeting();
  });

  var data = {
    sin: {
      pTitle: "නිෂ්පාදන දළ විශ්ලේෂණය",
      pText: "සමාගමේ නිෂ්පාදන විස්තර බලන්න",
      btn: "අලුතින් එකතු කරන්න",
    },
    en: {
      pTitle: "Product Overview",
      pText: "View company product details",
      btn: "Add New",
    },
  };

//   getData();

  function getData() {
    var row = "";
    fetch(backProxy + "/estates", {
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
                item.estate_name +
                "</td>" +
                "<td data-href='./view.html'>" +
                item.area +
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
                    fetch(backProxy + "/estate?id=" + del.parentElement.id, {
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
                              getData();
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
            addressTable.style.display = "none";
            if (lang == "sin") Command: toastr["info"]("ලිපිනයන් නැත");
            else Command: toastr["info"]("No Addresses");
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
})();
