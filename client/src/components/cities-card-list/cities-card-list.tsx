import { CitiesCard } from "../cities-card/cities-card";
import { OffersList } from "../../types/offer";

type CitiesCardListProps = {
  offerList: OffersList[];
  onListItemHover: (offerId: string | null) => void;
};

function CitiesCardList({ offerList, onListItemHover }: CitiesCardListProps) {
  return (
    <div className="cities__places-list places__list tabs__content">
      {Array.from(offerList, (item) => (
        <CitiesCard
          key={item.id}
          id={item.id}
          title={item.title}
          type={item.type}
          price={item.price}
          previewImage={item.previewImage}
          isPremium={item.isPremium}
          rating={item.rating}
          onListItemHover={onListItemHover}
        />
      ))}
    </div>
  );
}

export { CitiesCardList };
