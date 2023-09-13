function checkLng() {
    const body = document.querySelector("body"),
      sin = body.querySelector(".sin");
  
    //reload language detecter
    const curLng = sessionStorage.getItem("lang");
    if (curLng == "sin") {
      sin.click();
    }
  }
  