import bot from '../bot.js';
import extensionMatch from '../../extension/match.js';
import msg from '../updates/message-match.js';

bot.match = extensionMatch(bot);

bot.match('message::entities', (ctx, eventName, match) => {
  console.log({match});
});

console.log(bot.process(msg));