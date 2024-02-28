(() => {
  let loaded = false;
  
  var lang = getCookie("lang"); // current language

  const interval = setInterval(() => {
    const body = document.querySelector("body"),
      sin = body.querySelector(".sin"),
      en = body.querySelector(".en"),
      closeBtn = body.querySelector(".close-btn"),
      bell = body.querySelector(".bell"),
      fabell = body.querySelector(".fa-bell"),
      notify = body.querySelector("#notify"),
      count = document.querySelector(".count"),
      l10 = body.querySelector(".l10");

    if (!loaded && l10) {
      loaded = true;
      clearInterval(interval);
    }

    sin.addEventListener("click", () => {
      l10.textContent = data["sin"]["l10"];
    });

    en.addEventListener("click", () => {
      l10.textContent = data["en"]["l10"];
    });

    bell.addEventListener("click", () => {
      notify.style.display = "grid";

      var formData = {
        notifications: unSeenArray,
      };

      count.textContent = +count.textContent - unSeenArray.length;
      if (+count.textContent <= 0) count.textContent = null;

      if (unseenCount != 0) {
        fetch(backProxy + "/notification", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
          credentials: "include",
        })
          .then((response) => {
            if (response.status == 200) {
              response.json().then((data) => {});
            } else if (response.status === 202) {
              response.json().then((data) => {
                console.log(data.notifications);
              });
              if (lang == "sin") Command: toastr["info"]("දැනුම්දීම් නැත");
              else Command: toastr["info"]("No notifications");
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
    });

    body.addEventListener("click", (e) => {
      if (!e.target.classList.contains("do-not")) {
        notify.style.display = "none";
        // bell.classList.remove("active");
        fabell.classList.add("far");
        fabell.classList.remove("fas");
      }
    });

    bell.addEventListener("mouseover", () => {
      fabell.classList.add("fas");
      fabell.classList.remove("far");
    });

    bell.addEventListener("mouseleave", () => {
      if (notify.style.display == "none") {
        fabell.classList.add("far");
        fabell.classList.remove("fas");
      }
    });

    closeBtn.addEventListener("click", () => {
      notify.style.display = "none";
      fabell.classList.add("far");
      fabell.classList.remove("fas");
    });

    var data = {
      sin: {
        l10: "දැනුම්දීම්",
      },
      en: {
        l10: "Notifications",
      },
    };
    checkLng();
  }, 10);

  var row = "",
    unseenCount = 0,
    unSeenArray = [];

  const notifications = document.querySelector("#notifications"),
    count = document.querySelector(".count");

  fetch(backProxy + "/notification", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  })
    .then((response) => {
      if (response.status == 200) {
        response.json().then((data) => {
          let arr = data.notifications;
          arr.forEach(data_to_table);

          function data_to_table(item) {
            if (item.status == 0) {
              unseenCount++;
              unSeenArray.push(item.id);
            }
            row += ` <div id=${item.id} class="notify-msg do-not">${
              item.message
            }<span>${formatTimeDifference(item.time)}</span></div>`;
          }

          notifications.innerHTML = row;
          count.textContent = unseenCount;

          if (unseenCount == 0) count.textContent = null;
        });
      } else if (response.status === 202) {
        response.json().then((data) => {
          console.log(data.notifications);
        });
        if (lang == "sin") Command: toastr["info"]("දැනුම්දීම් නැත");
        else Command: toastr["info"]("No notifications");
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
