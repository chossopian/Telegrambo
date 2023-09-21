
export class BotContextError extends Error {
  constructor(message) {
    super(message);
    this.name = 'BotContextErrors';
  }
}


export class PayloadValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'PayloadValidationError';
  }
}


export class ResponseError extends Error {
  constructor(code, message) {
    super(message);
    this.code = code;
    this.name = 'ResponseError';
  }
}