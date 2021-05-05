export class Post {
    constructor(
        public idPost: string,
        public urlImg: string,
        public description: string,
        public date: string,
        public idProfile: string,
        public commentsCounter?: number,
        public likesCounter?: number
    ){}
}