// sessionStorage.setItem("id", 0);
document.cookie = "id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
(() => {
  const body = document.querySelector("body"),
    sin = body.querySelector(".sin"),
    en = body.querySelector(".en"),
    oTitle = body.querySelector(".outlet-title"),
    oText = body.querySelector(".outlet-text"),
    tbody = body.querySelector(".tbody");

  var lang = getCookie("lang"); // current language

  sin.addEventListener("click", () => {
    sin.classList.add("active");
    en.classList.remove("active");

    document.documentElement.setAttribute("lang", "sin");
    document.cookie = "lang=sin; path=/";
    lang = "sin";

    oTitle.textContent = data["sin"]["oTitle"];
    oText.innerHTML = data["sin"]["oText"];
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
    setGreeting();
  });

  var data = {
    sin: {
      oTitle: "අද පිකප්",
      oText: "අද දිනට නියමිත පොල් පිකප් බලන්න",
    },
    en: {
      oTitle: "Today's Pickups",
      oText: "View coconut pickups scheduled for today",
    },
  };

  var row = "";
  
  fetch(backProxy + "/today-pickups?user=" + getCookie("user"), {
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
            `<tr data-href='./view.html' id=` +
            item.id +
            `>` +
            `<td>` +
            item.id +
            `</td>` +
            `<td>` +
            item.name +
            ` ` +
            item.last_name +
            `</td>` +
            `<td>` +
            timeString(item.time) +
            `</td>` +
            `<td>` +
            item.amount.toLocaleString("en-US") +
            `</td>` +
            `<td>` +
            item.c_fName +
            ` ` +
            item.c_lName +
            `</td>` +
            `</tr>`;
          }
          tbody.innerHTML = row;

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
          if (lang == "sin") Command: toastr["error"]("අද පිකප් නැත");
          else Command: toastr["error"]("No Pickups today");
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
