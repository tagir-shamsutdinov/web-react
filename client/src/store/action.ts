import { createAction } from '@reduxjs/toolkit';
import { CityOffer, OffersList, FullOffer } from "../types/offer";
import { AuthorizationStatusType } from "../types/authorization-status";
import { Review } from "../types/review";

export const changeCity = createAction('offers/changeCity', (city: CityOffer) => ({
  payload: city
}));

export const offersCityList = createAction('offers/offersCityList', (offers: OffersList[]) => ({
  payload: offers
}));

export const requireAuthorization = createAction<AuthorizationStatusType>('user/requireAuthorization');

export const setError = createAction('setError', (error: string | null) => ({
  payload: error
}));

export const setOffersDataLoadingStatus = createAction<boolean>('data/setOffersDataLoadingStatus');

export const setCurrentOffer = createAction('offers/setCurrentOffer', (offer: FullOffer) => ({
    payload: offer
  }));
  
  export const setCurrentOfferComments = createAction('offers/setCurrentOfferComments', (comments: Review[]) => ({
    payload: comments
  }));
  
  export const setUserEmail = createAction('user/setUserEmail', (email: string) => ({
    payload: email
  }));
  