(() => {
  const body = document.querySelector("body"),
    sin = body.querySelector(".sin"),
    en = body.querySelector(".en"),
    dTitle = body.querySelector(".distibutor-title"),
    dText = body.querySelector(".distibutor-text"),
    oId = body.querySelector(".oId"),
    oName = body.querySelector(".oName"),
    oEmail = body.querySelector(".oEmail"),
    oPhone = body.querySelector(".oPhone"),
    oAddress = body.querySelector(".oAddress"),
    edit = body.querySelector(".edit"),
    del = body.querySelector(".delete");

  sin.addEventListener("click", () => {
    sin.classList.add("active");
    en.classList.remove("active");

    document.documentElement.setAttribute("lang", "sin");
    // sessionStorage.setItem("lang", "sin");
    document.cookie = "lang=sin; path=/";

    dTitle.textContent = data["sin"]["dTitle"];
    dText.textContent = data["sin"]["dText"];
    edit.textContent = data["sin"]["edit"];
    del.textContent = data["sin"]["del"];
    setGreeting();
  });

  en.addEventListener("click", () => {
    en.classList.add("active");
    sin.classList.remove("active");

    document.documentElement.setAttribute("lang", "en");
    // sessionStorage.setItem("lang", "en");
    document.cookie = "lang=en; path=/";

    dTitle.textContent = data["en"]["dTitle"];
    dText.textContent = data["en"]["dText"];
    edit.textContent = data["en"]["edit"];
    del.textContent = data["en"]["del"];
    setGreeting();
  });

  var data = {
    sin: {
      dTitle: "අලෙවිසැලේ නම",
      dText: "අලෙවිසැලේ විස්තර පහත දැක්වේ.",
      edit: "සංස්කරණය කරන්න",
      del: "මකන්න",
    },
    en: {
      dTitle: "Outlet Name",
      dText: "Outlet details are displayed below.",
      edit: "Edit",
      del: "Delete",
    },
  };

  fetch(backProxy + "/outlet?id=" + getCookie("id"), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  })
    .then((response) => {
      if (response.status == 200) {
        response.json().then((data) => {
          console.log(data.outlet);
          oId.textContent = data.outlet.id;
          oName.textContent = data.outlet.name;
          oEmail.textContent = data.outlet.email;
          oPhone.textContent = data.outlet.phone;
          oAddress.textContent =
            data.outlet.address1 +
            ", " +
            data.outlet.street +
            ", " +
            data.outlet.city;
        });
      } else if (response.status === 202) {
        response.json().then((data) => {
          console.log(data.outlet);
        });
      } else {
        console.error("Error:", response.status);
      }
    })
    .catch((error) => {
      console.error("An error occurred:", error);
    });

  //delete outlet
  del.addEventListener("click", () => {
    fetch(backProxy + "/outlet?id=" + getCookie("id"), {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((response) => {
        if (response.status == 200) {
          response.json().then((data) => {
            console.log(data.message);
            window.location.href = "./";
          });
        } else if (response.status === 400) {
          response.json().then((data) => {
            console.log(data.message);
          });
        } else {
          console.error("Error:", response.status);
          console.log(error);
        }
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  });
})();
