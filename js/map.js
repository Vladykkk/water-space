// Map
function initMap() {
  let map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 49.841952, lng: 24.031592 },
    zoom: 8,
  });

  let currentInfoWindow = null;

  function addMarker(position, info, iconUrl, properties) {
    let marker = new google.maps.Marker({
      position: position,
      map: map,
      icon: {
        url: iconUrl,
        scaledSize: new google.maps.Size(30, 30),
        anchor: new google.maps.Point(25, 25),
      },
    });

    let content = "<div><h2>" + info + "</h2>";

    if (properties && properties.length > 0) {
      content += "<table>";
      for (let i = 0; i < properties.length; i++) {
        content +=
          "<tr><td>" +
          properties[i].property +
          "</td><td>" +
          properties[i].value +
          "</td></tr>";
      }
      content += "</table>";
    }

    content += "</div>";

    let infoWindow = new google.maps.InfoWindow({
      content: content,
    });

    marker.addListener("click", function () {
      if (currentInfoWindow) {
        currentInfoWindow.close();
      }
      if (currentInfoWindow !== infoWindow) {
        infoWindow.open(map, marker);
        currentInfoWindow = infoWindow;
      } else {
        currentInfoWindow = null;
      }
    });

    return marker;
  }

  fetch("../markers.json")
    .then((response) => response.json())
    .then((data) => {
      for (let i = 0; i < data.markers.length; i++) {
        let marker = addMarker(
          data.markers[i].position,
          data.markers[i].info,
          data.markers[i].icon,
          data.markers[i].properties
        );
      }
    })
    .catch((error) => console.error("Error fetching marker data: ", error));
}

// Google api
let script = document.createElement("script");
script.src =
  "https://maps.googleapis.com/maps/api/js?key=AIzaSyAtFsHvCk5mTA-4DSi_0dfqDaqxbsf2Y4k&callback=initMap";
script.defer = true;
script.async = true;
document.head.appendChild(script);
