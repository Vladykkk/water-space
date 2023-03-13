// Map
function initMap() {
  let map = new google.maps.Map(document.getElementById("map"), {
    mapId: "e991c773228f2a3e",
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

      content +=
        "<tr><td>Показник</td><td>Одиниці вимірювання</td><td>Вимоги ЄС</td><td>Вимоги ДСАНПІН Україна (для водопровідної води)</td><td>Вимоги ДСАНПІН Україна (для води з колодязів та каптажів джерел)</td><td>Фактичне значення</td><td>Висновок</td></tr>";
      for (let i = 0; i < properties.length; i++) {
        content += "<tr>";
        content += "<td>" + properties[i].property + "</td>";
        content += "<td>" + properties[i].unit + "</td>";
        content += "<td>" + properties[i].euLimit + "</td>";
        content += "<td>" + properties[i].uaLimit1 + "</td>";
        content += "<td>" + properties[i].uaLimit2 + "</td>";
        content += "<td>" + properties[i].value + "</td>";
        content += "<td>" + properties[i].conclusion + "</td>";
        content += "</tr>";
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
        currentInfoWindow = infoWindow;

        // Transfer values to the info div
        document.getElementById("info").innerHTML = content;
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
