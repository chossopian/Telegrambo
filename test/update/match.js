export default {
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
    "text": "/hello @username /hgi",
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
      },
      {
        "offset": 0,
        "length": 6,
        "type": "bot_command"
      },

    ]
  }
};