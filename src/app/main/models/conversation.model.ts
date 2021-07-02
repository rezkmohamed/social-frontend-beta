import { MessageModel } from "./message.model";
import { Profile } from "./profile.model";

export class Conversation  {
    constructor(
        public idConversation: string,
        public profile1: Profile,
        public profile2: Profile,
        public latestMessage: string,
        public messages: MessageModel[],
        public latestMessageDate?: number,
    ){}
}