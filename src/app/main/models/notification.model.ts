export class NotificationModel {
    constructor(public idProfileNotificator: string,
                public idProfileToNotify: string,
                public nicknameProfileNotificator: string,
                public imgProfileNotificator: string,
                public notificationType: string,
                public date: number,
                public isSeen ?: boolean,
                public idPost ?: string,
                public notificationView?: string,
                public commentMessage?: string
                ){}
}