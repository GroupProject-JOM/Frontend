document.cookie = "id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";

(() => {
  const body = document.querySelector("body"),
    sin = body.querySelector(".sin"),
    en = body.querySelector(".en"),
    stitle = body.querySelector(".admin-title"),
    stext = body.querySelector(".admin-text"),
    yard1H = body.querySelector(".yard1-h3"),
    yard2H = body.querySelector(".yard2-h3"),
    yard3H = body.querySelector(".yard3-h3"),
    tbody1 = body.querySelector(".tbody1"),
    tbody2 = body.querySelector(".tbody2"),
    tbody3 = body.querySelector(".tbody3");

  var lang = getCookie("lang"); // current language

  sin.addEventListener("click", () => {
    sin.classList.add("active");
    en.classList.remove("active");

    document.documentElement.setAttribute("lang", "sin");
    document.cookie = "lang=sin; path=/";
    lang = "sin";

    stitle.textContent = data["sin"]["stitle"];
    stext.textContent = data["sin"]["stext"];
    yard1H.textContent = data["sin"]["yard1H"];
    yard2H.textContent = data["sin"]["yard2H"];
    yard3H.textContent = data["sin"]["yard3H"];
    setGreeting();
  });

  en.addEventListener("click", () => {
    en.classList.add("active");
    sin.classList.remove("active");

    document.documentElement.setAttribute("lang", "en");
    document.cookie = "lang=en; path=/";
    lang = "en";

    stitle.textContent = data["en"]["stitle"];
    stext.textContent = data["en"]["stext"];
    yard1H.textContent = data["en"]["yard1H"];
    yard2H.textContent = data["en"]["yard2H"];
    yard3H.textContent = data["en"]["yard3H"];
    setGreeting();
  });

  var data = {
    sin: {
      stitle: "ගබඩා තොරතුරු",
      stext: "වර්ණ-කේතගත අමු ද්රව්ය තොරතුරු බලන්න",
      yard1H: "අංගනය 1",
      yard2H: "අංගනය 2",
      yard3H: "අංගනය 3",
    },
    en: {
      stitle: "Stock Information",
      stext: "View color-coded stock information",
      yard1H: "Yard 1",
      yard2H: "Yard 2",
      yard3H: "Yard 3",
    },
  };

  let row1 = "",
    row2 = "",
    row3 = "";

  fetch(backProxy + "/yards", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  })
    .then((response) => {
      if (response.status == 200) {
        response.json().then((data) => {
          data.yard1.forEach((item) => {
            var status = "";
            if (item.days > 30) status = "stock-level4";
            else if (item.days > 25) status = "stock-level3";
            else if (item.days > 15) status = "stock-level2";
            else status = "stock-level1";

            row1 +=
              `<tr id=1` +
              item.id +
              ` data-href='./view-block.html' class="` +
              status +
              `">` +
              `<td>B/` +
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

          data.yard2.forEach((item) => {
            var status = "";
            if (item.days > 30) status = "stock-level4";
            else if (item.days > 25) status = "stock-level3";
            else if (item.days > 15) status = "stock-level2";
            else status = "stock-level1";

            row2 +=
              `<tr id=2` +
              item.id +
              ` data-href='./view-block.html' class="` +
              status +
              `">` +
              `<td>B/` +
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

          data.yard3.forEach((item) => {
            var status = "";
            if (item.days > 30) status = "stock-level4";
            else if (item.days > 25) status = "stock-level3";
            else if (item.days > 15) status = "stock-level2";
            else status = "stock-level1";

            row3 +=
              `<tr id=3` +
              item.id +
              ` data-href='./view-block.html' class="` +
              status +
              `">` +
              `<td>B/` +
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

          tbody1.innerHTML = row1;
          tbody2.innerHTML = row2;
          tbody3.innerHTML = row3;

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
})();
