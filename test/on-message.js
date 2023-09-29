import bot from './bot.js';
import update  from './update/message.js';

bot.on('message', (ctx) => {
  return ctx.sendMessage({
    text: ctx.message.text
  })
});

console.log(bot.process(update));