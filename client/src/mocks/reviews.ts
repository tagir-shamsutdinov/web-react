import {Review} from "../types/review";

export const mockReviews: Review[] = [
    {
        id: 1,
        offerId: '1',
        date: '2023-12-10',
        user: {
            name: 'Alice',
            avatarUrl: '/img/avatar-alice.jpg',
            isPro: true,
        },
        comment: 'Очень уютное место, все понравилось!',
        rating: 5,
    },
    {
        id: 2,
        offerId: '1',
        date: '2023-11-25',
        user: {
            name: 'Bob',
            avatarUrl: '/img/avatar-bob.jpg',
            isPro: false,
        },
        comment: 'Хорошее расположение, но было немного шумно по ночам.',
        rating: 4,
    },
    {
        id: 3,
        offerId: '2',
        date: '2024-01-05',
        user: {
            name: 'Clara',
            avatarUrl: '/img/avatar-clara.jpg',
            isPro: true,
        },
        comment: 'Отличный хозяин и чистая квартира. Рекомендую!',
        rating: 5,
    },
    {
        id: 4,
        offerId: '3',
        date: '2023-10-15',
        user: {
            name: 'David',
            avatarUrl: '/img/avatar-david.jpg',
            isPro: false,
        },
        comment: 'Не хватало некоторых удобств, но в целом неплохо.',
        rating: 3,
    },
    {
        id: 5,
        offerId: '3',
        date: '2023-12-30',
        user: {
            name: 'Eva',
            avatarUrl: '/img/avatar-eva.jpg',
            isPro: false,
        },
        comment: 'Очень понравился вид из окна и тихий район.',
        rating: 4,
    },
];
