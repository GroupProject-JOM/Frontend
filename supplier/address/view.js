(() => {
  fetch(
    backProxy +
      "/estate?sId=" +
      // sessionStorage.getItem("sId") +
      getCookie("sId") +
      "&id=" +
      // sessionStorage.getItem("id"),
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
          console.log(data.estate);
        });
      } else if (response.status === 202) {
        response.json().then((data) => {
          console.log(data.estate);
        });
      } else {
        console.error("Error:", response.status);
      }
    })
    .catch((error) => {
      console.error("An error occurred:", error);
    });
})();
