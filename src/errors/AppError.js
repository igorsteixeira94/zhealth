class Error {
  constructor(message = 'error', status = 400) {
    this.message = message;
    this.status = status;
  }
}

export default Error;
