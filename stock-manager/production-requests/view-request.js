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
    decline = body.querySelector(".decline"),
    rtext = body.querySelector(".reason-text"),
    otherLabel = body.querySelector(".reason-label"),
    closeBtn = body.querySelector(".close-btn"),
    submit = body.querySelector(".submit"),
    op0 = body.querySelector(".op0"),
    op1 = body.querySelector(".op1"),
    op2 = body.querySelector(".op2"),
    op3 = body.querySelector(".op3"),
    overlay = body.querySelector(".overlay");

  var lang = getCookie("lang"); // current language

  decline.addEventListener("click", () => {
    overlay.style.display = "flex";
    document.querySelector(".decline-container").style.display = "block";
  });

    overlay.addEventListener("click", (e) => {
      if (e.target.id === "overlay") {
        overlay.style.display = "none";
        document.querySelector(".decline-container").style.display = "none";
      }
    });

    closeBtn.addEventListener("click", () => {
      overlay.style.display = "none";
      document.querySelector(".decline-container").style.display = "none";
    });


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
    rtext.textContent = data["sin"]["rtext"];
    submit.textContent = data["sin"]["submit"];
    otherLabel.textContent = data["sin"]["otherLabel"];
    op0.textContent = data["sin"]["op0"];
    op1.textContent = data["sin"]["op1"];
    op2.textContent = data["sin"]["op2"];
    op3.textContent = data["sin"]["op3"];

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
    rtext.textContent = data["en"]["rtext"];
    otherLabel.textContent = data["en"]["otherLabel"];
    submit.textContent = data["en"]["submit"];
    op0.textContent = data["en"]["op0"];
    op1.textContent = data["en"]["op1"];
    op2.textContent = data["en"]["op2"];
    op3.textContent = data["en"]["op3"];


    setGreeting();
  });

  var data = {
    sin: {
      sTitle: "ඉල්ලීම බලන්න",
      sText: "නිෂ්පාදනය සඳහා කොටස් ඉල්ලීම් විස්තර බලන්න",
      accept: "පිළිගන්න",
      decline: "ප්රතික්ෂේප කරන්න",
      rtext: "ඉල්ලීම ප්‍රතික්ෂේප කිරීමට හේතුව තෝරන්න",
      submit: "ඉදිරිපත් කරන්න",
      op0: "ප්රතික්ෂේප කිරීමට හේතුව තෝරන්න",
      op1: "පොල් ලබා ගත නොහැක",
      op2: "පොල් භාවිතයට සුදුසු තත්ත්වයේ නැත",
      op3: "වෙනත්",

    },
    en: {
      sTitle: "View Request",
      sText: "View stock request details for Production",
      accept: "Accept",
      decline: "Decline",
      rtext: "Select the reason for declining the request",
      otherLabel: "If other",
      submit: "Submit",
      op0: "Select reason for declining",
      op1: "Stock is not available",
      op2: "Coconuts are not in usable condition",
      op3: "Other",


    },
  };

  fetch(backProxy + "/production?id=" + getCookie("id"), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  })
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
      id: id,
      yard: yard,
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
