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
    private async _getPost(url:string, body:object){
        let res = await fetch(`${this.host}${url}`, {
            method: "POST",
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' },
        });
        if(res.status!==200) throw await res.json();
        return await res.json();
    }
    private async _getGet(url:string){
        let res = await fetch(`${this.host}${url}`);
        if(res.status!==200) throw await res.json();
        return await res.json();
    }
    /**
     * Register in vicops
     * @param {object} mail email of user
     * @returns response in json format
     */
     async register(mail){
        return await this._getPost("/api/register", {name:this.name, password:this.password, mail})
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
        return await this._getPost("/api/transaction", {
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
     * Get your user
     * @returns response in json format
     */
    async getUser(){
        return await this._getPost("/api/user", {
            name:this.name,
            password:this.password
        })
    }
    /**
     * Swap your currency on VICOPS stock market
     * @param {string} name name of quote example: SKL/REA
     * @param {string} from the name of the currency to be exchanged example: SKL
     * @param {string} to the name of the currency that you will receive during the exchange example: REA
     * @param {number} amount amount of currency "from" to be exchanged example: 5
     * @returns response in json format
     */
     async swap(name, from, to, amount){
        return await this._getPost("/api/swap", {
            name:this.name,
            password:this.password,
            swap:{
                name, from, to, amount
            }
        })
    }
    /**
     * get Course of currency, etc
     * @param {string} name name of quote
     * @returns response in json format
     */
    async getCourse(name){
        return await this._getGet(`/api/course/${name}`)
    }
}