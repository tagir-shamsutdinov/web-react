import { FullOffer, OffersList } from '../types/offer';
import {offers} from "./offers";

export const offersList: OffersList[] = offers.map((offer: FullOffer): OffersList => ({
    id: offer.id,
    title: offer.title,
    type: offer.type,
    price: offer.price,
    city: offer.city,
    location: offer.location,
    isFavorite: offer.isFavorite,
    isPremium: offer.isPremium,
    rating: offer.rating,
    previewImage: offer.images[0], // берём первое изображение как превью
}));