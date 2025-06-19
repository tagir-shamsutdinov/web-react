import { createReducer } from "@reduxjs/toolkit";
import { CityOffer, OffersList, FullOffer } from "../types/offer";
import { getCity } from "../const";
import { CITIES_LOCATION } from "../const";
import { AuthorizationStatus } from "../const";
import { AuthorizationStatusType } from "../types/authorization-status";
import { 
  changeCity, 
  offersCityList, 
  requireAuthorization, 
  setError, 
  setOffersDataLoadingStatus,
  setCurrentOffer,
  setCurrentOfferComments,
  setUserEmail
} from './action';
import { Review } from "../types/review";

export type InitialState = {
  city: CityOffer | undefined;
  offers: OffersList[];
  authorizationStatus: AuthorizationStatusType;
  error: string | null;
  isOffersDataLoading: boolean;
  currentOffer: FullOffer | null;
  currentOfferComments: Review[];
  userEmail: string | null;
};

const defaultCity = getCity('Paris', CITIES_LOCATION);

const initialState: InitialState = {
  city: defaultCity,
  offers: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  error: null,
  isOffersDataLoading: false,
  currentOffer: null,
  currentOfferComments: [],
  userEmail: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(offersCityList, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    })
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    })
    .addCase(setCurrentOffer, (state, action) => {
      state.currentOffer = action.payload;
    })
    .addCase(setCurrentOfferComments, (state, action) => {
      state.currentOfferComments = action.payload;
    })
    .addCase(setUserEmail, (state, action) => {
      state.userEmail = action.payload;
    });
});

export { reducer };