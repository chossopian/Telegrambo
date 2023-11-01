import bot from '../bot.js';
import update from '../updates/message-match.js';

// Write method for send log from object to user:
function createEventLog(event, eventName) {
  return (object) => {
    return event.sendMessage({
      text: `<pre>${JSON.stringify(object, null, ' ')}</pre>`,
      parse_mode: 'HTML'
    });
  };
};
// Initialize new method
bot.event.log = createEventLog;

// And use in event handler
bot.on('message', (event) => {
  console.log('EVENT LOG: ', event.log(event.message.from));
  // return event.log(event.message.text)
});

bot.setUpdate(update);
// console.log(bot.setUpdate(update));