import {createNodeBot} from '../index.es.js';

console.log(process.env.TUPOROBOT_TOKEN)

const bot = createNodeBot(process.env.TUPOROBOT_TOKEN);
// 227295372
const start = bot.sendMessage({
  chat_id: 227295372,
  text: 'START SCRIPT'
});

console.log(start)

bot.on('message', (ctx) => {
  ctx.sendMessage({

    text: ctx.message.text
  });
});

let offset = 0;
while (true) {
  
  const {ok, result} = bot.getUpdates({
    offset,
    timeout: 60
  });

  if (!ok)
    break;
  
  if (!result.length) {
    console.log('-----------------');
    continue;
  }
  
  offset = result[result.length - 1].update_id + 1;
  
  for (let update of result) {
    bot.setUpdate(update);
  }
}