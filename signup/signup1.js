(() => {
  const body = document.querySelector("body"),
    sin = body.querySelector(".sin"),
    en = body.querySelector(".en"),
    fh = body.querySelector(".form-heading"),
    fname = body.querySelector(".fname"),
    lname = body.querySelector(".lname"),
    email = body.querySelector(".email"),
    password = body.querySelector(".password"),
    phone = body.querySelector(".phone"),
    address = body.querySelector(".address"),
    address1 = body.querySelector(".address1"),
    address2 = body.querySelector(".address2"),
    address3 = body.querySelector(".address3"),
    next = body.querySelector(".next");

  sin.addEventListener("click", () => {
    sin.classList.add("active");
    en.classList.remove("active");

    document.documentElement.setAttribute("lang", "sin");
    sessionStorage.setItem("lang", "sin");

    fh.textContent = data["sin"]["fh"];
    fname.placeholder = data["sin"]["fname"];
    lname.placeholder = data["sin"]["lname"];
    email.placeholder = data["sin"]["email"];
    password.placeholder = data["sin"]["password"];
    phone.placeholder = data["sin"]["phone"];
    address.textContent = data["sin"]["address"];
    address1.placeholder = data["sin"]["address1"];
    address2.placeholder = data["sin"]["address2"];
    address3.placeholder = data["sin"]["address3"];
    next.textContent = data["sin"]["next"];
  });

  en.addEventListener("click", () => {
    en.classList.add("active");
    sin.classList.remove("active");

    document.documentElement.setAttribute("lang", "en");
    sessionStorage.setItem("lang", "en");

    fh.textContent = data["en"]["fh"];
    fname.placeholder = data["en"]["fname"];
    lname.placeholder = data["en"]["lname"];
    email.placeholder = data["en"]["email"];
    password.placeholder = data["en"]["password"];
    phone.placeholder = data["en"]["phone"];
    address.textContent = data["en"]["address"];
    address1.placeholder = data["en"]["address1"];
    address2.placeholder = data["en"]["address2"];
    address3.placeholder = data["en"]["address3"];
    next.textContent = data["en"]["next"];
  });

  var data = {
    sin: {
      fh: "මූලික තොරතුරු",
      fname: "මුල් නම",
      lname: "අවසන් නම",
      email: "ඊතැපැල් ලිපිනය",
      password: "මුරපදය සාදන්න",
      phone: "දුරකථන අංකය",
      address: "පුද්ගලික ලිපිනය",
      address1: "ලිපින පේළි 1",
      address2: "වීදිය",
      address3: "නගරය",
      next: "ඊළඟ",
    },
    en: {
      fh: "Basic Information",
      fname: "First name",
      lname: "Last name",
      email: "Email Address",
      password: "Create Password",
      phone: "Phone Number",
      address: "Personal Address",
      address1: "Address Line 1",
      address2: "Street",
      address3: "City",
      next: "Next",
    },
  };

  checkLng();
})();

document.querySelector(".next").addEventListener("click", () => {
  var formData = {
    first_name: document.querySelector(".fname").value,
    last_name: document.querySelector(".lname").value,
    email: document.querySelector(".email").value,
    password: document.querySelector(".password").value,
    phone: document.querySelector(".phone").value,
    add_line_1: document.querySelector(".address1").value,
    add_line_2: document.querySelector(".address2").value,
    add_line_3: document.querySelector(".address3").value,
  };
  console.log(JSON.stringify(formData));

  fetch("http://localhost:8090/JOM_war_exploded/signup", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => {
      console.log("then");
      if (response.ok) {
        window.location.href = "http://127.0.0.1:5501/signup/signup2.html";
      } else if (response.status === 401) {
        console.log("Registration unsuccessful");
      } else {
        console.error("Error:", response.status);
      }
    })
    .catch((error) => {
      console.error("An error occurred:", error);
    });
});

const email = document.querySelector(".email"),
  error = document.querySelector(".email-error");
email.addEventListener("input", (e) => {
  if (!ValidateEmail(email)) {
    if(email.value === "") {
      error.textContent = "Enter email address!";
    }else{
    error.textContent = "Invalid email address!";
    }
  }
  else{
    error.textContent = "";
  }
});

function ValidateEmail(input) {
  var validRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (input.value.match(validRegex)) {
    return true;
  } else {
    return false;
  }
}
