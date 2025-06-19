type ReviewItemProps = {
    avatarUrl: string;
    userName: string;
    ratingPercent: number; // например 80% => 80
    text: string;
    dateTime: string;
};

function ReviewItem({ avatarUrl, userName, ratingPercent, text, dateTime }: ReviewItemProps) {
    return (
        <li className="reviews__item">
            <div className="reviews__user user">
                <div className="reviews__avatar-wrapper user__avatar-wrapper">
                    <img className="reviews__avatar user__avatar" src={avatarUrl} width="54" height="54" alt="Reviews avatar" />
                </div>
                <span className="reviews__user-name">{userName}</span>
            </div>
            <div className="reviews__info">
                <div className="reviews__rating rating">
                    <div className="reviews__stars rating__stars">
                        <span style={{ width: `${ratingPercent * 20 }%` }}></span>
                        <span className="visually-hidden">Rating</span>
                    </div>
                </div>
                <p className="reviews__text">{text}</p>
                <time className="reviews__time" dateTime={dateTime}>{dateTime}</time>
            </div>
        </li>
    );
}

export { ReviewItem };
