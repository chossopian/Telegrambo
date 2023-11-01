import bot from '../bot.js';
import update from '../updates/message-match.js';
import extensionMatch from '../../extension/match.js';

bot.match = extensionMatch;

bot.match('message::entities', (ctx, eventName, match) => {
  console.log({match});
});

console.log(bot.setUpdate(update));