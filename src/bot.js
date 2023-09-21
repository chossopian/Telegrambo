import RequestSender from './request-sender.js';
import BotContext from './bot-context.js';

export default function(token) {
  const request = RequestSender(token);
  return BotContext(request);
}
