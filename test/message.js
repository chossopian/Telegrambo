import bot from './bot.js';

bot.on('message::text', (ctx) => {
  return ctx.sendMessage({
    text: 'Hello'
  })
});

// export default bot;