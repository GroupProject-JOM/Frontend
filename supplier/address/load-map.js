(() => {
    const notification = document.querySelector(".location-pick");
    fetch("./location-pick.html")
      .then((res) => res.text())
      .then((data) => {
        notification.innerHTML = data;
      });
  })();