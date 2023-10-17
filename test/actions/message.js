import bot from '../bot.js';
import msg from '../updates/message.js';

console.log(bot.process(msg));

bot.on('message', (ctx) => {
  return ctx.sendMessage({
    text: ctx.message.text
  })
});
