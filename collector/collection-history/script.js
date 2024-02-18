(() => {
  const body = document.querySelector("body"),
    sin = body.querySelector(".sin"),
    en = body.querySelector(".en"),
    cTitle = body.querySelector(".collection-title"),
    cSubTitle = body.querySelector(".collection-text"),
    tbody1 = body.querySelector(".tbody1");

  var lang = getCookie("lang"); // current language

  sin.addEventListener("click", () => {
    sin.classList.add("active");
    en.classList.remove("active");

    document.documentElement.setAttribute("lang", "sin");
    document.cookie = "lang=sin; path=/";
    lang = "sin";

    cTitle.textContent = data["sin"]["cTitle"];
    cSubTitle.textContent = data["sin"]["cSubTitle"];
    setGreeting();
  });

  en.addEventListener("click", () => {
    en.classList.add("active");
    sin.classList.remove("active");

    document.documentElement.setAttribute("lang", "en");
    document.cookie = "lang=en; path=/";
    lang = "en";

    cTitle.textContent = data["en"]["cTitle"];
    cSubTitle.textContent = data["en"]["cSubTitle"];
    setGreeting();
  });

  var data = {
    sin: {
      cTitle: "අතීත එකතු කිරීම්",
      cSubTitle: "ඔබගේ සම්පුර්ණ කරන ලද පොල් එකතුවේ සවිස්තරාත්මක දසුන",
    },
    en: {
      cTitle: "Past Collections",
      cSubTitle: "Detailed view of your completed coconut collections",
    },
  };

  var row = "";
  fetch(backProxy + "/collector", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  })
    .then((response) => {
      if (response.status == 200) {
        response.json().then((data) => {
          data.list.forEach((item) => {
            row +=
              `<tr id=${item.id}>` +
              `<td>${item.area}</td>` +
              `<td>${item.date}</td>` +
              `<td>${timeString(item.time)}</td>` +
              `<td>${item.amount.toLocaleString("en-US")}</td>` +
              `<td>${item.name} ${item.last_name}</td>` +
              `</tr>`;
          });
          tbody1.innerHTML = row;
        });
      } else if (response.status === 202) {
        response.json().then((data) => {
          console.log(data.message);
          if (lang == "sin") Command: toastr["info"]("ඉදිරියට එන එකතුවක් නැත");
          else Command: toastr["info"]("No upcoming collection");
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
