(() => {
    const notification = document.querySelector(".notification-window");
    fetch(frontProxy + "/sales-manager/notifications/notifications.html")
      .then((res) => res.text())
      .then((data) => {
        notification.innerHTML = data;
      });
  
    const notifyScript = document.createElement("script");
    notifyScript.setAttribute("src", frontProxy + "/sales-manager/notifications/script.js");
    document.body.appendChild(notifyScript);
  })();
  