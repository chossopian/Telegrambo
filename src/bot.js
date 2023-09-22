import RequestSender from './request-sender.js';
import BotContext from './bot-context.js';

export default Bot;

/**
 * Creates a new Bot instance.
 *
 * @param {string} token - The token used to authenticate the Bot.
 * @return {BotContext} The BotContext object that encapsulates the Bot's functionality.
 */
function Bot(token, params = {}) {
  const request = RequestSender(token);
  return BotContext(request, params);
}
