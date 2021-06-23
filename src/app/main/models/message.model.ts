export class MessageModel {
    constructor(
        public idMessage: string,
        public idProfileSender: string,
        public idProfileReciver: string,
        public date: string,
        public isSeen: boolean
    ){}
}