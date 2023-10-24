import {createNodeBot} from '../index.es.js';
import process from 'process';

const bot = createNodeBot(process.env.TUPOROBOT_TOKEN);

bot.sendMessage({
  chat_id: process.env.HEADMAD_ID,
  text: 'START SCRIPT'
});

bot.on('message', (ctx) => {
  ctx.sendMessage({
    text: ctx.message.text
  });
});

// process.on('SIGHUP', () => {
//   bot.sendMessage({
//     chat_id: process.env.HEADMAD_ID,
//     text: 'END SCRIPT'
//   });
//   console.log('SIGHUP PROCESS')
//   process.exit();
// });

// process.on('SIGINT', () => {
//   bot.sendMessage({
//     chat_id: process.env.HEADMAD_ID,
//     text: 'END SCRIPT'
//   });
//   console.log('SIGINT PROCESS')
//   process.exit();
// });

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
