export default function RestaurantReviews({ reviews }) {
  if (!reviews || !reviews.length) {
    return null;
  }

  const sortedReviews = [...reviews].sort((a, b) => b.id - a.id);

  return (
    <ul>
      {sortedReviews.map(({
        id,
        name, score, description,
      }) => (
        <li key={id}>
          <p data-testid="review-name">{name}</p>
          <p data-testid="review-score">{score}</p>
          <p data-testid="review-description">{description}</p>
        </li>
      ))}
    </ul>
  );
}
