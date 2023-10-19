(() => {
//   document.cookie = "name=Buddhika";
//   document.cookie = "page=supplier";
//   document.cookie = "sId=1";
//   let cookies = document.cookie;
//   console.log(cookies);

// console.log(getCookie('lang'));

  const body = document.querySelector("body"),
    sin = body.querySelector(".sin"),
    en = body.querySelector(".en"),
    w1 = body.querySelector(".w1"),
    w2 = body.querySelector(".w2"),
    c1 = body.querySelector(".c1"),
    c2 = body.querySelector(".c2"),
    c3 = body.querySelector(".c3"),
    c4 = body.querySelector(".c4"),
    c5 = body.querySelector(".c5"),
    tbody = body.querySelector(".tbody");

  sin.addEventListener("click", () => {
    sin.classList.add("active");
    en.classList.remove("active");

    document.documentElement.setAttribute("lang", "sin");
    // sessionStorage.setItem("lang", "sin");
    document.cookie = "lang=sin; path=/";

    w1.textContent = data["sin"]["w1"];
    w2.textContent = data["sin"]["w2"];
    c1.textContent = data["sin"]["c1"];
    c2.textContent = data["sin"]["c2"];
    c3.innerHTML = data["sin"]["c3"];
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

    w1.textContent = data["en"]["w1"];
    w2.textContent = data["en"]["w2"];
    c1.textContent = data["en"]["c1"];
    c2.textContent = data["en"]["c2"];
    c3.innerHTML = data["en"]["c3"];
    c4.textContent = data["en"]["c4"];
    c5.textContent = data["en"]["c5"];
    setGreeting();
  });

  var data = {
    sin: {
      w1: "දැනට පවතින සැපයුම්",
      w2: "මාසික ආදායම",
      c1: "දැනට පවතින සැපයුම්",
      c2: "ඔබේ වතුවල දැනට පවතින සැපයුම් පිළිබඳ දළ විශ්ලේෂණය",
      c3: "*සැපයුම් පොල් ප්‍රමාණය අවශ්‍ය අවම මට්ටමට නොපැමිණීම හේතුවෙන් සැපයුම් හැඳුනුම්පත S092 ප්‍රතික්ෂේප කර ඇත. <br/>මෙය දින 7කින් ස්වයංක්‍රීයව මැකෙනු ඇත",
      c4: "අතීත සැපයුම්",
      c5: "ඔබේ වතුවල අතීත සැපයුම් පිළිබඳ දළ විශ්ලේෂණය",
    },
    en: {
      w1: "Ongoing Supplies",
      w2: "Monthly Income",
      c1: "Ongoing Supplies",
      c2: "Overview of ongoing supplies at your estates",
      c3: "*Supply ID S092 has been rejected due to the supply coconut amount not meeting the minimum required. <br/>This will be automatically deleted in 7 days",
      c4: "Past Supplies",
      c5: "Overview of past supplies at your estates",
    },
  };
  
  var row = "";
  fetch(backProxy + "/collection?sId=" + getCookie("sId"), {
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
            row +="<tr>"+
            "<td>"+item.id+"</td>"+
            "<td>"+item.date+"</td>"+
            "<td>"+item.time+"</td>"+
            "<td>"+item.initial_amount+"</td>"+
            "<td>"+
              "<button class='pending status'>Pending Approval</button>"+
            "</td>"+
          "</tr>";
          }
          tbody.innerHTML = row;

          const rows = document.querySelectorAll("tr[data-href]");

          rows.forEach((r) => {
            r.addEventListener("click", () => {
              sessionStorage.setItem("id", r.id);
              window.location.href = r.dataset.href;
            });
          });
        });
      } else if (response.status === 202) {
        response.json().then((data) => {
          console.log(data.size);
        });
      } else {
        console.error("Error:", response.status);
      }
    })
    .catch((error) => {
      console.error("An error occurred:", error);
    });
})();
