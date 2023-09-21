import EventContext from './event-context.js';
import {BotContextError} from './errors.js';

export default function(request) {
  const EVENTS = new Map();

  const self = {};

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

  self.process = (eventPayload) => {
    const eventName = Object.keys(eventPayload).find(key => key !== 'update_id');
    const handlers = [
      ...runEventHandlers(eventName, eventName, eventPayload),
      ...runEventHandlers(null, eventName, eventPayload)
    ];
    return handlers;
  };
  
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

      target[prop]  = value;
      return true;
    },

    apply(target, thisArg, args) {
      return target.process(...args);
    }
  });
}