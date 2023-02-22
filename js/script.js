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
	center: { lat: 48.379433, lng: 31.16558 },
	zoom: 6,
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

// Add a listener for the click event
map.addListener("click", function (event) {
	// Prompt the user to enter a location name
	let name = prompt("Enter a location name:");

	// Create a marker at the clicked location with the entered name
	let marker = new google.maps.Marker({
		position: event.latLng,
		map: map,
		title: name,
	});
});
