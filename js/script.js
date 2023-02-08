"use strict";

const hideNav = () => {
	const hiddenHeaderClassName = "header__hidden";
	const headerHeight = 331;

	let initialValue = window.scrollY;
	let header = document.querySelector("header");

  let isItHidden = false;

	window.addEventListener("scroll", (e) => {
		const scrollY = window.scrollY;

		if (scrollY > headerHeight && scrollY > initialValue) {
			hideHeader();
		} else {
			showHeader();
		}

		initialValue = scrollY;
	});

	function hideHeader() {
    if (!isItHidden) {
      header.classList.add(hiddenHeaderClassName);
      isItHidden = true
    }
	}

	function showHeader() {
    if (isItHidden) {
      header.classList.remove(hiddenHeaderClassName);
      isItHidden = false
    }
	}
};

hideNav();
