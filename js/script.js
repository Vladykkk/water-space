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

// Form

document.addEventListener("DOMContentLoaded", function () {
	const form = document.getElementById("form");
	form.addEventListener("submit", formSend);

	async function formSend(e) {
		e.preventDefault();

		let error = formValidate(form);

		let formData = new FormData(form);
		formData.append("image", formImage.files[0]);

		if (error === 0) {
			form.classList.add("_sending");
			let response = await fetch("sendmail.php", {
				method: "POST",
				body: formData,
			});

			if (response.ok) {
				let result = await response.json();
				alert(result.message);
				formPreview.innerHTML = "";
				form.reset();
				form.classList.remove("_sending");
			} else {
				alert("Помилка");
				form.classList.remove("_sending");
			}
		} else {
			alert("Заповніть необхідні поля");
		}
	}

	function formValidate(form) {
		let error = 0;
		let formReq = document.querySelectorAll("._req");

		for (let index = 0; index < formReq.length; index++) {
			const input = formReq[index];
			formRemoveError(input);

			if (input.classList.contains("_email")) {
				if (emailTest(input)) {
					formAddError(input);
					error++;
				}
			} else if (
				input.getAttribute("type") === "checkbox" &&
				input.checked === false
			) {
				formAddError(input);
				error++;
			} else {
				if (input.value === "") {
					formAddError(input);
					error++;
				}
			}
		}
		return error;
	}

	function formAddError(input) {
		input.parentElement.classList.add("_error");
		input.classList.add("_error");
	}

	function formRemoveError(input) {
		input.parentElement.classList.remove("_error");
		input.classList.remove("_error");
	}

	// Функція тесту email
	function emailTest(input) {
		return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
	}
});

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
