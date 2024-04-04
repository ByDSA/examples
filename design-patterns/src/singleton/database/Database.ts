export default class Database {
  #status: string = 'Not connected';

  connect() {
    // connect to database
    this.#status = 'Connected';
  }

  getStatus() {
    return this.#status;
  }
}