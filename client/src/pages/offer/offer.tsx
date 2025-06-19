import {Logo} from "../../components/Logo";
import {FullOffer, mapFullOfferToOffersList} from "../../types/offer";
import {useParams} from "react-router-dom";
import {offers} from "../../mocks/offers";
import {NotFoundPage} from "../not-found/not-found";
import {ReviewForm} from "../../components/review/review-form-component";
import {ReviewList} from "../../components/review/review-list-component";
import {Review} from "../../types/review";
import {offersList} from "../../mocks/offers-list";
import CityMap from "../../components/map/map";
import {CitiesCardList} from "../cities-card/cities-card-list";

type OfferProps = {
    offers: FullOffer[];
    reviews: Review[];
}

function OfferPage({offers, reviews}: OfferProps) {
    const params = useParams();
    const offer = offers.find((item) => item.id === params.id);
    const {
        id,
        title,
        type,
        price,
        city,
        location,
        isFavorite,
        isPremium,
        rating,
        description,
        bedrooms,
        goods,
        host,
        images,
        maxAdults
    } = offer;

    if (!offer) {
        return <NotFoundPage/>;
    }

    const offerReviews = reviews.filter(review => review.offerId === offer.id);

    const mapPoints = [
        {
            id: offer.id,
            latitude: location.latitude,
            longitude: location.longitude,
            title: offer.title,
        },
        // можно добавить дополнительные офферы рядом:
        ...offersList
            .filter(o => o.id !== offer.id && o.city.name === city.name)
            .map(o => ({
                id: o.id,
                latitude: o.location.latitude,
                longitude: o.location.longitude,
                title: o.title,
            }))
    ];

    const otherOffers = mapFullOfferToOffersList(offers.filter(offer => offer.city.name === offer.city.name));

    const handleReviewSubmit = (rating: number, comment: string) => {
        console.log(`Review submitted for offer ${id}:`, { rating, comment });
        // Здесь можно отправить данные на сервер через fetch/axios и обновить отзывы.
    };


    return (
        <div className="page">
            <header className="header">
                <div className="container">
                    <div className="header__wrapper">
                        <div className="header__left">
                            <Logo/>
                        </div>
                        <nav className="header__nav">
                            <ul className="header__nav-list">
                                <li className="header__nav-item user">
                                    <a className="header__nav-link header__nav-link--profile" href="#">
                                        <div className="header__avatar-wrapper user__avatar-wrapper">
                                        </div>
                                        <span className="header__user-name user__name">Myemail@gmail.com</span>
                                        <span className="header__favorite-count">3</span>
                                    </a>
                                </li>
                                <li className="header__nav-item">
                                    <a className="header__nav-link" href="#">
                                        <span className="header__signout">Sign out</span>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </header>

            <main className="page__main page__main--offer">
                <section className="offer">
                    <div className="offer__gallery-container container">
                        <div className="offer__gallery">
                            {images.map((image, index) => (
                                <div key={`${id}-image-${index}`} className="offer__image-wrapper">
                                    <img className="offer__image" src={image} alt={`Photo ${title}`}/>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="offer__container container">
                        <div className="offer__wrapper">
                            {isPremium && (
                                <div className="offer__mark">
                                    <span>Premium</span>
                                </div>
                            )}
                            <div className="offer__name-wrapper">
                                <h1 className="offer__name">
                                    {title}
                                </h1>
                                <button
                                    className={`offer__bookmark-button button ${isFavorite ? 'offer__bookmark-button--active' : ''}`}
                                    type="button">
                                    <svg className="offer__bookmark-icon" width="31" height="33">
                                        <use xlinkHref="#icon-bookmark"></use>
                                    </svg>
                                    <span className="visually-hidden">To bookmarks</span>
                                </button>
                            </div>
                            <div className="offer__rating rating">
                                <div className="offer__stars rating__stars">
                                    <span style={{width: `${Math.round(rating) * 20}%`}}></span>
                                    <span className="visually-hidden">Rating</span>
                                </div>
                                <span className="offer__rating-value rating__value">{rating}</span>
                            </div>
                            <ul className="offer__features">
                                <li className="offer__feature offer__feature--entire">
                                    {type}
                                </li>
                                <li className="offer__feature offer__feature--bedrooms">
                                    {bedrooms} Bedroom{bedrooms !== 1 ? 's' : ''}
                                </li>
                                <li className="offer__feature offer__feature--adults">
                                    Max {maxAdults} adult{maxAdults !== 1 ? 's' : ''}
                                </li>
                            </ul>
                            <div className="offer__price">
                                <b className="offer__price-value">&euro;{price}</b>
                                <span className="offer__price-text">&nbsp;night</span>
                            </div>
                            <div className="offer__inside">
                                <h2 className="offer__inside-title">What&apos;s inside</h2>
                                <ul className="offer__inside-list">
                                    {goods.map((good) => (
                                        <li key={`${id}-good-${good}`} className="offer__inside-item">
                                            {good}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="offer__host">
                                <h2 className="offer__host-title">Meet the host</h2>
                                <div className="offer__host-user user">
                                    <div
                                        className={`offer__avatar-wrapper ${host.isPro ? 'offer__avatar-wrapper--pro' : ''} user__avatar-wrapper`}>
                                        <img className="offer__avatar user__avatar" src={host.avatarUrl}
                                             width="74" height="74" alt="Host avatar"/>
                                    </div>
                                    <span className="offer__user-name">
                                        {host.name}
                                    </span>
                                    {host.isPro && (
                                        <span className="offer__user-status">
                                            Pro
                                        </span>
                                    )}
                                </div>
                                <div className="offer__description">
                                    {description.split('\n').map((paragraph, index) => (
                                        <p key={`${id}-desc-${index}`} className="offer__text">
                                            {paragraph}
                                        </p>
                                    ))}
                                </div>
                            </div>
                            <section className="offer__reviews reviews">
                                <h2 className="reviews__title">Reviews &middot; <span
                                    className="reviews__amount">{offerReviews.length}</span></h2>
                                <ReviewList reviews={offerReviews} />
                                <ReviewForm onSubmit={handleReviewSubmit} />

                            </section>
                        </div>
                    </div>
                    <section className="offer__map map" style={{height: '579px'}}>
                        <CityMap cityLocation={location} points={mapPoints}/>
                    </section>
                </section>
                <div className="container">
                    <section className="near-places places">
                    <h2 className="near-places__title">Other places in the neighbourhood</h2>
                        <div className="near-places__list places__list">
                            <CitiesCardList selectedCity={otherOffers}/>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}

export {OfferPage};