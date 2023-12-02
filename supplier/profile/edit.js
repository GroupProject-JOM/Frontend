(() => {
  const body = document.querySelector("body"),
    sin = body.querySelector(".sin"),
    en = body.querySelector(".en"),
    fh = body.querySelector(".form-heading"),
    fnameError = body.querySelector(".fname-error"),
    lnameError = body.querySelector(".lname-error"),
    phoneError = body.querySelector(".phone-error"),
    address = body.querySelector(".address"),
    address1Error = body.querySelector(".address1-error"),
    address2Error = body.querySelector(".address2-error"),
    address3Error = body.querySelector(".address3-error"),
    btn = body.querySelector(".form-button"),
    fnameLabel = body.querySelector(".fname-label"),
    lnameLabel = body.querySelector(".lname-label"),
    emailLabel = body.querySelector(".email-label"),
    phoneLabel = body.querySelector(".phone-label"),
    nicLable = body.querySelector(".nic-label"),
    address1Label = body.querySelector(".address1-label"),
    address2Label = body.querySelector(".address2-label"),
    address3Label = body.querySelector(".address3-label");

  sin.addEventListener("click", () => {
    sin.classList.add("active");
    en.classList.remove("active");

    document.documentElement.setAttribute("lang", "sin");
    document.cookie = "lang=sin; path=/";
    lang = "sin";

    fh.textContent = data["sin"]["fh"];
    address.textContent = data["sin"]["address"];
    btn.textContent = data["sin"]["btn"];
    fnameLabel.textContent = data["sin"]["fnameLabel"];
    lnameLabel.textContent = data["sin"]["lnameLabel"];
    emailLabel.textContent = data["sin"]["emailLabel"];
    nicLable.textContent = data["sin"]["nicLable"];
    address1Label.textContent = data["sin"]["address1Label"];
    address2Label.textContent = data["sin"]["address2Label"];
    address3Label.textContent = data["sin"]["address3Label"];

    setGreeting();
  });

  en.addEventListener("click", () => {
    en.classList.add("active");
    sin.classList.remove("active");

    document.documentElement.setAttribute("lang", "en");
    document.cookie = "lang=en; path=/";
    lang = "en";

    fh.textContent = data["en"]["fh"];
    address.textContent = data["en"]["address"];
    btn.textContent = data["en"]["btn"];
    fnameLabel.textContent = data["en"]["fnameLabel"];
    lnameLabel.textContent = data["en"]["lnameLabel"];
    emailLabel.textContent = data["en"]["emailLabel"];
    phoneLabel.textContent = data["en"]["phoneLabel"];
    nicLable.textContent = data["en"]["nicLable"];
    address1Label.textContent = data["en"]["address1Label"];
    address2Label.textContent = data["en"]["address2Label"];
    address3Label.textContent = data["en"]["address3Label"];
    setGreeting();
  });

  var data = {
    sin: {
      fh: "ඔබගේ විස්තර සංස්කරණය කරන්න",
      address: "පුද්ගලික ලිපිනය",
      btn: "වෙනස්කම් සුරකින්න",
      fnameLabel: "මුල් නම",
      lnameLabel: "අවසන් නම",
      emailLabel: "ඊතැපැල් ලිපිනය",
      phoneLabel: "දුරකථන අංකය",
      nicLable: "ජාතික හැඳුනුම්පත් අංකය",
      address1Label: "ලිපින පේළි 1",
      address2Label: "වීදිය",
      address3Label: "නගරය",
    },
    en: {
      fh: "Edit Your Details",
      address: "Personal Address",
      btn: "Save Changes",
      fnameLabel: "First Name",
      lnameLabel: "Last Name",
      emailLabel: "Email Address",
      phoneLabel: "Phone Number",
      nicLable: "NIC Number",
      address1Label: "Address Line 1",
      address2Label: "Street",
      address3Label: "City",
    },
  };
})();
