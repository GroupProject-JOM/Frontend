document.cookie = "id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";

(() => {
  const body = document.querySelector("body"),
    sin = body.querySelector(".sin"),
    en = body.querySelector(".en"),
    oTitle = body.querySelector(".outlet-title"),
    oText = body.querySelector(".outlet-text"),
    tbody1 = body.querySelector(".tbody1"),
    tbody2 = body.querySelector(".tbody2"),
    employeesTable = body.querySelector(".employees-table"),
    pastEmployeesTable = body.querySelector(".past-employees-table"),
    searchBar1 = body.querySelector(".search1"),
    searchBar2 = body.querySelector(".search2"),
    filter1 = body.querySelector(".filter-1"),
    filter2 = body.querySelector(".filter-2"),
    searchFilter1 = body.querySelector(".search-filter-1"),
    searchFilter2 = body.querySelector(".search-filter-2"),
    btn = body.querySelector(".form-button");

  var lang = getCookie("lang"); // current language

  // initalize serach boxes
  var searchBox1 = document.querySelectorAll(
    '.search-box1 input[type="text"] + span'
  );
  var searchBox2 = document.querySelectorAll(
    '.search-box2 input[type="text"] + span'
  );

  // search box search function on click
  searchBox1.forEach((elm) => {
    elm.addEventListener("click", () => {
      elm.previousElementSibling.value = "";
      search(searchBar1.value.toUpperCase(), employeesTable);
    });
  });
  searchBox2.forEach((elm) => {
    elm.addEventListener("click", () => {
      elm.previousElementSibling.value = "";
      search(searchBar2.value.toUpperCase(), pastEmployeesTable);
    });
  });

  // search box search function on input
  searchBar1.addEventListener("keyup", () => {
    search(searchBar1.value.toUpperCase(), employeesTable);
  });
  searchBar2.addEventListener("keyup", () => {
    search(searchBar2.value.toUpperCase(), pastEmployeesTable);
  });

  // filters filter functions
  filter1.addEventListener("input", () => {
    search(filter1.value.toUpperCase(), employeesTable);
  });
  filter2.addEventListener("input", () => {
    search(filter2.value.toUpperCase(), pastEmployeesTable);
  });

  // toggle view hide filter on click
  const googleIcon = document.querySelectorAll("#filter-icon");
  googleIcon.forEach((icon) => {
    icon.addEventListener("click", () => {
      icon.parentElement.classList.toggle("active");
    });
  });

  sin.addEventListener("click", () => {
    sin.classList.add("active");
    en.classList.remove("active");

    document.documentElement.setAttribute("lang", "sin");
    document.cookie = "lang=sin; path=/";
    lang = "sin";

    oTitle.textContent = data["sin"]["oTitle"];
    oText.innerHTML = data["sin"]["oText"];
    btn.textContent = data["sin"]["btn"];
    setGreeting();
  });

  en.addEventListener("click", () => {
    en.classList.add("active");
    sin.classList.remove("active");

    document.documentElement.setAttribute("lang", "en");
    document.cookie = "lang=en; path=/";
    lang = "en";

    oTitle.textContent = data["en"]["oTitle"];
    oText.innerHTML = data["en"]["oText"];
    btn.textContent = data["en"]["btn"];
    setGreeting();
  });

  var data = {
    sin: {
      oTitle: "සේවකයින් බලන්න",
      oText: "සීමාසහිත ජයසිංහ ඔයිල් මිල්ස් (PVT) හි සියලුම සේවකයින් බලන්න",
      btn: "සේවකයින් එකතු කරන්න",
    },
    en: {
      oTitle: "View Employees",
      oText: "View all the employees of Jayasinghe Oil Mills (PVT) Ltd",
      btn: "Add Employee",
    },
  };

  var row1 = "",
    row2 = "";

  fetch(backProxy + "/employees", {
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
            row1 +=
              "<tr data-href='./view.html' id=" +
              item.id +
              ">" +
              "<td>" +
              item.first_name +
              " " +
              item.last_name +
              "</td>" +
              "<td>" +
              item.role.charAt(0).toUpperCase() +
              item.role.slice(1) +
              "</td>" +
              "<td>" +
              item.phone +
              "</td>" +
              "<td>" +
              item.add_line_3 +
              "</td>" +
              "</tr>";
          }
          tbody1.innerHTML = row1;

          // pagination for table 1
          pagination("table1", 10);

          data.previous.forEach((item) => {
            row2 +=
              "<tr data-href='./view.html' id=" +
              item.id +
              ">" +
              "<td>" +
              item.first_name +
              " " +
              item.last_name +
              "</td>" +
              "<td>" +
              item.role.charAt(0).toUpperCase() +
              item.role.slice(1) +
              "</td>" +
              "<td>" +
              item.phone +
              "</td>" +
              "<td>" +
              item.add_line_3 +
              "</td>" +
              "</tr>";
          });
          tbody2.innerHTML = row2;

          const rows = document.querySelectorAll("tr[data-href]");

          rows.forEach((r) => {
            r.addEventListener("click", () => {
              document.cookie = "id=" + r.id + "; path=/";
              window.location.href = r.dataset.href;
            });
          });
        });
      } else if (response.status === 202) {
        response.json().then((data) => {
          console.log(data.size);
          if (lang == "sin") Command: toastr["error"]("සේවකයන් නැත");
          else Command: toastr["error"]("No employees");
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
})();
