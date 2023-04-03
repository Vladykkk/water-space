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
        scaledSize: new google.maps.Size(35, 35),
        anchor: new google.maps.Point(25, 25),
      },
    });

    // Add click event listener to the marker
    marker.addListener("click", function () {
      // Show the info div and scroll to it
      let infoDiv = document.getElementById("info");
      infoDiv.style.display = "block";
      infoDiv.scrollIntoView({ behavior: "smooth" });

      // Set the content of the info div
      infoDiv.innerHTML = info;
    });

    let content = "<div><h2>" + info + "</h2>";

    if (properties && properties.length > 0) {
      content += "<table>";

      content +=
        "<tr><td>Показник</td><td>Вимоги ЄС</td><td>Вимоги ДСАНПІН Україна (водопровідної води)</td><td>Вимоги ДСАНПІН Україна (води з колодязів та каптажів джерел)</td><td>Фактичне значення</td><td>Висновок</td></tr>";
      for (let i = 0; i < properties.length; i++) {
        content += "<tr>";
        content += "<td>" + properties[i].property + "</td>";
        content += "<td>" + properties[i].euLimit + "</td>";
        content += "<td>" + properties[i].uaLimit1 + "</td>";
        content += "<td>" + properties[i].uaLimit2 + "</td>";
        content += "<td>" + properties[i].value + "</td>";

        switch (properties[i].conclusion) {
          case "в межах ГДК":
            content += "<td><img src='../img/map/table/checkmark.png'></td>";
            break;
          case "в межах ГДК для Укр.":
            content +=
              "<td><img src='../img/map/table/checkmark.png'><img src='../img/map/table/ukraine.png'></td>";
            break;
          case "в межах ГДК для криниць":
            content +=
              "<td><img src='../img/map/table/checkmark.png'><img src='../img/map/table/well.png'></td>";
            break;
          case "відсутній":
            content += "<td><img src='../img/map/table/closemark.png'></td>";
            break;
          case "Перевищення ГДК":
            content += "<td><img src='../img/map/table/upmark.png'></td>";
            break;
          default:
            content += "<td></td>";
        }

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

        document.getElementById("info").innerHTML = content;
        document.getElementById("info").style.display = "block";
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
