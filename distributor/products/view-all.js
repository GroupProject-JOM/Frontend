(() => {
  const body = document.querySelector("body"),
    sin = body.querySelector(".sin"),
    en = body.querySelector(".en"),
    dTitle = body.querySelector(".distributor-title"),
    dText = body.querySelector(".distributor-text"),
    searchBar = body.querySelector(".search"),
    productTable = body.querySelector(".product-table"),
    closeBtn = body.querySelector(".close-btn-product"),
    overlay = body.querySelector(".overlay"),
    type = body.querySelector(".type"),
    category = body.querySelector(".category"),
    price = body.querySelector(".price"),
    tbody = body.querySelector(".tbody");

  var lang = getCookie("lang"); // current language

  var searchBa = document.querySelectorAll(
    '.search-box input[type="text"] + span'
  );

  searchBa.forEach((elm) => {
    elm.addEventListener("click", () => {
      elm.previousElementSibling.value = "";
      search(searchBar.value.toUpperCase(), productTable);
    });
  });

  overlay.addEventListener("click", (e) => {
    if (e.target.id === "overlay") {
      overlay.style.display = "none";
      document.querySelector(".view-product-container").style.display = "none";
    }
  });

  closeBtn.addEventListener("click", () => {
    overlay.style.display = "none";
    document.querySelector(".view-product-container").style.display = "none";
  });

  searchBar.addEventListener("keyup", () => {
    search(searchBar.value.toUpperCase(), productTable);
  });

  sin.addEventListener("click", () => {
    sin.classList.add("active");
    en.classList.remove("active");

    document.documentElement.setAttribute("lang", "sin");
    document.cookie = "lang=sin; path=/";
    lang = "sin";

    dTitle.textContent = data["sin"]["dTitle"];
    dText.textContent = data["sin"]["dText"];
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
    setGreeting();
  });

  var data = {
    sin: {
      dTitle: "නිෂ්පාදන දළ විශ්ලේෂණය",
      dText: "සියලුම සමාගම් නිෂ්පාදන පිළිබඳ විස්තර බලන්න",
    },
    en: {
      dTitle: "Product Overview",
      dText: "View details of all company products",
    },
  };

  var row = "";
  fetch(backProxy + "/accepted-products", {
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
              "<td>" +
              item.id +
              "</td>" +
              "<td>" +
              item.type +
              "</td>" +
              "<td>" +
              item.category +
              "</td>" +
              "<td>" +
              (+item.price).toLocaleString("en-US") +
              " LKR</td>" +
              "</tr>";
          }
          tbody.innerHTML = row;

          const rows = document.querySelectorAll("tr");

          rows.forEach((r) => {
            r.addEventListener("click", () => {
              type.textContent = r.children[1].textContent;
              category.textContent = r.children[2].textContent;
              price.textContent = r.children[3].textContent;

              overlay.style.display = "block";
              document.querySelector(".view-product-container").style.display =
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
