export class MessageModel {
    constructor(
        public idMessage: string,
        public idProfileSender: string,
        public idProfileReciver: string,
        public idConversation: string,
        public message: string,
        public date: string,
        public isSeen: boolean
    ){}
}