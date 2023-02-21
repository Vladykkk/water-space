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
