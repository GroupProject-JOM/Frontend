(() => {
    fetch(
      backProxy +
        "/account?sId=" +
        sessionStorage.getItem("sId") +
        "&id=" +
        sessionStorage.getItem("id"),
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
            console.log(data.payment);
          });
        } else if (response.status === 202) {
          response.json().then((data) => {
            console.log(data.payment);
          });
        } else {
          console.error("Error:", response.status);
        }
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  })();
  