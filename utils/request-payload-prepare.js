const STRING_PROPS = new Set(['chat_id', 'from_chat_id', 'text']);
const JSON_PROPS = new Set([
  'reply_markup', 'entities', 'caption_entities', 'media', 'allowed_updates', 
  'allowed_updates', 'options', 'explanation_entities', 'permissions', 'results',
  'result', 'commands', 'scope', 'menu_button', 'rights', 'menu_button', 'stickers',
  'sticker', 'emoji_list', 'keywords', 'mask_position', 'results', 'button', 'prices',
  'suggested_tip_amounts', 'provider_data', 'shipping_options'
]);

/**
 * Takes in a payload object, a set of properties, and a handler function.
 * Returns a new object with the properties in the payload object that are also in the set of properties and 
 * their corresponding values transformed by the handler function.
 *
 * @param {Object} payload - The payload object.
 * @param {Set} props - A set of properties.
 * @param {Function} handler - The handler function that transforms the values.
 * @return {Object} - The new object with the transformed values.
 */
function prepare(payload, props, handler) {
  const result = {...payload};
  for (let prop in result)
    if (props.has(prop))
      result[prop] = handler(result[prop]);
    
    return result;
}

const jsonify = (payload) => prepare(payload, JSON_PROPS, JSON.stringify);
const stringify = (payload) => prepare(payload, STRING_PROPS, String);

/**
 * Prepares the request payload by creating a deep copy of the input object and then converting it to a JSON string.
 *
 * @param {object} requestPayload - The input request payload object.
 * @return {string} - The JSON string representation of the modified request payload.
 */
function RequestPayloadPrepare(requestPayload) {
  const result = {...requestPayload};
  return jsonify( stringify(result) );
}

export default RequestPayloadPrepare;