document.cookie = "id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";

(() => {
  const body = document.querySelector("body"),
    sin = body.querySelector(".sin"),
    en = body.querySelector(".en"),
    sTitle = body.querySelector(".supply-title"),
    sText = body.querySelector(".supply-text"),
    bankTable = body.querySelector(".bankaccc-table"),
    tError = body.querySelector(".error"),
    th1 = body.querySelector(".th1"),
    th2 = body.querySelector(".th2"),
    th3 = body.querySelector(".th3"),
    holderText = body.querySelector(".acc-holder-text"),
    holder = body.querySelector(".acc-holder"),
    nicknameText = body.querySelector(".acc-nickname-text"),
    nickname = body.querySelector(".acc-nickname"),
    numberText = body.querySelector(".acc-no-text"),
    number = body.querySelector(".acc-no"),
    bankText = body.querySelector(".acc-bank-text"),
    bank = body.querySelector(".bank"),
    editBtn = body.querySelector(".edit-btn"),
    deleteBtn = body.querySelector(".delete-btn"),
    tbody = body.querySelector(".tbody"),
    closeBtn = body.querySelector(".close-btn-bank"),
    overlay = body.querySelector(".overlay"),
    searchBar = body.querySelector(".search"),
    searchFilter = body.querySelector(".search-filter"),
    btn = body.querySelector(".next");

  var lang = getCookie("lang"); // current language

  var searchBa = document.querySelectorAll(
    '.search-box input[type="text"] + span'
  );

  searchBa.forEach((elm) => {
    elm.addEventListener("click", () => {
      elm.previousElementSibling.value = "";
      search(searchBar.value.toUpperCase(), bankTable);
    });
  });

  searchBar.addEventListener("keyup", () => {
    search(searchBar.value.toUpperCase(), bankTable);
  });

  overlay.addEventListener("click", (e) => {
    if (e.target.id === "overlay") {
      overlay.style.display = "none";
      document.querySelector(".view-bank-container").style.display = "none";
    }
  });

  closeBtn.addEventListener("click", () => {
    overlay.style.display = "none";
    document.querySelector(".view-bank-container").style.display = "none";
  });

  sin.addEventListener("click", () => {
    sin.classList.add("active");
    en.classList.remove("active");

    document.documentElement.setAttribute("lang", "sin");
    document.cookie = "lang=sin; path=/";
    lang = "sin";

    sTitle.textContent = data["sin"]["sTitle"];
    sText.innerHTML = data["sin"]["sText"];
    th1.textContent = data["sin"]["th1"];
    th2.textContent = data["sin"]["th2"];
    th3.textContent = data["sin"]["th3"];
    btn.textContent = data["sin"]["btn"];
    tError.textContent = data["sin"]["tError"];
    holderText.textContent = data["sin"]["holderText"];
    nicknameText.textContent = data["sin"]["nicknameText"];
    numberText.textContent = data["sin"]["numberText"];
    bankText.textContent = data["sin"]["bankText"];
    editBtn.textContent = data["sin"]["editBtn"];
    deleteBtn.textContent = data["sin"]["deleteBtn"];
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
    th1.textContent = data["en"]["th1"];
    th2.textContent = data["en"]["th2"];
    th3.textContent = data["en"]["th3"];
    btn.textContent = data["en"]["btn"];
    tError.textContent = data["en"]["tError"];
    holderText.textContent = data["en"]["holderText"];
    nicknameText.textContent = data["en"]["nicknameText"];
    numberText.textContent = data["en"]["numberText"];
    bankText.textContent = data["en"]["bankText"];
    editBtn.textContent = data["en"]["editBtn"];
    deleteBtn.textContent = data["en"]["deleteBtn"];
    setGreeting();
  });

  var data = {
    sin: {
      sTitle: "ඔබගේ බැංකු ගිණුම්",
      sText: "ඔබගේ බැංකු ගිණුම් විස්තර බලන්න සහ සංස්කරණය කරන්න",
      th1: "ගිණුම් අංකය",
      th2: "බැංකුව",
      th3: "ගිණුම් හිමියා",
      btn: "අලුතින් එකතු කරන්න",
      tError: "**බැංකු ගිණුම් නැත",
      holderText: "ගිණුම් හිමියා",
      nicknameText: "ගිණුමේ අන්වර්ථ නාමය",
      numberText: "ගිණුම් අංකය",
      bankText: "බැංකුව",
      editBtn: "සංස්කරණය කරන්න",
      deleteBtn: "මකන්න",
    },
    en: {
      sTitle: "Your Bank Accounts",
      sText: "View and Edit the your bank account details",
      th1: "Account Number",
      th2: "Bank",
      th3: "Account Holder",
      btn: "Add New",
      tError: "**You don't have any bank accounts saved",
      holderText: "Account Holder",
      nicknameText: "Account Nickname",
      numberText: "Account Number",
      bankText: "Bank",
      editBtn: "Edit",
      deleteBtn: "Delete",
    },
  };

  getData();

  function getData() {
    var row = "";
    fetch(backProxy + "/accounts", {
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
                "<td class='view'>" +
                item.account_number +
                "</td>" +
                "<td class='view'>" +
                item.nickName +
                "</td>" +
                "<td class='view'>" +
                item.bank +
                "</td>" +
                "<td class='view'>" +
                item.name +
                "</td>" +
                '<td class="edit"><i class="fa-solid fa-pen-to-square icon"></i></td>' +
                '<td class="delete"><i class="fa-solid fa-trash-can icon"></i></td>' +
                "</tr>";
            }
            tbody.innerHTML = row;

            const cols = document.querySelectorAll(".view"),
              edits = document.querySelectorAll(".edit"),
              deletes = document.querySelectorAll(".delete");

            cols.forEach((col) => {
              col.addEventListener("click", () => {
                overlay.style.display = "flex";
                document.querySelector(".view-bank-container").style.display =
                  "block";
                number.textContent = col.parentNode.children[0].textContent;
                nickname.textContent = col.parentNode.children[1].textContent;
                bank.textContent = col.parentNode.children[2].textContent;
                holder.textContent = col.parentNode.children[3].textContent;
                document.cookie = "id=" + col.parentElement.id + "; path=/";

                deleteBtn.addEventListener("click", () => {
                  delete_account(col);
                });
              });
            });

            edits.forEach((edit) => {
              edit.addEventListener("click", () => {
                document.cookie = "id=" + edit.parentElement.id + "; path=/";
                window.location.href = "./edit.html";
              });
            });

            deletes.forEach((del) => {
              del.addEventListener("click", () => {
                delete_account(del);
              });
            });
          });
        } else if (response.status === 202) {
          response.json().then((data) => {
            tError.style.display = "block";
            bankTable.style.display = "none";
            if (lang == "sin") Command: toastr["info"]("බැංකු ගිණුම් නැත");
            else Command: toastr["info"]("No Bank Accounts");

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

  function delete_account(del) {
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
        fetch(backProxy + "/account?id=" + del.parentElement.id, {
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
  }
})();
