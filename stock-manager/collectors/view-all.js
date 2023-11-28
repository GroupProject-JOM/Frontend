document.cookie = "cId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
document.cookie = "cName=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
document.cookie = "total=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
document.cookie = "id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";

(() => {
  const body = document.querySelector("body"),
    sin = body.querySelector(".sin"),
    en = body.querySelector(".en"),
    sTitle = body.querySelector(".stockmg-title"),
    sText1 = body.querySelector(".stockmg-text1"),
    tbody = body.querySelector(".tbody");

  var lang = getCookie("lang"); // current language

  sin.addEventListener("click", () => {
    sin.classList.add("active");
    en.classList.remove("active");

    document.documentElement.setAttribute("lang", "sin");
    document.cookie = "lang=sin; path=/";
    lang = "sin";

    sTitle.textContent = data["sin"]["sTitle"];
    sText1.innerHTML = data["sin"]["sText1"];
    setGreeting();
  });

  en.addEventListener("click", () => {
    en.classList.add("active");
    sin.classList.remove("active");

    document.documentElement.setAttribute("lang", "en");
    document.cookie = "lang=en; path=/";
    lang = "en";

    sTitle.textContent = data["en"]["sTitle"];
    sText1.innerHTML = data["en"]["sText1"];
    setGreeting();
  });

  var data = {
    sin: {
      sTitle: "සමාගමේ එකතුකරන්නන්",
      sText1: "සමාගම් එකතුකරන්නන්ගේ තොරතුරු සහ ඔවුන්ගේ එකතු කිරීම් බලන්න",
    },
    en: {
      sTitle: "Collectors",
      sText1: "View information of company collectors and their collections",
    },
  };

  let row = "";

  fetch(backProxy + "/collectors?user=" + getCookie("user"), {
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
              `<tr data-href="./view.html" id=` +
              item.user_id +
              `>` +
              `<td>` +
              item.name +
              ` ` +
              item.last_name +
              `</td>` +
              `<td>` +
              item.phone +
              `</td>` +
              `<td>` +
              item.collection_count +
              `</td>` +
              `<td>` +
              item.today_total +
              `</td>` +
              `</tr>`;
          }

          tbody.innerHTML = row;

          const rows = document.querySelectorAll("tr[data-href]");
          rows.forEach((r) => {
            r.addEventListener("click", () => {
              document.cookie = "cId=" + r.id + "; path=/";
              document.cookie =
                "total=" + r.children[3].textContent + "; path=/";
              document.cookie =
                "cName=" + r.children[0].textContent + "; path=/";
              window.location.href = r.dataset.href;
            });
          });
        });
      } else if (response.status === 202) {
        response.json().then((data) => {
          console.log(data.size);
        });
        if (lang == "sin") Command: toastr["info"]("එකතුකරන්නන් නැත");
        else Command: toastr["info"]("No collectors");
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
