function checkLng() {
  const body = document.querySelector("body"),
    sin = body.querySelector(".sin");
    en = body.querySelector(".en");

  //reload language detecter
  const curLng = sessionStorage.getItem("lang");
  if (curLng == "sin") {
    sin.click();
  }else{
    en.click();
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

function getGreetingTime (m) {
	var g = null; //return g
	
	if(!m || !m.isValid()) { return; } //if we can't find a valid or filled moment, we return.
	
	var split_afternoon = 12 //24hr time to split the afternoon
	var split_evening = 17 //24hr time to split the evening
	var currentHour = parseFloat(m.format("HH"));
  const curLng = sessionStorage.getItem("lang");
	
	if(currentHour >= split_afternoon && currentHour <= split_evening) {
		if(curLng=="sin"){g = "සුභ දහවලක්"}else{g = "Good Afternoon"}
	} else if(currentHour >= split_evening) {
		if(curLng=="sin"){g = "සුභ සන්ධ්‍යාවක්"}else{g = "Good Evening"}
	} else {
		if(curLng=="sin"){g = "සුභ උදෑසනක්"}else{g = "Good Morning"}
	}
	
	return g;
}

function setGreeting() {
  const body = document.querySelector("body"),
    greeting = body.querySelector(".greeting");

  greeting.innerHTML = getGreetingTime(moment());
}
