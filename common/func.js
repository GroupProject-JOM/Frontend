function checkLng() {
  const body = document.querySelector("body"),
    sin = body.querySelector(".sin"),
    en = body.querySelector(".en");
  //reload language detecter
  // const curLng = sessionStorage.getItem("lang");
  const curLng = getCookie("lang");
  if (curLng == "sin") {
    sin.click();
  } else {
    en.click();
  }
}

function checkMode() {
  const body = document.querySelector("body"),
    modeSwitch = body.querySelector(".toggle-switch");
  //reload mode detecter
  // const curMode = sessionStorage.getItem("mode");
  const curMode = getCookie("mode");
  if (curMode == "dark") {
    modeSwitch.click();
  }
}

function getGreetingTime(m) {
  var g = null; //return g
  if (!m || !m.isValid()) {
    return;
  } //if we can't find a valid or filled moment, we return.

  var split_afternoon = 12; //24hr time to split the afternoon
  var split_evening = 17; //24hr time to split the evening
  var currentHour = parseFloat(m.format("HH"));

  // const curLng = sessionStorage.getItem("lang");

  const curLng = getCookie("lang");

  if (currentHour >= split_afternoon && currentHour <= split_evening) {
    if (curLng == "sin") {
      g = "සුභ දහවලක්";
    } else {
      g = "Good Afternoon";
    }
  } else if (currentHour >= split_evening) {
    if (curLng == "sin") {
      g = "සුභ සන්ධ්‍යාවක්";
    } else {
      g = "Good Evening";
    }
  } else {
    if (curLng == "sin") {
      g = "සුභ උදෑසනක්";
    } else {
      g = "Good Morning";
    }
  }
  return g;
}

function setGreeting() {
  const body = document.querySelector("body"),
    greeting = body.querySelector(".greeting");
  greeting.innerHTML = getGreetingTime(moment());
}

function modeTranslate() {
  var text = null;
  // const curMode = sessionStorage.getItem("mode");
  // const curLng = sessionStorage.getItem("lang");
  const curMode = getCookie("mode");
  const curLng = getCookie("lang");

  if (curMode == "dark") {
    if (curLng == "sin") {
      text = "ආලෝක මාදිලිය";
    } else {
      text = "Light Mode";
    }
  } else {
    if (curLng == "sin") {
      text = "අඳුරු මාදිලිය";
    } else {
      text = "Dark Mode";
    }
  }
  return text;
}

window.addEventListener("resize", (e) => {
  const body = document.querySelector("body"),
    sidebar = body.querySelector(".sidebar"),
    bars = body.querySelector(".fa-bars");

  if (!sidebar) return;

  if (window.innerWidth <= 1010 && window.innerWidth >= 718) {
    sidebar.classList.add("close");
    sidebar.classList.remove("sidebar-active");
    bars.style.display = "none";
    sidebar.style.display = "block";
  } else {
    sidebar.classList.remove("close");
    sidebar.style.display = "block";
    if (window.innerWidth <= 718) {
      sidebar.style.display = "none";
      bars.style.display = "block";
    }
  }
});

window.addEventListener("load", (e) => {
  const body = document.querySelector("body"),
    sidebar = body.querySelector(".sidebar"),
    bars = body.querySelector(".fa-bars");

  if (!sidebar) return;

  if (window.innerWidth <= 1010 && window.innerWidth >= 718) {
    sidebar.classList.add("close");
    sidebar.classList.remove("sidebar-active");
    bars.style.display = "none";
    sidebar.style.display = "block";
  } else {
    sidebar.classList.remove("close");
    sidebar.style.display = "block";
    if (window.innerWidth <= 718) {
      sidebar.style.display = "none";
      bars.style.display = "block";
    }
  }
});

function checkCookie(cName) {
  const name = cName + "=";
  const cDecoded = decodeURIComponent(document.cookie); //to be careful
  const cArr = cDecoded.split("; ");
  let res;
  cArr.forEach((val) => {
    if (val.indexOf(name) === 0) res = val.substring(name.length);
  });
  return res;
}

function getCookie(name) {
  var myCookie = checkCookie(name);
  if (myCookie == null) {
    console.log(name + " - null");
  }
  // else {
  //   console.log("not null " + myCookie);
  // }
  return myCookie;
}

function signout() {
  var lang = getCookie("lang");
  if (lang == "sin") {
    var title = "ඔයාට විශ්වාස ද?",
      text = "ඔබට මෙය ප්‍රතිවර්තනය කිරීමට නොහැකි වනු ඇත!",
      confirmButtonText = "ඔව්, වරනය වන්න!",
      cancelButtonText = "අවලංගු කරන්න";
  } else {
    var title = "Are you sure?",
      text = "You won't be able to revert this!",
      confirmButtonText = "Yes, Sign out!",
      cancelButtonText = "Cancel";
  }
  Swal.fire({
    title: title,
    text: text,
    confirmButtonText: confirmButtonText,
    cancelButtonText: cancelButtonText,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: confirmButtonColor,
    cancelButtonColor: cancelButtonColor,
  }).then((result) => {
    if (result.isConfirmed) {
      if (lang == "sin") {
        var title = "වරනය විය!",
          text = "ඔබ ඔබේ පැතිකඩ සාර්ථකව වරනය විය.",
          confirmButtonText = "හරි";
      } else {
        var title = "Signed out!",
          text = "You signed out your profile successfully.",
          confirmButtonText = "Ok";
      }
      // sweet alert
      Swal.fire({
        title: title,
        text: text,
        icon: "success",
        confirmButtonText: confirmButtonText,
        confirmButtonColor: confirmButtonColor,
      }).then((response) => {
        // remove previous data
        document.cookie = "id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
        document.cookie = "sId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
        document.cookie =
          "page=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
        pageLoading();
        window.location.href = frontProxy;
      });
    }
  });
}

const frontProxy = "http://127.0.0.1:5501";
const backProxy = "http://127.0.0.1:8090/JOM_war_exploded";

// toast
toastr.options = {
  closeButton: true,
  debug: false,
  newestOnTop: true,
  progressBar: false,
  positionClass: "toast-bottom-right",
  preventDuplicates: false,
  onclick: null,
  showDuration: "300",
  hideDuration: "1000",
  timeOut: "5000",
  extendedTimeOut: "1000",
  showEasing: "swing",
  hideEasing: "linear",
  showMethod: "fadeIn",
  hideMethod: "fadeOut",
};

// Sweet alerts colors
var confirmButtonColor = "#3085d6",
  cancelButtonColor = "#d33",
  confirmButtonColor = "#3085d6",
  denyButtonColor = "#dd6b55";

function pageLoading() {
  // const loader = document.querySelector(".loader-wrapper");
  // loader.style.display = "block";
  // loader.toggle()
  // $(".loader-wrapper").toggle();
}

function timeString(time) {
  var T = time.split(":");

  if (T[0] > 12) {
    T[0] -= 12;
    if (T[0] >= 12) {
      return String(T[0]).padStart(2, "0") + ":" + T[1] + " AM";
    } else {
      return String(T[0]).padStart(2, "0") + ":" + T[1] + " PM";
    }
  } else if (T[0] == 12) {
    return String(T[0]).padStart(2, "0") + ":" + T[1] + " PM";
  } else {``
    return String(T[0]).padStart(2, "0") + ":" + T[1] + " AM";
  }
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

var log = console.log;
