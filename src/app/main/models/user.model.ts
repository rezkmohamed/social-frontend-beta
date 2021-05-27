export class User {
    constructor(
        public email: string,
        public nickname: string,
        public id: string,
        private _token: string,
        private _tokenExpirationDate: Date,
        public _tokenExpirationSeconds?: number
    ){}

    get token(){
        if(!this._tokenExpirationDate || new Date() > this._tokenExpirationDate){
            return null;
        }
        return this._token;
    }

    get tokenExpirationDate(){
        if(!this._tokenExpirationDate || new Date() > this._tokenExpirationDate){
            return null;
        }
        return this._tokenExpirationDate;
    }
}