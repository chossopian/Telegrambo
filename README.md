# Telegrambo

Telegrambo is a simple library for interacting with the [Telegram Bot API](https://core.telegram.org/bots/api#available-methods).

## Installation

You can install Telegrambo using npm:

`npm install telegrambo` or `npm install headmad/telegrambo`


## Usage

<br>To use Telegrambo in your project, you can import it as a module:

```js
import bot from './bot.js';

export default async function handler(request, response) {
  // Listening webhook on POST-request
  if (request.method === 'POST') {

    // request.body must be a object
    const results = bot.process(request.body);
    console.log(results);

  // Set webhook if query-string of url have 'webhook':
  // https://my-syte.com?webhook
  } else ('webhook' in request.query) {
    
    bot.setWebhook({
      url: 'https://my-syte.com'
    });

  }

  return response.send('Ok');
}
```
<br>And file with bot:

```js
// bot.js
import {createNodeBot } from 'telegambo';
const bot = createNodeBot(process.env.YOU_BOT_TOKEN);

// Create echo-bot
bot.on('message', (ctx) => {
  ctx.sendMessage({
    text: ctx.message.text
  });
});
```

<br>List of events you can get from type [_Update_](https://core.telegram.org/bots/api#update) in official documentation. It can be any field except `update_id`. For example, listen event `callback_query`:

```js
// bot.js
import Telegrambo from 'telegambo';
const bot = Telegrambo(process.env.YOU_BOT_TOKEN);

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
    bot.sendMessage({
      text: 'You press the button, and bot send <b>some data</b>',
      parse_mode: 'HTML'
    });
  }
});
```

<br>If passed just one argument in 'bot.on' method, and it's a function, this handler be applied to any event:

```js
// bot.js
import Telegrambo from 'telegambo';
const bot = Telegrambo(process.env.YOU_BOT_TOKEN);

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

<br>
You can create own methods/ For example:

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

## Event-filter 
Also, you can use special filters of events:

```js
// bot.js
import Telegrambo from 'telegambo';
const bot = Telegrambo(process.env.YOU_BOT_TOKEN);

// Create bot if 
bot.on('message::photo', (ctx) => {
  ctx.sendMessage({
    text: 'Great photo!'
  });
});
```

<br>This handler will working in `message` event and [_Message_](https://core.telegram.org/bots/api#message) message type has field `photo`.
This filter is very powerfull. You can check endpoints for a match or regular expression match:

```js
// Will matching for text "Hello!"
'message::text::Hello!'

// Matching regular expression for /start command in text of message 
'message::text::/.*\\/start\\b.*/i'

// Also filter can be applied to array field like 'entities'
// then filter will maching to each element of them
// and check is this entitie is mention (@username) 
'message::entities::type::mention'
```

<br>If You whant change match separator from '::' to your, pass to bot `params`-object: 

```js
import Telegrambo from 'telegambo';

const params = { match_separator: '--' };
const bot = Telegrambo(process.env.YOU_BOT_TOKEN, params);

bot.on('message--text--/\\/\\w+/i', (ctx, match) => {
  ctx.sendMessage({
    text: 'You send me command <b>${match}</b>'
  });
});
```

<br>

## API
`BotContext(request)`
Creates a new BotContext object that handles events and provides a proxy to interact with the bot.

`request` (Object): The request object that contains information about the bot.
Returns: A new BotContext object.

`bot.on(eventName, eventHandler)`
Adds an event handler for the specified event name.

`eventName` (string|function): The name of the event or a function to handle all events.

`eventHandler` (function): The function to handle the event.

`bot.process(eventPayload)`
Processes the given event payload and returns an array of event handlers.

`eventPayload` (Object): The payload of the event to be processed.
Returns: An array of event handlers.

## License
Telegrambo is MIT licensed.

Please make sure to update the installation, usage, and API sections with the correct information for your library. Also, don't forget to include a license file and a contributing guidelines file if applicable.