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
  