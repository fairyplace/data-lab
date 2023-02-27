const API_URL = "http://127.0.0.1:3000";

const modalWindow = document.querySelector(".modal");
const closeModalBtn = document.querySelector(".close-modal");
const body = document.querySelector("body");

const modalTitle = document.querySelector(".modal__title");
const modalText = document.querySelector(".modal__text");

const modalContent = {
	success: {
		title: "Заявка отправлена!",
		text: "Ваша заявка успешно отправлена. Наши специалисты свяжутся с вами в течении 10 минут.",
	},
	error: {
		title: "Что-то пошло не так...",
		text: "Заявка не была доставлена нашим специалистам. Пожалуйста, попробуйте ещё раз.",
	},
};

const send_lead = async (phone) => {
	const message = `Date ${new Date().toLocaleString()}\nPhone: \`${phone}\`\nIP: ${
		window.location.hostname
	}\n`;
	// const response = fetch(URL + '/sendMessage?chat_id=' + chat_id + '&text=' + message);
	const response = await fetch(API_URL + "/sendLead", {
		method: "POST",
		headers: {"Content-Type": "application/json"},
		body: JSON.stringify({
			text: message,
			parse_mode: "Markdown",
		}),
	});
  const body = await response.json()
	if (!body.error) {
		openModal("success");
	} else {
		openModal("error");
	}
};

function openModal(modalType) {
  if (!modalWindow.classList.contains('open')) {
    if (modalType == "success") {
      modalTitle.innerText = modalContent.success.title;
      modalText.innerText = modalContent.success.text;
    } else if (modalType == "error") {
      modalTitle.innerText = modalContent.error.title;
      modalText.innerText = modalContent.error.text;
    }
    modalWindow.classList.add("open");
    body.classList.add("lock");
  
    modalWindow.addEventListener("click", function (e) {
      if (!e.target.closest(".modal__content")) {
        closeModal(e.target.closest(".modal"));
      }
    });
  }
}

function closeModal(modal) {
	modal.classList.remove("open");
	body.classList.remove("lock");
}

closeModalBtn.addEventListener("click", function (e) {
	closeModal(e.target.closest(".modal"));
	e.preventDefault();
});

for (var form of document.forms) {
	form.addEventListener("submit", (e) => {
		e.preventDefault();
		const phoneInput = e.target.elements.phoneNum;
    const errMsg = phoneInput.previousElementSibling
    if (phoneInput.value.replace(/[^0-9]/g, '').length < 11) {
      if (errMsg.classList.contains('form-error')) errMsg.classList.add('_active')
    } else{
      errMsg.classList.remove('_active')
      send_lead(phoneInput.value);
      phoneInput.value = "";
    }
	});
}
