import EventContext from './event-context.js';
import { BotContextError } from './errors.js';

export default BotContext;

/**
 * Creates a BotContext object that handles event handling and processing.
 *
 * @param {object} request - The request object.
 * @param {object} params - Optional parameters.
 * @param {string} params.match_separator - The separator used for event matching. Default is '::'.
 * @return {object} The BotContext object.
 */
function BotContext(request, params = {}) {
  const EVENTS = new Map();
  const {match_separator: matchSeparator = '::'} = params;
  const self = {};

  /**
   * Attaches an event handler for a specific event or event match.
   *
   * @param {string|function} eventMatch - The event or event match to attach the handler to.
   * @param {function} eventHandler - The handler function to attach.
   */
  self.on = (eventMatch, eventHandler) => {
    let eventName;

    if (typeof eventMatch === 'function') {
      eventHandler = eventMatch;
      eventName = null;

    } else if (!eventMatch || eventMatch.includes(matchSeparator)) {
      const matchChain = eventMatch.split(matchSeparator);
      eventName = matchChain[0] || null;
      eventHandler = createMatchHandler(matchChain, eventHandler);

    } else {
      eventName = eventMatch;
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
  self.process = (eventPayload) => {
    const eventName = Object.keys(eventPayload).find(key => key !== 'update_id');
    const handlers = [
      ...runEventHandlers(eventName, eventName, eventPayload),
      ...runEventHandlers(null, eventName, eventPayload)
    ];
    return handlers;
  };

  /**
   * Creates a match handler function that processes events based on a given match chain.
   *
   * @param {Array} matchChain - The chain of properties to match against in the event data.
   * @param {function} matchEventHandler - The event handler function to be called when a match is found.
   * @return {function} The created match handler function.
   */
  function createMatchHandler(matchChain, matchEventHandler) {
    return (eventContext, eventName, parentMatch) => {
      let match = parentMatch ?? eventContext.update;
      const regExpr = /^\/(.+)\/([imus]{0,4})?$/;

      for (let p = 0; p < matchChain.length; p++) {
        const prop = matchChain[p];

        const matchType = match.constructor.name;

        if (matchType === 'Object') {
          if (prop in match)
            match = match[prop];

          else if (prop !== '')
            return null;

        } else if (matchType === 'Array') {
          const slicedMatchChain = matchChain.slice(p);
          console.log(slicedMatchChain)
          const result = match.map(match => createMatchHandler(
            slicedMatchChain,
            matchEventHandler
            )(eventContext, eventName, match)
          );
          return result.filter(res => res).flat();

        } else if (prop === '') {
          continue;

        } else if (regExpr.test(prop)) {
          const [_, pattern, flags] = prop.match(regExpr);
          const RE = new RegExp(pattern, flags);
          if (!RE.test(match))
            return null;

        } else if (String(match) != prop) {
          return null;
        } // if match !== prop
      } // for prop in props
      return matchEventHandler(eventContext, eventName, match);
    }
  }

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
      const eventContext = EventContext(request, eventName, eventPayload);
      for (let handler of EVENTS.get(trigger))
        result.push(handler(eventContext, eventName));
    }

    return result.flat();
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

    apply(target, thisArg, args) {
      return target.process(...args);
    }
  });
}