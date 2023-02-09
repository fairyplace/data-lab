const API_URL = 'http://127.0.0.1:3000'

const send_lead = async (phone) => {
  const message = `Date ${new Date().toLocaleString()}\nPhone: \`${phone}\`\nIP: ${window.location.hostname}\n`
  // const response = fetch(URL + '/sendMessage?chat_id=' + chat_id + '&text=' + message);
  const response = await fetch(API_URL + '/sendLead', { 
    method: 'POST',
    headers: {"Content-Type": "application/json"}, 
    body: JSON.stringify({
      text: message,
      parse_mode: "Markdown"
    })
  })

  // if (!response.error) {
  //   console.log('ne error')
  // } else {
  //   console.log('error' + response.error)
  // }

}



for (var form of document.forms) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = e.target.elements.phoneNum
    send_lead(text.value)
    text.value = ''
  })
}