import { OffersList } from "../../types/offer";
import {FavoriteCard} from "./favorite-card";

type FavoritesCardListProps = {
    offersList: OffersList[];
};

function FavoritesList({ offersList }: FavoritesCardListProps) {
    const favorites = offersList.filter((item) => item.isFavorite);

    // Группировка по названию города
    const favoritesByCity = favorites.reduce<Record<string, OffersList[]>>((acc, offer) => {
        const cityName = offer.city.name;
        if (!acc[cityName]) {
            acc[cityName] = [];
        }
        acc[cityName].push(offer);
        return acc;
    }, {});

    return (
        <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
                {Object.entries(favoritesByCity).map(([city, places]) => (
                    <li className="favorites__locations-items" key={city}>
                        <div className="favorites__locations locations locations--current">
                            <div className="locations__item">
                                <a className="locations__item-link" href="#">
                                    <span>{city}</span>
                                </a>
                            </div>
                        </div>
                        <div className="favorites__places">
                            {places.map((place) => (
                                <FavoriteCard key={place.id} {...place} />
                            ))}
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
}

export { FavoritesList };
