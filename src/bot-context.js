import EventContext from './event-context.js';
import { BotContextError } from './errors.js';

export default BotContext;

/**
 * Creates a new BotContext object that handles events and provides a proxy to interact with the bot.
 *
 * @param {function} request - The request function for sending requests to telegram servers by token.
 * @return {BotContext} A new BotContext object.
 */
function BotContext(request) {
  const EVENTS = new Map();

  const self = {};

  /**
   * Adds an event handler for the specified event name.
   *
   * @param {string|function} eventName - The name of the event or a function to handle all events.
   * @param {function} eventHandler - The function to handle the event.
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
 * Processes the given event payload and returns an array of event handlers.
 *
 * @param {Object} eventPayload - The payload of the event to be processed.
 * @return {Array} An array of event handlers.
 */
  self.process = (eventPayload) => {
    const eventName = Object.keys(eventPayload).find(key => key !== 'update_id');
    const handlers = [
      ...runEventHandlers(eventName, eventName, eventPayload),
      ...runEventHandlers(null, eventName, eventPayload)
    ];
    return handlers;
  };

/**
 * Executes event handlers based on the given trigger, event name, and event payload.
 *
 * @param {string} trigger - The trigger that determines which event handlers to execute.
 * @param {string} eventName - The name of the event.
 * @param {any} eventPayload - The payload of the event.
 * @return {Array} An array containing the results of executing the event handlers.
 */
  function runEventHandlers(trigger, eventName, eventPayload) {
    const result = [];
    if (EVENTS.has(trigger)) {
      const eventContext = EventContext(request, eventName, eventPayload);
      for (let handler of EVENTS.get(trigger))
        result.push(handler(eventContext, eventName));
    }

    return result;
  }


  return new Proxy(self, {
    get(target, prop) {
      if (prop in target)
        return target[prop];

      return (requestPayload = {}) => request(prop, requestPayload);
    },

    set(target, prop, value) {
      if (prop in target)
        throw new BotContextError(`Can't rewrite method "${prop}"`);

      if (typeof prop !== 'function')
        throw new BotContextError(`New method "${prop}" must be a function`);

      target[prop] = value;
      return true;
    },
  });
}