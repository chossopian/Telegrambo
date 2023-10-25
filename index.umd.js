const createBrowserSyncBot = require('./src/create-browser-sync-bot.js');
const createBrowserAsyncBot = require('./src/create-browser-async-bot.js');
const createNodeSyncBot = require('./src/create-node-sync-bot.js');
const createNodeAsyncBot = require('./src/create-node-async-bot.js');
const BotContext = require('./src/bot-context.js');

module.exports = {
  createBrowserSyncBot,
  createBrowserAsyncBot,
  createNodeSyncBot,
  createNodeAsyncBot,
  BotContext
}; 