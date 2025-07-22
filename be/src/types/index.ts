export type User = {
    id: number,
    email: string,
    avatar?: string,
}

export type Message = {
    content: string,
    createAt?: Date,
    roomId: number,
    user: User,
}

export type Conversation = {
    user: {
      id: number;
      email: string;
      avatar: string;
    };
    lastMessage?: string;
    lastMessageAt?: string;
    roomId?: string;
};