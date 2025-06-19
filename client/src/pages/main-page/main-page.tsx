import React, { useState } from "react";
import { SortOptions } from "../../components/sort-options/sort-options";
import CityMap from "../../components/map/map";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { OffersList, sortOffersByType } from "../../types/offer";
import { SortOffer } from "../../types/sort";
import { CitiesList } from "../../components/cities/cities-list";
import { Logo } from "../../components/Logo";
import { CitiesCardList } from "../../components/cities-card-list/cities-card-list";
import { Link } from "react-router-dom";
import { AppRoute, AuthorizationStatus } from "../../const";
import { logoutAction } from "../../store/api-actions";

function MainPage(): React.JSX.Element {
  const selectedCity = useAppSelector((state) => state.city);
  const [selectedSort, setSelectedSort] = useState<SortOffer>("Popular");
  const offers = useAppSelector((state) => state.offers);
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const userEmail = useAppSelector((state) => state.userEmail);
  
  const selectedCityOffers = offers.filter((offer) => offer.city.name === selectedCity?.name);
  const [hoveredOfferId, setHoveredOfferId] = useState<string | null>(null);

  const dispatch = useAppDispatch();

  const handleLogoutClick = (evt: React.MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    dispatch(logoutAction());
  };

  const handleListItemHover = (offerId: string | null) => {
    setHoveredOfferId(offerId);
  };

  const points = selectedCityOffers.map((offer) => ({
    id: offer.id.toString(),
    latitude: offer.location.latitude,
    longitude: offer.location.longitude,
    title: offer.title,
  }));

  return (
    <div className="page page--gray page--main">
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
                      <a
                        className="header__nav-link header__nav-link--profile"
                        href="#"
                      >
                        <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                        <span className="header__user-name user__name">
                          {userEmail || "user@example.com"}
                        </span>
                      </a>
                    </li>
                    <li className="header__nav-item">
                      <a 
                        className="header__nav-link" 
                        href="#"
                        onClick={handleLogoutClick}
                      >
                        <span className="header__signout">Sign out</span>
                      </a>
                    </li>
                  </>
                ) : (
                  <li className="header__nav-item user">
                    <Link 
                      className="header__nav-link header__nav-link--profile" 
                      to={AppRoute.Login}
                    >
                      <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                      <span className="header__login">Sign in</span>
                    </Link>
                  </li>
                )}
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList selectedCity={selectedCity} />
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">
                {selectedCityOffers.length} places to stay in{" "}
                {selectedCity?.name}
              </b>
              <SortOptions
                activeSorting={selectedSort}
                onChange={(newSorting) => setSelectedSort(newSorting)}
              />
              <CitiesCardList
                offerList={sortOffersByType(selectedCityOffers, selectedSort)}
                onListItemHover={handleListItemHover}
              />
            </section>
            <div className="cities__right-section">
              {selectedCity && (
                <CityMap
                  cityLocation={selectedCity.location}
                  points={points}
                  hoveredMarkerId={hoveredOfferId}
                />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export { MainPage };