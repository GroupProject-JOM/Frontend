(() => {
  const body = document.querySelector("body"),
    sin = body.querySelector(".sin"),
    en = body.querySelector(".en"),
    sTitle = body.querySelector(".supply-title"),
    sText = body.querySelector(".supply-text"),
    eLabel = body.querySelector(".ename-label"),
    ename = body.querySelector(".estate-name"),
    enameError = body.querySelector(".ename-error"),
    t1 = body.querySelector(".t1"),
    pText = body.querySelector(".pick-text"),
    addLabel = body.querySelector(".address-label"),
    address = body.querySelector(".address"),
    addressError = body.querySelector(".address-error"),
    areaLabel = body.querySelector(".area-label"),
    area = body.querySelector(".area"),
    areaError = body.querySelector(".area-error"),
    btn = body.querySelector(".add-button"),
    closeBtn = body.querySelector(".close-btn"),
    confirm = body.querySelector(".confirm"),
    pick = body.querySelector(".location-pick-bt");

  var lang = getCookie("lang"); // current language
  let locate = "";

  sin.addEventListener("click", () => {
    sin.classList.add("active");
    en.classList.remove("active");

    document.documentElement.setAttribute("lang", "sin");
    document.cookie = "lang=sin; path=/";
    lang = "sin";

    sTitle.textContent = data["sin"]["sTitle"];
    sText.innerHTML = data["sin"]["sText"];
    ename.placeholder = data["sin"]["ename"];
    address.placeholder = data["sin"]["address"];
    area.placeholder = data["sin"]["area"];
    t1.textContent = data["sin"]["t1"];
    pText.textContent = data["sin"]["pText"];
    confirm.textContent = data["sin"]["confirm"];
    eLabel.textContent = data["sin"]["eLabel"];
    addLabel.textContent = data["sin"]["addLabel"];
    areaLabel.textContent = data["sin"]["areaLabel"];
    btn.textContent = data["sin"]["btn"];
    pick.textContent = data["sin"]["pick"];

    setGreeting();
  });

  en.addEventListener("click", () => {
    en.classList.add("active");
    sin.classList.remove("active");

    document.documentElement.setAttribute("lang", "en");
    document.cookie = "lang=en; path=/";
    lang = "en";

    sTitle.textContent = data["en"]["sTitle"];
    sText.innerHTML = data["en"]["sText"];
    ename.placeholder = data["en"]["ename"];
    address.placeholder = data["en"]["address"];
    area.placeholder = data["en"]["area"];
    t1.textContent = data["en"]["t1"];
    pText.textContent = data["en"]["pText"];
    confirm.textContent = data["en"]["confirm"];
    eLabel.textContent = data["en"]["eLabel"];
    addLabel.textContent = data["en"]["addLabel"];
    areaLabel.textContent = data["en"]["areaLabel"];
    btn.textContent = data["en"]["btn"];
    pick.textContent = data["en"]["pick"];

    setGreeting();
  });

  var data = {
    sin: {
      sTitle: "ලිපිනයන් සංස්කරණය කරන්න",
      sText: "ඔබගේ වතුයායන් වල විස්තර සංස්කරණය කරන්න",
      ename: "වතු නම ඇතුලත් කරන්න",
      address: "ලිපිනය ඇතුලත් කරන්න",
      area: "ප්රදේශය ඇතුල් කරන්න",
      t1: "වතු ලිපිනය",
      pText:
        "ඔබගේ සැපයුම pin මගින් සලකුණු කර ඇති ඉහත ස්ථානයෙන් ලබා ගනී. කරුණාකර එය වැරදි ස්ථානයේ තිබේ නම් පින් එක නැවත ස්ථානගත කරන්න.",
      confirm: "තහවුරු කරන්න",
      eLabel: "වතු නම",
      addLabel: "ලිපිනය",
      areaLabel: "ප්රදේශය",
      btn: "සුරකින්න",
      pick: "සිතියම මත ඔබේ වතුයාය තෝරන්න",
    },
    en: {
      sTitle: "Edit Estate Location",
      sText: "Edit your location details",
      ename: "Enter Estate Name",
      address: "Enter address",
      area: "Enter area",
      t1: "Estate Address",
      pText:
        "Your supply will be picked-up from the above location marked by the pin. please relocate the pin is it's at the incorrect location.",
      confirm: "Confirm",
      eLabel: "Estate Name",
      addLabel: "Address",
      areaLabel: "Area",
      btn: "Save",
      pick: "Pick Your Estate on the map",
    },
  };

  var enameStatus = false,
    addressStatus = false,
    areaStatus = false;

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

  function address_status() {
    if (
      typeof address.value === "string" &&
      address.value.trim().length === 0
    ) {
      if (lang == "sin") addressError.textContent = "ලිපිනය හිස් විය නොහැක";
      else addressError.textContent = "Address cannot be empty";
      addressStatus = false;
      return false;
    } else {
      addressError.textContent = "";
      addressStatus = true;
      return true;
    }
  }

  function area_status() {
    if (typeof area.value === "string" && area.value.trim().length === 0) {
      if (lang == "sin") areaError.textContent = "ප්‍රදේශය හිස් විය නොහැක";
      else areaError.textContent = "Area cannot be empty";
      areaStatus = false;
      return false;
    } else {
      areaError.textContent = "";
      areaStatus = true;
      return true;
    }
  }

  ename.addEventListener("input", () => {
    ename_status();
  });
  address.addEventListener("input", () => {
    address_status();
  });
  area.addEventListener("input", () => {
    area_status();
  });

  btn.addEventListener("click", () => {
    if (!area_status()) {
      area.focus();
    }
    if (!address_status()) {
      address.focus();
    }
    if (!ename_status()) {
      ename.focus();
    }

    if (enameStatus && addressStatus && areaStatus) {
      var formData = {
        id: getCookie("id"),
        estate_name: ename.value,
        estate_location: locate,
        estate_address: address.value,
        area: area.value,
      };

      fetch(backProxy + "/estate", {
        method: "PUT",
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
            window.location.href = "./view.html";
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

  //Get data
  var backData = "";
  function getData() {
    fetch(
      backProxy + "/estate?id=" + getCookie("id"),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    )
      .then((response) => {
        if (response.status == 200) {
          response.json().then((data) => {
            ename.value = data.estate.estate_name;
            locate = data.estate.estate_location;
            address.value = data.estate.estate_address;
            area.value = data.estate.area;
          });
        } else if (response.status === 202) {
          response.json().then((data) => {
            console.log(data.estate);
            Command: toastr["error"](data.estate);
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
  getData();

  let loaded = false;
  const interval = setInterval(() => {
    if (locate != null && !loaded) {
      loaded = true;
      clearInterval(interval);

      //Map

      let map;
      let markers = [];
      let marker;

      let loc = "",
        ar = "";

      var arr = locate.split(" ");
      let lat = arr[0];
      let long = arr[1];

      function initMap() {
        // console.log("lat " + lat);
        // console.log("lng " + long);
        const live_loc = { lat: +lat, lng: +long };

        map = new google.maps.Map(document.getElementById("map"), {
          zoom: 15,
          center: live_loc,
        });
        // This event listener will call addMarker() when the map is clicked.
        map.addListener("click", (event) => {
          addMarker(event.latLng);
        });
        addMarker(live_loc);
      }

      // Adds a marker to the map and push to the array.
      function addMarker(position) {
        marker = new google.maps.Marker({
          position,
          map,
        });
        deleteMarkers();

        markers.push(marker);
        // console.log(marker.position.lat(), marker.position.lng());
        // console.log(marker.position.results)

        const options = {
          method: "GET",
          headers: { accept: "application/json" },
        };

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
            // console.log(response.results[0].formatted_address);
            document.querySelector(".loc-add").value =
              response.results[0].formatted_address;
            loc = response.results[0].formatted_address;
            // ar = response.results[0].address_components[0].short_name;
            let arr = loc.split(",");
            if (arr.length > 2) ar = arr[arr.length - 2].slice(1);
            else ar = arr[arr.length - 2];
            lat = response.results[0].geometry.location.lat;
            long = response.results[0].geometry.location.lng;
            locate = lat + " " + long;
          })
          .catch((err) => console.error(err));
      }

      confirm.addEventListener("click", (e) => {
        e.preventDefault();
        closeBtn.click();
        address.value = loc;
        area.value = ar;
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
    }
  }, 1000);
})();
