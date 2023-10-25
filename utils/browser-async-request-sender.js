import RequestPayloadPrepare from "./request-payload-prepare.js";

export default createRequestSender;

/**
 * Create a request sender function that sends a request to the Telegram API.
 *
 * @param {string} token - The authentication token for the Telegram API.
 * @return {function} - A function that sends a request to the Telegram API.
 */
function createRequestSender(token) {
  return requestSender;
/**
 * Sends a request to the Telegram API and returns the response.
 *
 * @param {string} method - The method to call in the Telegram API.
 * @param {Object} payload - The payload to send with the request.
 * @return {Object} The response from the Telegram API.
 */
  async function requestSender(method, payload) {
    const url = `https://api.telegram.org/bot${token}/${method}`;
    const preparedPaylod = RequestPayloadPrepare(payload);

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(preparedPaylod)
    });

    if (response.ok)
      return await response.json();
    
      else
        throw new Error(response.status);
  }
}