import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './components/app/app';
import { offers } from './mocks/offers';
import {offersList} from "./mocks/offers-list";
import {mockReviews} from "./mocks/reviews";
import {Provider} from "react-redux";
import {store} from "./store";

const root = createRoot(document.getElementById('root')!);

root.render(
    <StrictMode>
        <Provider store={store}>
            <App rentalOffersCount={offersList.length} offers={offers} offersList={ offersList } reviews={ mockReviews } />
        </Provider>
    </StrictMode>
);
