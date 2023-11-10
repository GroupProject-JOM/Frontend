document.cookie = "id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
(() => {
  const body = document.querySelector("body"),
    sin = body.querySelector(".sin"),
    en = body.querySelector(".en"),
    oTitle = body.querySelector(".outlet-title"),
    oname = body.querySelector(".oname"),
    email = body.querySelector(".email"),
    phone = body.querySelector(".phone"),
    address1 = body.querySelector(".address1"),
    address2 = body.querySelector(".address2"),
    address3 = body.querySelector(".address3"),
    btn = body.querySelector(".form-button");

  sin.addEventListener("click", () => {
    sin.classList.add("active");
    en.classList.remove("active");

    document.documentElement.setAttribute("lang", "sin");
    // sessionStorage.setItem("lang", "sin");
    document.cookie = "lang=sin; path=/";

    oTitle.textContent = data["sin"]["oTitle"];
    oname.placeholder = data["sin"]["oname"];
    email.placeholder = data["sin"]["email"];
    phone.placeholder = data["sin"]["phone"];
    address1.placeholder = data["sin"]["address1"];
    address2.placeholder = data["sin"]["address2"];
    address3.placeholder = data["sin"]["address3"];
    btn.textContent = data["sin"]["btn"];
    setGreeting();
  });

  en.addEventListener("click", () => {
    en.classList.add("active");
    sin.classList.remove("active");

    document.documentElement.setAttribute("lang", "en");
    // sessionStorage.setItem("lang", "en");
    document.cookie = "lang=en; path=/";

    oTitle.textContent = data["en"]["oTitle"];
    oname.placeholder = data["en"]["oname"];
    email.placeholder = data["en"]["email"];
    phone.placeholder = data["en"]["phone"];
    address1.placeholder = data["en"]["address1"];
    address2.placeholder = data["en"]["address2"];
    address3.placeholder = data["en"]["address3"];
    btn.textContent = data["en"]["btn"];
    setGreeting();
  });

  var data = {
    sin: {
      oTitle: "නව අලෙවිසැල එක් කරන්න",
      oname: "අලෙවිසැලේ නම",
      email: "Outlet විද්‍යුත් තැපෑල",
      phone: "අලෙවිසැල දුරකථන අංකය",
      address1: "ලිපින පේළි 1",
      address2: "වීදිය",
      address3: "නගරය",
      btn: "එකතු කරන්න",
    },
    en: {
      oTitle: "Add New Outlet",
      oname: "Outlet Name",
      email: "Outlet Email",
      phone: "Outlet Phone Number",
      address1: "Address Line 1",
      address2: "Street",
      address3: "City",
      btn: "Add",
    },
  };

  var onameStatus = false,
    emailStatus = false,
    phoneStatus = false,
    address1Status = false,
    address2Status = false,
    address3Status = false;

  btn.addEventListener("click", () => {
    if (
      typeof address3.value === "string" &&
      address3.value.trim().length === 0
    ) {
      console.log("City cannot be empty");
      address3.focus();
    } else {
      address3Status = true;
    }

    if (
      typeof address2.value === "string" &&
      address2.value.trim().length === 0
    ) {
      console.log("Street cannot be empty");
      address2.focus();
    } else {
      address2Status = true;
    }

    if (
      typeof address1.value === "string" &&
      address1.value.trim().length === 0
    ) {
      console.log("Address1 cannot be empty");
      address1.focus();
    } else {
      address1Status = true;
    }

    if (typeof phone.value === "string" && phone.value.trim().length === 0) {
      console.log("Phone cannot be empty");
      phone.focus();
    } else {
      phoneStatus = true;
    }

    if (typeof email.value === "string" && email.value.trim().length === 0) {
      console.log("Email cannot be empty");
      email.focus();
    } else {
      emailStatus = true;
    }

    if (typeof oname.value === "string" && oname.value.trim().length === 0) {
      console.log("Outlet name cannot be empty");
      oname.focus();
    } else {
      onameStatus = true;
    }

    if (
      onameStatus &&
      emailStatus &&
      phoneStatus &&
      address1Status &&
      address2Status &&
      address3Status
    ) {
      var formData = {
        name: oname.value,
        email: email.value,
        phone: phone.value,
        address1: address1.value,
        street: address2.value,
        city: address3.value,
      };
      fetch(backProxy + "/outlet", {
        method: "POST",
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
            window.location.href = "./";
          } else if (response.status === 400) {
            response.json().then((data) => {
              console.log(data.message);
            });
          } else {
            console.error("Error:", response.status);
          }
        })
        .catch((error) => {
          console.error("An error occurred:", error);
        });
    }
  });
})();
