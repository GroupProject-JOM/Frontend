(() => {
  const notification = document.querySelector(".notification-window");
  fetch(frontProxy + "/supplier/notifications/notifications.html")
    .then((res) => res.text())
    .then((data) => {
      notification.innerHTML = data;
    });

  const notifyScript = document.createElement("script");
  notifyScript.setAttribute(
    "src",
    frontProxy + "/supplier/notifications/script.js"
  );
  document.body.appendChild(notifyScript);
})();
