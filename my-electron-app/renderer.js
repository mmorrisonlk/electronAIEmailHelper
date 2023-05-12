const recipientListInput = document.getElementById('recipientList');
const subjectLineInput = document.getElementById('subjectLine');
const bodySectionInput = document.getElementById('bodySection');
const sendEmailButton = document.getElementById('sendEmail')

const chatGPTButton = document.getElementById('chatGPTButton');
const chatGPTPrompt = document.getElementById('chatGPTPrompt');

chatGPTButton.addEventListener('click', async () => {
    const prompt = chatGPTPrompt.value
    console.log("Input message", prompt)
    let response = await window.electronAPI.makeRequest(prompt)
    console.log("Output message", response)
    bodySection.innerHTML = response
})

sendEmailButton.addEventListener('click', async () => {
    const recipients = recipientListInput.value;
    const subject = subjectLineInput.value;
    const body = bodySectionInput.innerHTML;
    console.log("Input message", recipients, subject, body)
    await window.electronAPI.sendIt(recipients, subject, body)
})
