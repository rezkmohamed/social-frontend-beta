export class Post {
    constructor(
        public idPost: string,
        public urlImg: string,
        public description: string,
        public datePost: string,
        public idProfile: string,
        public commentsCounter?: number,
        public likesCounter?: number
    ){}
}