const { app, BrowserWindow, ipcMain, dialog } = require('electron')
require('dotenv').config();
const { Configuration, OpenAIApi } = require("openai");
// const axios = require('axios'); 
const path = require('path')

const configuration = new Configuration({
    organization: process.env.OPEN_AI_ORG,
    apiKey: process.env.OPEN_AI_KEY,
});

const openai = new OpenAIApi(configuration);

// async function makeRequest(inputPrompt) {
//     let chatGPTResponse
//     console.log("prompt received", inputPrompt)
//     // axios({
//     //     method: 'post',
//     //     headers: {
//     //         Authorization: 'Bearer' + process.env.OPEN_AI_KEY,
//     //         'OpenAI-Organization': process.env.OPEN_AI_ORG
//     //     },
//     //     url: 'https://api.openai.com/v1/completions',
//     //     model: "gpt-3.5-turbo",
//     //     messages: [{role: "user", content: prompt}]

//     // })
//     // .then(function (response) {

//     // })
//     //   .catch(function (error) {
//     //     console.log(error);
//     // });
//     const completion = await openai.createChatCompletion({
//         model: "gpt-3.5-turbo",
//         messages: [{role: "user", content: inputPrompt}],
//       });
//     chatGPTResponse = completion
//     return chatGPTResponse
// }

function createWindow () {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  ipcMain.handle('ask-chat', async (event, inputPrompt) => {
    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{role: "user", content: inputPrompt}],
      });
    chatGPTResponse = completion.data.choices[0].message.content
    return chatGPTResponse
  })

  mainWindow.loadFile('index.html')
}

app.whenReady().then(() => {
//   ipcMain.handle('update-subject', updateSubject)
  createWindow()
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})