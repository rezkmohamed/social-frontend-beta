export class Post {
    constructor(
        public idPost: string,
        public urlImg: string,
        public description: string,
        public date: number,
        public idProfile: string,
        public commentsCounter?: number,
        public likesCounter?: number,
        public isLiked?: boolean
    ){}
}