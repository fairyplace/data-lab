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

const mobileMenuIcon = document.querySelector('.mobile-icon')

const mobileMenu = document.querySelector('.header__mobile')

if (mobileMenuIcon) {
  mobileMenuIcon.addEventListener('click', (e)=>{
    document.body.classList.toggle("_scroll-lock")
    mobileMenuIcon.classList.toggle('_active')
    mobileMenu.classList.toggle('_active')
  })
}

const menuLinks = document.querySelectorAll('a[data-goto]')

if (menuLinks.length > 0){
  for (const menuLink of menuLinks) {
    menuLink.addEventListener('click', onMenuLinkClick)
  }
}

function onMenuLinkClick(e) {
  
  const menuLink = e.target;

  if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
    const gotoBlock = document.querySelector(menuLink.dataset.goto);
    const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;

    if (mobileMenuIcon.classList.contains('_active')) {
      document.body.classList.remove('_scroll-lock');
      mobileMenuIcon.classList.remove('_active');
      mobileMenu.classList.remove('_active');
    }

    window.scrollTo({
      top: gotoBlockValue,
      behavior: "smooth"
    });
    e.preventDefault();
    if (e.target.dataset.goto == '.page__form-section') {
      setTimeout(()=>{
        document.forms[1].elements.phoneNum.focus()
      }, 500)
    }
  }


}


