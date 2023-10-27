# Telegrambo

Telegrambo is a simple library for interacting with the [Telegram Bot API](https://core.telegram.org/bots/api)

This library is based on the telegram API, so all methods of the bot instance will be [available methods](https://core.telegram.org/bots/api#available-methods) from the telegram list.

The context in the event handler also uses the available methods, while having ready-made fields in the arguments of these methods, such as *chat_id* or *message_id* and others. If necessary, you can overwrite these fields.

## Installation

You can install Telegrambo using npm:

`npm install telegrambo` or `npm install headmad/telegrambo`


## Usage

At first, create bot:
```js
// bot.js
import { nodeBotAsync } from 'telegrambo';
const bot = nodeBotAsync(process.env.YOU_BOT_TOKEN);

// Create echo-bot
bot.on('message', (ctx) => {
  ctx.sendMessage({
    text: ctx.message.text
  });
});

export default bot;
```

<br>Then import it as a module. For example, using bot with webhook:

```js
import bot from './bot.js';

export default async function handler(request, response) {
  // Listening webhook on POST-request
  if (request.method === 'POST') {

    // request.body must be a object
    const {ok, result} = await bot.setUpdate(request.body);
    console.log(result);

  // Set webhook if query-string of url have 'webhook':
  // https://my-syte.com?webhook
  } else ('webhook' in request.query) {
    
    await bot.setWebhook({
      url: 'https://my-syte.com'
    });

  }

  return response.send('Ok');
}
```
<br>Or with long polling:
```js
import bot from './bot.js';

(async () => {
  let offset = 0;
  let timeout = 60;

  while (true) {
    const {ok, result} = await bot.getUpdates({
      offset,
      timeout
    });

    if (!ok)
      break;
    
    if (!result.length)
      continue;
    
    offset = result.at(-1).update_id + 1;

    for (let update of result)
      bot.setUpdate(update);
  }
})();

```



<br>List of events you can get from type [_Update_](https://core.telegram.org/bots/api#update) in official documentation. It can be any field except `update_id`. For example, listen event `callback_query`:

```js
// bot.js
import { nodeBotAsync } from 'telegrambo';
const bot = nodeBotAsync(process.env.YOU_BOT_TOKEN);

// Send keyboard on command "/somedata"
bot.on('message', (ctx) => {
  if (ctx.message.text === '/somedata') {
    ctx.sendMessage({
      text: 'Press the button and bot send some data',
      reply_markup: {
        inline_keyboard: [[{
          text: 'Send some data',
          callback_data: 'SOME DATA'
        }]]
      }
    });
  }
});

// Handle callback-query event
bot.on('callback_query', (ctx) => {
  if (ctx.callback_query.data === 'SOME DATA') {
    ctx.sendMessage({
      text: 'You press the button, and bot send <b>some data</b>',
      parse_mode: 'HTML'
    });
  }
});
```

<br>If passed just one argument in 'bot.on' method, and it's a function, this handler be applied to any event:

```js
// bot.js
import { nodeBotAsync } from 'telegrambo';
const bot = nodeBotAsync(process.env.YOU_BOT_TOKEN);

// Passed just function
bot.on((ctx, eventName) => {
  const name = ctx[eventName].from.first_name;
  ctx.sendMessage({
    text:  `Hi, ${name}! The event <i>${eventName}</i> just happened`,
    parse_mode: 'HTML'
  });
});
```
<br>

## Own methods

<br>You can create own methods/ For example:

```js
import bot from './bot.js';

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
bot.onText('Hello', (ctx) => {
  return ctx.sendMessage({
    text: 'Hi there!'
  });
});
```
<br>

## API


`nodeBotAsync(token)`
Creates a new BotContext object that handles events and provides a proxy to interact with the bot.

`token` (string): Telegram token of bot

`bot.on(eventName, eventHandler)`
Adds an event handler for the specified event name.

`eventName` (string|function): The name of the event or a function to handle all events.

`eventHandler` (function): The function to handle the event.

`bot.setUpdate(update)`
Processes the given event payload and returns an array of event handlers.

`update` (Object): The payload of the event to be processed.


## License
Telegrambo is MIT licensed.

Please make sure to update the installation, usage, and API sections with the correct information for your library. Also, don't forget to include a license file and a contributing guidelines file if applicable.