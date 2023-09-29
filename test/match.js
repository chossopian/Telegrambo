import bot from './bot.js';
import onMatch from '../extensions/on-match.js';
import update from './update/match.js';

bot.onMatch = onMatch(bot);



bot.onMatch('message::entities::type::mention', (ctx, match) => {
  console.log(match);

});

console.log(bot.process(update));