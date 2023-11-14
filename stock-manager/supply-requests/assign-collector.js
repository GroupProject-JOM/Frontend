(() => {
  const body = document.querySelector("body"),
    sin = body.querySelector(".sin"),
    en = body.querySelector(".en"),
    sTitle = body.querySelector(".stockmg-title"),
    sText = body.querySelector(".stockmg-text"),
    date = body.querySelector(".date"),
    tbody = body.querySelector(".tbody");

  date.textContent = getCookie("date");

  var lang = getCookie("lang"); // current language

  sin.addEventListener("click", () => {
    sin.classList.add("active");
    en.classList.remove("active");

    document.documentElement.setAttribute("lang", "sin");
    document.cookie = "lang=sin; path=/";
    lang = "sin";

    sTitle.textContent = data["sin"]["sTitle"];
    sText.textContent = data["sin"]["sText"];
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
    setGreeting();
  });

  var data = {
    sin: {
      sTitle: "එකතුකරන්නන් පවරන්න",
      sText:
        "සක්‍රිය එකතු කිරීම් පිළිබඳ තත්‍ය කාලීන තොරතුරු බලන්න සහ නව එකතුවට එකක් පවරන්න",
    },
    en: {
      sTitle: "Assign Collectors",
      sText:
        "View real-time information on active collections and assign one to the new collection",
    },
  };

  let row = "";

  fetch(
    backProxy +
      "/assign-collector?sId=" +
      getCookie("sId") +
      "&date=" +
      getCookie("date"),
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
          let arr = data.list;
          arr.forEach(data_to_table);

          function data_to_table(item) {
            row +=
              "<tr style='cursor: default;' id=" +
              item.employee_id +
              ">" +
              "<td>" +
              item.name +
              "</td>" +
              "<td>" +
              item.row_count +
              "</td>" +
              "<td>" +
              "<button class='direction status' style='cursor: pointer;'>Assign</button>" +
              "</td>" +
              "</tr>";
          }

          tbody.innerHTML = row;

          const assigns = document.querySelectorAll(".direction");

          assigns.forEach((assign) => {
            assign.addEventListener("click", () => {
              var formData = {
                id: getCookie("id"),
                sId: getCookie("sId"),
                emp: assign.parentElement.parentElement.id,
              };
              fetch(backProxy + "/assign-collector", {
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
                      if (lang == "sin") var title = "එකතුකරන්නාට පවරා ඇත";
                      else var title = "Collector assigned!";

                      // sweet alert
                      Swal.fire({
                        title: title,
                        icon: "success",
                        confirmButtonColor: confirmButtonColor,
                      }).then((response) => {
                        window.location.href = "./";
                      });
                    });
                  } else if (response.status === 202) {
                    response.json().then((data) => {
                      console.log(data.message);
                    });
                    if (lang == "sin")
                      Command: toastr["error"]("");
                    else Command: toastr["error"]("No Collector assigned");
                  } else if (response.status === 401) {
                    response.json().then((data) => {
                      console.log(data.message);
                    });
                    if (lang == "sin")
                      Command: toastr["error"]("වලංගු නොවන පරිශීලක");
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
          });
        });
      } else if (response.status === 202) {
        response.json().then((data) => {
          console.log(data.size);
        });
        if (lang == "sin") Command: toastr["info"]("එකතුකරන්නන් නැත");
        else Command: toastr["info"]("No Collectors");
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
