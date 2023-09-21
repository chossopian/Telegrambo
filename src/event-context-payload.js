const ContextDataEvents = new Map();

ContextDataEvents.set('message', event => ({
  chat_id: event.chat.id,
  message_id: event.message_id
}));


ContextDataEvents.set('callback_query', event => ({
  chat_id: event.message.chat.id,
  callback_query_id: event.id,
  message_id: event.message.message_id
}));


ContextDataEvents.set('inline_query', event => ({
  inline_query_id: event.id
}));


export default function(eventName, eventData) {
  if (ContextDataEvents.has(eventName))
    return ContextDataEvents.get(eventName)(eventData);

    return {};
}