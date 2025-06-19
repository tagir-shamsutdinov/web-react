import {OffersList} from "../../types/offer";
import {CitiesCard} from "./cities-card";


type CitiesCardListProps = {
    selectedCity: OffersList[];
};

function CitiesCardList({ selectedCity }: CitiesCardListProps) {
    return (
        <div className="cities__places-list places__list tabs__content">
            {Array.from(selectedCity, (item) =>
                <CitiesCard key={item.id} id={item.id}
                            title={item.title} type={item.type}
                            price={item.price} isPremium={item.isPremium}
                            previewImage={item.previewImage} rating={item.rating} />
            )}
        </div>
    );
}

export { CitiesCardList };
