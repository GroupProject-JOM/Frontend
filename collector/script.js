document.cookie = "id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
(() => {
  const body = document.querySelector("body"),
    sin = body.querySelector(".sin"),
    en = body.querySelector(".en"),
    modeSwitch = body.querySelector(".toggle-switch"),
    w1 = body.querySelector(".w1"),
    w1Value = body.querySelector(".w1-value"),
    w2 = body.querySelector(".w2"),
    w2Value = body.querySelector(".w2-value"),
    c1 = body.querySelector(".c1"),
    c2 = body.querySelector(".c2"),
    c4 = body.querySelector(".c4"),
    c5 = body.querySelector(".c5"),
    tbody1 = body.querySelector(".tbody1"),
    tbody2 = body.querySelector(".tbody2");

  var lang = getCookie("lang"); // current language

  sin.addEventListener("click", () => {
    sin.classList.add("active");
    en.classList.remove("active");

    document.documentElement.setAttribute("lang", "sin");
    // sessionStorage.setItem("lang", "sin");
    document.cookie = "lang=sin; path=/";
    lang = "sin";

    w1.textContent = data["sin"]["w1"];
    w2.textContent = data["sin"]["w2"];
    c1.textContent = data["sin"]["c1"];
    c2.textContent = data["sin"]["c2"];
    c4.textContent = data["sin"]["c4"];
    c5.textContent = data["sin"]["c5"];
    setGreeting();
  });

  en.addEventListener("click", () => {
    en.classList.add("active");
    sin.classList.remove("active");

    document.documentElement.setAttribute("lang", "en");
    // sessionStorage.setItem("lang", "en");
    document.cookie = "lang=en; path=/";
    lang = "en";

    w1.textContent = data["en"]["w1"];
    w2.textContent = data["en"]["w2"];
    c1.textContent = data["en"]["c1"];
    c2.textContent = data["en"]["c2"];
    c4.textContent = data["en"]["c4"];
    c5.textContent = data["en"]["c5"];
    setGreeting();
  });

  var data = {
    sin: {
      w1: "අද එකතු කිරීම්",
      w2: "අද ඉතිරිය",
      c1: "අද එකතු කිරීම්",
      c2: "සවිස්තරාත්මකව තොරතුරු බැලීමට එම සැපයුම තෝරන්න",
      c4: "ඉදිරියට එන එකතු කිරීම්",
      c5: "ඉදිරි දින 2 සඳහා ඉදිරි එකතු කිරීම් බලන්න",
    },
    en: {
      w1: "Today's Collections",
      w2: "Today's Remaining",
      c1: "Today's Collections",
      c2: "select a collection for a detailed view",
      c4: "Upcoming Collections",
      c5: "View upcoming collections for next 2 days",
    },
  };

  w1Value.textContent = 0;
  w2Value.innerHTML = `0<span>/0</span>`;

  let row1 = "",
    row2 = "";

  fetch(backProxy + "/collector?sId=" + getCookie("sId"), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  })
    .then((response) => {
      if (response.status == 200) {
        response.json().then((data) => {
          let arr1 = data.today,
            arr2 = data.upcoming;
          arr1.forEach(data_to_table1);
          arr2.forEach(data_to_table2);

          tbody1.innerHTML = row1;
          tbody2.innerHTML = row2;
          w1Value.textContent = data.count;
          w2Value.innerHTML =
            data.count - data.size + `<span>/` + data.count + `</span>`;

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
          if (data.size == -2)
            if (lang == "sin") Command: toastr["info"]("එකතු කිරීම් නැත");
            else Command: toastr["info"]("No collections");
          else if (data.size == -1) {
            let arr2 = data.upcoming;
            arr2.forEach(data_to_table2);
            tbody2.innerHTML = row2;
            if (lang == "sin") Command: toastr["info"]("අද එකතු කිරීම් නැත");
            else Command: toastr["info"]("No collections today");
          } else {
            let arr1 = data.today;
            arr1.forEach(data_to_table1);
            tbody1.innerHTML = row1;
            w1Value.textContent = data.count;
            w2Value.innerHTML =
              data.count - data.size + `<span>/` + data.count + `</span>`;
            if (lang == "sin")
              Command: toastr["info"]("ඉදිරියට එන එකතු කිරීම් නැත");
            else Command: toastr["info"]("No upcoming collections");
          }
        });

        const rows = document.querySelectorAll("tr[data-href]");
        rows.forEach((r) => {
          r.addEventListener("click", () => {
            document.cookie = "id=" + r.id + "; path=/";
            window.location.href = r.dataset.href;
          });
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

  function data_to_table1(item) {
    row1 +=
      `<tr data-href="./collection/view.html">
      <td>` +
      item.area +
      `</td>
      <td>` +
      timeString(item.time) +
      `</td>
      <td>` +
      item.amount.toLocaleString("en-US") +
      `</td>
      <td>
        <button class="direction status">Get Directions</button>
      </td>
    </tr>`;
  }

  function data_to_table2(item) {
    row2 +=
      `<tr data-href="./collection/view.html">
      <td>` +
      item.date +
      `</td>
      <td>` +
      timeString(item.time) +
      `</td>
      <td>` +
      item.area +
      `</td>
      <td>` +
      item.amount.toLocaleString("en-US") +
      `</td>
      <td>
        <button class="direction status">Get Directions</button>
      </td>
    </tr>`;
  }
})();
