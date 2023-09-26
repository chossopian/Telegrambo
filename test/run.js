import bot from './bot.js';
import './message.js';

const result = bot.process({
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
   "date": 1695627108,
   "text": "Hello, there!"
  }
 });

console.log(result);