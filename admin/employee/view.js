(() => {
    const body = document.querySelector("body"),
      sin = body.querySelector(".sin"),
      en = body.querySelector(".en"),
      aTitle = body.querySelector(".admin-title"),
      efname = body.querySelector(".efname"),
      elname = body.querySelector(".elname"),
      eEmail = body.querySelector(".eEmail"),
      ePhone = body.querySelector(".ePhone"),
      eAddress = body.querySelector(".eAddress"),
      eDob = body.querySelector(".eDob"),
      eNic = body.querySelector(".eNic"),
      eRole = body.querySelector(".eRole"),
      edit = body.querySelector(".edit"),
      del = body.querySelector(".delete");
  
    sin.addEventListener("click", () => {
      sin.classList.add("active");
      en.classList.remove("active");
  
      document.documentElement.setAttribute("lang", "sin");
      // sessionStorage.setItem("lang", "sin");
      document.cookie = "lang=sin; path=/";
  
      aTitle.textContent = data["sin"]["aTitle"];
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
  
      aTitle.textContent = data["en"]["aTitle"];
      edit.textContent = data["en"]["edit"];
      del.textContent = data["en"]["del"];
      setGreeting();
    });
  
    var data = {
      sin: {
        aTitle: "සේවක විස්තර",
        edit: "සංස්කරණය කරන්න",
        del: "මකන්න",
      },
      en: {
        aTitle: "Employee Details",
        edit: "Edit",
        del: "Delete",
      },
    };
  
    fetch(backProxy + "/employee?id=" + getCookie("id"), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((response) => {
        if (response.status == 200) {
          response.json().then((data) => {
            efname.textContent = data.employee.first_name;
            elname.textContent = data.employee.last_name;
            eEmail.textContent = data.employee.email;
            ePhone.textContent = data.employee.phone;
            eAddress.textContent =
              data.employee.add_line_1 +
              ", " +
              data.employee.add_line_2 +
              ", " +
              data.employee.add_line_3;
              eDob.textContent = data.employee.dob;
              eNic.textContent = data.employee.nic;
              eRole.textContent = data.employee.role;
          });
        } else if (response.status === 202) {
          response.json().then((data) => {
            console.log(data.employee);
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
      fetch(backProxy + "/employee?id=" + getCookie("id"), {
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
              window.location.href = "./view-all.html";
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
  