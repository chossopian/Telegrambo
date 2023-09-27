import bot from './bot.js';
import extensionMatch from '../extension/match.js';

bot.match = extensionMatch(bot);

bot.match('message::match::me', (ctx, eventName, match) => {
  return {match};
});