import { MainPage } from "../../pages/main-page/main-page";
import { JSX } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { FavoritesPage } from "../../pages/favourites/favourites";
import { LoginPage } from "../../pages/login/login";
import { OfferPage } from "../../pages/offer/offer";
import { NotFoundPage } from "../../pages/not-found/not-found";
import { FullOffer, OffersList } from "../../types/offer";
import { offersList } from "../../mocks/offers-list";
import { AppRoute } from "../../const";
import { Review } from "../../types/review";

type AppMainPageProps = {
  offersList: OffersList[];
  offers: FullOffer[];
  reviews: Review[];
};

function App({ offers, reviews }: AppMainPageProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<MainPage offers={offersList} />}
        />
        <Route path={AppRoute.Login} element={<LoginPage />} />
        <Route
          path={AppRoute.Favorites}
          element={<FavoritesPage offersList={offersList} />}
        />
        <Route
          path={AppRoute.Favorites}
          element={<FavoritesPage offersList={offersList} />}
        />
        <Route
          path={AppRoute.Offer}
          element={<OfferPage offers={offers} reviews={reviews} />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export { App };
