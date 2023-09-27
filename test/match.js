import bot from './bot.js';
import extensionMatch from '../extension/match.js';

bot.match = extensionMatch(bot);

bot.match('message::entities', (ctx, eventName, match) => {
  console.log({match});
});