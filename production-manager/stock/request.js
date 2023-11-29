(() => {
  const body = document.querySelector("body"),
    sin = body.querySelector(".sin"),
    en = body.querySelector(".en"),
    pTitle = body.querySelector(".productionmg-title"),
    pText = body.querySelector(".productionmg-subtitle"),
    yardH = body.querySelector(".yard-h3"),
    tbody = body.querySelector(".tbody"),
    rAmount = body.querySelector(".request-amount"),
    sYard = body.querySelector(".sYard"),
    yBlock = body.querySelector(".yBlock"),
    yAmount = body.querySelector(".yAmount"),
    yDays = body.querySelector(".yDays"),
    btn = body.querySelector(".form-button");

  var lang = getCookie("lang"); // current language

  sin.addEventListener("click", () => {
    sin.classList.add("active");
    en.classList.remove("active");

    document.documentElement.setAttribute("lang", "sin");
    document.cookie = "lang=sin; path=/";
    lang = "sin";

    pTitle.textContent = data["sin"]["pTitle"];
    pText.textContent = data["sin"]["pText"];
    yardH.textContent = data["sin"]["yardH"];
    rAmount.placeholder = data["sin"]["rAmount"];
    btn.textContent = data["sin"]["btn"];
    setGreeting();
  });

  en.addEventListener("click", () => {
    en.classList.add("active");
    sin.classList.remove("active");

    document.documentElement.setAttribute("lang", "en");
    document.cookie = "lang=en; path=/";
    lang = "en";

    pTitle.textContent = data["en"]["pTitle"];
    pText.textContent = data["en"]["pText"];
    yardH.textContent = data["en"]["yardH"];
    rAmount.placeholder = data["en"]["rAmount"];
    btn.textContent = data["en"]["btn"];
    setGreeting();
  });

  var data = {
    sin: {
      pTitle: "කොටස් තොරතුරු",
      pText: "වර්ණ-කේතගත කොටස් තොරතුරු බලන්න",
      yardH: "අංගනය " + getCookie("id").charAt(0),
      rAmount: "ඉල්ලන මුදල ඇතුලත් කරන්න",
      btn: "තොග ඉල්ලන්න",
    },
    en: {
      pTitle: "View Stock",
      pText: "View and Request Stock for Production",
      yardH: "Yard " + getCookie("id").charAt(0),
      rAmount: "Enter Requesting Amount",
      btn: "Request Stock",
    },
  };

  let row = "";

  var formData = {
    user: getCookie("user"),
    id: getCookie("id").slice(1),
    yard: getCookie("id").charAt(0),
  };

  fetch(backProxy + "/yards?user=" + getCookie("user"), {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
    credentials: "include",
  })
    .then((response) => {
      if (response.status == 200) {
        response.json().then((data) => {
          data.yard.forEach((item) => {
            var status = "";
            if (item.days > 30) status = "stock-level4";
            else if (item.days > 25) status = "stock-level3";
            else if (item.days > 15) status = "stock-level2";
            else status = "stock-level1";

            row +=
              `<tr id=` +
              item.id +
              ` class="` +
              status +
              `">` +
              `<td>` +
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

          tbody.innerHTML = row;

          sYard.textContent = "Yard " + getCookie("id").charAt(0);
          yBlock.textContent = data.block.id;
          yAmount.textContent = data.block.count;
          yDays.textContent = data.block.days;
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
