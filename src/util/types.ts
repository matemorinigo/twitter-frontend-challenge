export type UserView = {
    id: string;
    name: string;
    username: string;
    profilePicture: string | null;
}

export type Reaction = {
    type: string;
    postId: string;
    userId: string;
}


export interface Post {
    id: string;
    authorId: string;
    content: string;
    images: string[];
    createdAt: string;
    isComment: boolean;
    qtyComments: number;
    qtyLikes: number;
    qtyRetweets: number;
    reactions: Reaction[];
    comments: Post[];
}