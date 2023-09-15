function checkLng() {
  const body = document.querySelector("body"),
    sin = body.querySelector(".sin");

  //reload language detecter
  const curLng = sessionStorage.getItem("lang");
  if (curLng == "sin") {
    sin.click();
  }
}

function checkMode() {
  const body = document.querySelector("body"),
    modeSwitch = body.querySelector(".toggle-switch");

  //reload language detecter
  const curMode = sessionStorage.getItem("mode");
  if (curMode == "dark") {
    modeSwitch.click();
  }
}
