// export type Review = {
//     id: number;
//     avatarUrl: string;
//     userName: string;
//     ratingPercent: number;
//     text: string;
//     dateTime: string;
//     dateDisplay: string;
// };

type User = {
    name: string;
    avatarUrl: string;
    isPro: boolean;
}

export type Review = {
    id: number;
    offerId: string;
    date: string;
    user: User;
    comment: string;
    rating: number;
}