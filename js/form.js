const API_URL = "http://127.0.0.1:3000";

const modalWindow = document.querySelector(".modal");
const modalTitle = document.querySelector(".modal__title");
const modalText = document.querySelector(".modal__text");
const closeModalBtn = document.querySelector(".close-modal");

const body = document.querySelector("body");
const delay = 800;

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

	if (!response.error) {
		openModal();
	} else {
		console.log("err");
	}
};


function openModal() {
	modalTitle.innerText = "Заявка отправлена!";
	modalText.innerText =
		"	Ваша заявка успешно отправлена. Наши специалисты свяжутся с вами в течении 10 минут.";
	modalWindow.classList.add("open");
	body.classList.add("lock");

	modalWindow.addEventListener("click", function (e) {
		if (!e.target.closest(".modal__content")) {
			closeModal(e.target.closest(".modal"));
		}
	});
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
		const text = e.target.elements.phoneNum;
		send_lead(text.value);
		text.value = "";
	});
}
