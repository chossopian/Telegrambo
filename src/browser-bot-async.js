import createRequestSender from '../utils/browser-request-sender-async.js';
import BotContext from './bot-context.js';

export default createBrowserBot ;


/**
 * Creates a browser bot with the given token and parameters.
 *
 * @param {string} token - The token used to authenticate the bot.
 * @param {object} params - Additional parameters for the bot (optional).
 * @return {BotContext} The created bot context.
 */
function createBrowserBot(token, params = {}) {
  const requestSender = createRequestSender(token);
  return BotContext(requestSender, params);
}
