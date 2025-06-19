import {OffersList} from "./types/offer";
import {SortOffer} from "./types/sort";
import {SortOffersType} from "./const";
import {DomEvent} from "leaflet";
import off = DomEvent.off;

function sortOfferByType (offers: OffersList[], type: SortOffer): OffersList[] {
    switch (type) {
        case SortOffersType.PriceToHigh:
            return offers.sort((a, b) => a.price - b.price);
        case SortOffersType.PriceToLow:
            return offers.sort((a, b) => b.price - a.price);
        case SortOffersType.TopRated:
            return offers.sort((a, b) => b.rating - a.rating);
        default:
            return offers;
    }
}