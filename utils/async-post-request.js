import https from 'https';

export default sendPostRequest;

/**
 * Отправляет POST-запрос на указанный URL с заданным телом.
 *
 * @param {string} url - URL для отправки запроса.
 * @param {object} body - Тело запроса в формате JSON.
 * @return {Promise} Промис, который разрешается с телом ответа или отклоняется с ошибкой.
 */
function sendPostRequest(url, body) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  return new Promise((resolve, reject) => {
    const req = https.request(url, options, (res) => {
      let responseData = '';

      res.on('data', (chunk) => {
        responseData += chunk;
      });

      res.on('end', () => {
        resolve(JSON.parse(responseData));
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.write(JSON.stringify(body));
    req.end();
  });
}