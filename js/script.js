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

// Initialize the map with the center point and zoom level
let map = new google.maps.Map(document.getElementById("map"), {
	center: { lat: 49.841952, lng: 24.031592 },
	zoom: 8,
});

// Define an array of safe drinking water locations
let safeWaterLocations = [
	{ lat: 49.841952, lng: 24.031592, name: "Lviv" },
	{ lat: 50.4501, lng: 30.5234, name: "Kyiv" },
	{ lat: 49.5683, lng: 34.5854, name: "Poltava" },
];

// Add markers for each safe drinking water location
for (var i = 0; i < safeWaterLocations.length; i++) {
	let marker = new google.maps.Marker({
		position: safeWaterLocations[i],
		map: map,
		title: safeWaterLocations[i].name,
	});
}
