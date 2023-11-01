import bot from '../bot.js';
import update from '../updates/message.js';

console.log(bot.setUpadte(update));

bot.on('message', (ctx) => {
  return ctx.sendMessage({
    text: ctx.message.text
  })
});

console.log(bot.setUpdate(update));