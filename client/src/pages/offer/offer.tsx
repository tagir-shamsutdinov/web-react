import React, { useEffect } from 'react';
import { Logo } from "../../components/Logo";
import { useParams, useNavigate } from "react-router-dom";
import { NotFoundPage } from "../not-found/not-found";
import { ReviewForm } from "../../components/review/review-form-component";
import { ReviewList } from "../../components/review/review-list-component";
import CityMap from "../../components/map/map";
import { CitiesCardList } from "../cities-card/cities-card-list";
import { useAppDispatch, useAppSelector } from '../../hooks';
import { AppRoute, AuthorizationStatus } from '../../const';
import { fetchOfferAction, fetchCommentsAction, postCommentAction } from '../../store/api-actions';

function OfferPage(): React.JSX.Element {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  const currentOffer = useAppSelector((state) => state.currentOffer);
  const currentOfferComments = useAppSelector((state) => state.currentOfferComments);
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const offers = useAppSelector((state) => state.offers);

  useEffect(() => {
    if (id) {
      dispatch(fetchOfferAction(id));
      dispatch(fetchCommentsAction(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (id && !currentOffer && offers.length > 0) {
      const offerExists = offers.some(offer => offer.id === id);
      if (!offerExists) {
        navigate(AppRoute.NotFound); // Используем AppRoute.NotFound
      }
    }
  }, [currentOffer, offers, id, navigate]);

  if (!currentOffer) {
    return <div>Loading...</div>;
  }

  const {
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
  } = currentOffer;

  const mapPoints = [
    {
      id: id!,
      latitude: location.latitude,
      longitude: location.longitude,
      title: title,
    },
    ...offers
      .filter(o => o.id !== id && o.city.name === city.name)
      .map(o => ({
        id: o.id,
        latitude: o.location.latitude,
        longitude: o.location.longitude,
        title: o.title,
      }))
  ];

  const otherOffers = offers.filter(o => o.id !== id && o.city.name === city.name);

  const handleReviewSubmit = (rating: number, comment: string) => {
    if (id) {
      dispatch(postCommentAction({id, rating, comment}));
    }
  };

  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                {authorizationStatus === AuthorizationStatus.Auth ? (
                  <>
                    <li className="header__nav-item user">
                      <a className="header__nav-link header__nav-link--profile" href="#">
                        <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                        <span className="header__user-name user__name">
                          user@example.com
                        </span>
                      </a>
                    </li>
                    <li className="header__nav-item">
                      <a className="header__nav-link" href="#">
                        <span className="header__signout">Sign out</span>
                      </a>
                    </li>
                  </>
                ) : (
                  <li className="header__nav-item user">
                    <a className="header__nav-link header__nav-link--profile" href="#">
                      <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                      <span className="header__login">Sign in</span>
                    </a>
                  </li>
                )}
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {images.map((image: string, index: number) => (
                <div key={`${id}-image-${index}`} className="offer__image-wrapper">
                  <img className="offer__image" src={image} alt={`Photo ${title}`} />
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
                  <span style={{ width: `${Math.round(rating) * 20}%` }}></span>
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
                  {goods.map((good: string) => (
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
                         width="74" height="74" alt="Host avatar" />
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
                  {description.split('\n').map((paragraph: string, index: number) => (
                    <p key={`${id}-desc-${index}`} className="offer__text">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
              <section className="offer__reviews reviews">
                <h2 className="reviews__title">Reviews &middot; <span
                  className="reviews__amount">{currentOfferComments.length}</span></h2>
                <ReviewList reviews={currentOfferComments} />
                {authorizationStatus === AuthorizationStatus.Auth && (
                  <ReviewForm onSubmit={handleReviewSubmit} />
                )}
              </section>
            </div>
          </div>
          <section className="offer__map map" style={{ height: '579px' }}>
            <CityMap 
              cityLocation={location} 
              points={mapPoints} 
              hoveredMarkerId={null} 
            />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              <CitiesCardList selectedCity={otherOffers} />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export { OfferPage };