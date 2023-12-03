(() => {
  const body = document.querySelector("body"),
    sin = body.querySelector(".sin"),
    en = body.querySelector(".en"),
    sTitle = body.querySelector(".stockmg-title"),
    sText = body.querySelector(".stockmg-subtitle"),
    yardH = body.querySelector(".yard-h3"),
    tbody = body.querySelector(".tbody"),
    sYard = body.querySelector(".sYard"),
    yBlock = body.querySelector(".yBlock"),
    yAmount = body.querySelector(".yAmount"),
    yDays = body.querySelector(".yDays"),
    ystatus = body.querySelector(".ystatus"),
    date = body.querySelector(".date"),
    rId = body.querySelector(".rId"),
    accept = body.querySelector(".accept"),
    decline = body.querySelector(".decline");

  var lang = getCookie("lang"); // current language

  sin.addEventListener("click", () => {
    sin.classList.add("active");
    en.classList.remove("active");

    document.documentElement.setAttribute("lang", "sin");
    document.cookie = "lang=sin; path=/";
    lang = "sin";

    sTitle.textContent = data["sin"]["sTitle"];
    sText.textContent = data["sin"]["sText"];
    accept.textContent = data["sin"]["accept"];
    decline.textContent = data["sin"]["decline"];
    setGreeting();
  });

  en.addEventListener("click", () => {
    en.classList.add("active");
    sin.classList.remove("active");

    document.documentElement.setAttribute("lang", "en");
    document.cookie = "lang=en; path=/";
    lang = "en";

    sTitle.textContent = data["en"]["sTitle"];
    sText.textContent = data["en"]["sText"];
    accept.textContent = data["en"]["accept"];
    decline.textContent = data["en"]["decline"];
    setGreeting();
  });

  var data = {
    sin: {
      sTitle: "ඉල්ලීම බලන්න",
      sText: "නිෂ්පාදනය සඳහා කොටස් ඉල්ලීම් විස්තර බලන්න",
      accept: "පිළිගන්න",
      decline: "ප්රතික්ෂේප කරන්න",
    },
    en: {
      sTitle: "View Request",
      sText: "View stock request details for Production",
      accept: "Accept",
      decline: "Decline",
    },
  };

  fetch(
    backProxy +
      "/production?user=" +
      getCookie("user") +
      "&id=" +
      getCookie("id"),
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  )
    .then((response) => {
      if (response.status == 200) {
        response.json().then((data) => {
          getYard(data.request.block, data.request.yard);

          var stat = "";

          if (data.request.status == 1) stat = "Pending Approval";
          else stat = "Accepted";

          rId.textContent = data.request.id;
          sYard.textContent = "Yard " + data.request.yard;
          yBlock.textContent = "Block " + data.request.block;
          yAmount.textContent = data.request.amount.toLocaleString("en-US");
          ystatus.textContent = stat;

          if (lang == "sin") yardH.textContent = "අංගනය " + data.request.yard;
          else yardH.textContent = "Yard " + data.request.yard;
        });
      } else if (response.status === 400) {
        response.json().then((data) => {
          console.log(data.message);
          Command: toastr["error"](data.message);
        });
      } else if (response.status === 401) {
        response.json().then((data) => {
          console.log(data.message);
          Command: toastr["error"](data.message);
        });
      } else {
        console.error("Error:", response.status);
        Command: toastr["error"](response.status, "Error");
      }
    })
    .catch((error) => {
      console.error("An error occurred:", error);
      Command: toastr["error"](error);
    });

  function getYard(id, yard) {
    let row = "";

    var formData = {
      user: getCookie("user"),
      id: id,
      yard: yard,
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
            yDays.textContent = data.block.days + " days";

            var req_date = new Date(data.block.date);
            date.textContent = req_date.toLocaleDateString();
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
  }
})();
