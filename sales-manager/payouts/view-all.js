document.cookie = "id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";

(() => {
  const body = document.querySelector("body"),
    sin = body.querySelector(".sin"),
    en = body.querySelector(".en"),
    t1 = body.querySelector(".t1"),
    t2 = body.querySelector(".t2"),
    tx1 = body.querySelector(".tx1"),
    tx2 = body.querySelector(".tx2"),
    tbody1 = body.querySelector(".tbody1"),
    tbody2 = body.querySelector(".tbody2"),
    pendingTable = body.querySelector(".pending-table"),
    completedTable = body.querySelector(".completed-table"),
    searchBar1 = body.querySelector(".search1"),
    filter1 = body.querySelector(".filter-1"),
    searchBar2 = body.querySelector(".search2"),
    filter2 = body.querySelector(".filter-2");

  var lang = getCookie("lang"); // current language

  var searchBox1 = document.querySelectorAll(
    '.search-box1 input[type="text"] + span'
  );
  var searchBox2 = document.querySelectorAll(
    '.search-box2 input[type="text"] + span'
  );

  searchBox1.forEach((elm) => {
    elm.addEventListener("click", () => {
      elm.previousElementSibling.value = "";
      search(searchBar1.value.toUpperCase(), pendingTable);
    });
  });
  searchBox2.forEach((elm) => {
    elm.addEventListener("click", () => {
      elm.previousElementSibling.value = "";
      search(searchBar2.value.toUpperCase(), completedTable);
    });
  });

  searchBar1.addEventListener("keyup", () => {
    search(searchBar1.value.toUpperCase(), pendingTable);
  });
  searchBar2.addEventListener("keyup", () => {
    search(searchBar2.value.toUpperCase(), completedTable);
  });

  filter1.addEventListener("input", () => {
    search(filter1.value.toUpperCase(), pendingTable);
  });
  filter2.addEventListener("input", () => {
    search(filter2.value.toUpperCase(), completedTable);
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
    t2.textContent = data["sin"]["t2"];
    tx1.textContent = data["sin"]["tx1"];
    tx2.textContent = data["sin"]["tx2"];
    setGreeting();
  });

  en.addEventListener("click", () => {
    en.classList.add("active");
    sin.classList.remove("active");

    document.documentElement.setAttribute("lang", "en");
    document.cookie = "lang=en; path=/";
    lang = "en";

    t1.textContent = data["en"]["t1"];
    t2.textContent = data["en"]["t2"];
    tx1.textContent = data["en"]["tx1"];
    tx2.textContent = data["en"]["tx2"];
    setGreeting();
  });

  var data = {
    sin: {
      t1: "පොරොත්තු ගෙවීම්",
      t2: "සම්පූර්ණ කරන ලද ගෙවීම්",
      tx1: "සමාගම් සැපයුම්කරුවන් සඳහා අපේක්ෂිත ගෙවීම් පිළිබඳ විස්තර බලන්න",
      tx2: "සමාගම් සැපයුම්කරුවන් සඳහා දැනටමත් ගෙවා ඇති ගෙවීම් පිළිබඳ විස්තර බලන්න",
    },
    en: {
      t1: "Pending Payments",
      t2: "Completed Payments",
      tx1: "View details of the pendings payments for company suppliers",
      tx2: "View details of the payments that are already made for company suppliers",
    },
  };

  let row1 = "",
    row2 = "";

  fetch(backProxy + "/payouts", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  })
    .then((response) => {
      if (response.status == 200) {
        response.json().then((data) => {
          let arr = data.payouts;
          arr.forEach(data_to_table);

          function data_to_table(item) {
            if (item.status == 5) {
              row1 +=
                `<tr data-href='./payment.html' id=` +
                item.id +
                `>` +
                `<td>S/${capitalize(item.method)[0]}/${item.id}</td>` +
                `<td>` +
                item.name +
                ` ` +
                item.last_name +
                `</td>` +
                `<td>` +
                capitalize(item.payment_method) +
                `</td>` +
                `<td>` +
                item.value.toLocaleString("en-US") +
                " LKR" +
                `</td>` +
                `<td>` +
                `<button class="payment-pending status">Pending</button>` +
                `</td>` +
                `</tr>`;
            } else if (item.status == 6) {
              row2 +=
                `<tr data-href='./payment.html' id=` +
                item.id +
                `>` +
                `<td>S/${capitalize(item.method)[0]}/${item.id}</td>` +
                `<td>` +
                item.name +
                ` ` +
                item.last_name +
                `</td>` +
                `<td>` +
                capitalize(item.payment_method) +
                `</td>` +
                `<td>` +
                item.value.toLocaleString("en-US") +
                " LKR" +
                `</td>` +
                `<td>` +
                `<button class="payment-paid status">Paid</button>` +
                `</td>` +
                `</tr>`;
            }
          }

          tbody1.innerHTML = row1;
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
          log(data.size);
        });
        if (lang == "sin") Command: toastr["error"]("ගෙවීම් නැත");
        else Command: toastr["error"]("No payouts");
      } else if (response.status === 401) {
        response.json().then((data) => {
          log(data.message);
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
