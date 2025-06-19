import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainPage } from "../../pages/main-page/main-page";
import { FavoritesPage } from "../../pages/favourites/favourites";
import { LoginPage } from "../../pages/login/login";
import { OfferPage } from "../../pages/offer/offer";
import { NotFoundPage } from "../../pages/not-found/not-found";
import { AppRoute } from "../../const";
import { LoadingPage } from '../loading-page/loading-page';
import { useAppSelector } from '../../hooks';
import { AuthorizationStatus } from '../../const';

function App(): React.JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const isOffersDataLoading = useAppSelector((state) => state.isOffersDataLoading);

  if (authorizationStatus === AuthorizationStatus.Unknown || isOffersDataLoading) {
    return <LoadingPage />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<MainPage />}
        />
        <Route path={AppRoute.Login} element={<LoginPage />} />
        <Route
          path={AppRoute.Favorites}
          element={<FavoritesPage />}
        />
        <Route
          path={AppRoute.Offer}
          element={<OfferPage />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export { App };