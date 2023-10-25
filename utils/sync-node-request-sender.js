import request from "sync-request";
import RequestPayloadPrepare from "./request-payload-prepare.js";

export default createRequestSender;

/**
 * Creates a request sender function that sends HTTP requests to the Telegram API.
 *
 * @param {string} token - The access token used to authenticate with the Telegram API.
 * @returns {function} - A function that accepts a method and payload, and sends a request to the Telegram API.
 */
function createRequestSender(token) {
  return requestSender;

  /**
   * Sends a request to the Telegram API.
   *
   * @param {string} method - The method to call in the Telegram API.
   * @param {object} payload - The payload to send with the request.
   * @return {object} The response from the Telegram API.
   */
  function requestSender(method, payload) {
    const url = `https://api.telegram.org/bot${token}/${method}`;
    const preparedPayload = RequestPayloadPrepare(payload);

    const res = request('POST', url, {
      json: preparedPayload,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    if (res.statusCode === 200) {
      return JSON.parse(res.getBody('utf8'));
    } else {
      throw new Error(`Error sending POST request. Status code: ${res.statusCode}`);
    }
  }
}











