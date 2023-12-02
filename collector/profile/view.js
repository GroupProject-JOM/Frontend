(() => {
  const body = document.querySelector("body"),
    sin = body.querySelector(".sin"),
    en = body.querySelector(".en"),
    sTitle = body.querySelector(".supply-title"),
    tx1 = body.querySelector(".personal-info"),
    tx2 = body.querySelector(".profile-address"),
    tx3 = body.querySelector(".additional-info"),
    name = body.querySelector(".name"),
    email = body.querySelector(".email"),
    phone = body.querySelector(".phone"),
    nic = body.querySelector(".nic"),
    dob = body.querySelector(".dob"),
    gender = body.querySelector(".gender"),
    address1 = body.querySelector(".address1"),
    street = body.querySelector(".street"),
    city = body.querySelector(".city"),
    role = body.querySelector(".role");

  var lang = getCookie("lang"); // current language

  sin.addEventListener("click", () => {
    sin.classList.add("active");
    en.classList.remove("active");

    document.documentElement.setAttribute("lang", "sin");
    document.cookie = "lang=sin; path=/";
    lang = "sin";

    sTitle.textContent = data["sin"]["sTitle"];
    tx1.innerHTML = data["sin"]["tx1"];
    tx2.innerHTML = data["sin"]["tx2"];
    tx3.innerHTML = data["sin"]["tx3"];

    setGreeting();
  });

  en.addEventListener("click", () => {
    en.classList.add("active");
    sin.classList.remove("active");

    document.documentElement.setAttribute("lang", "en");
    document.cookie = "lang=en; path=/";
    lang = "en";

    sTitle.textContent = data["en"]["sTitle"];
    tx1.innerHTML = data["en"]["tx1"];
    tx2.innerHTML = data["en"]["tx2"];
    tx3.innerHTML = data["en"]["tx3"];

    setGreeting();
  });

  var data = {
    sin: {
      sTitle: "ගිණුම් තොරතුරු බලන්න",
      tx1: "පුද්ගලික තොරතුරු",
      tx2: "ලිපිනය",
      tx3: "අමතර තොරතුරු",
    },
    en: {
      sTitle: "Your Profile",
      tx1: "Personal Information",
      tx2: "Address",
      tx3: "Additional Information",
    },
  };

  fetch(backProxy + "/profile?user=" + getCookie("user"), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  })
    .then((response) => {
      if (response.status == 200) {
        response.json().then((data) => {
          name.textContent = data.user.first_name + " " + data.user.last_name;
          email.textContent = data.user.email;
          phone.textContent = data.user.phone;
          nic.textContent = data.user.nic;
          dob.textContent = data.user.dob;
          gender.textContent = data.user.gender;
          address1.textContent = data.user.add_line_1;
          street.textContent = data.user.add_line_2;
          city.textContent = data.user.add_line_3;
          role.textContent = data.user.role;
        });
      } else if (response.status === 400) {
        response.json().then((data) => {
          console.log(data.user);
          Command: toastr["error"](data.user);
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
})();
