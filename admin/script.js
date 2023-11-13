(() => {
  const body = document.querySelector("body"),
    sin = body.querySelector(".sin"),
    en = body.querySelector(".en"),
    w1 = body.querySelector(".w1"),
    w1Value = body.querySelector(".w1-value"),
    w2 = body.querySelector(".w2"),
    w2Value = body.querySelector(".w2-value"),
    w3 = body.querySelector(".w3"),
    w3Value = body.querySelector(".w3-value"),
    w4 = body.querySelector(".w4"),
    w4Value = body.querySelector(".w4-value"),
    t0 = body.querySelector(".t0"),
    t1 = body.querySelector(".t1"),
    t2 = body.querySelector(".t2"),
    t3 = body.querySelector(".t3"),
    t4 = body.querySelector(".t4"),
    t5 = body.querySelector(".t5"),
    t6 = body.querySelector(".t6"),
    employee = body.querySelector(".employee"),
    collection = body.querySelector(".collection"),
    outlet = body.querySelector(".outlet");

  var lang = getCookie("lang"); // current language

  employee.addEventListener("click", () => {
    window.location.href = "./employee/view-all.html";
  });
  collection.addEventListener("click", () => {});
  outlet.addEventListener("click", () => {});

  sin.addEventListener("click", () => {
    sin.classList.add("active");
    en.classList.remove("active");

    document.documentElement.setAttribute("lang", "sin");
    // sessionStorage.setItem("lang", "sin");
    document.cookie = "lang=sin; path=/";
    lang = "sin";

    w1.textContent = data["sin"]["w1"];
    w2.textContent = data["sin"]["w2"];
    w3.textContent = data["sin"]["w3"];
    w4.textContent = data["sin"]["w4"];
    t0.textContent = data["sin"]["t0"];
    t1.textContent = data["sin"]["t1"];
    t2.textContent = data["sin"]["t2"];
    t3.textContent = data["sin"]["t3"];
    t4.textContent = data["sin"]["t4"];
    t5.textContent = data["sin"]["t5"];
    t6.textContent = data["sin"]["t6"];
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
    w3.textContent = data["en"]["w3"];
    w4.textContent = data["en"]["w4"];
    t0.textContent = data["en"]["t0"];
    t1.textContent = data["en"]["t1"];
    t2.textContent = data["en"]["t2"];
    t3.textContent = data["en"]["t3"];
    t4.textContent = data["en"]["t4"];
    t5.textContent = data["en"]["t5"];
    t6.textContent = data["en"]["t6"];
    setGreeting();
  });

  var data = {
    sin: {
      w1: "සේවකයන්",
      w2: "සැපයුම්කරුවන්",
      w3: "අලෙවිසැල්",
      w4: "සැපයුම්",
      t0: "පරිපාලක මෙවලම්",
      t1: "සේවක කළමනාකරණය",
      t2: "සේවකයින් එක් කරන්න / සංස්කරණය කරන්න / ඉවත් කරන්න",
      t3: "සැපයුම් කළමනාකරණය",
      t4: "සැපයුම් වාර්තා සංස්කරණය කරන්න",
      t5: "අලෙවිසැල කළමනාකරණය",
      t6: "අලෙවිසැල් විස්තර සංස්කරණය කරන්න",
    },
    en: {
      w1: "Employees",
      w2: "Suppliers",
      w3: "Outlets",
      w4: "Collections",
      t0: "Admin Tools",
      t1: "Employee Management",
      t2: "Add / Edit / Remove Employees",
      t3: "Collection Management",
      t4: "Manually Edit Collection Records",
      t5: "Outlet Management",
      t6: "Edit Outlet Details",
    },
  };

  fetch(backProxy + "/admin?emp=" + getCookie("sId"), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  })
    .then((response) => {
      if (response.status == 200) {
        response.json().then((data) => {
          w1Value.textContent = data.employees;
          w2Value.textContent = data.suppliers;
          w3Value.textContent = data.outlets;
          w4Value.textContent = data.collections;
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
