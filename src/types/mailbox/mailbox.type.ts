export enum MailType { Success, Error, Warning, Info };

type MailMessageType = {
    title: string;
    message: string;
};

type MailMessagePostType = {
    type: Number;
    errors: Number[];
}

export type MailDataType = MailMessageType | MailMessagePostType;

export type MailBoxType = {
    id?: number; // Autoincrement
    authorId: string;
    receiverId: string;
    isReaded: boolean;
    receivedDate: Date;
    type: MailType;
    data: MailDataType;
};