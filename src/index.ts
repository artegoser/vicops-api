import * as fetch from 'node-fetch';

export class vicopsApi{
    /**
     * @constructor
     * @param {string} name name of your user in vicops
     * @param {string} password password of your user in vicops
     * @param {string|none} host
     */
    name:string;
    password:string;
    host:string;
    constructor(name: string, password: string, host?: string){
        this.name = name;
        this.password = password;
        this.host = host || "https://vicops.movc.xyz"
    }
    /**
     * Function to fetch vicops api
     * @returns response in json format
     */
    private async _get(url:string, body:object, method:string="POST"){
        let res = await fetch(`${this.host}${url}`, {
            method: method,
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' },
        });
        if(res.status!==200) throw await res.json();
        return await res.json();
    }
    /**
     * Register in vicops
     * @param {object} mail email of user
     * @returns response in json format
     */
     async register(mail){
        return await this._get("/api/register", {name:this.name, password:this.password, mail})
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
     async transaction(recipient:string, amount:number, currency:string, comment?:string, type:string="transaction"){
        return await this._get("/api/transaction", {
            password:this.password,
            transaction:{
                body:{
                    sender:this.name,
                    recipient,
                    amount,
                    currency,
                    comment
                },
                type
            }
        })
    }
    /**
     * 
     * @returns response in json format
     */
    async getUser(){
        return await this._get("/api/user", {
            name:this.name,
            password:this.password
        })
    }
}