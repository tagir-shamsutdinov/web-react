import {ReviewItem} from "./review-component";
import {Review} from "../../types/review";


type ReviewListProps = {
    reviews: Review[];
};

function ReviewList({ reviews }: ReviewListProps) {
    return (
        <ul className="reviews__list">
            {reviews.map(review => (
                <ReviewItem
                    key={review.id}
                    avatarUrl={review.user.avatarUrl}
                    userName={review.user.name}
                    ratingPercent={review.rating}
                    text={review.comment}
                    dateTime={review.date}
                />
            ))}
        </ul>
    );
}

export { ReviewList };
