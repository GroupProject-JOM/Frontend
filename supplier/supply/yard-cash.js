(() => {
    const body = document.querySelector("body"),
      sin = body.querySelector(".sin"),
      en = body.querySelector(".en"),
      sTitle = body.querySelector(".supply-title"),
      tText = body.querySelector(".top-text"),
      btn = body.querySelector(".form-button");
  
    sin.addEventListener("click", () => {
      sin.classList.add("active");
      en.classList.remove("active");
  
      document.documentElement.setAttribute("lang", "sin");
    //   sessionStorage.setItem("lang", "sin");
    document.cookie = "lang=sin";
  
      sTitle.textContent = data["sin"]["sTitle"];
      tText.innerHTML = data["sin"]["tText"];
      btn.textContent = data["sin"]["btn"];
    });
  
    en.addEventListener("click", () => {
      en.classList.add("active");
      sin.classList.remove("active");
  
      document.documentElement.setAttribute("lang", "en");
    //   sessionStorage.setItem("lang", "en");
    document.cookie = "lang=en";
  
      sTitle.textContent = data["en"]["sTitle"];
      tText.innerHTML = data["en"]["tText"];
      btn.textContent = data["en"]["btn"];
    });
  
    var data = {
      sin: {
        sTitle: "නව සැපයුම",
        tText:
          "ඔබගේ නව සැපයුම් ඉල්ලීම සඳහා විස්තර නිවැරදිව පුරවන්න. <br />ඉල්ලීම් පැය 24ක් ඇතුළත සමාලෝචනය කෙරේ. ඔබට ඒවා ඔබේ උපකරණ පුවරුව තුළ පරීක්ෂා කළ හැකිය.",
        btn: "ඉල්ලීම ඉදිරිපත් කරන්න",
      },
      en: {
        sTitle: "New Supply",
        tText:
          "Fill up the details correctly for your new supply request. <br />Requests will be reviewed within 24 hours. You can check them inside  your dashboard.",
        btn: "Submit Request",
      },
    };
  
    btn.addEventListener("click", () => {
        fetch(backProxy + "/yard?id="+getCookie('id')+"&sId="+getCookie('sId'), {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        })
          .then((response) => {
            if (response.status == 200) {
              response.json().then((data) => {
                console.log(data.message);
              });
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
    });
  })();
  