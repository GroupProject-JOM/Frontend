// sessionStorage.removeItem("id");
document.cookie = "id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
(() => {
  const body = document.querySelector("body"),
    sin = body.querySelector(".sin"),
    en = body.querySelector(".en"),
    sTitle = body.querySelector(".supply-title"),
    sText = body.querySelector(".supply-text"),
    ename = body.querySelector(".estate-name"),
    enameError = body.querySelector(".ename-error"),
    location = body.querySelector(".location"),
    locationError = body.querySelector(".location-error"),
    dropdown = body.querySelector(".dropdown"),
    areaError = body.querySelector(".area-error"),
    op1 = body.querySelector(".op1"),
    op2 = body.querySelector(".op2"),
    op3 = body.querySelector(".op3"),
    op4 = body.querySelector(".op4"),
    addbtn = body.querySelector(".add-button"),
    closeBtn = body.querySelector(".close-btn"),
    confirm = body.querySelector(".confirm"),
    pick = body.querySelector(".location-pick-bt");

  var lang = getCookie("lang"); // current language

  sin.addEventListener("click", () => {
    sin.classList.add("active");
    en.classList.remove("active");

    document.documentElement.setAttribute("lang", "sin");
    // sessionStorage.setItem("lang", "sin");
    document.cookie = "lang=sin; path=/";
    lang = "sin";

    sTitle.textContent = data["sin"]["sTitle"];
    sText.innerHTML = data["sin"]["sText"];
    ename.placeholder = data["sin"]["ename"];
    location.placeholder = data["sin"]["location"];
    op1.textContent = data["sin"]["op1"];
    op2.textContent = data["sin"]["op2"];
    op3.textContent = data["sin"]["op3"];
    op4.textContent = data["sin"]["op4"];
    addbtn.textContent = data["sin"]["addbtn"];
    pick.textContent = data["sin"]["pick"];

    setGreeting();
  });

  en.addEventListener("click", () => {
    en.classList.add("active");
    sin.classList.remove("active");

    document.documentElement.setAttribute("lang", "en");
    // sessionStorage.setItem("lang", "en");
    document.cookie = "lang=en; path=/";
    lang = "en";

    sTitle.textContent = data["en"]["sTitle"];
    sText.innerHTML = data["en"]["sText"];
    ename.placeholder = data["en"]["ename"];
    location.placeholder = data["en"]["location"];
    op1.textContent = data["en"]["op1"];
    op2.textContent = data["en"]["op2"];
    op3.textContent = data["en"]["op3"];
    op4.textContent = data["en"]["op4"];
    addbtn.textContent = data["en"]["addbtn"];
    pick.textContent = data["en"]["pick"];

    setGreeting();
  });

  var data = {
    sin: {
      sTitle: "නව වතු ස්ථානය එක් කරන්න",
      sText:
        "නව වත්තක් සඳහා තොරතුරු එක් කරන්න. <br />ඔබට ඕනෑම වේලාවක උපකරණ පුවරුව > ලිපිනයන් හිදී මෙම තොරතුරු සංස්කරණය කළ හැක",
      ename: "වතුයායේ නම",
      location: "ස්ථානය",
      op1: "ඔබේ ප්රදේශය තෝරන්න",
      op2: "පිළියන්දල",
      op3: "කැස්බෑව",
      op4: "ප්රදේශය51",
      addbtn: "එකතු කරන්න",
      pick: "සිතියම මත ඔබේ වතුයාය තෝරන්න",
    },
    en: {
      sTitle: "Add New Estate Location",
      sText:
        "Add information for a new estate location. <br />You can edit these information any time at Dashboard > Addresses",
      ename: "Estate Name",
      location: "Location",
      op1: "Select your Area",
      op2: "piliyandala",
      op3: "Kasbawa",
      op4: "area51",
      addbtn: "Add",
      pick: "Pick Your Location on the map",
    },
  };

  var enameStatus = false,
    locationStatus = false,
    dropdownStatus = false;

  function ename_status() {
    if (typeof ename.value === "string" && ename.value.trim().length === 0) {
      if (lang == "sin") enameError.textContent = "වතු නම හිස් විය නොහැක";
      else enameError.textContent = "Estate name cannot be empty";
      enameStatus = false;
      return false;
    } else {
      enameError.textContent = "";
      enameStatus = true;
      return true;
    }
  }

  function location_status() {
    if (
      typeof location.value === "string" &&
      location.value.trim().length === 0
    ) {
      if (lang == "sin") locationError.textContent = "ස්ථානය හිස් විය නොහැක";
      else locationError.textContent = "Location cannot be empty";
      locationStatus = false;
      return false;
    } else {
      locationError.textContent = "";
      locationStatus = true;
      return true;
    }
  }

  function area_status() {
    if (
      typeof dropdown.value === "string" &&
      dropdown.value.trim().length === 0
    ) {
      if (lang == "sin") areaError.textContent = "ප්‍රදේශය හිස් විය නොහැක";
      else areaError.textContent = "Area cannot be empty";
      dropdownStatus = false;
      return false;
    } else {
      areaError.textContent = "";
      dropdownStatus = true;
      return true;
    }
  }

  ename.addEventListener("input", () => {
    ename_status();
  });
  location.addEventListener("input", () => {
    location_status();
  });
  dropdown.addEventListener("input", () => {
    area_status();
  });

  addbtn.addEventListener("click", () => {
    if (!area_status()) {
      dropdown.focus();
    }
    if (!location_status()) {
      location.focus();
    }
    if (!ename_status()) {
      ename.focus();
    }

    if (enameStatus && locationStatus && dropdownStatus) {
      var formData = {
        // supplier_id: sessionStorage.getItem("sId"),
        supplier_id: getCookie("sId"),
        estate_name: ename.value,
        estate_location: location.value,
        area: dropdown.value,
      };
      fetch(backProxy + "/estate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      })
        .then((response) => {
          if (response.status == 200) {
            response.json().then((data) => {
              console.log(data.message);
            });
            window.location.href = "./view-all.html";
          } else if (response.status === 400) {
            response.json().then((data) => {
              console.log(data.message);
              Command: toastr["error"](data.message);
            });
          } else {
            console.error("Error:", response.status);
            Command: toastr["error"](response.status, "Error");
          }
        })
        .catch((error) => {
          console.error("An error occurred:", error);
          Command: toastr["error"](error);
        });
    }
  });

  pick.addEventListener("click", () => {
    document.querySelector(".location-pick").style.display = "block";
  });

  closeBtn.addEventListener("click", () => {
    document.querySelector(".location-pick").style.display = "none";
  });

  //Map

  let map;
  let markers = [];
  let marker;

  let loc = "",
    ar = "";

  function initMap() {
    const colombo = { lat: 6.9022, lng: 79.8611 };

    map = new google.maps.Map(document.getElementById("map"), {
      zoom: 15,
      center: colombo,
    });
    // This event listener will call addMarker() when the map is clicked.
    map.addListener("click", (event) => {
      addMarker(event.latLng);
    });
    addMarker(colombo);
  }

  // Adds a marker to the map and push to the array.
  function addMarker(position) {
    marker = new google.maps.Marker({
      position,
      map,
    });
    deleteMarkers();

    markers.push(marker);
    console.log(marker.position.lat(), marker.position.lng());
    // console.log(marker.position.results)

    const options = { method: "GET", headers: { accept: "application/json" } };

    fetch(
      "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
        marker.position.lat() +
        "%2C" +
        marker.position.lng() +
        "&key=AIzaSyCZFEe9IjYVTBsTO7o4Ais2KM2qgBpep4Q",
      options
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response.results[0].formatted_address);
        document.querySelector(".loc-add").value =
          response.results[0].formatted_address;
        loc = response.results[0].formatted_address;
        ar =
          response.results[0].address_components[
            response.results[0].address_components.length - 1
          ].long_name;
      })
      .catch((err) => console.error(err));
  }

  confirm.addEventListener("click", (e) => {
    e.preventDefault();
    closeBtn.click();
    location.value = loc;
  });

  // Sets the map on all markers in the array.
  function setMapOnAll(map) {
    for (let i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
    }
  }

  // // Removes the markers from the map, but keeps them in the array.
  function hideMarkers() {
    setMapOnAll(null);
  }

  // // Shows any markers currently in the array.
  function showMarkers() {
    setMapOnAll(map);
  }

  // // Deletes all markers in the array by removing references to them.
  function deleteMarkers() {
    hideMarkers();
    markers = [];
  }

  window.initMap = initMap;
})();
