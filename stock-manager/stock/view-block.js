(() => {
  const body = document.querySelector("body"),
    sin = body.querySelector(".sin"),
    en = body.querySelector(".en"),
    stitle = body.querySelector(".stockmg-title"),
    stext = body.querySelector(".stockmg-text"),
    yardH = body.querySelector(".yard-h3"),
    tbody = body.querySelector(".tbody"),
    sYard = body.querySelector(".sYard"),
    yBlock = body.querySelector(".yBlock"),
    yAmount = body.querySelector(".yAmount"),
    date = body.querySelector(".date"),
    edit = body.querySelector(".edit"),
    yDays = body.querySelector(".yDays");
    
  var lang = getCookie("lang"); // current language

  sin.addEventListener("click", () => {
    sin.classList.add("active");
    en.classList.remove("active");

    document.documentElement.setAttribute("lang", "sin");
    document.cookie = "lang=sin; path=/";
    lang = "sin";

    stitle.textContent = data["sin"]["stitle"];
    stext.textContent = data["sin"]["stext"];
    yardH.textContent = data["sin"]["yardH"];
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
    yardH.textContent = data["en"]["yardH"];
    setGreeting();
  });

  var data = {
    sin: {
      stitle: "ගබඩා තොරතුරු",
      stext: "ගබඩාවල ඇති පොල් තොග පිළිබඳ තොරතුරු",
      yardH: "අංගනය " + getCookie("id").charAt(0),
    },
    en: {
      stitle: "Block Information",
      stext:
        "Detailed view of the stock information for each block within company yards",
      yardH: "Yard " + getCookie("id").charAt(0),
    },
  };

  let row = "";

  var formData = {
    id: getCookie("id").slice(1),
    yard: getCookie("id").charAt(0),
  };

  fetch(backProxy + "/yards", {
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

          var added_date = new Date(data.block.date);
          date.textContent = added_date.toLocaleDateString();
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
