export class CommentPost {
    constructor(
        public idComment: string,
        public comment: string,
        public date: string,
        public idPost: string,
        public idProfile: string,
        public commentLikesCounter?: number
    ){}
}