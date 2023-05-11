const subjectButton = document.getElementById('subbtn');
const bodyButton = document.getElementById('bodybtn');
const subjectInput = document.getElementById('subjectInput');
const bodyInput = document.getElementById('bodyInput');

subjectButton.addEventListener('click', () => {
  const subject = subjectInput.value
  console.log(subject)
  window.electronAPI.setSubject(subject)
})

bodyButton.addEventListener('click', () => {
    const body = bodyInput.value
    console.log(body)
    window.electronAPI.setBody(body)
})