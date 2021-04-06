export interface Message {
    id: number;
    sender: number;
    recipient: number;
    subject: string;
    body: string;
    date: string;
}

export interface MessageView {
    id: number;
    sender: number;
    senderName: string;
    subject: string;
    body: string;
    date: string;
}
