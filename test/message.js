import bot from './bot.js';

bot.on('message', (ctx) => {
  return ctx.sendMessage({
    text: ctx.message.text
  })
});