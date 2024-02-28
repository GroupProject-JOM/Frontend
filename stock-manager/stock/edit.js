(() => {
  const body = document.querySelector("body"),
    sin = body.querySelector(".sin"),
    en = body.querySelector(".en"),
    stitle = body.querySelector(".stockmg-title"),
    tbody = body.querySelector(".tbody"),
    block = body.querySelector(".block"),
    amount = body.querySelector(".coco-amount"),
    amountError = body.querySelector(".coco-error"),
    period = body.querySelector(".period"),
    periodError = body.querySelector(".period-error"),
    amountLabel = body.querySelector(".amount-label"),
    periodLabel = body.querySelector(".period-label"),
    save = body.querySelector(".save");

  var lang = getCookie("lang"); // current language

  sin.addEventListener("click", () => {
    sin.classList.add("active");
    en.classList.remove("active");

    document.documentElement.setAttribute("lang", "sin");
    document.cookie = "lang=sin; path=/";
    lang = "sin";

    stitle.textContent = data["sin"]["stitle"];
    amountLabel.textContent = data["sin"]["amountLabel"];
    periodLabel.textContent = data["sin"]["periodLabel"];

    setGreeting();
  });

  en.addEventListener("click", () => {
    en.classList.add("active");
    sin.classList.remove("active");

    document.documentElement.setAttribute("lang", "en");
    document.cookie = "lang=en; path=/";
    lang = "en";

    stitle.textContent = data["en"]["stitle"];
    amountLabel.textContent = data["en"]["amountLabel"];
    periodLabel.textContent = data["en"]["periodLabel"];
    setGreeting();
  });

  var data = {
    sin: {
      stitle: "ගබඩා තොරතුරු සංස්කරණය කරන්න",
      amountLabel: "පොල් ප්රමාණය",
      periodLabel: "දින ගණන",
    },
    en: {
      stitle: "Edit Block Information",
      amountLabel: "Coconut Amount",
      periodLabel: "Number of Days",
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
              `<td> B/` +
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

          block.textContent += data.block.id;
          amount.value = data.block.count;
          period.value = data.block.days;
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

  save.addEventListener("click", () => {
    var formData = {
      id: getCookie("id").slice(1),
      date: getCookie("id").charAt(0),
      count: amount.value,
      days: period.value,
    };

    fetch(backProxy + "/yard-data", {
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
            console.log(data.message);
          });
          if (lang == "sin")
            var title = "අංගන කුට්ටිය සාර්ථකව යාවත්කාලීන කරන ලදී";
          else var title = "Yard block updated successfully";

          Swal.fire({
            title: title,
            // text: "You clicked the button!",
            icon: "success",
            confirmButtonColor: confirmButtonColor,
          }).then((response) => {
            window.location.href="./view-block.html"
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
  });
})();
