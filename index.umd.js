const syncBrowserBot = require('./src/sync-browser-bot.js');
const asyncBrowserBot = require('./src/async-browser-bot.js');
const syncNodeBot = require('./src/sync-node-bot.js');
const asyncNodeBot = require('./src/async-node-bot.js');
const botContext = require('./src/bot-context.js');

module.exports = {
  syncBrowserBot,
  syncNodeBot,
  asyncBrowserBot,
  asyncNodeBot,
  botContext
}; 