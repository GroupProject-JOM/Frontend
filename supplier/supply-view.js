(() => {
  const body = document.querySelector("body"),
    sin = body.querySelector(".sin"),
    en = body.querySelector(".en"),
    sTitle = body.querySelector(".supply-title"),
    sText = body.querySelector(".supply-text"),
    id = body.querySelector(".id"),
    sMethod = body.querySelector(".sMethod"),
    pMethod = body.querySelector(".pMethod"),
    ccount = body.querySelector(".ccount"),
    user = body.querySelector(".user"),
    phone = body.querySelector(".phone"),
    sstatus = body.querySelector(".sstatus"),
    edit = body.querySelector(".edit"),
    del = body.querySelector(".delete");

  sin.addEventListener("click", () => {
    sin.classList.add("active");
    en.classList.remove("active");

    document.documentElement.setAttribute("lang", "sin");
    // sessionStorage.setItem("lang", "sin");
    document.cookie = "lang=sin; path=/";

    sTitle.textContent = data["sin"]["sTitle"];
    sText.textContent = data["sin"]["sText"];
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

    sTitle.textContent = data["en"]["sTitle"];
    sText.textContent = data["en"]["sText"];
    edit.textContent = data["en"]["edit"];
    del.textContent = data["en"]["del"];
    setGreeting();
  });

  var data = {
    sin: {
      sTitle: "සැපයුම් ඉල්ලීම",
      sText: "ඔබගේ සැපයුම් ඉල්ලීම් විස්තර පහත ප්‍රදර්ශනය කෙරේ",
      edit: "සංස්කරණය කරන්න",
      del: "මකන්න",
    },
    en: {
      sTitle: "Supply Request",
      sText: "Your supply request details are displayed below",
      edit: "Edit",
      del: "Delete",
    },
  };

  fetch(
    backProxy +
      "/collection?sId=" +
      getCookie("sId") +
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
          console.log(data.collection);
          id.textContent = data.collection.collection_id;
          sMethod.textContent = data.collection.sMethod;
          pMethod.textContent = data.collection.pMethod;
          ccount.textContent = data.collection.init_amount;
          user.textContent = data.collection.name;
          phone.textContent = data.collection.phone;
          sstatus.textContent = data.collection.status;
        });
      } else if (response.status === 202) {
        response.json().then((data) => {
          console.log(data.collection);
        });
      } else {
        console.error("Error:", response.status);
      }
    })
    .catch((error) => {
      console.error("An error occurred:", error);
    });

  //delete outlet
})();
