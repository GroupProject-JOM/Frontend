(() => {
  const body = document.querySelector("body"),
    sin = body.querySelector(".sin"),
    en = body.querySelector(".en"),
    dTitle = body.querySelector(".distributor-title"),
    dText = body.querySelector(".distributor-text"),
    btn = body.querySelector(".form-button"),
    searchBar = body.querySelector(".search"),
    outletTable = body.querySelector(".view-outlet-table"),
    oId = body.querySelector(".oId"),
    oName = body.querySelector(".oName"),
    oEmail = body.querySelector(".oEmail"),
    oPhone = body.querySelector(".oPhone"),
    oAddress = body.querySelector(".oAddress"),
    closeBtn = body.querySelector(".close-btn-outlet"),
    overlay = body.querySelector(".overlay"),
    tbody = body.querySelector(".tbody");

  var lang = getCookie("lang"); // current language

  var searchBa = document.querySelectorAll(
    '.search-box input[type="text"] + span'
  );

  searchBa.forEach((elm) => {
    elm.addEventListener("click", () => {
      elm.previousElementSibling.value = "";
      search(searchBar.value.toUpperCase(), outletTable);
    });
  });

  searchBar.addEventListener("keyup", () => {
    search(searchBar.value.toUpperCase(), outletTable);
  });

  overlay.addEventListener("click", (e) => {
    if (e.target.id === "overlay") {
      overlay.style.display = "none";
      document.querySelector(".view-outlet-window").style.display = "none";
    }
  });

  closeBtn.addEventListener("click", () => {
    overlay.style.display = "none";
    document.querySelector(".view-outlet-window").style.display = "none";
  });

  sin.addEventListener("click", () => {
    sin.classList.add("active");
    en.classList.remove("active");

    document.documentElement.setAttribute("lang", "sin");
    document.cookie = "lang=sin; path=/";
    lang = "sin";

    dTitle.textContent = data["sin"]["dTitle"];
    dText.textContent = data["sin"]["dText"];
    btn.textContent = data["sin"]["btn"];
    setGreeting();
  });

  en.addEventListener("click", () => {
    en.classList.add("active");
    sin.classList.remove("active");

    document.documentElement.setAttribute("lang", "en");
    document.cookie = "lang=en; path=/";
    lang = "en";

    dTitle.textContent = data["en"]["dTitle"];
    dText.textContent = data["en"]["dText"];
    btn.textContent = data["en"]["btn"];
    setGreeting();
  });

  var data = {
    sin: {
      dTitle: "අලෙවිසැල්",
      dText: "සමාගම සමඟ ලියාපදිංචි වී ඇති සියලුම අලෙවිසැල් පිළිබඳ විස්තර බලන්න",
      btn: "නව අලෙවිසැල එක් කරන්න",
    },
    en: {
      dTitle: "Outlets",
      dText: "View details of all the outlets registered with the company",
      btn: "Add New Outlet",
    },
  };

  var row = "";
  fetch(backProxy + "/outlets", {
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
            log(item);
            row +=
              `<tr id=${item.id}>` +
              `<td class="col">${item.id}</td>` +
              `<td class="col">${item.name}</td>` +
              `<td class="col">${item.city}</td>` +
              `<td class="col">${item.phone}</td>` +
              `<td><i class="fas fa-pen-to-square icon"></i></td>` +
              `<td><button class="status pending">View</button></td>` +
              `</tr>`;
          }
          tbody.innerHTML = row;

          const cols = document.querySelectorAll(".col"),
            edits = document.querySelectorAll(".fa-pen-to-square"),
            views = document.querySelectorAll(".status");

          cols.forEach((col) => {
            col.addEventListener("click", () => {
              document.cookie = "id=" + col.parentElement.id + "; path=/";
              window.location.href = "./update-sales.html";
            });
          });

          edits.forEach((edit) => {
            edit.addEventListener("click", () => {
              document.cookie =
                "id=" + edit.parentElement.parentElement.id + "; path=/";
              window.location.href = "./edit.html";
            });
          });

          views.forEach((view, index) => {
            view.addEventListener("click", () => {
              oId.textContent = arr[index].id;
              oName.textContent = arr[index].name;
              oEmail.textContent = arr[index].email;
              oPhone.textContent = arr[index].phone;
              oAddress.textContent =
                arr[index].address1 +
                " " +
                arr[index].street +
                " " +
                arr[index].city;

              overlay.style.display = "block";
              document.querySelector(".view-outlet-window").style.display =
                "block";
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
})();
