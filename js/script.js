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
  for (let i = 0; i < menuLinks.length; i++) {
    menuLinks[i].addEventListener('click', onMenuLinkClick)
    
  }
}

function onMenuLinkClick(e) {

  let menuLink = e.target

  if (!e.target.dataset.goto) menuLink = e.target.closest('a[data-goto]')    
  

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

// Phone Mask

const phoneInputs = document.querySelectorAll('input[data-tel-input]')

function getInputNumbersValue(input) {
  return input.value.replace(/\D/g, '')
}

function onPhoneInput(e) {
  let input = e.target
  let inputNumbersValue = getInputNumbersValue(input)
  let formattedInputValue = ""

  if (!inputNumbersValue) return input.value = ''

  if (["7", "8", "9"].indexOf(inputNumbersValue[0]) > -1) {
    if (inputNumbersValue[0] == "9") return     input.value = `+7 ${inputNumbersValue}`
    
    let firstSymbols = (inputNumbersValue[0] == "8") ? "8" : "+7"
    formattedInputValue = firstSymbols

    if (inputNumbersValue.length > 1) formattedInputValue += ` (${inputNumbersValue.substring(1, 4)}`
    
    if (inputNumbersValue.length >= 5) formattedInputValue += `) ${inputNumbersValue.substring(4, 7)}` 

    if (inputNumbersValue.length >= 8) formattedInputValue += `-${inputNumbersValue.substring(7, 9)}`
    
    if (inputNumbersValue.length >= 10) formattedInputValue += `-${inputNumbersValue.substring(9, 11)}` 
    
  } else {
    formattedInputValue = `+${inputNumbersValue.substring(0, 16)}`
  }
  input.value = formattedInputValue
}

for (let i = 0; i < phoneInputs.length; i++) {
  let input = phoneInputs[i]
  input.addEventListener('input', onPhoneInput)  
}

