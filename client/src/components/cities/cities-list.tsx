import {CityOffer} from "../../types/offer";
import {useDispatch} from "react-redux";
import {useAppDispatch} from "../../hooks";
import {AppRoute, CITIES_LOCATION} from "../../const";
import {changeCity} from "../../store/action";
import {Link} from "react-router-dom";

type citiesListProps = {
    selectedCity: CityOffer | undefined;
}

function CitiesList({ selectedCity } : citiesListProps) {
    const dispatch = useAppDispatch();
    return (
        <ul className="locations__list tabs__list">
            { CITIES_LOCATION.map((city) => (
                <li key={ city.name } className="locations__item" onClick={() => {
                    dispatch(changeCity(city));
                }}
                >
                    <Link className={`${city.name === selectedCity?.name ? 
                    'tabs__item--active' : 'tabs__item--disabled'} locations__item-link tabs__item`} to={AppRoute.Main}>
                        <span>{ city.name }</span>
                    </Link>
                </li>
            ))};
        </ul>
    );
}

export { CitiesList }