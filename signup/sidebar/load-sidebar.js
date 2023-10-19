// if (
//   sessionStorage.getItem("page") != null &&
//   sessionStorage.getItem("page").length != 0
// ) {
//   window.location.href = frontProxy + "/" + sessionStorage.getItem("page");
// }

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
