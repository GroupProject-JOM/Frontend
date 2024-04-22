document.cookie = "id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";

(() => {
  const body = document.querySelector("body"),
    sin = body.querySelector(".sin"),
    en = body.querySelector(".en"),
    t1 = body.querySelector(".stockmg-t1"),
    tx1 = body.querySelector(".stockmg-tx1"),
    t2 = body.querySelector(".stockmg-t2"),
    tx2 = body.querySelector(".stockmg-tx2"),
    t3 = body.querySelector(".stockmg-t3"),
    tx3 = body.querySelector(".stockmg-tx3"),
    tbody1 = body.querySelector(".tbody1"),
    acceptedTable = body.querySelector(".accepted-table"),
    tbody2 = body.querySelector(".tbody2"),
    declinedTable = body.querySelector(".declined-table"),
    tbody3 = body.querySelector(".tbody3"),
    completedTable = body.querySelector(".completed-table"),
    searchBar1 = body.querySelector(".search1"),
    filter1 = body.querySelector(".filter-1"),
    searchBar2 = body.querySelector(".search2"),
    filter2 = body.querySelector(".filter-2"),
    searchBar3 = body.querySelector(".search3"),
    filter3 = body.querySelector(".filter-3"),
    accepted = body.querySelector(".accepted-tab"),
    declined = body.querySelector(".declined-tab"),
    completed = body.querySelector(".completed-tab");

  $(document).scroll(function () {
    var cutoff = $(window).scrollTop();
    var cutoffRange = cutoff + 200;

    $(
      ".stockmg-collections-container.stockmg-container .collection-layer"
    ).each(function () {
      if ($(this).offset().top > cutoff && $(this).offset().top < cutoffRange) {
        let id = $(this).attr("id");
        var href = $('.tabs-container .tabs a[href="#' + id + '"] button');

        $(".tabs-container .tabs button").removeClass("active-tab");
        href.addClass("active-tab");
      }
    });
  });

  var lang = getCookie("lang"); // current language

  var searchBox1 = document.querySelectorAll(
    '.search-box1 input[type="text"] + span'
  );
  var searchBox2 = document.querySelectorAll(
    '.search-box2 input[type="text"] + span'
  );
  var searchBox3 = document.querySelectorAll(
    '.search-box3 input[type="text"] + span'
  );

  searchBox1.forEach((elm) => {
    elm.addEventListener("click", () => {
      elm.previousElementSibling.value = "";
      search(searchBar1.value.toUpperCase(), acceptedTable);
    });
  });
  searchBox2.forEach((elm) => {
    elm.addEventListener("click", () => {
      elm.previousElementSibling.value = "";
      search(searchBar2.value.toUpperCase(), declinedTable);
    });
  });
  searchBox3.forEach((elm) => {
    elm.addEventListener("click", () => {
      elm.previousElementSibling.value = "";
      search(searchBar3.value.toUpperCase(), completedTable);
    });
  });

  searchBar1.addEventListener("keyup", () => {
    search(searchBar1.value.toUpperCase(), acceptedTable);
  });
  searchBar2.addEventListener("keyup", () => {
    search(searchBar2.value.toUpperCase(), declinedTable);
  });
  searchBar3.addEventListener("keyup", () => {
    search(searchBar3.value.toUpperCase(), completedTable);
  });

  filter1.addEventListener("input", () => {
    search(filter1.value.toUpperCase(), acceptedTable);
  });
  filter2.addEventListener("input", () => {
    search(filter2.value.toUpperCase(), declinedTable);
  });
  filter3.addEventListener("input", () => {
    search(filter3.value.toUpperCase(), completedTable);
  });

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

    t1.textContent = data["sin"]["t1"];
    tx1.textContent = data["sin"]["tx1"];
    t2.textContent = data["sin"]["t2"];
    tx2.textContent = data["sin"]["tx2"];
    t3.textContent = data["sin"]["t3"];
    tx3.textContent = data["sin"]["tx3"];
    accepted.textContent = data["sin"]["accepted"];
    declined.textContent = data["sin"]["declined"];
    completed.textContent = data["sin"]["completed"];
    setGreeting();
  });

  en.addEventListener("click", () => {
    en.classList.add("active");
    sin.classList.remove("active");

    document.documentElement.setAttribute("lang", "en");
    document.cookie = "lang=en; path=/";
    lang = "en";

    t1.textContent = data["en"]["t1"];
    tx1.textContent = data["en"]["tx1"];
    t2.textContent = data["en"]["t2"];
    tx2.textContent = data["en"]["tx2"];
    t3.textContent = data["en"]["t3"];
    tx3.textContent = data["en"]["tx3"];
    accepted.textContent = data["en"]["accepted"];
    declined.textContent = data["en"]["declined"];
    completed.textContent = data["en"]["completed"];
    setGreeting();
  });

  var data = {
    sin: {
      t1: "පිළිගත් එකතු කිරීම්",
      tx1: "එකතු කළ යුතු සියලුම පිළිගත් සැපයුම් ඉල්ලීම්",
      t2: "ප්‍රතික්ෂේප කළ එකතු කිරීම්",
      tx2: "ප්‍රතික්ෂේප කරන ලද සියලුම සැපයුම් ඉල්ලීම්",
      t3: "සම්පුර්ණ කරන ලද එකතු කිරීම්",
      tx3: "සම්පුර්ණ කරන ලද සියලුම පොල් එකතු කිරීම්",
      accepted: "පිළිගත්",
      declined: "ප්‍රතික්ෂේප කළ",
      completed: "සම්පූර්ණ කළ",
    },
    en: {
      t1: "Accepted Collections",
      tx1: "All accepted supply requests that has to be collected",
      t2: "Declined Collections",
      tx2: "All declined supply requests",
      t3: "Completed Collections",
      tx3: "All completed coconut collections",
      accepted: "Accepted",
      declined: "Declined",
      completed: "Completed",
    },
  };

  let row1 = "",
    row2 = "",
    row3 = "";

  fetch(backProxy + "/all-collections", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  })
    .then((response) => {
      if (response.status == 200) {
        response.json().then((data) => {
          data.accepted.forEach((item) => {
            var c_fName = "-",
              c_lName = "-",
              stat = "pending";

            if (item.method == "pickup") {
              c_fName = item.c_fName;
              c_lName = item.c_lName;
              stat = "accepted";
            }

            var date_string = new Date(item.time);

            row1 +=
              `<tr id=` +
              item.id +
              ` data-href="../supply-requests/view-request.html">` +
              `<td>S/${capitalize(item.method)[0]}/${item.id}` +
              `</td>` +
              `<td>` +
              item.name +
              " " +
              item.last_name +
              `</td>` +
              `<td>` +
              date_string.toLocaleDateString() +
              `</td>` +
              `<td>` +
              item.amount.toLocaleString("en-US") +
              `</td>` +
              `<td><button class="status ` +
              stat +
              `">` +
              capitalize(item.method) +
              `</button></td>` +
              `<td>` +
              c_fName +
              " " +
              c_lName +
              `</td>` +
              `</tr>`;
          });

          data.rejected.forEach((item) => {
            var stat = "pending";

            var date_string = new Date(item.date);

            if (item.method == "pickup") stat = "accepted";

            row2 +=
              `<tr id=` +
              item.id +
              ` data-href="../supply-requests/view-request.html">` +
              `<td>S/${capitalize(item.method)[0]}/${item.id}` +
              `</td>` +
              `<td>` +
              item.name +
              " " +
              item.last_name +
              `</td>` +
              `<td>` +
              date_string.toLocaleDateString() +
              `</td>` +
              `<td>` +
              item.amount.toLocaleString("en-US") +
              `</td>` +
              `<td><button class="status ` +
              stat +
              `">` +
              capitalize(item.method) +
              `</button></td>` +
              `</tr>`;
          });

          data.completed.forEach((item) => {
            var c_fName = "-",
              c_lName = "-",
              stat = "pending";

            if (item.method == "pickup") {
              c_fName = item.c_fName;
              c_lName = item.c_lName;
              stat = "accepted";
            }

            var date_string = new Date(item.time);

            row3 +=
              `<tr id=` +
              item.id +
              ` data-href="../supply-requests/view-request.html">` +
              `<td>S/${capitalize(item.method)[0]}/${item.id}` +
              `</td>` +
              `<td>` +
              item.name +
              " " +
              item.last_name +
              `</td>` +
              `<td>` +
              date_string.toLocaleDateString() +
              `</td>` +
              `<td>` +
              item.amount.toLocaleString("en-US") +
              `</td>` +
              `<td><button class="status ` +
              stat +
              `">` +
              capitalize(item.method) +
              `</button></td>` +
              `<td>` +
              c_fName +
              " " +
              c_lName +
              `</td>` +
              `</tr>`;
          });

          tbody1.innerHTML = row1;
          tbody2.innerHTML = row2;
          tbody3.innerHTML = row3;

          // pagination for 3 tables
          pagination("table1", 10);
          pagination("table2", 10);
          pagination("table3", 10);

          const rows = document.querySelectorAll("tr[data-href]");
          rows.forEach((r) => {
            r.addEventListener("click", () => {
              document.cookie = "id=" + r.id + "; path=/";
              window.location.href = r.dataset.href;
            });
          });
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
