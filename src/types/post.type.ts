export type Post = {
    id: number;
    authorId: string;
}

export type PostInformation = Post & {
    title: string;
    description: string;
}

export type PostImage = Post & {
    url: string;
}

export type PostStatistics = Post & {
    times_viewed: Array<number>;
    times_displayed: number;
    times_liked: Array<number>;
}

export type PostPeriods = Post & {
    time_created: number;
    time_due: number;
}

export type PostBoosts = Post & {
    time_created: number;
    time_due: number;
}