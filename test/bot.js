import BotContext from '../src/bot-context.js';

const request = (method, payload) => {
  payload.method = payload.method ?? method;
  return payload;
}

const bot = BotContext(request);

export default bot;