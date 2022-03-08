import * as fetch from "node-fetch";

export class vicopsApi {
  /**
   * @constructor
   * @param {string} name name of your user in vicops
   * @param {string} password password of your user in vicops
   * @param {string|none} host
   */
  name: string;
  password: string;
  host: string;
  constructor(
    name: string,
    password: string,
    host: string = "https://vicops.movc.xyz"
  ) {
    this.name = name;
    this.password = password;
    this.host = host;
  }
  /**
   * Function to fetch vicops api
   * @returns response in json format
   */
  private async _getPost(url: string, body: object) {
    let res = await fetch(`${this.host}${url}`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });
    if (res.status !== 200)
      return {
        status: res.status,
        code: "denied",
      };
    return await res.json();
  }
  private async _getGet(url: string) {
    let res = await fetch(`${this.host}${url}`);
    if (res.status !== 200)
      return {
        status: res.status,
        code: "denied",
      };
    return await res.json();
  }
  /**
   * Register in vicops
   * @param {object} mail email of user
   * @returns response in json format
   */
  async register(mail) {
    return await this._getPost("/api/register", {
      name: this.name,
      password: this.password,
      mail,
    });
  }
  /**
   * Transaction in vicops
   * @param {string} recipient recipient of money
   * @param {number} amount amount of sended money
   * @param {string} currency code of currency
   * @param {string} comment comment for transaction
   * @param {string} type type of transaction
   * @returns response in json format
   */
  async transaction(
    recipient: string,
    amount: number,
    currency: string,
    comment?: string,
    type: string = "transaction"
  ) {
    return await this._getPost("/api/transaction", {
      password: this.password,
      transaction: {
        body: {
          sender: this.name,
          recipient,
          amount,
          currency,
          comment,
        },
        type,
      },
    });
  }
  /**
   * Submit a bid for sale
   * @param {string} toBuy what to exchange your bid for
   * @param {number} toSell what are you selling
   * @param {string} amount amount to sell
   * @param {string} course sales course
   * @returns response in json format
   */
  async sell(toBuy: string, toSell: string, amount: number, course: number) {
    return await this._getPost("/api/sell", {
      password: this.password,
      bid: {
        username: this.name,
        toSell,
        toBuy,
        amount,
        course,
      },
    });
  }
  /**
   * Submit a bid for sale
   * @param {string} toBuy what to exchange your bid for
   * @param {number} toSell what are you selling
   * @param {string} amount amount to sell
   * @param {string} course bying course
   * @returns response in json format
   */
  async buy(toBuy: string, toSell: string, amount: number, course: number) {
    return await this._getPost("/api/buy", {
      password: this.password,
      bid: {
        username: this.name,
        toSell,
        toBuy,
        amount,
        course,
      },
    });
  }
  /**
   * Get course
   * @returns response in json format
   */
  async getCourse(fname, sname) {
    return await this._getGet(`/api/course/${fname}/${sname}`);
  }
  /**
   * Get chart
   * @returns response in json format
   */
  async getChart(fname, sname) {
    return await this._getGet(`/api/chart/${fname}/${sname}`);
  }
  /**
   * Get bids
   * @returns response in json format
   */
  async getBids(fname, sname) {
    return await this._getGet(`/api/bids/${fname}/${sname}`);
  }
  /**
   * Get your user
   * @returns response in json format
   */
  async getUser() {
    return await this._getPost("/api/user", {
      name: this.name,
      password: this.password,
    });
  }
}
