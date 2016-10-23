'use strict'

// Add dependencies
const botBuilder = require('claudia-bot-builder')
const telegramTemplate = botBuilder.telegramTemplate
const excuse = require('huh')

function mainMenu() {
  return new telegramTemplate.Text(`Here's what I can help with:`)
    .addReplyKeyboard([
      ['I want to talk on the conference'],
      ['Show Slack link'],
      ['Show Github link'],
      ['Show Meetup link']
    ])
    .get()
}

module.exports =  botBuilder(message => {
  // Initial message
  // `/start start` is something that Telegram sends when someone click on Start button
  if (message.text === '/start' || message.text === '/start start')
    return [
      `Hey ${message.originalRequest.message.from.first_name}!`,
      `I am JS Belgrade chatbot!`,
      `In case you didn't know, JS Belgrade is JavaScript community from Belgrade Serbia.`,
      mainMenu()
    ]

  // Show main menu
  if (message.text === '/menu' || message.text === 'Show menu')
    return mainMenu()

  if (message.text === 'I want to talk on the conference')
    return [
      `We are developers and GitHub is something that most of us use every day, so we decided to put CFP there.`,
      `JS Belgrade Meetups are organized every month. Most of the time they are on Saturday afternoon.`,
      new telegramTemplate.Text(`So if you want to talk in one of the next JS Belgrade Meetups, all you need to do is to click on the button below and open an issue :)`)
        .addInlineKeyboard([
          [{ text: 'Open CFP', url: 'https://github.com/JSBelgrade/cfp' }]
        ])
        .get()
    ]

  if (message.text === 'Show Slack link')
    return new telegramTemplate.Text(`We have great community on Slack! Are you already there? If not join us!`)
      .addInlineKeyboard([
        [{ text: 'Invite me please!', url: 'http://slack.jsbelgrade.org' }],
        [{ text: 'I am already on Slack', url: 'https://jsbelgrade.slack.com' }]
      ])
      .get()

  if (message.text === 'Show Github link')
    return `Here's Github link: https://github.com/JSBelgrade, feel free to contribute to anything :)`

  if (message.text === 'Show Meetup link')
    return `All of our meetups are here: http://meetup.com/JS-Belgrade-Meetup, see you on one of the next meetups ;)`

  // Fallback in case we can't process the message
  return [
    `Thanks for sending "${message.text}". Unfortunately I can't process your message :(\n*Reason:*\n${excuse.get()}.`,
    mainMenu()
  ]
})
