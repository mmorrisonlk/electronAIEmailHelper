const subjectLineButton = document.getElementById('subjectLineButton')
const subjectLineInput = document.getElementById('subjectLineInput')
const subjectLine = document.getElementById('subjectLine')

const bodySectionButton = document.getElementById('bodySectionButton')
const bodySectionInput = document.getElementById('bodySectionInput')
const bodySection = document.getElementById('bodySection')

const chatGPTButton = document.getElementById('chatGPTButton')
const chatGPTPrompt = document.getElementById('chatGPTPrompt')

subjectLineButton.addEventListener('click', async () => {
    console.log("bueler")
    const inputSubject = subjectLineInput.value
    subjectLine.innerHTML = inputSubject;
})

bodySectionButton.addEventListener('click', async () => {
    const inputBodySection = bodySectionInput.value
    bodySection.innerHTML = inputBodySection;
})

chatGPTButton.addEventListener('click', async () => {
    const prompt = chatGPTPrompt.value
    console.log("Input message", prompt)
    let response = await window.electronAPI.makeRequest(prompt)
    console.log("Output message", response)
    bodySection.innerHTML = response
})

