export class StorageData {
    constructor(public email: string, 
                public id: string,
                public nickname: string,
                public _token: string,
                public _tokenExpirationDate: Date){}
}