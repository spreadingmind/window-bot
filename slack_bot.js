require('dotenv').config();
const slackBot = require('slackbots');
const axios = require('axios');
const webSocketHost = process.env.WEB_SOCKET_HOST || localhost
const webSocketPort = process.env.WEB_SOCKET_PORT;
const constants = require('./constants.js');
const { getDetailsByValue, checkForGreetingMessage } = require('./utils');

class SlackBot {
  constructor() {
    this.bot = new slackBot({
      token: process.env.BOT_TOKEN,
      name: 'windowbot'
    });
    this.bot.on('message', async (message) => {
      if (message.type && message.type === 'hello' ||
        message.username && message.username === 'windowbot') {
        return;
      }
      if (message.text && message.text === 'lvl' ||
        message.content && message.content === 'lvl') {
        const currentLvl = await this.getCurrentLevel();
        if (!currentLvl) {
          return;
        }
        const details = await getDetailsByValue(Number(currentLvl));
        return this.bot.postMessage(message.channel, constants.level_info(currentLvl, details));
      }
      if (message.text && message.text === 'help') {
        return this.bot.postMessage(message.channel, constants.helptext);
      }
      if (message.text && message.text === 'show' || message.text === 'stream') {
        return this.bot.postMessage(message.channel, constants.graphText(`http://${webSocketHost}:${webSocketPort}`));
      }
      if (checkForGreetingMessage(message.text)) {
        return this.bot.postMessage(message.channel, constants.greeting);
      }
      else if (message.subtitle === 'windowbot (bot)') {
        return;
      }
    });
  }

  getCurrentLevel() {
    return axios.get(`http://${webSocketHost}:${webSocketPort}/co2`)
      .then((data) => {
        return data.data;
      })
      .catch((err) => {
        return null;
      });
  }
}
const bot = new SlackBot();
