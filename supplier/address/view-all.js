// sessionStorage.setItem("id", 0);
document.cookie = "id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
(() => {
  const body = document.querySelector("body"),
    sin = body.querySelector(".sin"),
    en = body.querySelector(".en"),
    sTitle = body.querySelector(".supply-title"),
    sText = body.querySelector(".supply-text"),
    addressTable = body.querySelector(".addresses-table"),
    tError = body.querySelector(".error"),
    th1 = body.querySelector(".th1"),
    th2 = body.querySelector(".th2"),
    tbody = body.querySelector(".tbody"),
    searchBar = body.querySelector(".search"),
    searchFilter = body.querySelector(".search-filter"),
    btn = body.querySelector(".form-button");

  var lang = getCookie("lang"); // current language

  var searchBa = document.querySelectorAll(
    '.search-box input[type="text"] + span'
  );

  searchBa.forEach((elm) => {
    elm.addEventListener("click", () => {
      elm.previousElementSibling.value = "";
      search(searchBar.value.toUpperCase(), addressTable);
    });
  });

  searchBar.addEventListener("keyup", () => {
    search(searchBar.value.toUpperCase(), addressTable);
  });

  sin.addEventListener("click", () => {
    sin.classList.add("active");
    en.classList.remove("active");

    document.documentElement.setAttribute("lang", "sin");
    // sessionStorage.setItem("lang", "sin");
    document.cookie = "lang=sin; path=/";
    lang = "sin";

    sTitle.textContent = data["sin"]["sTitle"];
    sText.innerHTML = data["sin"]["sText"];
    th1.textContent = data["sin"]["th1"];
    th2.textContent = data["sin"]["th2"];
    btn.textContent = data["sin"]["btn"];
    tError.textContent = data["sin"]["tError"];
    setGreeting();
  });

  en.addEventListener("click", () => {
    en.classList.add("active");
    sin.classList.remove("active");

    document.documentElement.setAttribute("lang", "en");
    // sessionStorage.setItem("lang", "en");
    document.cookie = "lang=en; path=/";
    lang = "en";

    sTitle.textContent = data["en"]["sTitle"];
    sText.innerHTML = data["en"]["sText"];
    th1.textContent = data["en"]["th1"];
    th2.textContent = data["en"]["th2"];
    btn.textContent = data["en"]["btn"];
    tError.textContent = data["en"]["tError"];
    setGreeting();
  });

  var data = {
    sin: {
      sTitle: "ඔබගේ ලිපිනයන්",
      sText: "ඔබගේ වතුයායන් වල ලිපිනයන් බලන්න සහ සංස්කරණය කරන්න",
      th1: "වතුයායේ නම නම",
      th2: "ප්රදේශය/කලාපය",
      btn: "අලුතින් එකතු කරන්න",
      tError: "**ලිපිනයන් නැත",
    },
    en: {
      sTitle: "Your Addresses",
      sText: "View and Edit the your estate location",
      th1: "Estate Name",
      th2: "Area/Region",
      btn: "Add New",
      tError: "**You don't have any locations saved",
    },
  };

  getData();

  function getData() {
    var row = "";
    // fetch(backProxy + "/estates?sId=" + sessionStorage.getItem("sId"), {
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
                  var title = "ඔබට විශ්වාස ද?",
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
            tError.style.display = "block";
            addressTable.style.display = "none";
            if (lang == "sin") Command: toastr["info"]("ලිපිනයන් නැත");
            else Command: toastr["info"]("No Addresses");
            
            searchFilter.style.display = "none";
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
