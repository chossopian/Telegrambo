import bot from './bot.js';
import './message.js';
import './match.js';

const apiRequestMessage = {
  "update_id": 87654321,
  "message": {
    "message_id": 1,
    "from": {
      "id": 1234567,
      "is_bot": false,
      "first_name": "Jhon",
      "username": "jhondoe",
      "language_code": "en"
    },
    "chat": {
      "id": 1234567,
      "first_name": "Jhon",
      "username": "jhondoe",
      "type": "private"
    },
    "date": 123456789,
    "text": "Hello, there!"
  }
};

const apiRequestMatch = {
  "update_id": 87654321,
  "message": {
    "message_id": 1,
    "from": {
      "id": 1234567,
      "is_bot": false,
      "first_name": "Jhon",
      "username": "jhondoe",
      "language_code": "en"
    },
    "chat": {
      "id": 1234567,
      "first_name": "Jhon",
      "username": "jhondoe",
      "type": "private"
    },
    "date": 123456789,
    "text": "/hello @username",
    match: [
      'hello', 'mee', 'as', 'me'
    ],
    "entities": [
      {
        "offset": 0,
        "length": 6,
        "type": "bot_command"
      },
      {
        "offset": 7,
        "length": 9,
        "type": "mention"
      }
    ]
  }
};

const run = {
  message: () => console.log(bot.process(apiRequestMessage)),
  match: () => console.log(bot.process(apiRequestMatch)),
};

const runtype = process.argv[2];

if (runtype && runtype in run) {
  run[runtype]();
}