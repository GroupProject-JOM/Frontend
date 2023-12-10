(() => {
    const notification = document.querySelector(".notification-window");
    fetch(frontProxy + "/collector/notifications/notifications.html")
      .then((res) => res.text())
      .then((data) => {
        notification.innerHTML = data;
      });
  
    const notifyScript = document.createElement("script");
    notifyScript.setAttribute("src", frontProxy + "/collector/notifications/script.js");
    document.body.appendChild(notifyScript);
  })();
  