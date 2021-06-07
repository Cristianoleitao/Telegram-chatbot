const TelegramBot = require('node-telegram-bot-api')
const dialogFlow = require('./dialogFlow')
const youTube = require('./youtube')

const token = '1864514717:AAEZxekrPAyGskbempMhx0BiS5-fZXk1XzA'

const bot = new TelegramBot(token,{polling: true})

bot.on('message', async (msg) => {
    const chatId = msg.chat.id
    
    const dialogReponse = await dialogFlow.sendMessage(chatId.toString(), msg.text)

     let responseText = dialogReponse.text

    if(dialogReponse.intent === 'Node js'){

       responseText = await youTube.searchVideoURL(responseText, dialogReponse.fields.cursos.stringValue) 
    }
    bot.sendMessage(chatId, responseText )
   
 
})

