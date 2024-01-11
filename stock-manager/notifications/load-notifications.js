(() => {
  const notification = document.querySelector(".notification-window");
  fetch(frontProxy + "/stock-manager/notifications/notifications.html")
    .then((res) => res.text())
    .then((data) => {
      notification.innerHTML = data;
    });

  const notifyScript = document.createElement("script");
  notifyScript.setAttribute(
    "src",
    frontProxy + "/stock-manager/notifications/script.js"
  );
  document.body.appendChild(notifyScript);
})();
