import {Link} from "react-router-dom";
import {useState} from "react";
import {AppRoute} from "../../const";

type CitiesCardProps = {
    id: string;
    title: string;
    type: string;
    price: number;
    isPremium: boolean;
    previewImage: string;
    rating: number;
}

function CitiesCard({ id, title, type, price, isPremium, previewImage, rating } : CitiesCardProps) {
    const [, setOfferId] = useState('');

    return (
        <article className="cities__card place-card">
            {isPremium && (
                <div className="place-card__mark">
                    <span>Premium</span>
                </div>
            )}
            <div className="cities__image-wrapper place-card__image-wrapper">
                {/*<a href="#">*/}
                {/*    <img className="place-card__image" src="/img/apartment-01.jpg" width="260" height="200"*/}
                {/*         alt="Place image"/>*/}
                {/*</a>*/}
                <Link to={AppRoute.Offer.replace(':id', id)}>
                    <img className="place-card__image" src={previewImage} width="260" height="200" alt="Place" />
                </Link>
            </div>
            <div className="place-card__info">
                <div className="place-card__price-wrapper">
                    <div className="place-card__price">
                        <b className="place-card__price-value">&euro;{ price }</b>
                        <span className="place-card__price-text">&#47;&nbsp;night</span>
                    </div>
                    <button className="place-card__bookmark-button button" type="button">
                        <svg className="place-card__bookmark-icon" width="18" height="19">
                            <use xlinkHref="#icon-bookmark"></use>
                        </svg>
                        <span className="visually-hidden">To bookmarks</span>
                    </button>
                </div>
                <div className="place-card__rating rating">
                    <div className="place-card__stars rating__stars">
                        <span style={{width: '80%'}}></span>
                        <span className="visually-hidden">{ rating }</span>
                    </div>
                </div>
                <h2 className="place-card__name">
                    {/*<a href="#">Beautiful &amp; luxurious apartment at great location</a>*/}
                    <Link to={AppRoute.Offer.replace(':id', id)}>{title}</Link>
                </h2>
                <p className="place-card__type">{ type }</p>
            </div>
        </article>
    );
}

export { CitiesCard }