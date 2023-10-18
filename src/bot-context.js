import EventContext from './event-context.js';
import { BotContextError } from './errors.js';

export default BotContext;

/**
 * Creates a BotContext object that handles event handling and processing.
 *
 * @param {requestSender} requestSender - Function that accepts a method and payload.
 * @param {object} params - Optional parameters.
 * @param {string} params.match_separator - The separator used for event matching. Default is '::'.
 * @return {object} The BotContext object.
 */
function BotContext(requestSender) {
  const EVENTS = new Map();
  const self = {};

  /**
   * Attaches an event handler for a specific event or event match.
   *
   * @param {string|function} eventName - The event or event match to attach the handler to.
   * @param {function} eventHandler - The handler function to attach.
   */
  self.on = (eventName, eventHandler) => {

    if (typeof eventName === 'function') {
      eventHandler = eventName;
      eventName = null;
    }

    if (EVENTS.has(eventName))
      EVENTS.get(eventName).push(eventHandler);
    else
      EVENTS.set(eventName, [eventHandler]);
  };

  /**
   * Processes the event payload and returns the list of handlers to be executed.
   *
   * @param {object} eventPayload - The payload of the event.
   * @return {array} The list of handlers to be executed.
   */
  self.setUpdate = (eventPayload) => {
    const eventName = Object.keys(eventPayload).find(key => key !== 'update_id');
    const handlers = [
      ...runEventHandlers(eventName, eventName, eventPayload),
      ...runEventHandlers(null, eventName, eventPayload)
    ];
    return handlers;
  };
  

  /**
   * Run event handlers for a given trigger, event name, and event payload.
   *
   * @param {string} trigger - The trigger to run event handlers for.
   * @param {string} eventName - The name of the event.
   * @param {any} eventPayload - The payload of the event.
   * @return {Array} - An array containing the results of running the event handlers.
   */
  function runEventHandlers(trigger, eventName, eventPayload) {
    const result = [];
    if (EVENTS.has(trigger)) {
      const eventContext = EventContext(requestSender, eventName, eventPayload);
      for (let handler of EVENTS.get(trigger))
        result.push(handler(eventContext, eventName));
    }

    return result.flat();
  }


  return new Proxy(self, {
    get(target, prop) {
      if (prop in target)
        return target[prop];

      return (requestPayload = {}) => requestSender(prop, requestPayload);
    },

    set(target, prop, value) {
      if (prop in target)
        throw new BotContextError(`Can't rewrite method "${prop}"`);

      if (typeof value !== 'function')
        throw new BotContextError(`New method "${prop}" must be a function`);

      target[prop] = value;
      return true;
    },
  });
}

/**
 * @callback requestSender - Synchronous function that accepts a method and payload.
 * @param {string} method - Telegram API method for the request.
 * @param {object} payload - The payload to send with the request.
 * @return {object} - The response from the Telegram API.
 */