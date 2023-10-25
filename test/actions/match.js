import bot from '../bot.js';
import extensionMatch from '../../extension/match.js';
import update from '../updates/message-match.js';

bot.match = extensionMatch(bot);

bot.match('message::entities', (ctx, eventName, match) => {
  console.log({match});
});

console.log(bot.setUpadte(update));