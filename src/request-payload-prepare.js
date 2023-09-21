const STRING_PROPS = new Set(['chat_id', 'from_chat_id', 'text']);
const JSON_PROPS = new Set([
  'reply_markup', 'entities', 'caption_entities', 'media', 'allowed_updates', 
  'allowed_updates', 'options', 'explanation_entities', 'permissions', 'results',
  'result', 'commands', 'scope', 'menu_button', 'rights', 'menu_button', 'stickers',
  'sticker', 'emoji_list', 'keywords', 'mask_position', 'results', 'button', 'prices',
  'suggested_tip_amounts', 'provider_data', 'shipping_options'
]);


function prepare(payload, props, handler) {
  const result = {...payload};
  for (let prop in result)
    if (props.has(prop))
      result[prop] = handler(result[prop]);
    
    return result;
}


const jsonify = (payload) => prepare(payload, JSON_PROPS, JSON.stringify);
const stringify = (payload) => prepare(payload, STRING_PROPS, String);


export default function(requestPayload) {
  const result = {...requestPayload};
  return jsonify( stringify(result) );
}