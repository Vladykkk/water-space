"use strict";

// Menu burger
document.addEventListener("click", documentActions);

function documentActions(e) {
	const targetElement = e.target;

	// Open and close menu burger
	if (targetElement.closest(".icon-menu")) {
		document.documentElement.classList.toggle("menu-open");
	} else if (targetElement.closest(".header__logo")) {
		if (document.documentElement.classList.contains("menu-open")) {
			document.documentElement.classList.remove("menu-open");
		}
	}

	// Scroll to section
	if (targetElement.closest("[data-goto]")) {
		document.documentElement.classList.contains("menu-open")
			? document.documentElement.classList.remove("menu-open")
			: null;

		const goTo = targetElement.closest("[data-goto]").dataset.goto;
		const goToElement = document.querySelector(goTo);
		const headerHeight = document.querySelector(".header").offsetHeight;

		if (goToElement) {
			window.scrollTo({
				top: goToElement.offsetTop - (headerHeight + 15),
				behavior: "smooth",
			});
		}
		e.preventDefault();
	}
}

function addMarker(map, position, info, properties) {
	let marker = new google.maps.Marker({
		position: position,
		map: map,
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
		infoWindow.open(map, marker);
	});

	return marker;
}

let map = new google.maps.Map(document.getElementById("map"), {
	center: { lat: 49.841952, lng: 24.031592 },
	zoom: 8,
});

fetch("../markers.json")
	.then((response) => response.json())
	.then((data) => {
		for (let i = 0; i < data.markers.length; i++) {
			let marker = addMarker(
				map,
				data.markers[i].position,
				data.markers[i].info,
				data.markers[i].properties
			);
		}
	})
	.catch((error) => console.error("Error fetching marker data: ", error));
