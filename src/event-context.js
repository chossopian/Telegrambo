import EventContextPayload from './event-context-payload.js';

export default function(request, eventName, eventPayload) {
  const eventData = eventPayload[eventName];
  const contextPayload = EventContextPayload(eventName, eventData);

  return new Proxy(eventPayload, {
    get(target, prop) {
      if (prop in target)
        return target[prop];

      if (prop === 'update')
        return target;

      if (prop === 'payload')
        return contextPayload;

      if (prop === 'result')
        return new Proxy({}, {
          get: (_, method) => (requestPayload = {}) => ({method, ...contextPayload, ...requestPayload})
        });

      return (requestPayload = {}) => request(prop, {...contextPayload, ...requestPayload});
    }
  });
};