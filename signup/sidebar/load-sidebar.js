if (getCookie("page") != null && getCookie("page").length != 0)
  window.location.href = frontProxy + "/" + getCookie("page");

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
