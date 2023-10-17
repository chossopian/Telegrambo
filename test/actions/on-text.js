import bot from '../bot.js';
import update  from '../updates/message-hello.js';

// Write function for creating new method
function createOnTextMethod(bot) {
  return (matchText, handler) => {
    bot.on('message', (ctx) => {
      if (ctx.message.text === matchText)
        return handler(ctx);
      });
  };
};

// Initialize new method onText
bot.onText = createOnTextMethod(bot);

// Run new method
bot.onText('Hello!', (ctx) => {
  return ctx.sendMessage({
    text: 'Check Method OnText'
  });
});

console.log(bot.process(update));