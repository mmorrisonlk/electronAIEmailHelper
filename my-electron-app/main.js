const { app, BrowserWindow, ipcMain, dialog } = require('electron');
require('dotenv').config();
const { Configuration, OpenAIApi } = require("openai");
const nodemailer = require("nodemailer");
const path = require('path');

const configuration = new Configuration({
    organization: process.env.OPEN_AI_ORG,
    apiKey: process.env.OPEN_AI_KEY,
});

const openai = new OpenAIApi(configuration);

function sendIt(event, recipients, subject, body) {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  var mailOptions = {
    from: process.env.EMAIL_USER,
    to: recipients,
    subject: subject,
    text: body
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) console.log(err);
    else dialog.showMessageBox( "Email Sent!");
  });
}

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
  ipcMain.handle('send-mail', sendIt)
  createWindow()
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})