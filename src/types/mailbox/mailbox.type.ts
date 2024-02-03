enum MailType { Success, Error, Warning, Info };

export type MailDataType = {
    title: number;
    message: number | string;
}; 

export type MailBoxType = {
    id?: number; // Autoincrement
    authorId: string;
    receiverId: string;
    isReaded: boolean;
    receivedDate: Date;
    type: MailType;
    data: MailDataType;
};