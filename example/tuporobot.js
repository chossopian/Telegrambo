import {asyncNodeBot} from '../index.es.js';
import process from 'process';

const bot = asyncNodeBot(process.env.TUPOROBOT_TOKEN);

(async () => {
  const result = await bot.sendMessage({
    chat_id: process.env.HEADMAD_ID,
    text: 'START SCRIPT'
  });
  
  console.log(result)
})();

// bot.on('message', (ctx) => {
//   ctx.sendMessage({
//     text: ctx.message.text
//   });
// });



// let offset = 0;
// while (true) {
  
//   const {ok, result} = bot.getUpdates({
//     offset,
//     timeout: 60
//   });

//   if (!ok)
//     break;
  
//   if (!result.length) {
//     console.log('-----------------');
//     continue;
//   }
  
//   offset = result[result.length - 1].update_id + 1;
  
//   for (let update of result) {
//     bot.setUpdate(update);
//   }
// }
