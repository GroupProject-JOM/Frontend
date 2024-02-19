(() => {
  const sidebar = document.querySelector(".sidebar");
  fetch(frontProxy + "/sales-manager/nav/nav.html")
    .then((res) => res.text())
    .then((data) => {
      sidebar.innerHTML = data;
    });

  const navScript = document.createElement("script");
  navScript.setAttribute("src", frontProxy + "/sales-manager/nav/script.js");
  document.body.appendChild(navScript);
})();
