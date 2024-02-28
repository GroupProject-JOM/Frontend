if (getCookie("refresh") != null && getCookie("refresh").length != 0)
  window.location.href = frontProxy + "/" + getPayload(getCookie("refresh")).page;

(() => {
  const sidebar = document.querySelector(".side");
  fetch("sidebar/sidebar.html")
    .then((res) => res.text())
    .then((data) => {
      sidebar.innerHTML = data;
    });

  const sideScript = document.createElement("script");
  sideScript.setAttribute("src", "sidebar/script.js");
  document.body.appendChild(sideScript);
})();
