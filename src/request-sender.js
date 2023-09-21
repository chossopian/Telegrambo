import fetch from "sync-fetch";
import RequestPayloadPrepare from "./request-payload-prepare.js";
import { ResponseError } from "./errors.js";

export default function (token) {
  return (method, payload) => {
    method = payload.method ?? method;
    const url = `https://api.telegram.org/bot${token}/${method}`;
    const preparedPaylod = RequestPayloadPrepare(payload);
    const options = {
      method: 'POST',
      body: JSON.stringify(preparedPaylod),
      headers: { 'Content-Type': 'application/json' },
    };

    return fetch(url, options).json();
  }
}