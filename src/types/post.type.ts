export type PostInformation = {
    title: string;
    description: string;
}

export type PostImage = {
    url: string;
}

export type PostStatistics = {
    times_viewed: Array<number>;
    times_displayed: number;
    times_liked: Array<number>;
}

export type PostPeriods = {
    time_created: number;
    time_due: number;
}

export type PostBoosts = {
    time_created: number;
    time_due: number;
}